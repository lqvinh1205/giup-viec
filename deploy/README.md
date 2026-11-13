# API đăng bài cẩm nang

Gửi 1 file `.md` → API ghi vào `src/content/blog/<slug>.md` → `npm run build` → copy `dist/` ra thư mục web.
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

Các lệnh dưới đây chạy trên VPS. Thay `/srv/giup-viec` bằng thư mục code thật, `deploy` bằng user sở hữu thư mục đó.

1. **Code và Node.** Cần Node 20.3+ hoặc 22+ (kiểm tra bằng `node -v`), và `rsync`.

   ```bash
   cd /srv/giup-viec
   git pull
   npm ci
   npm run build        # phải chạy thành công trước khi làm tiếp
   ```

2. **Thư mục web.** API copy `dist/` ra đây sau mỗi lần build. Không dùng chính `dist/`, vì trong lúc build `dist/` bị xóa và site sẽ lỗi.

   ```bash
   sudo mkdir -p /var/www/giup-viec
   sudo chown deploy: /var/www/giup-viec
   rsync -a --delete dist/ /var/www/giup-viec/
   ```

3. **Mật khẩu.** Nên dài ≥ 16 ký tự: API không giới hạn số lần thử sai. File này chỉ root đọc được.

   ```bash
   sudo tee /etc/giup-viec-post-api.env >/dev/null <<'ENV'
   POST_API_PASSWORD=<MẬT_KHẨU>
   WEB_ROOT=/var/www/giup-viec
   ENV
   sudo chmod 600 /etc/giup-viec-post-api.env
   ```

4. **Chạy API như một service** (tự khởi động lại khi lỗi hoặc khi VPS khởi động lại). Tạo file `/etc/systemd/system/post-api.service`:

   ```ini
   [Unit]
   Description=giup-viec post API
   After=network.target

   [Service]
   User=deploy
   WorkingDirectory=/srv/giup-viec
   EnvironmentFile=/etc/giup-viec-post-api.env
   ExecStart=/usr/bin/env node deploy/post-api.mjs
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
   ```

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable --now post-api
   systemctl status post-api          # phải thấy "active (running)"
   journalctl -u post-api -f          # xem log khi cần
   ```

   Node cài qua nvm thì `/usr/bin/env node` không tìm thấy: thay bằng đường dẫn đầy đủ lấy từ `which node`.

5. **nginx.** Trong server block **HTTPS** của site: đổi `root` thành `/var/www/giup-viec` và thêm:

   ```nginx
   location /api/ {
       proxy_pass http://127.0.0.1:8787/;
       proxy_read_timeout 300s;
       client_max_body_size 1m;
   }
   ```

   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

6. **Kiểm tra.**

   ```bash
   curl -i https://<domain>/api/guide                               # 401 Sai mật khẩu
   curl -i https://<domain>/api/guide -H "X-Password: <MẬT_KHẨU>"   # 200 + nội dung hướng dẫn
   ```

API chỉ lắng nghe `127.0.0.1`, nên phải đi qua nginx HTTPS (dữ liệu và mật khẩu được mã hoá trên đường truyền).

**Lưu ý:** bài đăng qua API chỉ nằm trên VPS, không có trong git. Khi `git pull` code mới, các bài này vẫn giữ nguyên, nhưng không được xóa thư mục code để clone lại. Đổi mật khẩu: sửa file ở bước 3 rồi `sudo systemctl restart post-api`.
