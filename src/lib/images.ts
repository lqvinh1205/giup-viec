import type { ImageMetadata } from 'astro';

// Ảnh theo dịch vụ: src/assets/services/<tên-file-dịch-vụ>.(jpg|jpeg|png|webp)
const services = import.meta.glob<{ default: ImageMetadata }>('../assets/services/*.{jpg,jpeg,png,webp}', { eager: true });

export function serviceImage(slug: string): ImageMetadata | undefined {
  const hit = Object.entries(services).find(([path]) => path.split('/').pop()!.replace(/\.\w+$/, '') === slug);
  return hit?.[1].default;
}
