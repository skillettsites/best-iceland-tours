import { MetadataRoute } from 'next';
import { tours } from '@/data/tours';
import { categories } from '@/data/categories';
import { guides } from '@/data/guides';
import { SITE_URL, CONTENT_DATE } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_DATE);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/tours`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: 'monthly', priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: 'monthly', priority: 0.2 },
    { url: `${SITE_URL}/affiliate-disclosure`, lastModified, changeFrequency: 'monthly', priority: 0.2 },
  ];

  const REDIRECTED_SLUGS = new Set<string>([]);

  const tourPages: MetadataRoute.Sitemap = tours
    .filter((tour) => !REDIRECTED_SLUGS.has(tour.slug))
    .map((tour) => ({
      url: `${SITE_URL}/tours/${tour.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...tourPages, ...categoryPages, ...guidePages];
}
