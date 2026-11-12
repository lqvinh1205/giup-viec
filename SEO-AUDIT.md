# SEO AUDIT – giupviecangia.com

**Phase 1 – Audit source code.** Chưa sửa code.
Ngày audit: 12/11/2026 · Commit: `ee0d4bb` · Phương pháp: đọc toàn bộ source, `npm run build`, phân tích HTML trong `dist/`, kiểm tra header của site đang chạy.

---

## 0. Tóm tắt

Nền tảng SEO **đã khá tốt**: site build tĩnh (SSG), mỗi trang có title/description/canonical riêng, sitemap và robots chuẩn, có sẵn JSON-LD (LocalBusiness, Service, Article, BreadcrumbList), ảnh WebP có width/height, CTA đều gắn `data-track`. **Không cần xây lại** component SEO hay sitemap.

Vấn đề thực sự nằm ở **dữ liệu**, không ở kỹ thuật:

| Mức | Vấn đề | Mục |
|---|---|---|
| 🔴 Nghiêm trọng | 4 đánh giá **mẫu** (ảnh stock, không phải khách thật) đang hiển thị trên production và tạo `AggregateRating 4.8 / 4 reviews` trong schema của **mọi trang** | 3.1 |
| 🔴 Nghiêm trọng | Trang `/chinh-sach-bao-hanh/` đang hiển thị placeholder `[X] tháng`, `[Y] lần` | 3.2 |
| 🔴 Nghiêm trọng | Giá không đồng nhất: `priceFrom` (thẻ dịch vụ, slider, trang chủ, schema) khác bảng giá và title của 3 dịch vụ | 3.3 |
| 🟠 Cao | Địa chỉ trong schema/footer: "Quận Từ Liêm" (không còn tồn tại), trường `ward` chứa tên đường | 3.4 |
| 🟠 Cao | H1 trang chủ bị lặp chữ khi Google đọc (chữ xoay vòng + bản sr-only) | 4.1 |
| 🟠 Cao | Chưa có tracking nào hoạt động (`gtmId` rỗng), trong khi Chính sách bảo mật ghi đang dùng GA, Google Ads, Meta Pixel | 7 |
| 🟡 Trung bình | Schema: loại doanh nghiệp chưa phù hợp, `priceRange` sai, logo là SVG favicon, `sameAs` chứa link Zalo | 5 |
| 🟡 Trung bình | Title không thống nhất hậu tố thương hiệu, 3 title chứa giá sai với `priceFrom` | 2 |
| 🟡 Trung bình | Nút "Gọi ngay" trên thanh dock mobile đếm sự kiện `call` 2 lần | 7 |
| 🟢 Thấp | Ảnh đầu trang dịch vụ tải cả trên mobile dù bị ẩn; heading `/dich-vu/` nhảy cấp; canonical trên trang 404 | 4, 6 |

---

## 1. Cấu trúc hiện tại

### 1.1. Công nghệ

| Hạng mục | Thực tế |
|---|---|
| Astro | `^5.18.2`, output tĩnh (SSG), `trailingSlash: 'always'`, `build.format: 'directory'` |
| CSS | Tailwind CSS `^4.3.5` qua `@tailwindcss/vite`; `inlineStylesheets: 'always'` |
| Sitemap | `@astrojs/sitemap ^3.7.4`, lọc bỏ `/lp/` |
| Font | `@fontsource/be-vietnam-pro` (400/600/700 × latin + vietnamese) |
| Hosting | Cloudflare Pages (`public/_headers`, `public/_redirects`) |
| Script kiểm tra | `package.json` chỉ có `dev`, `build`, `preview` — không có lint/test/check |

> Lưu ý: roadmap ghi `src/layouts/Layout.astro` và `src/components/SEO.astro`. Thực tế là **`src/layouts/BaseLayout.astro`** và **`src/components/Seo.astro`**. Sẽ sửa trên file hiện có, không tạo file trùng chức năng.

### 1.2. File liên quan SEO

```text
astro.config.mjs              site = SITE_URL, sitemap integration
src/config/site.ts            SITE_URL + thông tin doanh nghiệp (nhiều dòng còn "TODO")
src/config/campaigns.ts       landing page quảng cáo /lp/*
src/content.config.ts         collections: services, blog, reviews
src/layouts/BaseLayout.astro  <head>: Seo + JsonLd(localBusiness) + Analytics
src/layouts/TextPage.astro    layout trang tĩnh (giới thiệu, chính sách)
src/components/Seo.astro      title, description, canonical, robots, OG, twitter:card
src/components/JsonLd.astro   render <script type="application/ld+json">
src/components/Breadcrumb.astro  breadcrumb hiển thị
src/components/Analytics.astro   dataLayer + GTM (nạp trễ)
src/lib/schema.ts             localBusiness, service, faqPage, breadcrumb, article
src/pages/robots.txt.ts       robots.txt động
```

### 1.3. Trang được build (23 trang)

| URL | Nguồn | Index |
|---|---|---|
| `/` | `pages/index.astro` | ✅ |
| `/dich-vu/` | `pages/dich-vu/index.astro` | ✅ |
| `/dich-vu/{giup-viec-o-lai-nha, giup-viec-theo-gio, cham-be, cham-nguoi-gia, cham-nguoi-benh, tap-vu-van-phong, giup-viec-tet}/` | `pages/dich-vu/[slug].astro` + `content/services/*.md` | ✅ |
| `/bang-gia/`, `/gioi-thieu/`, `/lien-he/`, `/tuyen-dung/`, `/chinh-sach-bao-hanh/`, `/chinh-sach-bao-mat/` | `pages/*.astro` | ✅ |
| `/cam-nang/` + 3 bài viết | `pages/cam-nang/*` + `content/blog/*.md` | ✅ |
| `/cam-nang/page/N/` | chỉ sinh khi > 9 bài (hiện chưa có) | ✅ |
| `/lp/{giup-viec-gia-dinh, cham-be, cham-nguoi-gia}/` | `pages/lp/[campaign].astro` | ❌ noindex (đúng) |
| `/404.html` | `pages/404.astro` | ❌ noindex (đúng) |

> ⚠️ Roadmap ghi `/dich-vu/giup-viec-dip-tet/`; URL thực tế là **`/dich-vu/giup-viec-tet/`**. Giữ nguyên URL thực tế (không đổi URL).

---

## 2. SEO Meta

### 2.1. Đã đạt — không làm lại

- Mỗi trang có **đúng 1** `<title>`, **1** meta description, **1** canonical (đã kiểm tra trên toàn bộ HTML build).
- Canonical tuyệt đối, HTTPS, có dấu `/` cuối, không query string (dựng từ `Astro.url.pathname` + `Astro.site`).
- Domain chỉ khai báo ở một chỗ (`SITE_URL` trong `site.ts`).
- Robots meta: `index, follow, max-image-preview:large`; `/lp/` và 404 là `noindex`.
- Open Graph đủ `type, locale, site_name, title, description, url, image (1200×630)`, `twitter:card`.
- Astro tự escape thuộc tính, không có `undefined`/`null` trong HTML.
- Service và blog đã có field `title`, `description` riêng trong frontmatter.

### 2.2. Vấn đề

| # | Vấn đề | File |
|---|---|---|
| M1 | Hậu tố thương hiệu không thống nhất: chỉ trang chủ (`– An Gia`) và `/lp/` (`\| An Gia`) có, các trang còn lại không có. | `Seo.astro` hoặc từng trang |
| M2 | 3 title dịch vụ ghi giá khác `priceFrom` hiển thị trên chính trang đó (xem 3.3). | `content/services/*.md` |
| M3 | Title `/tuyen-dung/` dài 65 ký tự (dễ bị cắt). Description `/bang-gia/` 158 ký tự. | `tuyen-dung.astro`, `bang-gia.astro` |
| M4 | Từ khóa "Hà Nội" chỉ có trong title trang chủ, theo giờ, giới thiệu. Trang chủ title chưa khớp từ khóa chính "dịch vụ giúp việc nhà". | trang tương ứng |
| M5 | Trang 404 có canonical `https://giupviecangia.com/404/` (URL không tồn tại). Trang noindex không cần canonical. | `Seo.astro` |
| M6 | `/lp/` dùng `noindex, nofollow`; nên là `noindex, follow` để không cắt luồng link nội bộ. | `Seo.astro` |
| M7 | Thiếu `og:image:alt`; bài viết thiếu `article:published_time` / `article:modified_time`. `og:image:width/height` cố định 1200×630 kể cả khi truyền ảnh khác. | `Seo.astro` |
| M8 | Năm "2026" hard-code trong title `/bang-gia/` và bài bảng giá — cần nhớ cập nhật năm 2027. | `bang-gia.astro`, blog |

### 2.3. Meta hiện tại vs đề xuất roadmap

| Trang | Title hiện tại (độ dài) | Title roadmap | Ghi chú |
|---|---|---|---|
| `/` | Trung tâm giúp việc nhà Hà Nội uy tín – An Gia (46) | Dịch Vụ Giúp Việc Nhà Uy Tín Tại Hà Nội \| An Gia | Nên áp dụng |
| giúp việc theo giờ | Giúp việc theo giờ tại Hà Nội – Từ 70.000đ/giờ (46) | Giúp Việc Theo Giờ Hà Nội – Giá Và Dịch Vụ \| An Gia | Hiện tại đã tốt, giá khớp |
| giúp việc ở lại | Giúp việc gia đình ở lại nhà – Giá từ 7,5 triệu/tháng (53) | Giúp Việc Ở Lại Nhà Hà Nội – Chi Phí Và Quy Trình \| An Gia | Giá lệch `priceFrom` |
| chăm bé | Người giúp việc chăm bé, trông trẻ – Từ 8,5 triệu/tháng (55) | Dịch Vụ Giúp Việc Chăm Bé Tại Hà Nội \| An Gia | Giá lệch `priceFrom` |
| chăm người già | Người chăm sóc người già tại nhà – Từ 9 triệu/tháng (51) | Dịch Vụ Chăm Sóc Người Già Tại Nhà Hà Nội \| An Gia | Giá lệch `priceFrom` |
| chăm người bệnh | Chăm người bệnh tại nhà và bệnh viện – Từ 450.000đ/ngày (55) | Dịch Vụ Chăm Sóc Người Bệnh Tại Hà Nội \| An Gia | |
| tạp vụ | Tạp vụ văn phòng, công ty – Theo tháng hoặc theo giờ (52) | Dịch Vụ Tạp Vụ Văn Phòng Tại Hà Nội \| An Gia | |
| bảng giá | Bảng giá tham khảo thuê người giúp việc 2026 (44) | Bảng Giá Dịch Vụ Giúp Việc Hà Nội Mới Nhất \| An Gia | |

Nhận xét: title hiện tại có giá giúp tăng CTR nhưng **phải khớp với dữ liệu giá**. Đề xuất ở Phase 2: giữ giá trong title nếu xác nhận được giá đúng (mục 3.3), thêm "Hà Nội" và hậu tố "| An Gia" khi còn dưới ~60 ký tự. Cần anh/chị chọn hướng (mục 9).

---

## 3. Dữ liệu kinh doanh chưa chính xác (cần xác nhận trước khi sửa)

### 3.1. 🔴 Đánh giá mẫu đang public và sinh AggregateRating

- `src/content/reviews.json`: cả 4 đánh giá đều `"sample": true`; ảnh trong `src/assets/reviews/` là **người mẫu stock** (theo `src/assets/NGUON-ANH.md`: "không phải khách hàng thật").
- Commit `ee0d4bb` đã tắt bộ lọc `sample` trong `src/lib/reviews.ts`, nên đánh giá mẫu hiển thị trên production (trang chủ, trang dịch vụ, landing page).
- `BaseLayout.astro` tính rating từ các đánh giá này → **mọi trang** có `aggregateRating: 4.8, reviewCount: 4` trong JSON-LD.

Rủi ro: vi phạm nguyên tắc roadmap (§6.6, §17.5 — không tạo review/AggregateRating giả), vi phạm chính sách dữ liệu có cấu trúc của Google (có thể bị manual action). Ngoài ra, Google **không hiển thị** sao đánh giá cho LocalBusiness tự đánh giá chính mình (self-serving reviews), nên `aggregateRating` ở đây không có lợi ích kể cả khi review là thật.

Đề xuất: bỏ `aggregateRating` khỏi schema (không phụ thuộc review thật hay mẫu); bật lại bộ lọc `sample` khi build production. **Cần xác nhận** vì commit gần nhất cố ý bật hiển thị.

### 3.2. 🔴 Placeholder đang hiển thị công khai

- `/chinh-sach-bao-hanh/`: "Trong **[X] tháng** … tối đa **[Y] lần**".
- `/gioi-thieu/`: thiếu mã số doanh nghiệp (TODO trong code, không hiện ra ngoài); nội dung câu chuyện còn là bản nháp.
- `/cam-nang/`: lead "Kinh nghiệm thực tế từ **hàng nghìn lần** kết nối" — số liệu chưa có căn cứ.

### 3.3. 🔴 Giá không đồng nhất

`priceFrom` được dùng cho thẻ dịch vụ, slider trang chủ, khối "Giá tham khảo" trang chủ, đầu trang dịch vụ, sidebar bài viết và `Service` schema. Commit `5a2c761` đã nâng `priceFrom` của 3 dịch vụ nhưng không sửa bảng giá/title đi kèm:

| Dịch vụ | `priceFrom` (hiển thị "từ …") | Bảng giá chi tiết (mức thấp nhất) | Title | Nơi khác |
|---|---|---|---|---|
| Giúp việc ở lại | **8.000.000đ** | 7,5 triệu | "từ 7,5 triệu" | `/bang-gia/` description, `/lp/giup-viec-gia-dinh/`: 7,5 triệu |
| Chăm bé | **9.000.000đ** | 8,5 triệu | "Từ 8,5 triệu" | Blog bảng giá: 8,5 – 11 triệu |
| Chăm người già | **10.000.000đ** | 9 triệu | "Từ 9 triệu" | Blog bảng giá: 9 – 12 triệu (bảng giá dịch vụ: "Từ 12 triệu" cho cụ nằm một chỗ) |
| Chăm người bệnh | 450.000đ/ngày | 450.000đ | khớp | Bảng giá có "11 – 14 triệu/tháng", blog không nhắc |
| Schema `priceRange` | "50.000đ – 12.000.000đ" | thấp nhất thực tế 70.000đ/giờ; cao nhất ≥ 14 triệu/tháng | | `src/lib/schema.ts` hard-code |

Theo roadmap §11, **không tự sửa giá** — cần anh/chị xác nhận con số đúng.

### 3.4. 🟠 Thông tin doanh nghiệp trong `src/config/site.ts`

Hầu hết dòng còn chú thích `// TODO`. Các điểm cần xác nhận:

| Trường | Giá trị hiện tại | Vấn đề |
|---|---|---|
| `address.district` | Quận Từ Liêm | Quận Từ Liêm không còn từ 2014 (tách Bắc/Nam Từ Liêm); từ 01/7/2025 đã bỏ cấp quận. Cần địa chỉ theo đơn vị hành chính hiện hành, trùng khớp với Google Business Profile. |
| `address.ward` | Đường Đình Thôn | Đây là tên đường, không phải phường. |
| `address.postalCode` | 100000 | Mã chung của Hà Nội, không phải mã của phường. |
| `geo` | 21.0206, 105.7778 | Còn TODO "tọa độ thật". |
| `foundingYear` | 2018 | Dùng để hiển thị "8+ năm kinh nghiệm" và `foundingDate` trong schema. |
| `email` | lienhe@giupviecangia.com | Email này đã hoạt động chưa? |
| `hotline1` | 0399 359 431 | Chỉ xuất hiện ở dock/nút nổi, không có trong schema/footer. Có cần đưa vào không? |
| `hours` | 7:30 – 20:00 hằng ngày | Đúng thực tế? (dùng cho `openingHoursSpecification`) |

---

## 4. Heading

Mỗi trang có **đúng 1 H1** (đã kiểm tra trên HTML build). Phân cấp H2/H3 nhìn chung hợp lý.

| # | Vấn đề | File |
|---|---|---|
| H1 | **Trang chủ:** H1 = "Người giúp việc tận tâm" + 4 cụm xoay vòng (`aria-hidden`) + cùng 4 cụm đó trong `sr-only`. Google đọc thành: *"Người giúp việc tận tâm cho gia đình bạn chăm bé yêu chăm sóc ông bà chăm người bệnh cho gia đình bạn, chăm bé yêu, chăm sóc ông bà, chăm người bệnh"* — lặp và không chứa từ khóa "dịch vụ giúp việc nhà", "Hà Nội". | `pages/index.astro:53-59` |
| H2 | `/dich-vu/`: thẻ dịch vụ dùng H3 nằm ngay sau H1 (không có H2). | `pages/dich-vu/index.astro`, `ServiceCard.astro` |
| H3 | `ContactDock` chèn H3 "Liên hệ qua điện thoại" (modal ẩn) vào cuối mọi trang. Nên đổi sang thẻ không phải heading hoặc giữ nhưng ngoài luồng nội dung. | `components/ContactDock.astro:47` |

Phương án sửa H1 trang chủ (cần chọn, vì ảnh hưởng giao diện):
- **A.** H1 = "Dịch Vụ Giúp Việc Nhà Uy Tín Tại Hà Nội" (theo roadmap); dòng chữ xoay vòng chuyển thành `<p>` ngay dưới H1, bỏ bản `sr-only`. Giao diện gần như giữ nguyên.
- **B.** Giữ nguyên chữ hiển thị, chỉ bỏ bản `sr-only` lặp → H1 vẫn không có từ khóa chính.

Đề xuất: **A**.

---

## 5. Structured Data

### 5.1. Đã có

| Schema | Trang | Nguồn |
|---|---|---|
| `HomeAndConstructionBusiness` (`@id: /#business`) | Mọi trang | `BaseLayout.astro` → `localBusiness()` |
| `Service` (provider → `@id`) | 7 trang dịch vụ | `dich-vu/[slug].astro` |
| `Article` | 3 bài cẩm nang | `cam-nang/[slug].astro` |
| `BreadcrumbList` | Mọi trang con (trừ `/lp/`, 404) | `breadcrumb()` |
| `FAQPage` | Trang chủ, bảng giá, tuyển dụng, 7 trang dịch vụ | `faqPage()` |

Tất cả JSON-LD parse hợp lệ (đã kiểm tra bằng `JSON.parse` trên HTML build). Chưa chạy Rich Results Test (cần chạy thủ công trên URL thật).

### 5.2. Vấn đề

| # | Vấn đề | Đề xuất |
|---|---|---|
| S1 | `aggregateRating` từ đánh giá mẫu (mục 3.1) | Bỏ |
| S2 | `HomeAndConstructionBusiness` dành cho thợ sửa nhà, điện nước… không đúng ngành | `LocalBusiness` hoặc `EmploymentAgency` (trung tâm giới thiệu lao động) — cần chọn |
| S3 | `priceRange` hard-code, lệch giá thực tế | Tính từ dữ liệu dịch vụ hoặc dùng dạng ngắn ("₫₫") sau khi chốt giá |
| S4 | `logo` = `/favicon.svg` | Dùng ảnh raster ≥ 112×112 (tạm thời `apple-touch-icon.png` 180×180, hoặc logo chính thức) |
| S5 | `sameAs` chứa `https://zalo.me/<số>` — không phải trang hồ sơ | Chỉ giữ fanpage (và Google Business Profile nếu có) |
| S6 | `address` sai (mục 3.4) | Sửa sau khi xác nhận |
| S7 | `Service` thiếu `serviceType`; `offers.minPrice` lấy `priceFrom` đang lệch | Thêm `serviceType`, sửa sau khi chốt giá |
| S8 | `Article.image` luôn là `og-default.jpg` | Chấp nhận được; có thể thêm field ảnh cho blog sau |
| S9 | `FAQPage`: từ 8/2023 Google chỉ hiển thị FAQ rich result cho site chính phủ/y tế. Markup không gây hại (nội dung FAQ hiển thị thật), nhưng không có lợi ích, và roadmap §6.6 không khuyến khích. | Cần chọn: giữ hay bỏ |
| S10 | `JsonLd.astro` dùng `JSON.stringify` không escape `<` | Escape `<` → `<` (phòng chuỗi `</script>`) |
| S11 | Không có entity `Organization`/`WebSite` riêng | Không cần: `LocalBusiness` đã là Organization; site nhỏ không cần Sitelinks Searchbox |

`areaServed: Việt Nam` cho cả doanh nghiệp và dịch vụ — **giữ nguyên**, đúng định hướng "trung tâm ở Hà Nội, phục vụ toàn quốc".

---

## 6. Sitemap, Robots, Domain

### 6.1. Đã đạt — không thay đổi

- `sitemap-index.xml` → `sitemap-0.xml`, **19 URL**, đều HTTPS, đều là canonical, đều trả 200, không có `/lp/`, không có 404.
- Không khai `lastmod` (đúng tinh thần "chỉ cập nhật khi nội dung thực sự đổi").
- `robots.txt`: `Allow: /` + link sitemap. Không chặn CSS/JS.
- Site đang chạy: `http://` → 301 → `https://`; `/dich-vu` → 301 → `/dich-vu/`. ✅

### 6.2. Vấn đề

| # | Vấn đề | Đề xuất |
|---|---|---|
| D1 | `https://www.giupviecangia.com/` không phản hồi (DNS chưa trỏ). | Thêm bản ghi `www` trên Cloudflare + redirect 301 về apex (cấu hình ngoài code) |
| D2 | Bản `*.pages.dev` của Cloudflare Pages có thể bị index như bản sao (canonical có giảm thiểu nhưng không chặn). | Thêm `X-Robots-Tag: noindex` cho `https://<project>.pages.dev/*` trong `public/_headers` — cần tên project |
| D3 | `public/_redirects` trống. Nếu domain từng chạy website cũ với URL khác, URL cũ đang 404. | Cần xác nhận có website cũ không |

---

## 7. Tracking chuyển đổi

**Đã có:** `Analytics.astro` lắng nghe mọi click vào `[data-track]` và đẩy `dataLayer` event `contact_click` với `method` (call/zalo/messenger), `position`, `page_path`, `utm_campaign`. Tất cả CTA (header, hero, dock, nút nổi, sidebar, CTA cuối trang, footer, liên hệ, tuyển dụng, 404, landing) đều có `data-track` + `data-position`. GTM nạp trễ để không ảnh hưởng tốc độ. **Giữ nguyên kiến trúc này**, không thêm tracking song song.

| # | Vấn đề | Đề xuất |
|---|---|---|
| T1 | `site.analytics.gtmId` rỗng → **không gửi dữ liệu đi đâu cả**. | Cần GTM ID |
| T2 | Chính sách bảo mật ghi đang dùng GA, Google Ads, Meta Pixel — chưa đúng thực tế. | Cập nhật khi chốt công cụ đo |
| T3 | Dock mobile: nút "Gọi ngay" (mở modal) có `data-track="call"`, số điện thoại trong modal cũng `data-track="call"` → 1 cuộc gọi đếm 2 lần, mở modal rồi đóng vẫn tính là gọi. | Bỏ `data-track` ở nút mở modal (hoặc đổi thành `call_open`) |
| T4 | Hotline 1 / Hotline 2 không phân biệt được trong dữ liệu. | Thêm `data-line` hoặc phân biệt `position` |
| T5 | Tên event GA4 roadmap (`click_call`, `click_zalo`, `click_messenger`, `generate_lead`) | Map trong GTM từ `contact_click` + `method`, **không cần sửa code** (hoặc đổi tên event trong `Analytics.astro` nếu anh/chị muốn đặt tên trực tiếp) |

Nguồn traffic (organic/ads) GA4 tự phân biệt; `utm_campaign` đã được ghi thêm.

---

## 8. Hình ảnh & Core Web Vitals

### 8.1. Đã đạt

- Mọi ảnh dùng `astro:assets` → WebP, có `srcset`, `width`, `height` (0 ảnh thiếu kích thước).
- Ảnh dưới màn hình đầu: `loading="lazy"` mặc định. Slide đầu hero: `eager` + `fetchpriority="high"`.
- Font: chỉ 3 weight × 2 subset, `font-display: swap`. Không có font bên thứ ba.
- Thanh dock mobile: `body` có `padding-bottom: calc(4.5rem + safe-area)` → không che nội dung cuối trang.
- JS phía client nhỏ: menu, slider, bộ đếm số, modal gọi, analytics.
- Alt: ảnh slider = tên dịch vụ, ảnh cam kết mô tả đúng; ảnh thẻ dịch vụ `alt=""` (trang trí, tên đã có trong H3) — hợp lý.

### 8.2. Vấn đề

| # | Vấn đề | File |
|---|---|---|
| I1 | Ảnh đầu trang dịch vụ: `loading="eager"` nhưng `hidden lg:block` → **mobile vẫn tải ảnh dù không hiển thị**. Trên desktop đây là ảnh LCP nhưng `fetchpriority="auto"`. | `PageHeader.astro:18` |
| I2 | Toàn bộ ảnh dịch vụ/cam kết là **ảnh stock** (theo `NGUON-ANH.md`: "thay bằng ảnh thật trước khi đưa web lên mạng"). Ảnh avatar review là người mẫu. | `src/assets/` |
| I3 | `og-default.jpg` dùng chung cho mọi trang; trang dịch vụ đã có ảnh riêng có thể dùng làm OG. | `Seo.astro`, `dich-vu/[slug].astro` |
| I4 | CSS (~44 KB chưa nén) inline trong mọi trang → không được cache giữa các trang. Chấp nhận được với site nhỏ; cân nhắc `inlineStylesheets: 'auto'` nếu cần. | `astro.config.mjs` |
| I5 | Cụm nút nổi desktop (4 nút xếp dọc góc phải dưới) — cần kiểm tra thực tế xem có che nội dung bảng/sidebar không (Phase 5). | `ContactDock.astro` |

Chưa đo LCP/INP/CLS thực tế — sẽ chạy Lighthouse/PageSpeed ở Phase 5.

---

## 9. Internal link

**Đã có:** menu chính + footer liên kết tất cả trang quan trọng; trang chủ → mọi dịch vụ, bảng giá, cẩm nang; trang dịch vụ → bảng giá tổng, các dịch vụ khác, bài viết liên quan (theo field `service` của bài); bài viết → dịch vụ liên quan (sidebar), 3 bài khác, CTA. Không có broken link nội bộ (đã quét toàn bộ HTML build).

| # | Thiếu | Đề xuất |
|---|---|---|
| L1 | Chỉ 2/3 bài viết gắn `service` (cả hai cùng `giup-viec-o-lai-nha`) → 6/7 trang dịch vụ không có mục "Bài viết liên quan". | Gắn đúng `service` khi viết bài mới; bài hợp đồng có thể gắn `giup-viec-o-lai-nha` |
| L2 | Bài "Bảng giá thuê giúp việc 2026" nói về mọi dịch vụ nhưng chỉ link tới bảng giá tổng. | Thêm link tự nhiên tới từng trang dịch vụ trong bảng |
| L3 | Trang dịch vụ chưa link tới trang chính sách đổi người dù nội dung nhắc "đổi người miễn phí". | Thêm 1 link trong phần giá/quy trình |
| L4 | Bài viết: "Đọc thêm" chọn 3 bài mới nhất, không theo chủ đề. | Ưu tiên bài cùng `service`/`tags` (khi có nhiều bài hơn) |

---

## 10. Đối chiếu roadmap với định hướng dự án

- **Trang địa phương (§3.4, §12 nhóm địa phương):** dự án đã quyết định **không làm landing theo quận** (trung tâm ở Hà Nội, phục vụ toàn quốc). Sẽ không tạo trang quận. Từ khóa "Hà Nội" vẫn được dùng ở title/H1 vì trung tâm đặt tại Hà Nội.
- **Form thu lead:** không có, không thêm. Chuyển đổi chỉ qua Hotline/Zalo/Messenger.
- **Content backlog (§12):** không tạo bài mới trong code. Schema `blog` hiện có (`title`, `description`, `pubDate`, `updatedDate`, `tags`, `service`) đã đủ cho việc biên tập; có thể thêm `image` (tùy chọn) để có OG/Article image riêng.

---

## 11. Danh sách file cần sửa (dự kiến)

| File | Phase | Thay đổi |
|---|---|---|
| `src/components/Seo.astro` | 2 | Hậu tố thương hiệu, bỏ canonical khi noindex, `noindex, follow`, `og:image:alt`, `article:*` time, kích thước OG theo ảnh |
| `src/layouts/BaseLayout.astro` | 2–3 | Truyền thêm props SEO; bỏ tính `aggregateRating` |
| `src/pages/index.astro` | 2, 4 | Title, H1 (phương án A) |
| `src/content/services/*.md` | 2 | Title/description (sau khi chốt giá) |
| `src/pages/bang-gia.astro`, `tuyen-dung.astro` | 2 | Rút gọn title/description |
| `src/lib/schema.ts` | 3 | Loại schema, logo, sameAs, priceRange, serviceType, bỏ aggregateRating, (FAQPage nếu bỏ) |
| `src/components/JsonLd.astro` | 3 | Escape `<` |
| `src/components/PageHeader.astro` | 3 | Ảnh header: không tải trên mobile, `fetchpriority="high"` trên desktop |
| `src/pages/dich-vu/[slug].astro` | 3 | OG image theo dịch vụ, link chính sách đổi người |
| `src/pages/dich-vu/index.astro` | 4 | Thêm H2 cho lưới dịch vụ (ẩn hoặc hiện) |
| `src/components/ContactDock.astro` | 3 | Bỏ double tracking, phân biệt hotline, H3 modal |
| `src/lib/reviews.ts` | 3 | Bật lại lọc `sample` (nếu được duyệt) |
| `src/config/site.ts` | — | Chỉ sửa khi có thông tin thật (địa chỉ, GTM…) |
| `public/_headers` | 3 | Noindex `*.pages.dev` (nếu có tên project) |
| `src/content/blog/*.md` | 4 | Gắn `service`, thêm link tới trang dịch vụ |

**Không sửa:** `astro.config.mjs` (sitemap đã đạt), `src/pages/robots.txt.ts`, `package.json` (không nâng cấp dependency), URL/slug hiện có.

---

## 12. Thông tin cần xác nhận

Các mục này **chặn** một phần Phase 2–3. Phần không phụ thuộc vẫn làm được.

1. **Giá** (mục 3.3): `priceFrom` của giúp việc ở lại / chăm bé / chăm người già là 8 / 9 / 10 triệu hay 7,5 / 8,5 / 9 triệu? Sửa theo bên nào?
2. **Đánh giá mẫu** (mục 3.1): đồng ý ẩn đánh giá mẫu trên production và bỏ `aggregateRating` khỏi schema?
3. **Chính sách bảo hành:** thời hạn `[X]` tháng và số lần đổi `[Y]` thực tế?
4. **Địa chỉ** chính xác theo đơn vị hành chính hiện hành (khớp Google Business Profile), tọa độ, mã bưu chính. Có Google Business Profile chưa (để đưa vào `sameAs`)?
5. `foundingYear` 2018, email `lienhe@giupviecangia.com`, giờ làm 7:30–20:00 có đúng không? Mã số doanh nghiệp / tên pháp nhân?
6. **H1 trang chủ:** chọn phương án A hay B (mục 4)?
7. **Title dịch vụ:** giữ giá trong title (sau khi chốt giá) hay theo mẫu roadmap không có giá?
8. **Loại schema:** `LocalBusiness` hay `EmploymentAgency`?
9. **FAQPage schema:** giữ hay bỏ?
10. **Tracking:** GTM ID? Có dùng Google Ads / Meta Pixel không (để sửa chính sách bảo mật)? Muốn đổi tên event trong code hay map trong GTM?
11. **Domain:** trước đây domain có website cũ không (cần redirect URL cũ)? Tên project Cloudflare Pages? Có muốn bật `www` không?
12. **Ảnh/logo thật:** đã có ảnh thật của trung tâm, nhân sự, logo chính thức chưa?

---

## 13. Kế hoạch triển khai

| Phase | Việc làm | Phụ thuộc xác nhận |
|---|---|---|
| **2 – SEO Foundation** | `Seo.astro` (M1, M5–M7), title/description trang chủ + trang thông tin, H1 trang chủ | Câu 6, 7 (title dịch vụ chờ câu 1) |
| **3 – Technical SEO** | Schema S1–S10, ảnh header I1/I3, tracking T3–T4, `_headers` D2, lọc review | Câu 2, 4, 8, 9, 11 |
| **4 – On-page** | Heading `/dich-vu/`, internal link L1–L3, title/description dịch vụ, nội dung giá | Câu 1, 3 |
| **5 – Testing** | `npm run build`, kiểm tra trùng meta/canonical, JSON-LD, sitemap, broken link, Lighthouse mobile/desktop, kiểm tra giao diện | — |
| Báo cáo | `SEO-IMPLEMENTATION-REPORT.md` | — |
