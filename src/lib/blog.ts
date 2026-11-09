import { getCollection } from 'astro:content';

export const PAGE_SIZE = 9;

export async function getPosts() {
  return (await getCollection('blog')).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}
