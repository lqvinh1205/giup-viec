# SEO IMPLEMENTATION REPORT – giupviecangia.com

Ngày: 12/11/2026 · Dựa trên: `SEO-ROADMAP.md`, `SEO-AUDIT.md` · Base commit: `ee0d4bb` (chưa commit thay đổi)

Quyết định đã xác nhận: **giá theo commit `5a2c761` là đúng** (`priceFrom`: giúp việc ở lại 8 triệu, chăm bé 9 triệu, chăm người già 10 triệu) → toàn bộ nội dung được đồng bộ theo.
Các thông tin chưa xác nhận (địa chỉ, chính sách bảo hành, GTM, đánh giá mẫu…) được **giữ nguyên** và liệt kê ở mục 9.

---

## 1. File đã thay đổi (23 file)

| File | Thay đổi |
|---|---|
| `src/components/Seo.astro` | Hậu tố `\| An Gia`, bỏ canonical ở trang noindex, `noindex, follow`, `og:image:alt`, `article:published_time/modified_time` |
| `src/layouts/BaseLayout.astro` | Nhận thêm `published`/`modified`; bỏ tính `aggregateRating` |
| `src/lib/schema.ts` | `LocalBusiness`, logo PNG, bỏ `priceRange` sai, bỏ Zalo khỏi `sameAs`, bỏ `aggregateRating`, thêm `serviceType` |
| `src/components/JsonLd.astro` | Escape `<` trong JSON-LD |
| `src/components/PageHeader.astro` | Ảnh đầu trang dùng `<picture>`: mobile không tải, desktop `fetchpriority="high"` |
| `src/components/ContactDock.astro` | Bỏ tracking trùng ở nút mở modal; phân biệt hotline 2 (`dock-2`, `float-2`); H3 modal → `<p>` |
| `src/pages/index.astro` | Title mới; H1 "Dịch vụ giúp việc nhà uy tín tại Hà Nội" |
| `src/pages/dich-vu/index.astro` | Thêm H2 (sr-only) cho danh sách dịch vụ |
| `src/pages/dich-vu/[slug].astro` | Link tới chính sách đổi người |
| `src/pages/cam-nang/[slug].astro` | Truyền ngày đăng/cập nhật cho meta article |
| `src/pages/cam-nang/index.astro` | Title gọn hơn; bỏ câu "hàng nghìn lần kết nối" (số liệu chưa có căn cứ) |
| `src/pages/bang-gia.astro` | Title có "Hà Nội"; description: ở lại nhà từ **8 triệu** |
| `src/pages/tuyen-dung.astro` | Title gọn (58 ký tự kể cả hậu tố) |
| `src/content/services/*.md` (7 file) | Title mới (giá khớp `priceFrom`, thêm "Hà Nội" khi phù hợp); bảng giá đồng bộ |
| `src/content/blog/bang-gia-thue-giup-viec-2026.md` | Giá đồng bộ, link tới từng trang dịch vụ, `updatedDate: 2026-11-12` |
| `src/content/blog/hop-dong-thue-giup-viec-can-co-gi.md` | Gắn `service: giup-viec-o-lai-nha` (hiện liên kết dịch vụ) |
| `src/config/campaigns.ts` | Landing `/lp/giup-viec-gia-dinh/`: từ **8 triệu** |

Không đổi: URL/slug, sitemap, `robots.txt`, `astro.config.mjs`, `package.json`, `site.ts`, nội dung hiển thị của đánh giá.

---

## 2. Vấn đề SEO đã xử lý

| Mã audit | Nội dung | Trạng thái |
|---|---|---|
| 3.3 | Giá không đồng nhất | ✅ Đồng bộ theo `priceFrom` (chi tiết mục 2.1) |
| 3.1 / S1 | `AggregateRating` từ đánh giá mẫu trên mọi trang | ✅ Đã bỏ khỏi schema |
| H1 | H1 trang chủ lặp chữ, thiếu từ khóa | ✅ H1 mới, giao diện giữ nguyên (dòng nhãn nhỏ phía trên trở thành H1; tiêu đề lớn chuyển sang `<p>` cùng kiểu chữ) |
| M1 | Hậu tố thương hiệu không thống nhất | ✅ Tự thêm `\| An Gia` nếu title chưa có "An Gia" |
| M2, M3, M4 | Title sai giá / quá dài / thiếu "Hà Nội" | ✅ |
| M5 | Canonical `/404/` | ✅ Trang noindex không render canonical |
| M6 | `/lp/` `noindex, nofollow` | ✅ `noindex, follow` |
| M7 | Thiếu `og:image:alt`, `article:*` time | ✅ |
| S2 | Sai loại schema | ✅ `LocalBusiness` |
| S3 | `priceRange` hard-code sai | ✅ Đã bỏ (xem 6) |
| S4 | Logo SVG | ✅ `apple-touch-icon.png` 180×180 (tạm, đến khi có logo chính thức) |
| S5 | Zalo trong `sameAs` | ✅ Chỉ còn fanpage |
| S7 | Thiếu `serviceType` | ✅ |
| S10 | JSON-LD không escape `<` | ✅ |
| H2 | `/dich-vu/` H3 ngay sau H1 | ✅ Thêm H2 |
| H3 | H3 modal gọi điện ở mọi trang | ✅ Đổi thành `<p>` |
| I1 | Ảnh đầu trang dịch vụ tải cả trên mobile | ✅ Mobile chỉ tải 1 GIF rỗng inline |
| T3 | Đếm cuộc gọi 2 lần ở dock mobile | ✅ |
| T4 | Không phân biệt hotline 1/2 | ✅ `data-position` = `dock-2` / `float-2` cho hotline 2 |
| L1, L2, L3 | Internal link | ✅ (mục 2.2) |

### 2.1. Đồng bộ giá

| Dịch vụ | `priceFrom` | Dòng bảng giá đã sửa | Nơi khác đã sửa |
|---|---|---|---|
| Giúp việc ở lại | 8.000.000đ | 7,5 – 8,5 → **8 – 8,5 triệu** | Title, `/bang-gia/` description, landing `giup-viec-gia-dinh`, blog: 7,5–10 → **8–10 triệu** |
| Chăm bé | 9.000.000đ | 8,5 – 9,5 → **9 – 9,5 triệu** | Title, blog: 8,5–11 → **9–11 triệu** |
| Chăm người già | 10.000.000đ | 9 – 10 → **Từ 10 triệu** | Title, blog: 9–12 → **10–12 triệu** |

Chỉ sửa cận dưới để khớp `priceFrom`, cận trên giữ nguyên. ⚠️ Riêng chăm người già: dòng "Ông bà còn tự đi lại được" (**Từ 10 triệu**) giờ trùng điểm bắt đầu với dòng "Ông bà đi lại khó khăn" (**10 – 11,5 triệu**) → nên xem lại khung giá này.

### 2.2. Internal link đã thêm

- Bài "Bảng giá thuê người giúp việc 2026": mỗi dòng trong bảng giá link tới trang dịch vụ tương ứng (5 link).
- Bài "Hợp đồng thuê người giúp việc": thêm thẻ dịch vụ liên quan ở sidebar; trang "Giúp việc ở lại nhà" hiện có 3 bài liên quan.
- 7 trang dịch vụ: link tới `/chinh-sach-bao-hanh/` ngay dưới bảng giá.

---

## 3. Meta từng trang (sau triển khai)

| URL | Title | H1 |
|---|---|---|
| `/` | Dịch vụ giúp việc nhà uy tín tại Hà Nội \| An Gia | Dịch vụ giúp việc nhà uy tín tại Hà Nội |
| `/dich-vu/` | Dịch vụ giúp việc gia đình, chăm bé, chăm người già \| An Gia | Dịch vụ giúp việc |
| `/dich-vu/giup-viec-o-lai-nha/` | Giúp việc ở lại nhà Hà Nội – Từ 8 triệu/tháng \| An Gia | Giúp việc gia đình ở lại nhà |
| `/dich-vu/giup-viec-theo-gio/` | Giúp việc theo giờ Hà Nội – Từ 70.000đ/giờ \| An Gia | Giúp việc theo giờ, dọn dẹp theo buổi |
| `/dich-vu/cham-be/` | Người chăm bé, trông trẻ tại Hà Nội – Từ 9 triệu/tháng \| An Gia | Giúp việc chăm bé, trông trẻ tại nhà |
| `/dich-vu/cham-nguoi-gia/` | Chăm sóc người già tại nhà Hà Nội – Từ 10 triệu/tháng \| An Gia | Người chăm sóc người già tại nhà |
| `/dich-vu/cham-nguoi-benh/` | Chăm người bệnh tại nhà, bệnh viện – Từ 450.000đ/ngày \| An Gia | Chăm người bệnh tại nhà và tại bệnh viện |
| `/dich-vu/tap-vu-van-phong/` | Tạp vụ văn phòng Hà Nội – Từ 6,5 triệu/tháng \| An Gia | Nhân viên tạp vụ văn phòng |
| `/dich-vu/giup-viec-tet/` | Thuê giúp việc dịp Tết – Từ 500.000đ/ngày \| An Gia | Giúp việc dịp Tết Nguyên đán |
| `/bang-gia/` | Bảng giá thuê người giúp việc Hà Nội 2026 \| An Gia | Bảng giá tham khảo thuê người giúp việc |
| `/cam-nang/` | Cẩm nang thuê giúp việc – Kinh nghiệm, giá, hợp đồng \| An Gia | Cẩm nang thuê giúp việc |
| `/cam-nang/bang-gia-thue-giup-viec-2026/` | Bảng giá thuê người giúp việc 2026 – Chi phí thực tế từng loại \| An Gia | (= title bài) |
| `/cam-nang/cau-hoi-phong-van-nguoi-giup-viec/` | 12 câu hỏi nên hỏi khi phỏng vấn người giúp việc \| An Gia | (= title bài) |
| `/cam-nang/hop-dong-thue-giup-viec-can-co-gi/` | Hợp đồng thuê người giúp việc cần có những gì? \| An Gia | (= title bài) |
| `/gioi-thieu/` | Giới thiệu Giúp Việc An Gia – Trung tâm giúp việc tại Hà Nội | Về Giúp Việc An Gia |
| `/lien-he/` | Liên hệ Giúp Việc An Gia – Hotline 0826 722 314 | Liên hệ |
| `/tuyen-dung/` | Tuyển người giúp việc, chăm bé – Lương 7–12 triệu \| An Gia | Tìm việc giúp việc nhà, không mất phí |
| `/chinh-sach-bao-hanh/` | Chính sách bảo hành, đổi người giúp việc \| An Gia | Chính sách đổi người |
| `/chinh-sach-bao-mat/` | Chính sách bảo mật thông tin \| An Gia | Chính sách bảo mật |

Description giữ nguyên nội dung cũ (đã riêng cho từng trang, ≤ 155 ký tự), trừ `/bang-gia/` (sửa giá, rút gọn).
Title bài bảng giá dài 71 ký tự: Google sẽ cắt phần hậu tố, không ảnh hưởng từ khóa. Có thể rút gọn trong frontmatter nếu muốn.

---

## 4. Structured Data

| Schema | Trang | Ghi chú |
|---|---|---|
| `LocalBusiness` (`@id: /#business`) | Mọi trang | name, url, logo, image, telephone, email, address, geo, openingHours, areaServed: Việt Nam, sameAs: fanpage. **Không còn** `aggregateRating`, `priceRange` |
| `Service` | 7 trang dịch vụ | name, serviceType, description, url, provider → `@id`, areaServed, offer `minPrice` = `priceFrom` (đã khớp với trang) |
| `Article` | Bài cẩm nang | headline, description, image, datePublished, dateModified, author, publisher, mainEntityOfPage |
| `BreadcrumbList` | Mọi trang con | Khớp breadcrumb hiển thị |
| `FAQPage` | Trang chủ, bảng giá, tuyển dụng, trang dịch vụ | **Giữ nguyên**: nội dung FAQ hiển thị thật trên trang nên markup hợp lệ, chỉ là không còn được hiện rich result. Không thêm mới |

Không khai báo dữ liệu mới nào chưa có trong `site.ts`.

---

## 5. Sitemap & Robots

Không thay đổi (đã đạt yêu cầu từ trước):
- `sitemap-index.xml` → `sitemap-0.xml`: **19 URL**, đều HTTPS, đều là canonical, không có `/lp/`, không có 404, không có `lastmod`.
- `robots.txt`: `User-agent: * / Allow: /` + link sitemap.
- Trang noindex (`/lp/*`, 404): `noindex, follow`, không có canonical, không có trong sitemap.

---

## 6. Vấn đề còn tồn tại

| # | Vấn đề | Lý do chưa xử lý |
|---|---|---|
| 1 | 4 **đánh giá mẫu** (ảnh stock) vẫn hiển thị trên trang chủ, trang dịch vụ, landing | Commit `ee0d4bb` cố ý hiển thị; chỉ đã gỡ khỏi schema. Khuyến nghị: thay bằng đánh giá thật hoặc bật lại bộ lọc `sample` trong `src/lib/reviews.ts` |
| 2 | `/chinh-sach-bao-hanh/` còn `[X] tháng`, `[Y] lần` | Cần số liệu thật |
| 3 | Địa chỉ "Quận Từ Liêm", ward = tên đường, postalCode chung | Cần địa chỉ chính xác theo đơn vị hành chính hiện hành |
| 4 | Không có tracking (`gtmId` rỗng); Chính sách bảo mật ghi đang dùng GA/Ads/Pixel | Cần GTM ID |
| 5 | **Cụm nút nổi desktop che nút trong sidebar** trang dịch vụ (màn 1366px, 4 nút xếp dọc góc phải) — vi phạm roadmap §10 | Lỗi có từ trước; sửa cần đổi giao diện (gợi ý: gộp 2 hotline thành 1 nút mở danh sách, hoặc ẩn cụm nổi khi sidebar hiển thị) |
| 6 | `priceRange` đã bỏ (khuyến nghị, không bắt buộc) | Nếu muốn khai lại, cần một chuỗi giá anh/chị xác nhận |
| 7 | Ảnh dịch vụ, ảnh cam kết, avatar review là ảnh stock; OG image dùng chung `og-default.jpg` | Cần ảnh thật |
| 8 | `www.giupviecangia.com` không phân giải; bản `*.pages.dev` có thể bị index | Cấu hình Cloudflare (DNS + redirect), cần tên project Pages để thêm `X-Robots-Tag` |
| 9 | Năm "2026" trong title `/bang-gia/` và bài bảng giá | Cập nhật khi sang năm 2027 |
| 10 | Chưa đo Core Web Vitals thực tế | Cần chạy PageSpeed Insights trên domain thật sau deploy |

---

## 7. Kết quả build

```
npm run build  →  23 page(s) built, Complete!  (không lỗi, không cảnh báo)
```

Lần build đầu sau khi sửa frontmatter có cảnh báo `Duplicate id` từ cache content store của Astro; build lại thì hết, không ảnh hưởng output.
`package.json` không có script kiểm tra nào khác (lint/test/check).

---

## 8. Kết quả kiểm thử (trên `dist/`)

| Kiểm tra | Kết quả |
|---|---|
| Mỗi trang có đúng 1 `<title>`, 1 meta description, 1 robots, 1 H1 | ✅ 23/23 |
| Canonical có ở mọi trang index, không có ở trang noindex, URL tuyệt đối HTTPS | ✅ |
| Không có `undefined`/`null` trong HTML/JSON-LD | ✅ |
| JSON-LD parse hợp lệ, không còn `aggregateRating` | ✅ |
| Sitemap 19 URL, khớp đúng các trang index | ✅ |
| Broken link nội bộ | ✅ 0 |
| Ảnh đầu trang dịch vụ: mobile không tải, desktop hiển thị | ✅ (kiểm tra HTML + ảnh chụp headless Chrome 1366px) |
| Hero trang chủ desktop 1366px & mobile 390px | ✅ Giao diện không đổi ngoài dòng nhãn nhỏ |
| Dock mobile không che nội dung | ✅ (`body` có padding-bottom) |
| Cụm nút nổi desktop | ⚠️ Che sidebar trang dịch vụ (vấn đề có từ trước, mục 6.5) |
| Rich Results Test / PageSpeed | ⏳ Cần chạy thủ công sau deploy |

---

## 9. Việc cần xác nhận / làm thủ công

1. Số tháng và số lần đổi người trong chính sách bảo hành.
2. Địa chỉ chính xác (khớp Google Business Profile), tọa độ, mã bưu chính; link Google Business Profile để thêm vào `sameAs`.
3. `foundingYear` (2018), email, giờ làm việc, mã số doanh nghiệp.
4. Xử lý đánh giá mẫu (thay bằng thật / ẩn).
5. GTM ID; trong GTM map `contact_click` + `method` → `click_call` / `click_zalo` / `click_messenger` (+ `generate_lead`), dùng `position` để biết vị trí CTA. Cập nhật Chính sách bảo mật theo công cụ thực dùng.
6. Khung giá chăm người già (dòng 1 và 2 cùng bắt đầu từ 10 triệu).
7. Cloudflare: bật `www` + redirect 301; cho biết tên project Pages để noindex `*.pages.dev`.
8. Sau deploy: Search Console (gửi sitemap, kiểm tra URL), Rich Results Test, PageSpeed Insights mobile.

---

## 10. Đề xuất giai đoạn tiếp theo

1. Sửa cụm nút nổi desktop để không che nội dung.
2. Thay ảnh stock bằng ảnh thật; thêm field `image` (tùy chọn) cho blog để có OG/Article image riêng; OG image riêng cho trang dịch vụ.
3. Viết nội dung theo backlog roadmap §12 (nhóm bảng giá, kinh nghiệm, chăm sóc), mỗi bài gắn `service` để tự liên kết với trang dịch vụ. **Không** làm nhóm trang theo quận (dự án phục vụ toàn quốc).
4. Khi có ≥ 6 bài: "Đọc thêm" trong bài viết ưu tiên bài cùng `service`/`tags` thay vì bài mới nhất.
5. Sau khi có dữ liệu GA4 ~4 tuần: xem tỷ lệ chuyển đổi theo `position` để tối ưu vị trí CTA.
