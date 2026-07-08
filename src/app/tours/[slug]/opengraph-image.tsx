import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getTourBySlug, tours } from '@/data/tours';

export const runtime = 'nodejs';
export const alt = 'Tour details';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

type Params = Promise<{ slug: string }>;

export default async function OGImage({ params }: { params: Params }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  const fontPath = join(process.cwd(), 'node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf');
  const fontData = await readFile(fontPath);
  const fontConfig = [{ name: 'Geist', data: fontData, style: 'normal' as const, weight: 400 as const }];

  if (!tour) {
    return new ImageResponse(
      (<div style={{ width: '100%', height: '100%', background: '#1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 48, fontFamily: 'Geist' }}>Best Iceland Tours</div>),
      { ...size, fonts: fontConfig }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #264b7a 50%, #2e5d95 100%)',
          fontFamily: 'Geist',
          padding: 60,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 18, color: '#93c5fd', marginBottom: 16, display: 'flex' }}>
            best-iceland-tours.com
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.2,
              maxWidth: 900,
            }}
          >
            {tour.title}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div
            style={{
              background: 'white',
              color: '#1e3a5f',
              padding: '12px 24px',
              borderRadius: 8,
              fontSize: 24,
              fontWeight: 700,
              display: 'flex',
            }}
          >
            From &pound;{tour.price}
          </div>
          <div style={{ fontSize: 22, color: '#fbbf24', display: 'flex' }}>
            {tour.rating}/5 stars
          </div>
          <div style={{ fontSize: 20, color: '#93c5fd', display: 'flex' }}>
            {tour.reviewCount.toLocaleString()} reviews
          </div>
          <div style={{ fontSize: 20, color: '#dbeafe', display: 'flex' }}>
            {tour.duration}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontConfig,
    }
  );
}
