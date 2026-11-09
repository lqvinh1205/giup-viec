// TODO: Điền thông tin thật của trung tâm trước khi deploy.
export const SITE_URL = 'https://giupviec-example.vn'; // TODO: tên miền thật

export const site = {
  name: 'Giúp Việc An Gia', // TODO: tên thương hiệu
  shortName: 'An Gia',
  tagline: 'Người giúp việc tận tâm, giá công khai',
  description:
    'Trung tâm giúp việc nhà tại Hà Nội: giúp việc ở lại, theo giờ, chăm bé, chăm người già, chăm người bệnh. Hồ sơ xác minh, đổi người miễn phí, giá công khai.',

  hotline: '0900000000', // TODO: số hotline (không dấu cách)
  hotlineDisplay: '0900 000 000',
  zalo: '0900000000', // TODO: số Zalo
  fanpage: 'https://www.facebook.com/giupviec.example', // TODO
  messenger: 'https://m.me/giupviec.example', // TODO
  email: 'lienhe@giupviec-example.vn', // TODO

  address: {
    street: 'Số 1 Đường Ví Dụ', // TODO
    ward: 'Phường Dịch Vọng',
    district: 'Quận Cầu Giấy',
    city: 'Hà Nội',
    postalCode: '100000',
  },
  geo: { lat: 21.0333, lng: 105.7942 }, // TODO: tọa độ thật
  mapEmbed: '', // TODO: link nhúng Google Maps (src của iframe)

  // Giờ làm thật — chỉ ghi đúng những gì trung tâm đáp ứng được.
  hours: { label: '7:30 – 20:00, tất cả các ngày', opens: '07:30', closes: '20:00' },
  responseTime: '30 phút', // cam kết phản hồi trong giờ làm việc

  foundingYear: 2018, // TODO

  analytics: {
    gtmId: '', // TODO: GTM-XXXXXXX — để trống thì không nạp GTM
  },
};

export const telHref = `tel:+84${site.hotline.replace(/^0/, '')}`;
export const zaloHref = `https://zalo.me/${site.zalo}`;

export const nav = [
  { label: 'Dịch vụ', href: '/dich-vu/' },
  { label: 'Bảng giá', href: '/bang-gia/' },
  { label: 'Cẩm nang', href: '/cam-nang/' },
  { label: 'Tuyển dụng', href: '/tuyen-dung/' },
  { label: 'Giới thiệu', href: '/gioi-thieu/' },
  { label: 'Liên hệ', href: '/lien-he/' },
];
