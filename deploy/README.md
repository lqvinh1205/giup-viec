# API đăng bài cẩm nang

Gửi 1 file `.md` → API ghi vào `src/content/blog/<slug>.md` → `npm run build` → nginx phục vụ thẳng `dist/`.
Build lỗi (frontmatter sai…) thì file được trả về như cũ, site đang chạy không bị ảnh hưởng.

## Đọc hướng dẫn viết bài

```bash
curl https://<domain>/api/guide -H "X-Password: <MẬT_KHẨU>" -o HUONG-DAN-VIET-BAI.md
```

Trả về nội dung `HUONG-DAN-VIET-BAI.md` đang có trên VPS (sửa file là có hiệu lực ngay, không cần khởi động lại API).

## Gửi bài

```bash
curl -X PUT https://<domain>/api/posts/ten-bai-viet \
  -H "X-Password: <MẬT_KHẨU>" \
  --data-binary @ten-bai-viet.md
```

- Slug chỉ gồm `a-z`, `0-9`, `-`. Gửi lại cùng slug = cập nhật bài.
- Thành công: `{"ok":true,"url":"/cam-nang/ten-bai-viet/"}`. Lỗi build: HTTP 422 kèm `log`.
- Frontmatter bắt buộc: `title`, `description`, `pubDate`; tuỳ chọn: `updatedDate`, `tags`, `service`.

## Cài trên VPS

Code đặt tại `/var/www/html/giup-viec`, chạy bằng root, Node cài qua nvm. Các lệnh dưới chạy trên VPS.

1. **Code và Node.** Cần Node 20.12+ (`node -v`).

   ```bash
   cd /var/www/html/giup-viec
   git pull
   npm ci
   npm run build        # phải chạy thành công trước khi làm tiếp
   ```

2. **Mật khẩu.** Nên dài ≥ 16 ký tự (API không giới hạn số lần thử sai), không chứa dấu `#`.

   ```bash
   cp .env.example .env        # nếu chưa có .env
   openssl rand -base64 24 | tr -d '#/+='   # tạo mật khẩu
   nano .env                   # POST_API_PASSWORD=<mật khẩu>
   chmod 600 .env
   ```

   **Không** đặt `WEB_ROOT` trong `.env`: nginx phục vụ thẳng `dist/`. (`WEB_ROOT` chỉ dùng khi muốn copy `dist/` sang một thư mục web riêng, nằm ngoài thư mục code.)

3. **Service** (chạy nền, tự khởi động lại). Node cài qua nvm nên phải ghi đường dẫn đầy đủ và `PATH` (để API gọi được `npm`). Đổi bản Node thì sửa 2 dòng này.

   ```bash
   sudo tee /etc/systemd/system/post-api.service >/dev/null <<'UNIT'
   [Unit]
   Description=giup-viec post API
   After=network.target

   [Service]
   User=root
   WorkingDirectory=/var/www/html/giup-viec
   Environment=PATH=/root/.nvm/versions/node/v22.23.4/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
   ExecStart=/root/.nvm/versions/node/v22.23.4/bin/node deploy/post-api.mjs
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
   UNIT

   sudo systemctl daemon-reload
   sudo systemctl enable --now post-api
   curl -i http://127.0.0.1:8787/guide      # 401 Sai mật khẩu
   journalctl -u post-api -n 30             # xem log khi lỗi
   ```

4. **nginx – khối HTTPS của giupviecangia.com** (`grep -rl giupviecangia /etc/nginx/sites-enabled/`). Giữ `root /var/www/html/giup-viec/dist;`, đổi `try_files` thành `=404` và thêm:

   ```nginx
   error_page 404 /404.html;

   location /api/ {
       proxy_pass http://127.0.0.1:8787/;
       proxy_read_timeout 300s;
       client_max_body_size 1m;
   }

   location / {
       try_files $uri $uri/ =404;
   }
   ```

5. **nginx – khối mặc định** (`listen 80 default_server`, `root /var/www/html`). Khối này phục vụ cả thư mục code, nên phải chặn, nếu không ai cũng tải được `.env`, `.git`:

   ```nginx
   location ^~ /giup-viec/ { return 404; }
   location ~ /\. { deny all; }
   ```

   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   curl -s -o /dev/null -w "%{http_code}\n" -H "Host: abc.invalid" http://127.0.0.1/giup-viec/.env   # 404
   curl -i https://giupviecangia.com/api/guide                                                       # 401
   ```

API chỉ lắng nghe `127.0.0.1`, nên phải đi qua nginx HTTPS (dữ liệu và mật khẩu được mã hoá trên đường truyền).

**Lưu ý**
- Mỗi lần đăng bài, `dist/` bị xóa và tạo lại trong khoảng 2 giây; người vào đúng lúc đó gặp 404. Build lỗi thì `dist/` giữ nguyên.
- Bài đăng qua API chỉ nằm trên VPS, không có trong git. `git pull` vẫn giữ các bài này, nhưng không được xóa thư mục code để clone lại.
- Đổi mật khẩu: sửa `.env` rồi `sudo systemctl restart post-api`.
