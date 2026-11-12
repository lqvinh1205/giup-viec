import { getCollection } from 'astro:content';

export async function getReviews(service?: string) {
  // Đánh giá mẫu (sample: true) chỉ hiện khi chạy dev, tự ẩn khi build production
  const all = await getCollection('reviews', ({ data }) => import.meta.env.DEV || !data.sample);
  return all
    .map((r) => r.data)
    .filter((r) => !service || r.service === service)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
