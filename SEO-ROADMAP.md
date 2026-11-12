# SEO ROADMAP & IMPLEMENTATION SPECIFICATION
## Dự án: Giúp Việc An Gia – giupviecangia.com

**Mục đích:** Tài liệu yêu cầu Claude Code phân tích, tối ưu và triển khai SEO trực tiếp trên source code website hiện tại.

**Công nghệ:** Astro, TypeScript, Tailwind CSS (cần xác minh phiên bản thực tế trong source code).

---

# 1. MỤC TIÊU DỰ ÁN

Tối ưu SEO toàn diện cho website https://giupviecangia.com/ nhằm:

1. Tăng organic traffic từ Google.
2. Tăng thứ hạng các từ khóa dịch vụ giúp việc tại Hà Nội.
3. Tối ưu khả năng Google crawl và index website.
4. Tăng độ tin cậy thương hiệu An Gia.
5. Tăng tỷ lệ chuyển đổi từ Google Search thành cuộc gọi và tin nhắn Zalo.
6. Xây dựng nền tảng để mở rộng nội dung SEO trong tương lai.

## Nguyên tắc triển khai

- Ưu tiên sửa source code hiện có, không xây dựng lại website.
- Không thay đổi giao diện nếu không cần thiết cho SEO.
- Không tự ý thay đổi URL đang hoạt động.
- Không tạo nội dung SEO hàng loạt, trùng lặp.
- Không tự tạo thông tin doanh nghiệp, giá dịch vụ, đánh giá hoặc số liệu.
- Không làm ảnh hưởng các chức năng hiện tại.
- Ưu tiên Astro SSR/SSG hoặc HTML render sẵn để Google đọc được nội dung.
- Mỗi trang cần có SEO Meta phù hợp với nội dung riêng.

# 2. PHÂN TÍCH CẤU TRÚC WEBSITE HIỆN TẠI

Website có các nhóm trang:

## 2.1. Trang chính

- `/`

## 2.2. Trang dịch vụ

- `/dich-vu/`
- `/dich-vu/giup-viec-o-lai-nha/`
- `/dich-vu/giup-viec-theo-gio/`
- `/dich-vu/cham-be/`
- `/dich-vu/cham-nguoi-gia/`
- `/dich-vu/cham-nguoi-benh/`
- `/dich-vu/tap-vu-van-phong/`
- `/dich-vu/giup-viec-dip-tet/`

Lưu ý: Đây là danh sách theo sitemap đã cung cấp. Hãy kiểm tra lại URL thực tế trong source code trước khi triển khai.

## 2.3. Trang thông tin

- `/bang-gia/`
- `/gioi-thieu/`
- `/lien-he/`
- `/tuyen-dung/`
- `/chinh-sach-bao-hanh/`
- `/chinh-sach-bao-mat/`

## 2.4. Trang cẩm nang

- `/cam-nang/`
- Các bài viết hiện có trong collection cẩm nang.

## 2.5. Sitemap hiện tại

Sitemap index:

`https://giupviecangia.com/sitemap-index.xml`

Sitemap con:

`https://giupviecangia.com/sitemap-0.xml`

Sitemap hiện có khoảng 19 URL theo dữ liệu đã cung cấp.

Yêu cầu:
- Không tạo sitemap mới nếu cấu hình hiện tại đã hoạt động tốt.
- Kiểm tra tất cả URL trong sitemap.
- Không đưa URL 404, redirect, noindex hoặc URL trùng lặp vào sitemap.
- Chỉ cập nhật lastmod khi nội dung thực sự thay đổi.

# 3. PHÂN TÍCH TỪ KHÓA VÀ ĐỊNH HƯỚNG SEO

Thị trường ưu tiên: Hà Nội.

## 3.1. Nhóm từ khóa dịch vụ

| Từ khóa | Trang mục tiêu |
|---|---|
| Giúp việc nhà Hà Nội | Trang chủ |
| Trung tâm giúp việc Hà Nội | Trang chủ |
| Giúp việc ở lại Hà Nội | Trang giúp việc ở lại |
| Giúp việc theo giờ Hà Nội | Trang giúp việc theo giờ |
| Thuê người chăm bé | Trang chăm bé |
| Thuê người chăm trẻ sơ sinh | Trang chăm bé |
| Thuê người chăm người già | Trang chăm người già |
| Thuê người chăm bệnh | Trang chăm người bệnh |
| Tạp vụ văn phòng Hà Nội | Trang tạp vụ |

## 3.2. Nhóm từ khóa bảng giá

- Giá thuê người giúp việc.
- Bảng giá giúp việc theo giờ.
- Lương giúp việc ở lại.
- Giá thuê người chăm trẻ sơ sinh.
- Giá thuê người chăm sóc người già.
- Giá thuê người chăm bệnh tại bệnh viện.

## 3.3. Nhóm từ khóa thông tin

- Kinh nghiệm thuê người giúp việc.
- Hợp đồng thuê người giúp việc.
- Câu hỏi phỏng vấn người giúp việc.
- Cách chọn người chăm trẻ sơ sinh.
- Kinh nghiệm thuê người chăm sóc người già.
- Thuê giúp việc cần lưu ý gì.

## 3.4. Nhóm từ khóa địa phương

- Giúp việc tại Cầu Giấy.
- Giúp việc tại Mỹ Đình.
- Giúp việc tại Nam Từ Liêm.
- Giúp việc tại Hà Đông.
- Giúp việc tại Thanh Xuân.
- Giúp việc tại Long Biên.

Không tạo trang địa phương nếu chưa có nội dung độc lập, thông tin phục vụ thực tế và khả năng cung ứng dịch vụ tại khu vực đó.

# 4. NHIỆM VỤ 1 – CHUẨN HÓA SEO META

Đây là nhiệm vụ ưu tiên cao nhất.

## 4.1. Tạo component SEO dùng chung

Đề xuất:

`src/components/SEO.astro`

Component cần hỗ trợ:

- title
- description
- canonical
- robots
- ogTitle
- ogDescription
- ogImage
- ogType
- twitterCard

Có giá trị mặc định lấy từ cấu hình website.

Ví dụ interface:

```typescript
interface Props {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: string;
}
```

Yêu cầu kỹ thuật:

1. Canonical phải sử dụng URL tuyệt đối.
2. Chuẩn hóa domain HTTPS.
3. Không tạo canonical có query parameters không cần thiết.
4. Không để trùng canonical.
5. Không render hai thẻ title.
6. Không render nhiều meta description.
7. Escape nội dung đúng cách.
8. Không để giá trị undefined hoặc null xuất hiện trong HTML.

## 4.2. Tích hợp vào Layout

Kiểm tra:

`src/layouts/Layout.astro`

Nếu đã có SEO Meta thì tái cấu trúc, không tạo thêm component trùng chức năng.

Mỗi trang sử dụng Layout phải có khả năng truyền SEO Meta riêng.

## 4.3. SEO Meta đề xuất

### Trang chủ

Title:

`Dịch Vụ Giúp Việc Nhà Uy Tín Tại Hà Nội | An Gia`

Description:

`An Gia cung cấp dịch vụ giúp việc ở lại, theo giờ, chăm bé, chăm sóc người già và người bệnh tại Hà Nội. Nhân sự được xác minh, quy trình rõ ràng.`

H1:

`Dịch Vụ Giúp Việc Nhà Uy Tín Tại Hà Nội`

### Giúp việc theo giờ

Title:

`Giúp Việc Theo Giờ Hà Nội – Giá Và Dịch Vụ | An Gia`

Description:

`Dịch vụ giúp việc theo giờ tại Hà Nội, linh hoạt thời gian, nhân sự được xác minh, chi phí minh bạch. Liên hệ An Gia để được tư vấn.`

### Giúp việc ở lại

Title:

`Giúp Việc Ở Lại Nhà Hà Nội – Chi Phí Và Quy Trình | An Gia`

Description:

`Dịch vụ giúp việc ở lại tại Hà Nội, hỗ trợ việc nhà, nấu ăn và chăm sóc gia đình. Tư vấn lựa chọn nhân sự phù hợp từ An Gia.`

### Chăm bé

Title:

`Dịch Vụ Giúp Việc Chăm Bé Tại Hà Nội | An Gia`

Description:

`An Gia hỗ trợ kết nối người chăm bé tại Hà Nội, phù hợp nhu cầu chăm sóc trẻ nhỏ và trẻ sơ sinh. Tìm hiểu quy trình và chi phí dịch vụ.`

### Chăm người già

Title:

`Dịch Vụ Chăm Sóc Người Già Tại Nhà Hà Nội | An Gia`

Description:

`Dịch vụ chăm sóc người cao tuổi tại nhà ở Hà Nội. Hỗ trợ sinh hoạt, ăn uống và đồng hành cùng gia đình lựa chọn người chăm sóc phù hợp.`

### Chăm người bệnh

Title:

`Dịch Vụ Chăm Sóc Người Bệnh Tại Hà Nội | An Gia`

Description:

`Dịch vụ hỗ trợ chăm sóc người bệnh tại nhà và bệnh viện. An Gia tư vấn lựa chọn nhân sự phù hợp với nhu cầu gia đình.`

### Tạp vụ văn phòng

Title:

`Dịch Vụ Tạp Vụ Văn Phòng Tại Hà Nội | An Gia`

Description:

`Dịch vụ cung ứng nhân sự tạp vụ văn phòng tại Hà Nội theo nhu cầu. Tư vấn nhân sự, lịch làm việc và chi phí phù hợp.`

### Bảng giá

Title:

`Bảng Giá Dịch Vụ Giúp Việc Hà Nội Mới Nhất | An Gia`

Description:

`Tham khảo bảng giá giúp việc theo giờ, ở lại, chăm bé, chăm người già và chăm người bệnh tại An Gia.`

Các Meta trên là bản đề xuất. Claude cần kiểm tra nội dung thật của từng trang và điều chỉnh để đảm bảo chính xác.

# 5. NHIỆM VỤ 2 – TỐI ƯU HEADING

Kiểm tra toàn bộ website.

Yêu cầu:

- Mỗi trang có một H1 chính rõ ràng.
- H1 phản ánh chính xác chủ đề trang.
- Không lặp từ khóa một cách máy móc.
- H2 chia các nhóm nội dung chính.
- H3 mô tả các nội dung con.
- Không sử dụng heading chỉ để tạo kiểu chữ.
- Không để nội dung quan trọng thiếu heading phù hợp.

Đặc biệt kiểm tra H1 trang chủ.

H1 hiện tại được phản ánh là có nội dung dài và lặp cụm từ liên quan đến chăm bé, chăm sóc ông bà và người bệnh.

Cần kiểm tra source code và thay bằng H1 tự nhiên:

`Dịch Vụ Giúp Việc Nhà Uy Tín Tại Hà Nội`

Không thay đổi ý nghĩa nội dung của các section hiện có.

# 6. NHIỆM VỤ 3 – STRUCTURED DATA

Triển khai JSON-LD phù hợp.

## 6.1. Organization

Áp dụng toàn website.

Các trường cần kiểm tra:

- name
- url
- logo
- telephone
- sameAs
- address

Chỉ sử dụng dữ liệu doanh nghiệp có thật từ `config/site.ts` hoặc nguồn cấu hình hiện có.

## 6.2. LocalBusiness

Sử dụng khi doanh nghiệp có địa điểm thực tế phù hợp với loại schema.

Thông tin:

- name
- url
- image
- telephone
- address
- openingHoursSpecification
- priceRange

Không tự tạo địa chỉ, giờ mở cửa hoặc giá trị chưa được xác nhận.

## 6.3. Service

Triển khai cho từng trang dịch vụ.

Các trường phù hợp:

- name
- description
- provider
- areaServed
- serviceType
- url

## 6.4. Article

Áp dụng cho các bài viết cẩm nang.

Các trường:

- headline
- description
- image
- datePublished
- dateModified
- author
- publisher
- mainEntityOfPage

## 6.5. BreadcrumbList

Áp dụng cho các trang con.

Ví dụ:

Trang chủ > Dịch vụ > Giúp việc theo giờ.

## 6.6. Yêu cầu

- JSON-LD phải hợp lệ.
- Không khai báo dữ liệu giả.
- Không tạo AggregateRating giả.
- Không thêm FAQPage Schema chỉ với mục tiêu kỳ vọng Google hiển thị FAQ rich result.
- Kiểm tra dữ liệu bằng Google Rich Results Test khi phù hợp.

# 7. NHIỆM VỤ 4 – SITEMAP VÀ ROBOTS

Kiểm tra cấu hình sitemap hiện tại.

Yêu cầu:

- Sitemap index hoạt động.
- Sitemap con trả về XML hợp lệ.
- Chỉ chứa URL canonical.
- Không chứa trang noindex.
- Không chứa URL redirect.
- Không chứa trang 404.
- URL sử dụng HTTPS và domain thống nhất.

Kiểm tra:

`/robots.txt`

Đảm bảo không chặn nhầm:

- Trang chủ.
- Trang dịch vụ.
- Trang cẩm nang.
- CSS và JS cần thiết cho render.

Không chặn toàn bộ website khi build production.

Không thay đổi hệ thống sitemap nếu cấu hình hiện tại đã đáp ứng yêu cầu.

# 8. NHIỆM VỤ 5 – INTERNAL LINK

Xây dựng liên kết nội bộ theo mô hình Topic Cluster.

## Trang chủ

Liên kết đến:

- Các trang dịch vụ chính.
- Bảng giá.
- Giới thiệu.
- Cẩm nang.
- Liên hệ.

## Trang dịch vụ

Mỗi trang dịch vụ nên liên kết:

- Bảng giá liên quan.
- Các dịch vụ có liên quan.
- Bài viết tư vấn.
- Trang liên hệ.

## Trang cẩm nang

Mỗi bài viết cần:

- Liên kết đến dịch vụ tương ứng.
- Liên kết đến bài viết liên quan.
- Liên kết đến bảng giá nếu phù hợp.
- CTA tư vấn.

Không nhồi nhét anchor text exact-match.

Ưu tiên liên kết có giá trị cho người đọc.

# 9. NHIỆM VỤ 6 – TỐI ƯU HÌNH ẢNH

Kiểm tra toàn bộ ảnh website.

Yêu cầu:

1. Sử dụng WebP hoặc AVIF khi phù hợp.
2. Có thuộc tính width và height.
3. Alt mô tả đúng nội dung ảnh.
4. Không sử dụng alt nhồi từ khóa.
5. Lazy load ảnh bên dưới màn hình đầu.
6. Không lazy load ảnh LCP.
7. Ưu tiên preload ảnh LCP khi thực sự cần thiết.
8. Tối ưu kích thước file ảnh.
9. Không làm vỡ layout khi tải ảnh.

Các ảnh nhân sự, khách hàng và hoạt động thực tế cần được ưu tiên hơn ảnh stock khi có dữ liệu và quyền sử dụng phù hợp.

# 10. NHIỆM VỤ 7 – CORE WEB VITALS

Kiểm tra và tối ưu:

| Chỉ số | Mục tiêu |
|---|---:|
| LCP | <= 2.5 giây |
| INP | <= 200 ms |
| CLS | <= 0.1 |

Các vấn đề cần xem xét:

- JavaScript không cần thiết.
- Font chữ quá nặng.
- Ảnh hero dung lượng lớn.
- Layout shift.
- Animation không cần thiết.
- Tài nguyên bên thứ ba.
- Tải ảnh không đúng kích thước.

Ưu tiên trải nghiệm mobile.

Thanh CTA cố định dưới màn hình không được che nội dung hoặc nút tương tác.

Không xóa các tính năng hiện có chỉ để đạt điểm Lighthouse.

# 11. NHIỆM VỤ 8 – TỐI ƯU TRANG DỊCH VỤ

Mỗi landing page dịch vụ cần có cấu trúc nội dung riêng.

Các section đề xuất:

1. Hero – H1, mô tả, CTA.
2. Giới thiệu dịch vụ.
3. Đối tượng phù hợp.
4. Công việc và phạm vi dịch vụ.
5. Quy trình thuê.
6. Tiêu chí lựa chọn nhân sự.
7. Bảng giá.
8. Cam kết và chính sách.
9. Đánh giá khách hàng.
10. FAQ.
11. CTA cuối trang.

Không bắt buộc tất cả trang phải có cùng số lượng section.

Không tạo nội dung chung chung hoặc lặp lại giữa các trang.

Thông tin giá phải lấy từ dữ liệu thực tế hiện có.

Nếu phát hiện giá không đồng nhất giữa các trang, hãy ghi nhận trong báo cáo và yêu cầu xác nhận trước khi tự thay đổi.

# 12. NHIỆM VỤ 9 – CONTENT SEO

Định hướng mở rộng cẩm nang:

## Nhóm bảng giá

- Bảng giá thuê người giúp việc Hà Nội.
- Giá thuê giúp việc theo giờ.
- Lương giúp việc ở lại.
- Giá thuê người chăm trẻ sơ sinh.
- Giá thuê người chăm sóc người già.

## Nhóm kinh nghiệm

- Kinh nghiệm thuê người giúp việc ở lại.
- Câu hỏi khi phỏng vấn người giúp việc.
- Giấy tờ cần kiểm tra khi thuê giúp việc.
- Nên thuê giúp việc ở lại hay theo giờ?
- Những điều cần có trong hợp đồng thuê người giúp việc.

## Nhóm chăm sóc

- Kinh nghiệm thuê người chăm trẻ sơ sinh.
- Kỹ năng cần có của người chăm trẻ.
- Cách lựa chọn người chăm sóc người già.
- Thuê người chăm người bệnh cần lưu ý gì?

## Nhóm địa phương

- Giúp việc tại Cầu Giấy.
- Giúp việc tại Mỹ Đình.
- Giúp việc tại Nam Từ Liêm.
- Giúp việc tại Hà Đông.
- Giúp việc tại Thanh Xuân.

Đây là backlog nội dung. Không tự động tạo 20 bài viết mới trong source code.

Claude chỉ cần thiết kế cấu trúc dữ liệu và hệ thống hỗ trợ SEO Content nếu cần. Nội dung mới sẽ được biên tập và xuất bản riêng.

# 13. NHIỆM VỤ 10 – THEO DÕI CHUYỂN ĐỔI

Website hiện có các CTA:

- Gọi điện.
- Zalo.
- Messenger.

Giữ nguyên các chức năng hiện tại.

Kiểm tra tracking:

- data-track
- data-position
- Sự kiện click gọi điện.
- Sự kiện click Zalo.
- Sự kiện click Messenger.

Nếu đã có hệ thống tracking, hãy tích hợp với hệ thống hiện tại, không tạo thêm tracking trùng lặp.

Có thể chuẩn hóa tên event GA4:

- `generate_lead`
- `click_call`
- `click_zalo`
- `click_messenger`

Phải phân biệt nguồn traffic và vị trí CTA để đo lường chuyển đổi SEO.

# 14. YÊU CẦU VỀ CẤU TRÚC CODE

Trước khi sửa code, hãy kiểm tra source code thực tế.

Đề xuất cấu trúc tham khảo:

```text
src/
├── components/
│   ├── SEO.astro
│   ├── StructuredData.astro
│   └── Breadcrumbs.astro
├── layouts/
│   └── Layout.astro
├── config/
│   └── site.ts
├── content/
│   ├── reviews/
│   └── cam-nang/
├── utils/
│   └── seo.ts
└── pages/
    ├── index.astro
    ├── bang-gia.astro
    ├── dich-vu/
    └── cam-nang/
```

Đây là cấu trúc gợi ý, không bắt buộc phải tạo đúng như trên nếu source hiện tại đã có cách tổ chức tốt hơn.

Nguyên tắc:

- Không duplicate SEO component.
- Không hardcode domain ở nhiều nơi.
- Tận dụng cấu hình `site.ts`.
- Dùng TypeScript đúng kiểu dữ liệu.
- Hạn chế JavaScript phía client cho chức năng SEO.
- Giữ tương thích với phiên bản Astro hiện tại.
- Không nâng cấp package tùy tiện.

# 15. QUY TRÌNH THỰC HIỆN CHO CLAUDE CODE

Thực hiện theo từng giai đoạn.

## Phase 1 – Audit source code

Chưa sửa code ngay.

Kiểm tra:

- package.json.
- astro.config.mjs.
- Cấu trúc pages.
- Layout.
- Component SEO hiện có.
- Config site.
- Content Collections.
- Sitemap integration.
- Robots.
- Schema.
- Các file CSS và JS liên quan.

Đầu ra:

`SEO-AUDIT.md`

Tài liệu phải liệt kê:
- Cấu trúc hiện tại.
- Các lỗi tìm thấy.
- Các file cần sửa.
- Những hạng mục đã có và không cần làm lại.
- Các thông tin cần xác nhận.

## Phase 2 – SEO Foundation

Triển khai:

- SEO component.
- Layout integration.
- Meta Title.
- Meta Description.
- Canonical.
- Robots.
- Open Graph.
- Twitter Card.

Kiểm tra tất cả các trang.

## Phase 3 – Technical SEO

Triển khai:

- Structured Data.
- Sitemap.
- Robots.
- Breadcrumbs.
- Image SEO.
- Internal Link.

## Phase 4 – On-page SEO

Triển khai:

- H1/H2/H3.
- Nội dung trang dịch vụ.
- Title và Description.
- CTA.
- Internal Link.

Không tự viết lại toàn bộ nội dung nếu không có lý do rõ ràng.

## Phase 5 – Testing

Chạy:

```bash
npm run build
```

Nếu có các script kiểm tra khác trong package.json, chạy thêm các script tương ứng.

Kiểm tra:

- Build không lỗi.
- Không có SEO Meta trùng.
- Canonical chính xác.
- HTML trả về có nội dung.
- Schema JSON-LD hợp lệ.
- Sitemap hợp lệ.
- Robots hoạt động.
- Không phát sinh broken links.
- Không làm hỏng giao diện mobile/desktop.

# 16. TIÊU CHÍ NGHIỆM THU

| Hạng mục | Điều kiện hoàn thành |
|---|---|
| SEO Meta | Mỗi trang có title và description riêng |
| Canonical | Chính xác và duy nhất |
| Robots | Không chặn trang quan trọng |
| H1 | Mỗi trang có H1 rõ ràng |
| Heading | Phân cấp hợp lý |
| Schema | JSON-LD hợp lệ |
| Sitemap | Chỉ chứa URL hợp lệ |
| Internal Link | Có liên kết theo chủ đề |
| Image SEO | Alt và kích thước phù hợp |
| Mobile | Không bị che nội dung |
| Build | Thành công |
| UI | Không phát sinh lỗi giao diện |

# 17. NHỮNG ĐIỀU CLAUDE KHÔNG ĐƯỢC TỰ Ý LÀM

1. Không thay đổi URL cũ.
2. Không xóa trang đang được Google index.
3. Không thêm noindex cho các trang dịch vụ.
4. Không tự thay đổi bảng giá.
5. Không tạo review giả.
6. Không tạo thông tin doanh nghiệp giả.
7. Không tự tạo địa chỉ chi nhánh.
8. Không tạo hàng loạt trang SEO địa phương giống nhau.
9. Không tạo backlink.
10. Không xóa chức năng tracking.
11. Không thay đổi giao diện không cần thiết.
12. Không nâng cấp Astro hoặc dependency nếu không có lý do tương thích rõ ràng.

Nếu phát hiện lỗi ảnh hưởng đến URL, dữ liệu hoặc nội dung kinh doanh, phải báo cáo trước khi thay đổi.

# 18. BÁO CÁO SAU KHI TRIỂN KHAI

Sau khi hoàn thành, tạo file:

`SEO-IMPLEMENTATION-REPORT.md`

Bao gồm:

1. Danh sách file đã thay đổi.
2. Các vấn đề SEO đã xử lý.
3. Meta của từng trang.
4. Structured Data đã triển khai.
5. Cấu hình Sitemap và Robots.
6. Các vấn đề còn tồn tại.
7. Kết quả build.
8. Kết quả kiểm thử.
9. Các công việc cần xác nhận thủ công.
10. Đề xuất giai đoạn tiếp theo.

---

# 19. PROMPT GIAO VIỆC CHO CLAUDE CODE

Hãy đọc kỹ tài liệu SEO-ROADMAP.md và thực hiện tối ưu SEO cho website An Gia.

Yêu cầu quan trọng:

**Bước 1:** Phân tích source code hiện tại và tạo SEO-AUDIT.md. Không sửa code ngay.

**Bước 2:** Đưa ra danh sách các vấn đề, file cần sửa và kế hoạch triển khai.

**Bước 3:** Sau khi audit, triển khai từng phase theo tài liệu.

**Bước 4:** Sau mỗi phase, kiểm tra build và các chức năng liên quan.

**Bước 5:** Tạo SEO-IMPLEMENTATION-REPORT.md sau khi hoàn thành.

Không được chỉ trả về hướng dẫn hoặc code mẫu. Mục tiêu là chỉnh sửa trực tiếp source code.

Ưu tiên tính chính xác, khả năng maintain, SEO thực tế và không phá vỡ kiến trúc hiện tại.

Nếu thiếu dữ liệu doanh nghiệp hoặc phát hiện nội dung chưa được xác nhận, hãy giữ nguyên và ghi chú thay vì tự suy đoán.

Không thực hiện các thay đổi phá vỡ URL, dữ liệu hoặc giao diện hiện tại.
