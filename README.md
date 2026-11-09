# Website trung tâm giúp việc (Astro, site tĩnh)

## Chạy
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # xuất ra dist/
```

## Trước khi đưa lên mạng — điền thông tin thật
- `src/config/site.ts`: tên, tên miền, hotline, Zalo, fanpage, Messenger, địa chỉ, tọa độ, giờ làm, GTM ID (mọi chỗ ghi `TODO`)
- `src/content/reviews.json`: thay bằng đánh giá thật (`"sample": false`). Đánh giá mẫu chỉ hiện khi `npm run dev`, tự ẩn khi build
- `src/content/services/*.md`: kiểm tra lại bảng giá
- `src/pages/gioi-thieu.astro`, `chinh-sach-bao-hanh.astro`: câu chuyện thật, mã số doanh nghiệp, thời hạn bảo hành
- Ảnh: đang là ảnh tạm (xem `src/assets/NGUON-ANH.md`) — thay ảnh thật trong `src/assets/services/`, `photos/`, `reviews/`; logo tạm ở `src/assets/brand/`

## Thêm nội dung
Hướng dẫn chi tiết cho người quản lý nội dung: `HUONG-DAN-CHINH-SUA.md`.

- Bài cẩm nang mới: thêm file `.md` vào `src/content/blog/` (tham khảo bài có sẵn)
- Dịch vụ mới: thêm file `.md` vào `src/content/services/`
- Landing page quảng cáo: thêm vào `src/config/campaigns.ts` → tự sinh `/lp/<slug>/` (noindex, không vào sitemap)

## Đo chuyển đổi (Ads)
Mọi nút Gọi/Zalo/Messenger đẩy `dataLayer` event `contact_click` với `method`, `position`, `utm_campaign`.
Trong GTM: tạo trigger Custom Event `contact_click` → gắn GA4 event, Google Ads Conversion, Meta Pixel `Contact`.

## Deploy Cloudflare Pages
Kết nối repo → Build command `npm run build`, output `dist`. Gắn tên miền, rồi khai báo sitemap `https://<tên-miền>/sitemap-index.xml` trong Google Search Console.
