import { tours } from '@/data/tours';

const totalReviews = tours.reduce((sum, t) => sum + t.reviewCount, 0);
const avgRating = tours.length
  ? tours.reduce((sum, t) => sum + t.rating, 0) / tours.length
  : 0;
const minPrice = tours.length ? Math.min(...tours.map((t) => t.price)) : 0;

export const trustStats = {
  totalTours: tours.length,
  avgRating: Number(avgRating.toFixed(2)),
  totalReviews,
  freeCancellationPct: 95,
  minPrice,
};

export const TOP_CONVERTER_BY_DESTINATION: Record<string, { slug: string; activityId: string; reason: string }> = {};
