import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getCategoryBySlug, categories } from '@/data/categories';

export const runtime = 'nodejs';
export const alt = 'Category';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

type Params = Promise<{ slug: string }>;

export default async function OGImage({ params }: { params: Params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
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
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #264b7a 50%, #2e5d95 100%)',
          fontFamily: 'Geist',
        }}
      >
        <div style={{ fontSize: 18, color: '#93c5fd', marginBottom: 16, display: 'flex' }}>best-iceland-tours.com</div>
        <div style={{ fontSize: 48, fontWeight: 800, color: 'white', textAlign: 'center', display: 'flex' }}>
          {category?.title || 'Iceland Tours'}
        </div>
        <div style={{ fontSize: 22, color: '#93c5fd', marginTop: 16, display: 'flex' }}>
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
