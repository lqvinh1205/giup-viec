import { site, SITE_URL, zaloHref } from '../config/site';

const abs = (path: string) => new URL(path, SITE_URL).href;
const orgId = `${SITE_URL}/#business`;

export function localBusiness(rating?: { value: number; count: number }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': orgId,
    name: site.name,
    description: site.description,
    url: abs('/'),
    telephone: `+84${site.hotline.replace(/^0/, '')}`,
    email: site.email,
    image: abs('/og-default.jpg'),
    logo: abs('/favicon.svg'),
    priceRange: '50.000đ – 12.000.000đ',
    foundingDate: String(site.foundingYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.street}, ${site.address.ward}`,
      addressLocality: site.address.district,
      addressRegion: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: 'VN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: { '@type': 'Country', name: 'Việt Nam' },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    sameAs: [site.fanpage, zaloHref],
    ...(rating && rating.count > 0
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: rating.value, reviewCount: rating.count } }
      : {}),
  };
}

export function service(s: { name: string; description: string; priceFrom: number; priceUnit: string }, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.description,
    url: abs(path),
    provider: { '@id': orgId },
    areaServed: { '@type': 'Country', name: 'Việt Nam' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        minPrice: s.priceFrom,
        priceCurrency: 'VND',
        unitText: s.priceUnit,
      },
    },
  };
}

export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumb(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Trang chủ', href: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.href),
    })),
  };
}

export function article(a: { title: string; description: string; pubDate: Date; updatedDate?: Date }, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.pubDate.toISOString(),
    dateModified: (a.updatedDate ?? a.pubDate).toISOString(),
    mainEntityOfPage: abs(path),
    image: abs('/og-default.jpg'),
    author: { '@type': 'Organization', name: site.name, url: abs('/') },
    publisher: { '@id': orgId },
  };
}

export const formatVnd = (n: number) => n.toLocaleString('vi-VN') + 'đ';
