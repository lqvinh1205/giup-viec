// TODO: Điền thông tin thật của trung tâm trước khi deploy.
export const SITE_URL = 'https://giupviecangia.com'; // TODO: tên miền thật

export const site = {
  name: 'Giúp Việc An Gia', // TODO: tên thương hiệu
  shortName: 'An Gia',
  tagline: 'Người giúp việc tận tâm, giá công khai',
  description:
    'Trung tâm giúp việc nhà tại Hà Nội: giúp việc ở lại, theo giờ, chăm bé, chăm người già, chăm người bệnh. Hồ sơ xác minh, đổi người miễn phí, khung giá công khai.',

  hotline: '0826722314', // TODO: số hotline (không dấu cách)
  hotline1: '0399359431', // TODO: số hotline (không dấu cách)
  hotlineDisplay: '0826 722 314',
  hotlineDisplay1: '0399 359 431',
  zalo: '0826722314', // TODO: số Zalo
  fanpage: 'https://www.facebook.com/profile.php?id=100078073040285', // TODO
  messenger: 'https://m.me/100078073040285', // TODO
  email: 'lienhe@giupviecangia.com', // TODO

  address: {
    street: 'Số 4 Ngõ 50', // TODO
    ward: 'Đường Đình Thôn',
    district: 'Quận Từ Liêm',
    city: 'Hà Nội',
    postalCode: '100000',
  },
  geo: { lat: 21.020609118272585, lng: 105.77776886781507 }, // TODO: tọa độ thật
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4519.600204214624!2d105.77520467600772!3d21.02044888062626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454ac74a16f4f%3A0xef808db1b5c4bc97!2zNCBOZy4gNTAgxJAuIMSQw6xuaCBUaMO0biwgxJDDrG5oIFRow7RuLCBU4burIExpw6ptLCBIw6AgTuG7mWksIFZpZXRuYW0!5e1!3m2!1sen!2s!4v1794210552571!5m2!1sen!2s', // TODO: link nhúng Google Maps (src của iframe)

  // Giờ làm thật — chỉ ghi đúng những gì trung tâm đáp ứng được.
  hours: { label: '7:30 – 20:00, tất cả các ngày', opens: '07:30', closes: '20:00' },
  responseTime: '30 phút', // cam kết phản hồi trong giờ làm việc

  foundingYear: 2018, // TODO

  analytics: {
    gtmId: '', // TODO: GTM-XXXXXXX — để trống thì không nạp GTM
  },
};

export const telHref = `tel:+84${site.hotline.replace(/^0/, '')}`;
export const telHref1 = `tel:+84${site.hotline1.replace(/^0/, '')}`;
export const zaloHref = `https://zalo.me/${site.zalo}`;

export const nav = [
  { label: 'Dịch vụ', href: '/dich-vu/' },
  { label: 'Bảng giá', href: '/bang-gia/' },
  { label: 'Cẩm nang', href: '/cam-nang/' },
  { label: 'Tuyển dụng', href: '/tuyen-dung/' },
  { label: 'Giới thiệu', href: '/gioi-thieu/' },
  { label: 'Liên hệ', href: '/lien-he/' },
];
