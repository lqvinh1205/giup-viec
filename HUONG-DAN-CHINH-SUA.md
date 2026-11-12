# Hướng dẫn chỉnh sửa nội dung website

Tài liệu cho người quản lý nội dung. Không cần biết lập trình, chỉ cần sửa file văn bản theo đúng mẫu.

## 0. Quy trình chung

1. Sửa file (bằng VS Code hoặc bất kỳ trình soạn thảo văn bản nào, lưu dạng **UTF-8**).
2. Xem thử trên máy: `npm run dev` → mở http://localhost:4321 (trang tự cập nhật khi lưu file).
3. Kiểm tra lỗi: `npm run build`. Nếu báo lỗi đỏ, đọc dòng có tên file và sửa lại (thường do thiếu dấu `"` hoặc thụt lề sai).
4. Đưa lên mạng: đẩy code lên repo, Cloudflare Pages tự build và cập nhật sau 1–2 phút.

> **Quy tắc vàng khi sửa phần đầu file `.md` (giữa hai dòng `---`):**
> - Giữ nguyên tên trường bên trái dấu `:` (ví dụ `title:`), chỉ sửa nội dung bên phải.
> - Nội dung có dấu `:` hoặc bắt đầu bằng ký tự đặc biệt → bọc trong ngoặc kép `"..."`.
> - Thụt lề bằng **dấu cách**, không dùng Tab. Các dòng cùng cấp phải thẳng hàng.

## 1. Bản đồ nội dung: muốn sửa gì thì mở file nào

| Muốn sửa | File |
|---|---|
| Tên trung tâm, hotline, Zalo, Messenger, email, địa chỉ, giờ làm, bản đồ | `src/config/site.ts` |
| Menu trên cùng | `src/config/site.ts` → mục `nav` |
| Dịch vụ: tên, giá, công việc, câu hỏi thường gặp, bài mô tả | `src/content/services/<tên-dịch-vụ>.md` |
| Bài cẩm nang (blog) | `src/content/blog/<tên-bài>.md` |
| Đánh giá của khách | `src/content/reviews.json` |
| Landing page chạy quảng cáo | `src/config/campaigns.ts` |
| Trang chủ: tiêu đề lớn, chữ đổi luân phiên, số liệu, cam kết, câu hỏi thường gặp | `src/pages/index.astro` |
| Ảnh dịch vụ (banner trượt, thẻ dịch vụ, đầu trang dịch vụ) | `src/assets/services/` (xem mục 9) |
| Logo | `src/assets/brand/logo-mark.svg` (xem mục 9) |
| Thanh thông tin trên cùng, menu | `src/components/Header.astro` |
| Bảng giá (câu hỏi riêng của trang) | `src/pages/bang-gia.astro` |
| Tuyển dụng: quyền lợi, câu hỏi | `src/pages/tuyen-dung.astro` |
| Giới thiệu, chính sách bảo hành, bảo mật | `src/pages/gioi-thieu.astro`, `chinh-sach-bao-hanh.astro`, `chinh-sach-bao-mat.astro` |
| Chân trang | `src/components/Footer.astro` |
| Màu sắc, kiểu chữ | `src/styles/global.css` (xem mục 7) |
| Chuyển hướng link cũ | `public/_redirects` |

## 2. Thông tin liên hệ – `src/config/site.ts`

Sửa giá trị trong dấu nháy đơn `'...'`, giữ nguyên dấu phẩy cuối dòng.

```ts
hotline: '0912345678',          // số liền, không dấu cách – dùng cho nút gọi
hotlineDisplay: '0912 345 678', // số hiển thị cho dễ đọc
zalo: '0912345678',
```

- `hours.label`: giờ làm hiển thị trên web. `opens`/`closes`: dùng cho Google, định dạng `HH:MM`.
- `responseTime`: cam kết phản hồi, ví dụ `'15 phút'`. Chỉ ghi điều làm được thật.
- `mapEmbed`: vào Google Maps → Chia sẻ → Nhúng bản đồ → chỉ copy phần link trong `src="..."`.
- Thay đổi ở đây tự cập nhật trên toàn bộ trang (header, footer, nút liên hệ, trang Liên hệ).

## 3. Dịch vụ – `src/content/services/*.md`

Mỗi file là một trang `/dich-vu/<tên-file>/`. Tên file viết thường, không dấu, nối bằng `-`.

```yaml
---
order: 3                 # thứ tự hiển thị (số nhỏ đứng trước)
name: Giúp việc chăm bé  # tên ngắn trên thẻ dịch vụ, menu
title: Người chăm bé, trông trẻ tại Hà Nội – Từ 9 triệu/tháng   # tiêu đề trên Google, ≤ 60 ký tự
description: "Mô tả trên Google, ≤ 155 ký tự"
h1: Giúp việc chăm bé, trông trẻ tại nhà              # tiêu đề lớn đầu trang
summary: "1–2 câu ngắn hiện trên thẻ dịch vụ"
icon: baby               # biểu tượng, chọn trong danh sách dưới
priceFrom: 9000000       # giá thấp nhất, số liền không dấu chấm
priceUnit: tháng         # chỉ được: tháng | giờ | ngày | buổi | ca
prices:                  # bảng giá chi tiết
  - name: Trông bé từ 1 tuổi
    price: 9 – 9,5 triệu/tháng
    note: Kèm việc nhà nhẹ   # không bắt buộc
scope:                   # danh sách công việc đảm nhận
  - Tắm, vệ sinh, thay tã cho bé
faqs:                    # câu hỏi thường gặp (không bắt buộc)
  - q: Câu hỏi?
    a: Câu trả lời.
---

Nội dung bài viết mô tả dịch vụ (xem mục 5 về cách viết).
```

- **Đổi giá:** giá được gõ trực tiếp ở nhiều nơi. Khi đổi giá một dịch vụ, rà **đủ** danh sách dưới đây (tìm nhanh: tìm con số cũ, ví dụ `8,5 triệu`, `8500000`, trong toàn bộ thư mục `src/`):

  | Nơi | Nội dung chứa giá |
  |---|---|
  | `src/content/services/<dịch-vụ>.md` | `priceFrom` (giá "từ…" trên thẻ, slider, trang chủ, đầu trang dịch vụ, dữ liệu Google), `prices` (bảng giá chi tiết, cũng hiện ở `/bang-gia/` và landing page), `title` (có "Từ … /tháng"), FAQ nếu có nhắc giá |
  | `src/pages/bang-gia.astro` | `description` (giá ở lại nhà, theo giờ), FAQ |
  | `src/config/campaigns.ts` | `sub` của landing page (giúp việc gia đình: "từ … triệu/tháng") |
  | `src/content/blog/bang-gia-thue-giup-viec-2026.md` | Bảng "Mức lương theo từng loại dịch vụ", mục "Những yếu tố làm giá cao hơn" (so sánh theo số người, giá Tết) |
  | `src/pages/tuyen-dung.astro` | Lương người lao động "8–14 triệu" (= mức thấp nhất và cao nhất của các dịch vụ theo tháng cho gia đình) ở `title`, `description`, lead, FAQ |

  Quy ước: `priceFrom` = mức thấp nhất trong bảng `prices`; các khung giá trong một dịch vụ nối tiếp nhau, không chồng lên nhau.
- **Thêm dịch vụ:** copy một file có sẵn, đổi tên file, sửa nội dung. Trang tự xuất hiện ở trang chủ, trang Dịch vụ, Bảng giá, chân trang.
- **Ẩn/xóa dịch vụ:** xóa file. Nếu trang đã có lượt truy cập từ Google, thêm dòng chuyển hướng vào `public/_redirects` (mục 8). Kiểm tra `src/config/campaigns.ts` và trường `service:` của các bài blog không còn trỏ tới dịch vụ đã xóa.
- **Biểu tượng (`icon`) có sẵn:** xem tên trong `src/components/Icon.astro`: `home`, `clock`, `baby`, `elder`, `care`, `broom`, `building`, `lantern`, `shield`, `doc`…

### Giá tham khảo

Toàn bộ giá trên web được trình bày là **giá tham khảo, thỏa thuận trực tiếp**. Khi viết nội dung mới, tránh các câu như "giá cố định", "không phát sinh". Nên dùng "giá tham khảo", "báo giá theo nhu cầu", "thỏa thuận khi tư vấn".

## 4. Bài cẩm nang – `src/content/blog/*.md`

Tên file = đường dẫn bài: `hop-dong-thue-giup-viec.md` → `/cam-nang/hop-dong-thue-giup-viec/`.

```yaml
---
title: Hợp đồng thuê người giúp việc cần có những gì?
description: "Tóm tắt 1–2 câu, hiện trên Google, ≤ 155 ký tự"
pubDate: 2026-11-09          # ngày đăng, dạng NĂM-THÁNG-NGÀY
updatedDate: 2026-12-01      # (không bắt buộc) ngày cập nhật
tags: [hợp đồng, kinh nghiệm]
service: giup-viec-o-lai-nha # (không bắt buộc) tên file dịch vụ liên quan → hiện khối gợi ý dịch vụ
---
```

- Bài mới nhất tự lên đầu trang Cẩm nang và 3 bài mới nhất hiện ở trang chủ.
- **Không đổi tên file** của bài đã đăng (sẽ mất link trên Google). Nếu bắt buộc đổi, thêm chuyển hướng (mục 8).

## 5. Cách viết nội dung bài (Markdown)

| Muốn | Gõ |
|---|---|
| Tiêu đề mục | `## Tiêu đề` (mục con: `### Tiêu đề`) – không dùng `#` một dấu, đó là tiêu đề trang |
| Chữ đậm | `**chữ đậm**` |
| Danh sách chấm | `- Mục` |
| Danh sách số | `1. Mục` |
| Link trong web | `[chính sách đổi người](/chinh-sach-bao-hanh/)` |
| Trích dẫn | `> Nội dung` |
| Bảng | `| Cột 1 | Cột 2 |` rồi dòng `|---|---|` rồi các dòng dữ liệu |

Mẹo: câu ngắn, mỗi đoạn 2–4 câu, mỗi bài nên có ít nhất 1 link tới trang dịch vụ liên quan.

## 6. Đánh giá khách hàng – `src/content/reviews.json`

```json
{ "id": "r5", "sample": false, "name": "Chị Ngọc", "place": "Hà Đông", "service": "cham-be",
  "rating": 5, "date": "2026-11-01", "text": "Nội dung đánh giá." },
```

- `avatar` (không bắt buộc): tên file ảnh đại diện đặt trong `src/assets/reviews/`, ví dụ `"avatar": "chi-ngoc.jpg"`. Ảnh vuông, tối thiểu 200×200px. **Chỉ dùng ảnh thật khi khách đã đồng ý.** Không có ảnh thì web tự hiện vòng tròn chữ cái đầu tên. Ghi sai tên file thì `npm run build` báo lỗi.
- `id` không được trùng. `service` = tên file dịch vụ. `rating` từ 1 đến 5.
- `"sample": true` = đánh giá mẫu, **chỉ hiện khi chạy thử, tự ẩn trên web thật**. Đánh giá thật phải để `false`.
- Các mục cách nhau bằng dấu phẩy; mục cuối cùng **không** có dấu phẩy. Dùng ngoặc kép `"`, không dùng `'`.
- Chỉ đăng đánh giá thật, đã được khách đồng ý.

## 7. Màu sắc và kiểu chữ – `src/styles/global.css`

Toàn bộ màu nằm trong khối `@theme`. Đổi mã màu ở đây là cả web đổi theo:

| Tên | Dùng cho | Hiện tại |
|---|---|---|
| `--color-primary` | Tiêu đề, khối nền đậm, chân trang, nút phụ | `#1e3a8a` xanh dương đậm |
| `--color-primary-soft` | Link, icon, nhãn nhỏ, hover | `#1d4ed8` |
| `--color-cta` / `--color-cta-hover` | Nút Gọi, nút kêu gọi (chữ trắng) | `#c94a0b` / `#a83d07` cam đậm |
| `--color-accent` | Sao đánh giá, điểm nhấn trong logo | `#f59e0b` vàng cam |
| `--color-accent-deep` | Chữ giá trên nền sáng | `#b45309` |
| `--color-accent-light` | Chữ/icon vàng trên nền xanh đậm | `#fcd34d` |
| `--color-paper` / `--color-paper-deep` | Nền trang / nền khối xen kẽ | `#f8fafc` / `#eff6ff` |
| `--color-ink` / `--color-ink-soft` | Chữ chính / chữ phụ | `#0f172a` / `#475569` |

Lưu ý khi đổi màu:
- Chữ trắng trên nút phải đủ tương phản (kiểm tra tại webaim.org/resources/contrastchecker, cần ≥ 4.5).
- Logo, favicon và màu nền slide minh họa có mã màu viết trực tiếp, cần sửa cùng lúc: `src/components/Logo.astro`, `src/components/HeroSlider.astro` (dòng `tints`, chỉ dùng khi thiếu ảnh), `public/favicon.svg`, dòng `theme-color` trong `src/layouts/BaseLayout.astro`. Ảnh `public/apple-touch-icon.png` và `public/og-an-gia.jpg` (ảnh hiện khi chia sẻ link qua Zalo/Facebook, 1200×630) phải xuất lại bằng phần mềm thiết kế. Khi thay ảnh này, đặt **tên file mới** và sửa tên trong `src/components/Seo.astro`, `src/lib/schema.ts` để Zalo/Facebook không dùng ảnh cũ đã lưu.

Kiểu chữ: toàn site dùng **Be Vietnam Pro** (thiết kế riêng cho tiếng Việt). Tiêu đề đậm 700, chữ thường 400.

## 8. Chuyển hướng link cũ – `public/_redirects`

Mỗi dòng một chuyển hướng:

```
/dich-vu/ten-cu/  /dich-vu/ten-moi/  301
```

## 9. Ảnh

- **Ảnh dịch vụ:** đặt trong `src/assets/services/`, **tên file trùng tên file dịch vụ** (ví dụ `cham-be.jpg` cho `src/content/services/cham-be.md`). Một ảnh dùng cho 3 chỗ: banner trượt trang chủ (4 dịch vụ đầu), thẻ dịch vụ và đầu trang chi tiết dịch vụ. Nên dùng ảnh ≥ 1200px, chủ thể ở giữa (banner cắt dọc 4:5, thẻ cắt ngang 16:10). Thiếu ảnh thì web hiện hình minh họa.
- **Ảnh phần Cam kết** trang chủ: `src/assets/photos/cam-ket.jpg`.
- **Logo:** `src/assets/brand/logo-mark.svg` (biểu tượng vuông). Chữ bên cạnh lấy từ `shortName` trong `site.ts`. Khi đổi logo, đổi luôn `public/favicon.svg` và `public/apple-touch-icon.png` (180×180px).
- **Ảnh hiện tại là ảnh tạm** (xem `src/assets/NGUON-ANH.md`), cần thay bằng ảnh thật trước khi đưa lên mạng.
- **Chữ đổi luân phiên** dưới tiêu đề lớn: sửa danh sách `rotating` đầu file `src/pages/index.astro` (nên giữ 4 cụm ngắn).
- **Số liệu dưới nút Gọi** (số năm kinh nghiệm, số dịch vụ, thời gian phản hồi) tự tính từ `foundingYear`, số file dịch vụ và `responseTime` trong `src/config/site.ts`. Chỉ ghi số liệu đúng sự thật.
- Dùng ảnh thật của trung tâm (có sự đồng ý của người trong ảnh), chiều ngang ≥ 1200px.
- `alt` = mô tả ngắn nội dung ảnh, giúp Google và người khiếm thị.

## 10. Kiểm tra trước khi đưa lên

- [ ] `npm run build` không báo lỗi
- [ ] Xem thử trên điện thoại (thu nhỏ cửa sổ trình duyệt) – nút Gọi/Zalo bấm được
- [ ] Giá, số điện thoại đúng
- [ ] `title` ≤ 60 ký tự, `description` ≤ 155 ký tự
- [ ] Không còn chữ `TODO` hay thông tin ví dụ: `grep -rn TODO src`
