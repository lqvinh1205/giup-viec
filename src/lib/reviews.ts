import { getCollection } from 'astro:content';

export async function getReviews(service?: string) {
  // todo: filter out sample reviews in production
  // const all = await getCollection('reviews', ({ data }) => import.meta.env.DEV || !data.sample);
  const all = await getCollection('reviews');
  return all
    .map((r) => r.data)
    .filter((r) => !service || r.service === service)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
