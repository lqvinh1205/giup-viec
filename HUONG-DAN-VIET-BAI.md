# Hướng dẫn viết bài Cẩm nang

Tài liệu cho người viết bài (người hoặc AI) trên mục **Cẩm nang** (`/cam-nang/`) của Giúp Việc An Gia.
Mỗi bài là một file `.md`. Bài chỉ được đăng khi đúng mẫu và đạt mọi bước kiểm tra ở **mục 10**.

Các quy tắc dưới đây gom từ ba nguồn:
- **Google**: nội dung hữu ích, viết cho người đọc. Bài về chăm sóc sức khỏe, pháp luật và tiền bạc bị Google xét kỹ hơn bình thường.
- **Pháp luật Việt Nam**: Luật Quảng cáo, Bộ luật Lao động 2019, Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.
- **Quy định riêng của An Gia**: cách nói về giá, phí, cam kết dịch vụ.

---

## 1. Quy trình

1. **Chọn chủ đề.** Mỗi bài trả lời **một** câu hỏi thật mà khách hay hỏi. Kiểm tra trùng với bài đã có và xem các chủ đề gợi ý ở mục 9. Chủ đề đã có bài thì sửa bài cũ, không viết bài mới.
2. **Viết** theo mẫu ở mục 2.
3. **Kiểm tra** theo **mục 10**. Bước này bắt buộc: chưa đạt hết thì không gửi.
4. **Đăng** bằng một trong hai cách:
   - Gửi qua API (cách dành cho AI, xem bên dưới). Slug trong đường dẫn API phải **trùng tên file**.
   - Người quản lý có quyền truy cập mã nguồn: đặt file vào thư mục bài viết của dự án rồi build.

Trong tài liệu, đường dẫn như `/dich-vu/cham-be/` là trang trên web `https://giupviecangia.com`. Ví dụ `/dich-vu/cham-be/` là `https://giupviecangia.com/dich-vu/cham-be/`. Mọi trang đều công khai, mở để đọc được.

### Đăng qua API

Mọi lệnh gọi API đều phải có header `X-Password: <MẬT_KHẨU>`. Mật khẩu do người quản lý cung cấp và không được ghi vào bài viết.

```bash
# Lấy bản mới nhất của tài liệu này
curl https://giupviecangia.com/api/guide -H "X-Password: <MẬT_KHẨU>"

# Đăng bài mới, hoặc cập nhật bài cũ nếu gửi cùng slug
curl -X PUT https://giupviecangia.com/api/posts/<slug> \
  -H "X-Password: <MẬT_KHẨU>" \
  --data-binary @<slug>.md
```

| Kết quả | Ý nghĩa |
|---|---|
| `200 {"ok":true,"url":"/cam-nang/<slug>/"}` | Đã build và đăng. Bài lên web ngay. |
| `422 {"error":"Build lỗi…","log":"…"}` | Bài **chưa** được đăng. Đọc `log` để biết trường nào sai (xem mục 7), sửa rồi gửi lại. |
| `400` | File không bắt đầu bằng `---` |
| `401` | Sai mật khẩu |

Mỗi lần gửi mất khoảng 30 giây – 1 phút vì phải build lại cả site. Gửi lần lượt từng bài, chờ kết quả của bài trước rồi mới gửi bài sau.

   Thiếu trường hoặc sai định dạng thì build báo lỗi và bài không được đăng.

---

## 2. Mẫu bài

Tên file: `cach-giao-viec-cho-nguoi-giup-viec.md`, khi lên web thành `/cam-nang/cach-giao-viec-cho-nguoi-giup-viec/`.

```markdown
---
title: Cách giao việc cho người giúp việc để làm đúng ngay từ đầu
description: "Cách giao việc cho người giúp việc mới: lập danh sách việc theo ngày, hướng dẫn tuần đầu, góp ý thế nào để người làm hiểu và không tự ái."
pubDate: 2026-11-20
tags: [kinh nghiệm]
service: giup-viec-o-lai-nha
---

Đoạn mở bài 2–4 câu: nêu đúng vấn đề người đọc đang gặp và bài này giúp gì. Không mở bằng câu chung chung.

## Câu hỏi hoặc ý chính thứ nhất

Nội dung. Mỗi đoạn 2–4 câu.

## Ý chính thứ hai

- Danh sách khi liệt kê từ 3 ý trở lên
- Mỗi dòng một ý, ngắn gọn

## Ý chính thứ ba

| Tiêu chí | Lựa chọn A | Lựa chọn B |
|---|---|---|
| Dùng bảng khi so sánh | ... | ... |

## Kết bài: bước tiếp theo

Gợi ý việc nên làm tiếp, kèm link tới [dịch vụ liên quan](/dich-vu/giup-viec-o-lai-nha/) hoặc bài khác.
```

---

## 3. Phần đầu file (frontmatter)

Phần đầu file nằm giữa hai dòng `---`. Giữ nguyên tên trường bên trái dấu `:` và thụt lề bằng dấu cách, không dùng Tab.

| Trường | Bắt buộc | Quy tắc |
|---|---|---|
| Tên file (slug) | ✔ | Chữ thường, không dấu, nối bằng `-`. Dài 3–8 từ, chứa từ khóa chính. Không ghi năm, trừ bài gắn với một năm cụ thể (ví dụ bảng giá). **Không đổi tên sau khi đăng**, vì đổi tên sẽ mất link trên Google. |
| `title` | ✔ | **≤ 60 ký tự**, chứa từ khóa chính ở nửa đầu và đọc lên là một câu tự nhiên (xem mục 6.10). Title cũng là tiêu đề lớn (H1) của bài. Không trùng title bài khác. Không viết HOA toàn bộ, không giật tít, không dùng "nhất / số 1". |
| `description` | ✔ | **120–155 ký tự**, bọc trong `"..."`. Tóm tắt bài sẽ giúp người đọc điều gì. Đây là đoạn hiện dưới tiêu đề trên Google. Không lặp lại nguyên văn title, không liệt kê từ khóa. |
| `pubDate` | ✔ | Ghi theo dạng `NĂM-THÁNG-NGÀY`, ví dụ `2026-11-20`. **Không ghi ngày tương lai**: bài được sắp theo ngày, ngày tương lai sẽ nằm mãi trên đầu. |
| `updatedDate` | | Chỉ ghi khi sửa nội dung đáng kể (số liệu, luật, thêm mục). Sửa lỗi chính tả thì không cần ghi. |
| `tags` | | 1–3 tag, ví dụ `[kinh nghiệm, chăm bé]`. **Tag đầu tiên hiện ở danh sách bài**, nên đặt chủ đề chính lên đầu. Ưu tiên dùng tag đã có: `kinh nghiệm`, `bảng giá`, `so sánh`, `hợp đồng`, `pháp luật`, `phỏng vấn`, `chăm bé`, `chăm người già`, `chăm người bệnh`. |
| `service` | | Dịch vụ liên quan nhất. Giá trị này hiện thành khối gợi ý dịch vụ bên cạnh bài. Chỉ được chọn một trong: `giup-viec-o-lai-nha`, `giup-viec-theo-gio`, `cham-be`, `cham-nguoi-gia`, `cham-nguoi-benh`, `tap-vu-van-phong`, `giup-viec-tet`. **Gõ sai tên thì build không báo lỗi, chỉ là khối dịch vụ không hiện.** |

Nếu nội dung có dấu `:` hoặc bắt đầu bằng ký tự đặc biệt, bọc nội dung trong `"..."`.

---

## 4. Cấu trúc bài

- **Không dùng `#` một dấu** trong bài, vì `title` đã là tiêu đề trang. Tiêu đề mục dùng `##`, mục con dùng `###` và chỉ đặt bên trong một mục `##`.
- **Mở bài** gồm 2–4 câu, vào thẳng vấn đề. Tránh các câu kiểu "Trong cuộc sống hiện đại ngày nay…", "Như chúng ta đã biết…".
- **Thân bài** có 4–7 mục `##`. Có từ 3 mục `##` trở lên thì bài tự có mục lục. Tiêu đề mục nên là câu hỏi hoặc cụm cụ thể ("Chọn ca 12 giờ hay 24 giờ?"), không đặt kiểu "Phần 1", "Thông tin chung".
- **Độ dài** khoảng 600–1.200 từ. Viết đủ để trả lời câu hỏi, không kéo dài cho đủ số từ.
- **Định dạng:**
  - Đoạn văn 2–4 câu.
  - Các bước làm dùng danh sách số `1.`.
  - Liệt kê ý dùng gạch đầu dòng `-`.
  - So sánh dùng bảng.
  - In đậm `**...**` chỉ dành cho ý quan trọng nhất, mỗi mục tối đa 1–2 chỗ.
- **Kết bài** nói người đọc nên làm gì tiếp và có link tới dịch vụ hoặc bài liên quan. **Không ghi số điện thoại, Zalo hay "gọi ngay"** trong bài, vì cuối trang và bên cạnh bài đã có sẵn nút liên hệ. Số điện thoại ghi trong bài sẽ bị cũ khi đổi số.
- **Ảnh:** hiện chưa chèn ảnh vào bài (API chỉ nhận file `.md`).

### Link

| Loại | Quy tắc |
|---|---|
| Tới trang dịch vụ | **Bắt buộc ít nhất 1 link**, ví dụ `[dịch vụ chăm bé](/dich-vu/cham-be/)`. Muốn trỏ thẳng tới bảng giá thì dùng `/dich-vu/cham-be/#bang-gia`. |
| Tới bài cẩm nang khác | Nên có 1–3 link, ví dụ `[hợp đồng thuê giúp việc](/cam-nang/hop-dong-thue-giup-viec-can-co-gi/)`. |
| Trang chung | `/bang-gia/`, `/chinh-sach-bao-hanh/` (chính sách đổi người), `/lien-he/` |
| Ra ngoài | Chỉ dẫn tới nguồn chính thống như văn bản luật, Bộ Y tế, cổng Chính phủ. Ghi đủ `https://...`. |

- Link trong web ghi đường dẫn tương đối, **có dấu `/` ở cuối**.
- Chữ gắn link phải nói rõ trang đích là gì. Không dùng "tại đây", "click vào đây".

---

## 5. Giọng văn

- **Gọi người đọc** là "anh chị" hoặc "gia đình".
- **Trung tâm tự xưng** là "trung tâm" hoặc "An Gia". Hạn chế dùng "chúng tôi".
- **Gọi người lao động** là "người giúp việc", "người chăm", "người làm".
  **Không dùng** "ô sin / osin", "con sen", "người ở", "đứa", hay bất kỳ từ coi thường nào.
- Câu ngắn, chủ ngữ rõ, tiếng Việt có dấu đầy đủ. Không dùng teen code, emoji, dấu `!!!`.
- **Cách ghi số:**
  - Khoảng giá: `8 – 10 triệu/tháng` (gạch ngang dài, có dấu cách hai bên).
  - Số tiền: `70.000đ`.
  - Thời lượng: `3 giờ`, `ca 12 giờ`.
  - Ngày tháng trong câu: `20/11/2026`.
- Viết như người tư vấn có kinh nghiệm đang nói với khách: thực tế và cụ thể, không lên lớp, không dọa.

---

## 6. Quy tắc nội dung bắt buộc

### 6.1. Trung thực, không quảng cáo sai

- **Không dùng** các từ "nhất", "số 1", "duy nhất", "hàng đầu", "tốt nhất", "uy tín nhất". Luật Quảng cáo cấm các từ này khi không có tài liệu chứng minh.
- **Không dùng** các cụm "100%", "cam kết tuyệt đối", "giá cố định", "không phát sinh", "không bao giờ".
- **Không đưa con số mà web chưa có**, chẳng hạn số năm hoạt động, số khách, số người lao động, tỷ lệ hài lòng. Muốn thêm số liệu mới thì chủ website phải xác nhận trước.
- **Không bịa câu chuyện hay lời khách.** Ví dụ minh họa phải ghi rõ "Ví dụ:" hoặc "Ví dụ tham khảo:" và dùng từ "thường", không viết như một cam kết.
- **Không nêu tên, không chê và không so sánh với trung tâm khác.**

### 6.2. Giá và phí

- **Ưu tiên dẫn link** tới bảng giá (`/dich-vu/<dịch-vụ>/#bang-gia` hoặc `/bang-gia/`) thay vì gõ lại con số.
- Nếu bắt buộc phải ghi giá:
  - Mở bảng giá của dịch vụ đó trên web (`/dich-vu/<dịch-vụ>/#bang-gia`), chép **đúng y** con số đang hiển thị và gọi là "giá tham khảo".
  - Ghi trong báo cáo gửi người quản lý rằng **bài có ghi giá**. Người quản lý cần biết để thêm bài vào danh sách các chỗ phải sửa khi đổi giá.
- **Lương:** viết là gia đình **trả trực tiếp** cho người giúp việc.
- **Phí trung tâm:** chỉ viết "phí dịch vụ của trung tâm được tư vấn rõ và ghi trong hợp đồng". Gắn phí với những gì khách nhận được: tìm người phù hợp, xác minh hồ sơ, đổi người trong thời gian bảo hành.
  **Không dùng** chữ "hoa hồng", **không nêu** con số hay cách tính phí (phần trăm, "một lần"…).

### 6.3. Cam kết về quy trình

Chỉ được viết những điều đã có trên web:

- Xác minh căn cước (CCCD); xác nhận của địa phương **khi có**.
- Với người **đã từng đi làm**: gọi hỏi gia đình cũ. Với người mới: ghi rõ là chưa có kinh nghiệm.
- Phỏng vấn trực tiếp, hoặc qua video, điện thoại với người ở xa.
- Hợp đồng ba bên: gia đình, người giúp việc, trung tâm.
- Đổi người miễn phí **theo [chính sách đổi người](/chinh-sach-bao-hanh/)**, không hứa "đổi đến khi hài lòng".

**Không viết** khi chủ website chưa xác nhận: "kiểm tra sức khỏe", "đào tạo theo chuẩn trung tâm", "gặp trực tiếp tất cả", "có bảo hiểm", "phản hồi trong X phút" (trừ thời gian đã ghi trên web).

### 6.4. Chăm sóc sức khỏe

- Người giúp việc và người chăm **hỗ trợ sinh hoạt, không thay nhân viên y tế**. Khi bài nói tới giới hạn công việc, dùng thống nhất danh sách sau:
  - Không tiêm, truyền dịch. Không đặt, rút hay thay ống sonde, ống thông tiểu. Không hút đờm, không thay băng vết mổ hay vết loét.
  - Không tự ý cho dùng thuốc hay đổi liều. Chỉ cho uống thuốc đã được chia sẵn theo đơn.
  - Không chẩn đoán. Thấy dấu hiệu bất thường thì báo gia đình, điều dưỡng, hoặc gọi **115** khi khẩn cấp.
- **Không đưa** lời khuyên điều trị, liều thuốc, chế độ ăn cho bệnh lý cụ thể. Viết "theo hướng dẫn của bác sĩ".
- Bài về trẻ sơ sinh: không hướng dẫn cách xử lý khi bé sốt, sặc hay ngạt. Viết "đưa bé đi khám / gọi 115".

### 6.5. Pháp luật

- Khi nhắc tới luật, ghi **đúng tên văn bản và số điều**, nên kèm link văn bản gốc. Không đoán.
- Cuối phần nói về luật, thêm câu: *"Thông tin mang tính tham khảo, không thay thế tư vấn pháp lý."*
- Không khuyến khích làm trái luật, ví dụ:
  - **Không** khuyên giữ căn cước hay giấy tờ tùy thân của người giúp việc.
  - **Không** khuyên đặt camera trong phòng ngủ hay nơi tắm của người giúp việc. Camera ở khu vực chung phải được báo cho người giúp việc biết.
  - **Không** khuyên khấu trừ lương tùy tiện hay giữ lương để "giữ chân".

### 6.6. Tôn trọng, không phân biệt

- Không gắn tính cách hay hành vi với **quê quán, vùng miền, dân tộc, tôn giáo, tuổi tác, giới tính**. Ví dụ không viết "người ở vùng X chăm chỉ hơn".
- Không quy chụp kiểu "người giúp việc hay ăn cắp, hay bỏ ngang". Lời khuyên an toàn viết trung lập, áp dụng cho mọi người.
- Viết công bằng cho cả hai bên. Khi bàn về quyền lợi (ngày nghỉ, giờ nghỉ, chỗ ở), đứng ở cả góc nhìn của gia đình lẫn người lao động.

### 6.7. Dữ liệu cá nhân

- **Không nêu** tên thật, số điện thoại, địa chỉ, ảnh của khách hay người lao động.
- Câu chuyện thật phải được ẩn danh (ví dụ "một gia đình ở Hà Đông") và **đã được người trong câu chuyện đồng ý**.

### 6.8. Phạm vi của An Gia

- Trung tâm đặt tại Hà Nội và **kết nối người làm trên toàn quốc**. Không viết bài nhắm vào từng quận, huyện ("giúp việc quận Cầu Giấy…").
- Kênh liên hệ chỉ có Hotline, Zalo, Messenger. Không nhắc tới form đăng ký hay "để lại thông tin".

### 6.9. Nội dung gốc

- **Không chép** từ web khác, kể cả viết lại từng câu cho khác đi.
- Viết bằng AI thì **người phải đọc lại** toàn bộ, đặc biệt là giá, luật và các cam kết. AI hay bịa số điều luật và số liệu.
- Mỗi bài phải có ít nhất một thông tin từ kinh nghiệm thực tế của trung tâm: câu khách hay hỏi, lỗi gia đình hay gặp, việc nên thỏa thuận trước. Đây là điểm khiến bài khác với các bài viết chung chung trên mạng.
### 6.10. Chuẩn SEO: từ khóa và lặp từ

Google đánh giá bài theo việc bài có **trả lời đúng và đủ câu hỏi của người tìm kiếm** hay không, không theo số lần lặp từ khóa. Nhồi từ khóa làm bài khó đọc và có thể bị Google hạ hạng.

**Chọn từ khóa**

- Mỗi bài có **một từ khóa chính** ứng với đúng câu hỏi bài trả lời, ví dụ "thuê người chăm bệnh nhân tại bệnh viện". Kèm 3–5 **cách nói khác** mà người đọc cũng hay dùng, ví dụ "người chăm bệnh trong viện", "nuôi bệnh thuê", "chăm người bệnh nằm viện".
- Không có hai bài cùng nhắm một từ khóa chính. Nếu trùng, sửa bài cũ thay vì viết bài mới.

**Đặt từ khóa ở đâu**

| Vị trí | Quy tắc |
|---|---|
| Tên file (slug) | Có từ khóa chính, viết không dấu |
| `title` | Có từ khóa chính hoặc một cách nói rất gần, đặt ở nửa đầu |
| `description` | Có từ khóa chính hoặc một cách nói khác, trong một câu tự nhiên |
| Mở bài | Nhắc tới chủ đề một lần, tự nhiên |
| Tiêu đề mục `##` | **Tối đa 1–2 mục** có từ khóa. Các mục còn lại đặt theo nội dung của mục đó |
| Thân bài | Dùng xen kẽ các cách nói khác, đại từ ("việc này", "người chăm") và từ liên quan |

**Không được làm**

- **Không dùng từ khóa cứng**: cụm từ chèn vào chỉ để khớp từ khóa, làm câu sai ngữ pháp hoặc gượng. Ví dụ:
  - ❌ "Dịch vụ giúp việc Hà Nội giá rẻ uy tín là lựa chọn khi thuê giúp việc Hà Nội."
  - ❌ "Nếu anh chị đang tìm thuê người chăm bệnh nhân tại bệnh viện, thuê người chăm bệnh nhân tại bệnh viện cần lưu ý…"
  - ❌ Chữ không dấu: "giup viec gia dinh", "thue osin".
  - ✅ "Khi người thân nằm viện, nhiều gia đình thuê người chăm để thay ca trực đêm."
- **Không nhồi:** cùng một cụm từ khóa chính nguyên văn **không xuất hiện quá 1 lần trong một đoạn**, và cả bài chỉ khoảng **1 lần mỗi 150–200 từ** (bài 800 từ thì khoảng 4–5 lần, tính cả title và các tiêu đề mục).
- **Không ghép nhiều từ khóa** vào title hay tiêu đề mục, ví dụ ❌ "Giúp việc – Thuê giúp việc – Giúp việc gia đình giá tốt".
- **Không thêm** danh sách "Từ khóa: …" cuối bài, chữ ẩn, hay mục hỏi đáp dựng lên chỉ để chèn từ khóa.
- **Không thêm** địa danh vào câu chỉ để nhắm khu vực (mục 6.8).

**Không lặp từ, lặp ý**

- Hai câu liền nhau không dùng lại cùng một cụm từ dài từ 3 chữ trở lên. Đổi cách nói hoặc dùng đại từ.
- Các đoạn hoặc các dòng gạch đầu dòng liền nhau không mở đầu bằng cùng một từ (ví dụ ba đoạn liền đều mở bằng "Ngoài ra", ba dòng liền đều mở bằng "Nên").
- Các tiêu đề mục `##` không lặp cùng một cấu trúc hay cùng một từ mở đầu.
- Mỗi mục nói một ý mới. Không tóm tắt lại các mục trước ở cuối bài. Không lặp nội dung đã có ở bài khác: dẫn link tới bài đó.
- Không dùng từ đệm vô nghĩa: "vô cùng", "cực kỳ", "hết sức", "thực sự rất", "một cách hiệu quả".

**Viết để trả lời câu hỏi**

- Câu đầu tiên dưới mỗi mục `##` trả lời thẳng câu hỏi của mục đó. Phần sau mới giải thích hoặc nêu ví dụ.
- Chữ gắn link nói rõ trang đích là gì. Không lặp cùng một chữ gắn link cho nhiều link, và không lấy nguyên từ khóa chính làm chữ gắn link mọi lần.
- Link trong web: khoảng 3–8 link mỗi bài, đặt ở chỗ người đọc thực sự cần xem thêm. Không dồn nhiều link vào một đoạn.

---

## 7. Lỗi build thường gặp

| Thông báo | Nguyên nhân | Cách sửa |
|---|---|---|
| `description: Required` | Thiếu trường bắt buộc | Thêm trường còn thiếu |
| `pubDate: Invalid date` | Ngày sai định dạng | Ghi theo dạng `2026-11-20` |
| Thông báo lỗi có chữ `yaml` | Thiếu `"` quanh nội dung có dấu `:`, hoặc thụt lề bằng Tab | Bọc nội dung bằng `"..."`, thay Tab bằng dấu cách |
| API trả về `Thiếu frontmatter` | File không bắt đầu bằng `---` | Dòng đầu tiên của file phải là `---` |

---

## 8. Sửa bài đã đăng

- Gửi lại file với **cùng tên**. Không đổi tên file.
- Sửa số liệu, luật hoặc thêm mục thì thêm hoặc cập nhật `updatedDate`.
- Bỏ một bài thì báo người quản lý. Nếu bài đã có lượt truy cập từ Google, cần chuyển hướng link sang bài gần nhất.

---

## 9. Bài đã có và chủ đề gợi ý

Danh sách đầy đủ và mới nhất nằm ở trang `/cam-nang/` trên web (nhiều trang thì bấm sang trang 2, 3…). **Luôn mở trang này để kiểm tra trùng.** Bảng dưới đây chỉ là các bài đã có tại thời điểm viết tài liệu.

| Bài | Chủ đề |
|---|---|
| `bang-gia-thue-giup-viec-2026` | Bảng giá các loại dịch vụ |
| `giup-viec-o-lai-hay-theo-gio` | So sánh ở lại và theo giờ |
| `hop-dong-thue-giup-viec-can-co-gi` | Điều khoản hợp đồng |
| `giay-to-can-kiem-tra-khi-thue-giup-viec` | Giấy tờ, Bộ luật Lao động |
| `cau-hoi-phong-van-nguoi-giup-viec` | Câu hỏi phỏng vấn |
| `cach-chon-nguoi-cham-soc-nguoi-gia` | Chọn người chăm người già |
| `kinh-nghiem-thue-nguoi-cham-tre-so-sinh` | Thuê người chăm sơ sinh |
| `thue-nguoi-cham-benh-nhan-tai-benh-vien` | Chăm bệnh nhân tại viện |

**Chủ đề gợi ý (chưa có bài):**

| Chủ đề | Ghi chú |
|---|---|
| Người giúp việc nghỉ ngang: gia đình nên làm gì | Link tới chính sách đổi người |
| Những tuần đầu khi người giúp việc mới đến nhà | Hướng dẫn, phân việc, quy tắc chung trong nhà |
| Cách giữ người giúp việc làm lâu dài | Cách đối xử, ngày nghỉ, thưởng |
| Dấu hiệu lừa đảo khi tìm giúp việc qua mạng | |
| Bài cho người lao động: lần đầu đi làm giúp việc, quyền lợi | Link tới `/tuyen-dung/` |
| Thuê người chăm bé theo giờ hành chính hay ở lại | **Hỏi người quản lý trước khi viết**: chưa rõ trung tâm có nhận theo giờ hành chính không |

---

## 10. Kiểm tra trước khi gửi (bắt buộc)

Làm lần lượt từng bước. Bước nào chưa đạt thì sửa bài rồi kiểm tra lại từ đầu. **Không gửi bài khi còn bước nào chưa đạt hoặc còn điều chưa chắc.** Gặp điều chưa chắc thì dừng lại và hỏi người quản lý.

### Bước 1. Đầu file

- [ ] Dòng đầu tiên của file là `---`, phần đầu file kết thúc bằng một dòng `---`.
- [ ] Tên file (slug) chỉ gồm `a-z`, `0-9`, `-`, và không trùng tên bài nào trên `/cam-nang/`. Riêng khi **sửa** bài cũ thì phải trùng đúng tên bài cũ.
- [ ] `title` **≤ 60 ký tự**: đếm cả dấu cách và dấu tiếng Việt.
- [ ] `description` **120–155 ký tự** và được bọc trong `"..."`.
- [ ] `pubDate` theo dạng `NĂM-THÁNG-NGÀY`, là hôm nay hoặc một ngày trước đó.
- [ ] `service` (nếu có) đúng chính tả một trong 7 tên ở mục 3.
- [ ] Mọi nội dung có dấu `:` đều nằm trong `"..."`. Không có ký tự Tab.

### Bước 2. Cấu trúc

- [ ] Không có dòng nào bắt đầu bằng `# ` (một dấu `#`).
- [ ] Có 4–7 mục `##`. Mục `###` chỉ nằm bên trong một mục `##`.
- [ ] Thân bài dài 600–1.200 từ, mở bài 2–4 câu.

### Bước 3. Link

Lấy ra **mọi** link trong bài, dạng `[chữ](đường-dẫn)`, rồi kiểm tra từng link:

- [ ] **Link trong web:** bắt đầu bằng `/` và kết thúc bằng `/`, hoặc kết thúc bằng `/#bang-gia` khi trỏ tới bảng giá dịch vụ. Đường dẫn phải nằm trong danh sách dưới đây. Nếu có thể mở web, mở `https://giupviecangia.com<đường-dẫn>` để chắc trang có thật.

  | Trang | Đường dẫn |
  |---|---|
  | Trang chủ, danh sách dịch vụ | `/`, `/dich-vu/` |
  | Dịch vụ | `/dich-vu/giup-viec-o-lai-nha/`, `/dich-vu/giup-viec-theo-gio/`, `/dich-vu/cham-be/`, `/dich-vu/cham-nguoi-gia/`, `/dich-vu/cham-nguoi-benh/`, `/dich-vu/tap-vu-van-phong/`, `/dich-vu/giup-viec-tet/` |
  | Bảng giá dịch vụ | `/dich-vu/<dịch-vụ>/#bang-gia`, `/bang-gia/` |
  | Cẩm nang | `/cam-nang/`, `/cam-nang/<tên-bài>/` (chỉ các bài có trên `/cam-nang/`) |
  | Trang khác | `/chinh-sach-bao-hanh/`, `/chinh-sach-bao-mat/`, `/gioi-thieu/`, `/lien-he/`, `/tuyen-dung/` |

- [ ] **Link ra ngoài:** bắt đầu bằng `https://`, mở được, và nội dung trang đúng với điều bài đang dẫn. Không dẫn tới trang của trung tâm giúp việc khác.
- [ ] Có ít nhất 1 link tới trang dịch vụ.
- [ ] Không có chữ gắn link nào là "tại đây", "click", "xem ngay".

### Bước 4. Rà từ cấm

Tìm từng cụm sau trong **toàn bộ file** (cả `title` và `description`). Với mỗi chỗ tìm thấy, đọc cả câu rồi xử lý:

| Tìm | Xử lý |
|---|---|
| `nhất`, `số 1`, `số một`, `duy nhất`, `hàng đầu` | Bỏ hoặc viết lại nếu đang khen trung tâm hay dịch vụ. Được giữ khi không phải lời khen, ví dụ "thống nhất", "ít nhất", "nhất là". |
| `100%`, `tuyệt đối`, `chắc chắn`, `không bao giờ`, `giá cố định`, `không phát sinh` | Viết lại cho mềm hơn ("thường", "trong đa số trường hợp"), hoặc bỏ. |
| `hoa hồng`, `%` (khi nói về phí) | Bỏ. Dùng câu chuẩn ở mục 6.2. |
| `ô sin`, `osin`, `con sen`, `người ở` | Thay bằng "người giúp việc". |
| Chuỗi 10 chữ số liền nhau hoặc có dấu cách xen giữa (số điện thoại), `zalo`, `hotline`, `gọi ngay`, `inbox` | Bỏ khỏi bài. |
| Tên quận, huyện, tỉnh | Chỉ giữ khi đó là ví dụ đã ẩn danh. Không viết bài nhắm vào một khu vực. |

### Bước 5. SEO và lặp từ

Ghi ra từ khóa chính của bài và 3–5 cách nói khác, rồi kiểm tra:

- [ ] Từ khóa chính có trong slug, `title` (ở nửa đầu) và `description`, và đọc lên vẫn là câu tự nhiên.
- [ ] **Đếm số lần** cụm từ khóa chính xuất hiện nguyên văn trong cả file (tính cả title và tiêu đề mục). Số lần không quá số từ của bài chia 150. Ví dụ bài 900 từ thì tối đa 6 lần. Vượt thì thay bớt bằng cách nói khác hoặc đại từ.
- [ ] Không đoạn nào có cụm từ khóa chính 2 lần trở lên.
- [ ] Tối đa 2 tiêu đề mục `##` có từ khóa chính. Các tiêu đề mục không mở đầu cùng một từ.
- [ ] Không có chữ không dấu, không có câu ghép từ khóa gượng ép (xem ví dụ ❌ ở mục 6.10).
- [ ] Đọc từng cặp câu liền nhau: không lặp cụm từ dài từ 3 chữ trở lên. Đọc các đoạn và dòng gạch đầu dòng liền nhau: không mở đầu cùng một từ.
- [ ] Không có từ đệm "vô cùng", "cực kỳ", "hết sức", "thực sự rất".
- [ ] Mỗi mục `##` mở bằng một câu trả lời thẳng. Không có mục nào chỉ nhắc lại ý của mục khác.
- [ ] `title` và `description` không trùng với bài nào trên `/cam-nang/`.

### Bước 6. Đối chiếu sự thật

- [ ] **Giá:** từng con số tiền trong bài phải khớp đúng bảng giá đang hiển thị ở `/dich-vu/<dịch-vụ>/#bang-gia`. Con số nào không có trên bảng giá thì bỏ.
- [ ] **Cam kết của trung tâm:** mỗi câu nói trung tâm làm gì phải nằm trong danh sách ở mục 6.3.
- [ ] **Số liệu khác** (năm hoạt động, số khách, tỷ lệ…): bỏ nếu không có trên web.
- [ ] **Luật:** mở văn bản gốc và kiểm tra tên văn bản, số điều, nội dung điều. Không tìm được văn bản gốc thì bỏ số điều, chỉ nói ý chung. Phải có câu "Thông tin mang tính tham khảo, không thay thế tư vấn pháp lý."
- [ ] **Sức khỏe:** không có liều thuốc, cách điều trị hay cách sơ cứu. Có nhắc giới hạn y tế (mục 6.4) nếu bài nói về việc chăm người bệnh, người già hoặc trẻ nhỏ.
- [ ] **Câu chuyện, ví dụ:** có ghi "Ví dụ" và không có tên thật, số điện thoại, địa chỉ cụ thể.

### Bước 7. Đọc lại như người đọc

Đọc toàn bài một lượt từ góc nhìn một gia đình đang cần thuê người:

- [ ] Mở bài nói đúng vấn đề, đọc xong biết phải làm gì tiếp.
- [ ] Không có đoạn lặp ý, đoạn chỉ để kéo dài, hay câu quảng cáo chung chung.
- [ ] Đúng giọng văn ở mục 5, viết công bằng cho cả gia đình và người lao động (mục 6.6).
- [ ] Không có lỗi chính tả, sai dấu, câu cụt.

### Bước 8. Gửi và báo cáo

Đạt hết 7 bước trên thì gửi bài qua API. Sau đó báo lại cho người quản lý theo mẫu:

```
Bài: <title>
Link: https://giupviecangia.com/cam-nang/<slug>/   (hoặc: chưa đăng, lỗi …)
Kiểm tra: title X ký tự, description Y ký tự, Z từ, N link (đã kiểm tra hết)
Từ khóa chính: "…" xuất hiện K lần (tối đa cho phép: Z / 150); cách nói khác: …
Có ghi giá: có / không
Có dẫn luật: có (văn bản, điều …) / không
Điểm cần người quản lý xem lại: … (nếu không có, ghi "không")
```

Nếu API trả về lỗi `422`, sửa theo log, chạy lại **từ Bước 1** rồi mới gửi lại.
