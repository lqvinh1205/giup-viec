import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: z.object({
    order: z.number(),
    name: z.string(), // tên ngắn, dùng ở card/menu
    title: z.string(), // <title>, ≤ 60 ký tự
    description: z.string(), // meta description, ≤ 155 ký tự
    h1: z.string(),
    summary: z.string(), // 1–2 câu cho card
    icon: z.string(),
    audience: z.enum(['family', 'business']).default('family'), // business = khách doanh nghiệp (tạp vụ)
    priceFrom: z.number(),
    priceUnit: z.enum(['tháng', 'giờ', 'ngày', 'buổi', 'ca']),
    prices: z.array(z.object({ name: z.string(), price: z.string(), note: z.string().optional() })),
    scope: z.array(z.string()),
    medicalLimits: z.boolean().default(false), // hiện danh sách việc chuyên môn y tế không đảm nhận
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    service: z.string().optional(), // slug dịch vụ liên quan, để liên kết nội bộ
  }),
});

const reviews = defineCollection({
  loader: file('./src/content/reviews.json'),
  schema: z.object({
    name: z.string(),
    place: z.string(),
    service: z.string(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    date: z.coerce.date(),
    // tên file ảnh đại diện trong src/assets/reviews/ (vd "chi-ngoc.jpg"), cần khách đồng ý
    avatar: z.string().optional(),
    // true = nội dung mẫu, chỉ hiện khi dev, tự ẩn khi build production
    sample: z.boolean().default(false),
  }),
});

export const collections = { services, blog, reviews };
