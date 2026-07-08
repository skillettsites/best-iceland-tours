import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getGuideBySlug, guides } from '@/data/guides';

export const runtime = 'nodejs';
export const alt = 'Guide';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

type Params = Promise<{ slug: string }>;

export default async function OGImage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  const fontPath = join(process.cwd(), 'node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf');
  const fontData = await readFile(fontPath);

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
            Travel Guide
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: 'white', lineHeight: 1.2, maxWidth: 900, display: 'flex' }}>
            {guide?.title || 'Iceland Travel Guide'}
          </div>
        </div>
        <div style={{ fontSize: 20, color: '#dbeafe', display: 'flex' }}>
          best-iceland-tours.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Geist', data: fontData, style: 'normal', weight: 400 }],
    }
  );
}
