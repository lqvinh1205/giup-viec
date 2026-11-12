# CONTENT CONSISTENCY REPORT – An Gia

Ngày: 12/11/2026 · Commit: `9d9fb8e` · **Chỉ audit, chưa sửa code.**
Phạm vi: source code + HTML build + site đang chạy (giupviecangia.com) + ảnh chụp mobile 390px.

Ký hiệu: ✅ đã đạt · ❌ lỗi · ⚠️ cần chủ website xác nhận

---

## 0. Tóm tắt

| Mức | Hạng mục | Trạng thái |
|---|---|---|
| P0.1 | H1 trang chủ lặp từ khóa | ✅ Đã sửa ở `9d9fb8e`, đã lên site thật |
| P0.2–3 | Giá trang chủ / bảng giá / trang dịch vụ | ✅ Đã đồng bộ theo `priceFrom` (8 / 9 / 10 triệu), đã lên site thật. Còn 1 khung giá chồng lấn (chăm người già) và giá lương tuyển dụng lệch |
| P1.1–2 | Sonde, giới hạn y tế | ❌ Chưa rõ, mỗi trang nói một kiểu |
| P1.3 | Tạp vụ văn phòng | ❌ Nội dung viết theo mô hình gia đình; mâu thuẫn với FAQ bảng giá về phí và hóa đơn |
| P1.4 | Ví dụ dọn nhà 3 giờ | ❌ Viết như cam kết |
| P1.5 | Tuyên bố xác minh, sức khỏe, đánh giá | ❌ 5 mâu thuẫn, 4 đánh giá mẫu vẫn hiển thị |
| P1.6 | CTA trùng trên mobile | ❌ 2 khối CTA liền nhau ở trang dịch vụ; nút "Gọi" hoạt động khác nhau |
| P2 | Nguồn dữ liệu giá | ❌ Giá khai báo ở 6 nơi, 2 dạng (số và chữ) không ràng buộc nhau |

---

## 1. P0 – H1 trang chủ

| | |
|---|---|
| File | `src/pages/index.astro:52-59` |
| Trước `9d9fb8e` | H1 = "Người giúp việc tận tâm" + 4 cụm chữ xoay vòng + bản `sr-only` của 4 cụm đó, nên Google đọc mỗi cụm 2 lần |
| Hiện tại | `<h1>`Dịch vụ giúp việc nhà uy tín tại Hà Nội`</h1>`. Tiêu đề lớn và chữ xoay vòng chuyển sang `<p>` |
| Site thật | Đã kiểm tra: đúng 1 H1, nội dung như trên |

**Đề xuất:** không cần sửa thêm.
Lưu ý: H1 hiển thị dưới dạng dòng nhãn nhỏ (chữ ~15px) phía trên tiêu đề lớn. Về SEO như vậy là hợp lệ. Nếu muốn H1 to và nổi bật, phải đổi bố cục hero; việc này chưa làm vì sẽ thay đổi giao diện.

---

## 2. P0 – Giá

### 2.1. Trả lời câu hỏi kiểm tra

| Dịch vụ | 7,5 / 8,5 / 9 triệu (cũ) | 8 / 9 / 10 triệu (theo commit `5a2c761`, đã xác nhận) | Còn chỗ nào sai? |
|---|---|---|---|
| Giúp việc ở lại | Không còn | ✅ Mọi nơi | Không |
| Chăm bé | Không còn | ✅ Mọi nơi | Không |
| Chăm người già | Không còn | ✅ Mọi nơi | ⚠️ Khung giá chồng lấn (2.3) |

Kiểm tra trên site thật: trang chủ (thẻ dịch vụ, slider, khối "Giá tham khảo"), `/bang-gia/`, `/dich-vu/cham-nguoi-gia/` đều hiển thị 8.000.000đ / 9.000.000đ / 10.000.000đ. Không còn chuỗi "7,5", "8,5 triệu" (ở vai trò giá khởi điểm) hay "9 triệu" (chăm người già) trong source.

### 2.2. Bảng giá đầy đủ đang khai báo

| Dịch vụ | `priceFrom` | Bảng giá chi tiết (`prices[]`) | Title |
|---|---|---|---|
| Giúp việc ở lại | 8.000.000 /tháng | 8 – 8,5tr · 8,5 – 10tr · Từ 10tr | Từ 8 triệu/tháng |
| Giúp việc theo giờ | 70.000 /giờ | 80 – 90k (buổi lẻ) · 70 – 80k (định kỳ) · Báo giá | Từ 70.000đ/giờ |
| Chăm bé | 9.000.000 /tháng | 9 – 9,5tr · 9,5 – 11tr · Từ 11tr | Từ 9 triệu/tháng |
| Chăm người già | 10.000.000 /tháng | **Từ 10tr** · **10 – 11,5tr** · Từ 12tr | Từ 10 triệu/tháng |
| Chăm người bệnh | 450.000 /ngày | 450 – 550k/ca 12h · 650 – 800k/24h · 11 – 14tr/tháng | Từ 450.000đ/ngày |
| Tạp vụ văn phòng | 6.500.000 /tháng | 6,5 – 7tr (4h/ngày) · 8 – 9tr (8h/ngày) · Báo giá | Từ 6,5 triệu/tháng |
| Giúp việc Tết | 500.000 /ngày | 500 – 600k · 700k – 1tr · Báo giá trọn gói | Từ 500.000đ/ngày |

### 2.3. Lỗi giá còn lại

| # | Lỗi | File | Giá trị đang khai báo | Đề xuất |
|---|---|---|---|---|
| G1 | Chăm người già: dòng "Ông bà còn tự đi lại được" và dòng "Ông bà đi lại khó khăn" cùng bắt đầu từ 10 triệu, dòng 1 không có cận trên | `cham-nguoi-gia.md:13,16` | "Từ 10 triệu" / "10 – 11,5 triệu" | ⚠️ Cần khung đúng, ví dụ 10 – 10,5tr / 10,5 – 11,5tr |
| G2 | Lương tuyển dụng "7 – 12 triệu" không khớp lương phía khách: thấp nhất tạp vụ 6,5tr, cao nhất chăm bệnh tại nhà 14tr, chăm người già nằm một chỗ từ 12tr, chăm mẹ và bé từ 11tr | `tuyen-dung.astro:19,23,24,27` | 7–12 triệu (4 chỗ) | ⚠️ Xác nhận khoảng lương thực trả cho người lao động |
| G3 | Blog bảng giá tự gõ lại bảng giá, sẽ lệch tiếp lần sau | `blog/bang-gia-thue-giup-viec-2026.md:16-20` | 8–10 · 70–90k · 9–11 · 10–12 · 450–800k | Lấy từ nguồn chung (mục 5) |
| G4 | Blog: "mỗi người thêm cộng 300.000 – 500.000đ/tháng", "Tết gấp 1,5 – 2 lần ngày thường" — không có ở bảng giá nào | `blog/...2026.md:24,27` | | ⚠️ Xác nhận hoặc bỏ số |
| G5 | Mô tả `/bang-gia/` và landing page tự gõ giá | `bang-gia.astro:23`, `campaigns.ts:8` | "từ 8 triệu", "từ 70.000đ" | Lấy từ nguồn chung |
| G6 | Chăm người bệnh tại nhà theo tháng (11 – 14tr) và chăm người già nằm một chỗ (từ 12tr) mô tả cùng một nhu cầu ở 2 trang với 2 mức giá | `cham-nguoi-benh.md:19`, `cham-nguoi-gia.md:19` | | ⚠️ Xác nhận ranh giới hai dịch vụ (mục 3.2) |

### 2.4. Phí và cách tính giá (mâu thuẫn mô hình)

FAQ `/bang-gia/` áp dụng cho **mọi** dịch vụ: *"Đây là mức lương trả trực tiếp cho người giúp việc. Phí trung tâm tính một lần khi ký hợp đồng"* (`bang-gia.astro:16`). Câu này chỉ đúng với dịch vụ theo tháng cho gia đình:

| Dịch vụ | Theo nội dung khác trên site | Mâu thuẫn |
|---|---|---|
| Tạp vụ văn phòng | "Hợp đồng dịch vụ giữa công ty và trung tâm, xuất hóa đơn theo tháng" | Khách trả trung tâm hàng tháng, không phải "lương trả trực tiếp + phí một lần" |
| Theo giờ, chăm bệnh theo ngày, Tết | Thuê theo giờ/ca/ngày | "Phí một lần khi ký hợp đồng" không hợp lý với buổi lẻ |
| Mọi dịch vụ | `site.description`, footer: "giá công khai"; giới thiệu: "không có khoản phí ẩn" | Phí trung tâm không công bố con số |

⚠️ Cần xác nhận cách thu tiền của từng nhóm dịch vụ (mục 7, câu 3–4).

---

## 3. P1 – Nội dung

### 3.1. Chăm người già – thao tác sonde (P1.1)

| Vị trí | Nội dung hiện tại |
|---|---|
| `cham-nguoi-gia.md:20` (bảng giá, dòng "Cụ nằm một chỗ") | "Lật người, vệ sinh, **cho ăn qua sonde nếu được hướng dẫn**" |
| `cham-nguoi-gia.md:29` (FAQ) | "Các thao tác y tế như tiêm hay truyền dịch thuộc về nhân viên y tế, không do người giúp việc làm." |
| `cham-nguoi-gia.md:24` (phạm vi) | "Nhắc uống thuốc đúng giờ" |

Vấn đề: "nếu được hướng dẫn" không nói ai hướng dẫn, hướng dẫn đến đâu. Danh sách việc không làm chỉ có tiêm và truyền dịch nên dễ hiểu là mọi việc khác (đặt sonde, hút đờm, thay băng…) đều làm được. "Nhắc uống thuốc" và "cho uống thuốc" chưa phân biệt.

**Đề xuất câu chữ** (⚠️ chờ xác nhận trung tâm có nhận việc bơm ăn qua sonde hay không):
> Với cụ đã được đặt sonde: người chăm **chỉ hỗ trợ bơm thức ăn qua sonde đã đặt sẵn**, sau khi được điều dưỡng/bác sĩ hướng dẫn và gia đình đồng ý. Người chăm **không đặt, rút hoặc thay sonde**, không tự xử lý khi sonde tắc hay tuột mà báo ngay cho gia đình và cơ sở y tế.

### 3.2. Phạm vi chăm người bệnh và giới hạn y tế (P1.2)

| Trang | Được làm | Không làm |
|---|---|---|
| Chăm người bệnh | Trực giường, gọi điều dưỡng, hỗ trợ ăn uống, vệ sinh, lau người, lật người chống loét, theo dõi và báo lại | "Thủ thuật y tế" (không liệt kê cụ thể) |
| Chăm người già | Nấu ăn, tắm rửa, nhắc uống thuốc, đi tái khám, sonde (có điều kiện) | Tiêm, truyền dịch |
| Chăm bé | — | — (không nói gì về việc cho bé uống thuốc, xử lý sốt) |

Hai trang dùng hai danh sách khác nhau cho cùng một ranh giới. **Đề xuất:** một danh sách "Không thuộc phạm vi" dùng chung cho chăm người già, chăm người bệnh (và chăm bé phần thuốc), hiển thị ở cả 3 trang:

- Tiêm, truyền dịch, đặt/rút/thay sonde, đặt ống thông tiểu, hút đờm
- Thay băng, chăm sóc vết mổ, vết loét hở
- Tự ý cho dùng, đổi liều hoặc chia thuốc; chỉ **cho uống thuốc đã được gia đình/bác sĩ chia sẵn theo đơn**
- Đánh giá, chẩn đoán tình trạng bệnh; khi có dấu hiệu bất thường thì báo gia đình, gọi điều dưỡng hoặc 115

⚠️ Danh sách trên là đề xuất theo thông lệ của nghề, cần trung tâm xác nhận đúng với hợp đồng thực tế.

Ngoài ra cần xác nhận ranh giới **chăm người già nằm một chỗ** và **chăm người bệnh tại nhà theo tháng** (G6): khách nên chọn trang nào, vì sao giá khác nhau.

### 3.3. Tạp vụ văn phòng (P1.3)

Nội dung hiện tại (`tap-vu-van-phong.md`) ngắn: 1 đoạn mở bài và mục "Phù hợp với". Phần còn lại dùng khung chung của trang dịch vụ, vốn viết cho gia đình:

| Thành phần dùng chung | Nội dung | Vấn đề với khách doanh nghiệp |
|---|---|---|
| Tiêu đề phạm vi (`dich-vu/[slug].astro:48`) | "Công việc **người giúp việc** đảm nhận" | Sai đối tượng |
| Ghi chú dưới bảng giá (`[slug].astro:57`) | "Mức lương trả trực tiếp cho người giúp việc. Phí dịch vụ trung tâm báo trước khi ký hợp đồng" | Mâu thuẫn với "hợp đồng dịch vụ, hóa đơn theo tháng" |
| Quy trình (`Steps.astro`) | "Kể nhu cầu: **mấy người trong nhà**…", "Ký **hợp đồng ba bên**" | Sai mô hình |
| Sidebar | "Cần người cho **gia đình**?" | Sai đối tượng |
| Bảng giá | Không nói giá đã gồm VAT chưa, gồm dụng cụ/hóa chất chưa | Doanh nghiệp cần để lập ngân sách |

**Đề xuất cấu trúc nội dung** (⚠️ mọi dữ kiện cần xác nhận trước khi viết):
1. Mở bài theo nhu cầu doanh nghiệp: văn phòng sạch, không phải tự tuyển và quản lý, chi phí cố định có hóa đơn.
2. Hình thức cung cấp: bán thời gian / toàn thời gian / theo buổi; ca làm, ngày làm.
3. Phạm vi công việc theo khu vực (sàn, bàn, phòng họp, pantry, WC, rác, đón khách/pha trà).
4. Cam kết vận hành: thời gian có người thay khi nghỉ, cách báo vắng, giám sát/kiểm tra định kỳ, đầu mối liên hệ.
5. Hợp đồng và thanh toán: hợp đồng dịch vụ, chu kỳ hóa đơn, VAT, ai cung cấp dụng cụ/hóa chất, bảo hiểm và trách nhiệm với nhân viên (ai đóng BHXH).
6. Bảo mật và tài sản: quy định ra vào, trách nhiệm khi mất mát, hư hỏng.
7. Quy trình riêng: khảo sát mặt bằng → báo giá → làm thử → ký hợp đồng.
8. FAQ doanh nghiệp: VAT, đổi nhân viên, tăng/giảm ca, ngày lễ.

Thay đổi code đi kèm: cho phép từng dịch vụ đặt tiêu đề phạm vi, ghi chú giá, quy trình riêng (frontmatter tùy chọn), không ảnh hưởng 6 dịch vụ còn lại.

### 3.4. Ví dụ dọn nhà 3 giờ (P1.4)

`giup-viec-theo-gio.md:39-41`:
> "Với căn hộ khoảng 70m², 3 giờ **đủ để** lau toàn bộ sàn, dọn bếp, vệ sinh hai phòng tắm, thay ga giường và giặt một mẻ quần áo."

Viết như cam kết khối lượng, dễ gây tranh cãi khi nhà bẩn hơn mức trung bình. **Đề xuất:**
> "**Ví dụ tham khảo:** với căn hộ khoảng 70m² được dọn định kỳ, một buổi 3 giờ thường đủ để… Khối lượng thực tế phụ thuộc tình trạng nhà và yêu cầu của anh chị; với nhà lâu chưa dọn, nên đặt buổi tổng vệ sinh trước."

### 3.5. Tuyên bố xác minh, sức khỏe, đánh giá (P1.5)

| # | Tuyên bố | Vị trí | Mâu thuẫn / rủi ro |
|---|---|---|---|
| C1 | "**Mỗi người** đều được xác minh CCCD, **có xác nhận của địa phương**" | `giup-viec-o-lai-nha.md:46`; trang chủ "Hồ sơ xác minh"; `Steps.astro:5` | Tuyển dụng: "giấy xác nhận của địa phương **(nếu có)**" (`tuyen-dung.astro:17`) → không phải ai cũng có |
| C2 | "Được gọi điện kiểm tra với **ít nhất một gia đình từng thuê**"; hồ sơ "**có lịch sử làm việc**" | `giup-viec-o-lai-nha.md:46`, `Steps.astro:5`, trang chủ, giới thiệu | Tuyển dụng: "**có kinh nghiệm hay chưa** đều được hướng dẫn" → người mới không có gia đình cũ để gọi |
| C3 | "**Gặp trực tiếp** từng người lao động" | `gioi-thieu.astro:18` | Tuyển dụng: phỏng vấn "**qua điện thoại** nếu ở xa", có thể "**đi thẳng đến nhà gia đình**" |
| C4 | "**Kiểm tra sức khỏe**" | `cham-be.md:34` (chỉ trang này) | Không nói kiểm tra bằng cách nào (giấy khám sức khỏe? cơ sở nào?), các trang khác không nhắc |
| C5 | "Được hướng dẫn về nấu ăn, dùng đồ điện, giữ vệ sinh **theo chuẩn của trung tâm**" | `giup-viec-o-lai-nha.md:46` | Ngụ ý có chương trình đào tạo, cần xác nhận có thật |
| C6 | Đổi người "**đến khi ông bà thấy thoải mái**" | `cham-nguoi-gia.md:31` | Chính sách bảo hành: **1 tháng, tối đa 3 lần** (`chinh-sach-bao-hanh.astro:12`) |
| C7 | Bảo hành 1 tháng / 3 lần áp dụng cho dịch vụ nào? | `chinh-sach-bao-hanh.astro` | Chưa rõ với theo giờ, chăm bệnh theo ngày, Tết, tạp vụ |
| C8 | "Giá công khai", "không có khoản phí ẩn" | `site.ts:9`, footer, `gioi-thieu.astro:20`, trang chủ | Phí trung tâm không công bố (mục 2.4) |
| C9 | 4 đánh giá **mẫu** (`"sample": true`, ảnh người mẫu stock) hiển thị dưới tiêu đề "Những lời nhắn chúng tôi nhận được", "Đánh giá từ gia đình" | `reviews.json`, `lib/reviews.ts` (bộ lọc đã tắt), `index.astro:154-163`, `dich-vu/[slug].astro:62-67`, `/lp/*` | Trình bày như phản hồi thật của khách nhưng không phải. Rủi ro pháp lý (quảng cáo gây nhầm lẫn) và uy tín |
| C10 | "Được nhận xét tốt" | `cham-nguoi-gia.md:34` | Hợp lý nếu là quy trình thật, cần xác nhận |
| C11 | "8+ năm kinh nghiệm" (tính từ `foundingYear: 2018`), "phản hồi 30 phút" | `index.astro:24-26`, `site.ts` | Hiển thị lớn ở hero; `foundingYear` vẫn ghi TODO |

**Đề xuất:**
- C1–C3: viết lại theo đúng quy trình thật. Ví dụ: "Xác minh CCCD; xác nhận địa phương khi có; với người đã từng đi làm, gọi hỏi gia đình cũ; người mới được giới thiệu kèm ghi chú rõ là chưa có kinh nghiệm".
- C4, C5: giữ nếu có thật và nói rõ cách làm; bỏ nếu không.
- C6: sửa thành "đổi người miễn phí trong thời gian bảo hành (xem chính sách đổi người)".
- C9: ẩn đánh giá mẫu (bật lại bộ lọc `sample`) cho đến khi có đánh giá thật được khách đồng ý. Các khối đánh giá đã có điều kiện `reviews.length > 0` nên sẽ tự ẩn, không vỡ bố cục.

### 3.6. CTA trùng lặp trên mobile (P1.6)

Đã kiểm tra bằng HTML build và ảnh chụp 390px. Trên mobile, thanh dock (Gọi ngay / Zalo / Chat) **luôn hiển thị** ở đáy màn hình, nên mọi khối CTA khác đều lặp lại nó.

| Trang | CTA thấy được trên mobile (ngoài dock) | Vấn đề |
|---|---|---|
| Trang dịch vụ | Đầu trang (Gọi + Zalo) → **sidebar "Cần người cho gia đình?" (Gọi + Zalo)** → danh sách "Dịch vụ khác" → **CTA cuối "Cần người ngay tuần này?" (Gọi + Zalo)** → footer (Gọi, Zalo, Messenger) | ❌ Hai khối CTA gần như giống hệt nhau chỉ cách nhau danh sách 6 link (sidebar xếp xuống dưới bài trên mobile) |
| Trang chủ | Hero (Gọi + Zalo), thẻ "Nhu cầu khác?" (Zalo), "Nhắn Zalo báo giá", "Hỏi khu vực của bạn" (Zalo), CTA cuối (Gọi + Zalo), footer | ⚠️ 6 điểm CTA + dock. Mỗi điểm có ngữ cảnh riêng, chấp nhận được |
| Bảng giá | Ghi chú giá (Gọi + Zalo), CTA cuối, footer | ✅ Hợp lý |
| Bài viết | CTA cuối, footer | ✅ Hợp lý |

Lỗi hành vi:
| # | Lỗi | File |
|---|---|---|
| U1 | Nút "Gọi ngay" trên dock mở hộp chọn 2 hotline; mọi nút "Gọi" khác gọi thẳng hotline 1 → hai cách hoạt động khác nhau cho cùng một nhãn | `ContactDock.astro` vs `CTASection`, `Header`, trang dịch vụ… |
| U2 | Desktop: cụm 4 nút nổi góc phải che nút trong sidebar trang dịch vụ (đã ghi ở báo cáo trước) | `ContactDock.astro:91-108` |

**Đề xuất:**
- Trang dịch vụ: ẩn khối CTA sidebar trên mobile (`hidden lg:block`), giữ nguyên trên desktop. Không bỏ chức năng nào, CTA cuối trang và dock vẫn còn.
- U1: thống nhất một hành vi. Nếu hotline 2 chỉ là số dự phòng, cho nút dock gọi thẳng hotline 1 giống các nút khác; nếu cả hai số đều cần thì giữ hộp chọn. ⚠️ Cần xác nhận vai trò hotline 2.
- U2: gộp 2 nút hotline nổi thành 1, hoặc ẩn cụm nổi ở trang có sidebar CTA.

---

## 4. P2 – Nơi khai báo giá trong source

| # | Nơi khai báo | Dạng | Dùng ở | Có tự đồng bộ không? |
|---|---|---|---|---|
| 1 | `src/content/services/*.md` → `priceFrom`, `priceUnit` | **Số** | Thẻ dịch vụ, slider, khối giá trang chủ, đầu trang dịch vụ, sidebar bài viết, schema `Service` | ✅ Nguồn gốc |
| 2 | `src/content/services/*.md` → `prices[].price` | **Chuỗi tự gõ** ("8 – 8,5 triệu/tháng") | `PriceTable` ở trang dịch vụ, `/bang-gia/`, `/lp/*` | ❌ Độc lập với `priceFrom` → đây là nguyên nhân lệch giá ở `5a2c761` |
| 3 | `src/content/services/*.md` → `title` | Chuỗi chứa giá | `<title>` | ❌ |
| 4 | `src/pages/bang-gia.astro:23` (description) | Chuỗi | Meta description | ❌ |
| 5 | `src/config/campaigns.ts:8` (`sub`) | Chuỗi | Landing `/lp/giup-viec-gia-dinh/` | ❌ |
| 6 | `src/content/blog/bang-gia-thue-giup-viec-2026.md:16-27` | Bảng Markdown | Bài viết | ❌ |
| 7 | `src/pages/tuyen-dung.astro:19,23,24,27` | Chuỗi (lương người lao động) | Trang tuyển dụng | ❌ (khái niệm khác: lương, không phải giá) |

## 5. P2 – Đề xuất nguồn dữ liệu giá dùng chung

**Nguyên tắc:** collection `services` là nguồn duy nhất; mọi con số khác đều được tính ra từ đây. Không cần thêm package mới.

**1. Đổi `prices[].price` từ chuỗi sang số** (`src/content.config.ts`):
```yaml
prices:
  - name: Gia đình 2–4 người, nhà ≤ 100m²
    min: 8000000
    max: 8500000          # bỏ trống = "Từ …"
    note: Dọn dẹp, nấu 2 bữa, giặt là
  - name: Biệt thự, nhà vườn
    min: 10000000
  - name: Tổng vệ sinh, chuyển nhà
    quote: Báo giá theo diện tích   # dòng không có số
```
- `priceFrom` **tính tự động** = `min` nhỏ nhất của các dòng → bỏ field `priceFrom` khỏi frontmatter, không còn khả năng lệch.
- Kiểm tra lúc build bằng Zod (cấu hình nội dung): `max ≥ min`, đơn vị hợp lệ. Nhập sai thì `npm run build` báo lỗi.

**2. Hàm định dạng dùng chung** (`src/lib/price.ts`): `formatRange(min, max, unit)` → "8 – 8,5 triệu/tháng", `formatShort(n)` → "8 triệu" / "70.000đ". `PriceTable`, thẻ dịch vụ, slider, title đều gọi hàm này.

**3. Bỏ giá khỏi chuỗi tự gõ:**
| Nơi | Cách làm |
|---|---|
| `title` dịch vụ | Frontmatter chỉ giữ phần chữ ("Giúp việc ở lại nhà Hà Nội"); `dich-vu/[slug].astro` ghép thêm "– Từ {formatShort(priceFrom)}/{unit}" |
| Description `/bang-gia/` | Ghép từ dữ liệu dịch vụ |
| `campaigns.ts` | Bỏ con số khỏi `sub`; trang `/lp/` ghép giá từ dịch vụ mà chiến dịch trỏ tới (đã có `c.service`) |
| Blog bảng giá | Xóa bảng tự gõ; thêm field tùy chọn `priceSummary: true` cho bài viết → `cam-nang/[slug].astro` tự hiển thị bảng tóm tắt lấy từ `services` (không cần MDX) |
| Blog "300–500k/người", "Tết gấp 1,5–2 lần" | Không phải dữ liệu bảng giá → giữ dạng chữ nếu được xác nhận, hoặc bỏ số |
| Tuyển dụng (lương) | Tách thành `salaryRange` trong `site.ts` (một chỗ), vì lương người lao động khác giá phía khách (đặc biệt tạp vụ) |

**File sẽ sửa khi được duyệt:** `content.config.ts`, 7 file `services/*.md` (chuyển định dạng, **giữ nguyên con số**), `lib/price.ts` (mới), `PriceTable.astro`, `ServiceCard.astro`, `HeroSlider.astro`, `index.astro`, `dich-vu/[slug].astro`, `cam-nang/[slug].astro`, `bang-gia.astro`, `lp/[campaign].astro`, `campaigns.ts`, `schema.ts`, blog bảng giá, `tuyen-dung.astro`, `site.ts`, `HUONG-DAN-CHINH-SUA.md` (hướng dẫn nhập giá mới).
Không đổi URL, không tạo trang mới, không đổi con số (trừ khi có xác nhận ở mục 7).

---

## 6. Kế hoạch sửa (sau khi được duyệt)

| Bước | Việc | Cần xác nhận trước |
|---|---|---|
| 1 | Nguồn giá dùng chung (mục 5), giữ nguyên mọi con số hiện tại | Không |
| 2 | Sửa khung chăm người già, lương tuyển dụng | Câu 1, 2 |
| 3 | Danh sách "Không thuộc phạm vi" dùng chung + câu chữ sonde | Câu 5, 6 |
| 4 | Viết lại tạp vụ văn phòng + khung trang tùy chỉnh theo dịch vụ | Câu 3, 7 |
| 5 | Sửa ví dụ 3 giờ (không cần xác nhận), sửa tuyên bố C1–C8 | Câu 8–11 |
| 6 | Ẩn đánh giá mẫu | Câu 12 |
| 7 | CTA mobile: ẩn sidebar CTA trên mobile; thống nhất nút Gọi; cụm nút nổi desktop | Câu 13 |
| 8 | Build, kiểm tra HTML, chụp mobile/desktop, cập nhật báo cáo | — |

---

## 7. Thông tin cần chủ website xác nhận

**Giá và mô hình thu tiền**
1. Khung giá chăm người già: dòng "còn tự đi lại" và "đi lại khó khăn" cụ thể là bao nhiêu? (hiện "Từ 10tr" và "10 – 11,5tr")
2. Lương thực trả cho người lao động (trang tuyển dụng đang ghi 7 – 12 triệu).
3. Với **theo giờ, chăm bệnh theo ngày, Tết**: khách trả cho ai, có phí trung tâm không, tính thế nào?
4. Với **tạp vụ văn phòng**: giá bảng giá là giá dịch vụ trả cho trung tâm? đã gồm VAT chưa? gồm dụng cụ/hóa chất chưa? nhân viên do ai đóng bảo hiểm?
5. Con số "mỗi người thêm cộng 300 – 500k/tháng" và "Tết gấp 1,5 – 2 lần" có đúng không?

**Phạm vi chăm sóc**
6. Trung tâm có nhận việc bơm ăn qua sonde không? Ai hướng dẫn? Danh sách "Không thuộc phạm vi" ở mục 3.2 có đúng không?
7. Ranh giới giữa "chăm người già nằm một chỗ" (từ 12tr) và "chăm người bệnh tại nhà theo tháng" (11 – 14tr).

**Quy trình và cam kết**
8. Có thật sự gặp trực tiếp mọi người lao động không, hay có trường hợp phỏng vấn từ xa?
9. Có nhận người chưa có kinh nghiệm không? Nếu có, hồ sơ của họ được kiểm tra thế nào?
10. "Kiểm tra sức khỏe" (chăm bé) làm bằng cách nào? Có đào tạo "theo chuẩn trung tâm" không?
11. Bảo hành 1 tháng / 3 lần áp dụng cho những dịch vụ nào?
12. Đồng ý ẩn 4 đánh giá mẫu cho đến khi có đánh giá thật?

**Giao diện**
13. Hotline 2 (0399 359 431) dùng để làm gì: số dự phòng hay số chính ngang hàng? Đồng ý ẩn khối CTA sidebar trên mobile?
14. `foundingYear` 2018 (hiển thị "8+ năm kinh nghiệm") và cam kết phản hồi 30 phút có đúng không?

---

## 8. Kết quả xử lý (12/11/2026, chưa commit)

Đã làm toàn bộ kế hoạch mục 6. Những mục cần dữ kiện chưa có: **không tự đặt số liệu hay cam kết mới**, chỉ giữ nguyên hoặc viết chặt hơn (bớt cam kết), và đánh dấu ⚠️.

### 8.1. Giá (P2) — cập nhật theo phản hồi

Theo yêu cầu của chủ website: **không dùng cấu hình giá động** (một dịch vụ có nhiều loại giá với điều kiện khác nhau, nhập dạng số gây khó). Đã gỡ cơ chế `from`/`to` tự tính; giá vẫn gõ dạng chữ trong `prices[].price`, `priceFrom` gõ tay.
Thay vào đó: **danh sách đầy đủ các chỗ có giá** ở `HUONG-DAN-CHINH-SUA.md` (mục "Đổi giá") để mỗi lần đổi giá rà một lượt.

Đã đồng bộ theo giá mới nhất (8 / 9 / 10 triệu):
| Chỗ | Trước | Sau |
|---|---|---|
| Chăm người già, 2 dòng đầu | "Từ 10tr" / "10 – 11,5tr" (chồng nhau) | **10 – 10,5tr** / **10,5 – 11,5tr** (cụ nằm một chỗ giữ "Từ 12tr") |
| Lương tuyển dụng (4 chỗ) | 7 – 12 triệu | **8 – 14 triệu** = thấp nhất / cao nhất của dịch vụ theo tháng cho gia đình (ở lại nhà 8tr … chăm bệnh tại nhà 14tr) |
| Blog: dòng chăm người bệnh | 450.000 – 800.000đ/ngày | 450.000 – 550.000đ/ca 12 giờ, 650.000 – 800.000đ/24 giờ; thêm dòng chăm tại nhà 11 – 14 triệu/tháng |
| Blog: "mỗi người thêm 300 – 500k" | không khớp bảng giá | So sánh trực tiếp theo bảng giá: 5–6 người 8,5 – 10tr so với 2–4 người 8 – 8,5tr |
| Blog: "Tết gấp 1,5 – 2 lần" | không khớp bảng giá | Theo bảng giá Tết: 700.000 – 1.000.000đ/ngày (23 Chạp – mùng 6) so với 500.000 – 600.000đ trước đó |
| Chăm người bệnh, giá "từ" | 450.000đ/ngày | **450.000đ/ca** (đúng với dòng ca 12 giờ trong bảng giá) |

Các dòng "Từ …" không có mức trần (biệt thự, mẹ và bé, cụ nằm một chỗ) giữ nguyên: đây là mức mở, báo giá theo trường hợp.

### 8.2. Nội dung (P1)

| Mục | Đã làm | File |
|---|---|---|
| 3.1 Sonde | "hỗ trợ cho ăn qua sonde đã đặt sẵn khi được nhân viên y tế hướng dẫn"; FAQ nói rõ không đặt/thay sonde ⚠️ | `cham-nguoi-gia.md` |
| 3.2 Giới hạn y tế | Khối "Không thuộc phạm vi công việc" dùng chung (`medicalLimits: true`) cho chăm người già, chăm người bệnh ⚠️ | `dich-vu/[slug].astro` |
| 3.3 Tạp vụ | Nội dung viết lại theo góc nhìn doanh nghiệp (chỉ dùng dữ kiện đã có trên site); `audience: business` đổi tiêu đề phạm vi, ghi chú giá, quy trình 3 bước, CTA sidebar | `tap-vu-van-phong.md`, `[slug].astro`, `Steps.astro` |
| 3.4 Ví dụ 3 giờ | Ghi rõ "Ví dụ tham khảo", tùy tình trạng nhà | `giup-viec-theo-gio.md` |
| C1, C2 | Xác nhận địa phương "khi có"; gọi gia đình cũ "với người đã từng đi làm"; Steps: "ghi rõ kinh nghiệm" | `giup-viec-o-lai-nha.md`, `index.astro`, `gioi-thieu.astro`, `Steps.astro` |
| C3 | "Phỏng vấn trực tiếp hoặc qua video, điện thoại với người ở xa" | `gioi-thieu.astro`, `index.astro` |
| C4, C5 | **Bỏ** "kiểm tra sức khỏe" và "hướng dẫn theo chuẩn của trung tâm" (chưa xác minh được) ⚠️ | `cham-be.md`, `giup-viec-o-lai-nha.md` |
| C6 | "Đổi người miễn phí theo chính sách đổi người" | `cham-nguoi-gia.md` |
| C8 / 2.4 | "khung giá công khai", "phí trung tâm báo trước khi ký"; FAQ bảng giá tách theo nhóm dịch vụ | `site.ts`, `gioi-thieu.astro`, `index.astro`, `bang-gia.astro` |
| C9 | Bật lại bộ lọc: đánh giá mẫu chỉ hiện khi `npm run dev`, ẩn trên production. Các khối đánh giá tự ẩn | `lib/reviews.ts` |
| 3.6 CTA mobile | Khối CTA sidebar trang dịch vụ chỉ hiện từ màn hình lg | `[slug].astro` |
| U2 | Cụm nút nổi desktop: 2 nút gọi thu thành nút tròn có số 1/2 (hiện số điện thoại khi màn hình ≥ 1700px). Đã kiểm tra 1366px: không còn che sidebar | `ContactDock.astro` |

### 8.3. Chưa xử lý — không phải vấn đề giá, chờ xác nhận

| # | Việc | Câu hỏi mục 7 |
|---|---|---|
| 1 | Ranh giới chăm người già nằm một chỗ (từ 12tr) / chăm người bệnh tại nhà (11 – 14tr). Hai khoảng giá không mâu thuẫn, chỉ chưa nói khách nên chọn dịch vụ nào | 7 |
| 2 | Phạm vi áp dụng bảo hành 1 tháng / 3 lần | 11 |
| 3 | Nút "Gọi ngay" trên dock mở hộp chọn 2 số, nút khác gọi thẳng hotline 1 | 13 |
| 4 | `foundingYear`, thời gian phản hồi 30 phút | 14 |
| 5 | Lương tạp vụ: trang tuyển dụng có vị trí tạp vụ, nhưng giá tạp vụ (6,5 – 9tr) là giá dịch vụ doanh nghiệp trả trung tâm, không phải lương | 4 |

### 8.3b. Ảnh chia sẻ link (Zalo/Facebook)

Ảnh cũ `public/og-default.jpg` mang thiết kế cũ (xanh rêu, "giá công khai"). Đã thay bằng `public/og-an-gia.jpg` (1200×630, màu, logo, H1 và hotline hiện tại), đổi tên file để Zalo/Facebook tải ảnh mới. Sau khi deploy cần làm mới bộ nhớ đệm của Zalo bằng công cụ Zalo Sharing Debugger (developers.zalo.me/tools/debug-sharing) và của Facebook bằng Sharing Debugger (developers.facebook.com/tools/debug).

### 8.4. Kiểm thử

- `npm run build`: thành công, không cảnh báo.
- 22 trang + 404: mỗi trang 1 title, 1 description, 1 H1; canonical đúng; JSON-LD hợp lệ; không `undefined`/`NaN`; 0 link nội bộ hỏng.
- Ảnh chụp desktop 1366px: trang dịch vụ chăm bé, chăm người già, tạp vụ, bài bảng giá.
