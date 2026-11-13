// API nhận file .md, ghi vào src/content/blog/, build lại site rồi copy dist/ ra WEB_ROOT.
// GET /guide trả về HUONG-DAN-VIET-BAI.md để AI đọc trước khi viết bài.
// Chạy sau nginx (HTTPS), xem deploy/README.md.
import http from 'node:http';
import { readFile, writeFile, rm } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash, timingSafeEqual } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = path.join(ROOT, 'src/content/blog');
const GUIDE = path.join(ROOT, 'HUONG-DAN-VIET-BAI.md');
const MAX_BYTES = 1024 * 1024;

// Đọc .env ở thư mục gốc dự án nếu có (biến đã đặt sẵn trong môi trường được ưu tiên)
try {
  process.loadEnvFile(path.join(ROOT, '.env'));
} catch {}

const { POST_API_PASSWORD: PASSWORD, WEB_ROOT, PORT = '8787' } = process.env;

if (!PASSWORD || !WEB_ROOT) {
  console.error('Cần đặt POST_API_PASSWORD và WEB_ROOT');
  process.exit(1);
}

const sha = (s) => createHash('sha256').update(s).digest();
const authorized = (req) => timingSafeEqual(sha(req.headers['x-password'] ?? ''), sha(PASSWORD));

// Mỗi lần chỉ build một bài, các request sau xếp hàng chờ
let queue = Promise.resolve();
function serial(fn) {
  const p = queue.then(fn);
  queue = p.catch(() => {});
  return p;
}

async function publish(slug, content) {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  const old = await readFile(file, 'utf8').catch(() => null);
  await writeFile(file, content);
  try {
    await run('npm', ['run', 'build'], { cwd: ROOT, maxBuffer: 10 * 1024 * 1024 });
  } catch (err) {
    // Build lỗi: trả file về như cũ để không làm kẹt các lần build sau
    if (old === null) await rm(file);
    else await writeFile(file, old);
    throw err;
  }
  await run('rsync', ['-a', '--delete', 'dist/', `${WEB_ROOT}/`], { cwd: ROOT });
}

http
  .createServer(async (req, res) => {
    const send = (code, body) => {
      res.writeHead(code, { 'content-type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(body));
    };

    if (!authorized(req)) return send(401, { error: 'Sai mật khẩu' });

    if (req.method === 'GET' && req.url === '/guide') {
      res.writeHead(200, { 'content-type': 'text/markdown; charset=utf-8' });
      return res.end(await readFile(GUIDE, 'utf8'));
    }

    const m = req.url.match(/^\/posts\/([a-z0-9]+(?:-[a-z0-9]+)*)$/);
    if (req.method !== 'PUT' || !m) return send(404, { error: 'Dùng: GET /guide hoặc PUT /posts/<slug>' });

    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > MAX_BYTES) return send(413, { error: 'File quá 1MB' });
      chunks.push(chunk);
    }
    const content = Buffer.concat(chunks).toString('utf8');
    if (!content.startsWith('---')) return send(400, { error: 'File thiếu frontmatter (---)' });

    try {
      await serial(() => publish(m[1], content));
      send(200, { ok: true, url: `/cam-nang/${m[1]}/` });
    } catch (err) {
      const log = `${err.stdout ?? ''}${err.stderr ?? ''}` || err.message;
      send(422, { error: 'Build lỗi, bài chưa được đăng', log: log.slice(-3000) });
    }
  })
  .listen(Number(PORT), '127.0.0.1', () => console.log(`post-api: http://127.0.0.1:${PORT}`));
