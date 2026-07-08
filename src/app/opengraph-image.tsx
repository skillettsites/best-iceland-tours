import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE_NAME, SITE_CITY } from '@/lib/constants';

export const runtime = 'nodejs';
export const alt = `${SITE_NAME} - Discover the best tours and attractions in ${SITE_CITY}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
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
        <div style={{ fontSize: 52, marginBottom: 20, display: 'flex', color: '#93c5fd', fontWeight: 700, letterSpacing: 6 }}>{SITE_CITY.toUpperCase()}</div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.2,
            padding: '0 60px',
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#93c5fd',
            textAlign: 'center',
            marginTop: 20,
            padding: '0 80px',
          }}
        >
          {`Discover the best tours, attractions & experiences in ${SITE_CITY}`}
        </div>
        <div
          style={{
            display: 'flex',
            gap: 30,
            marginTop: 40,
            fontSize: 18,
            color: '#dbeafe',
          }}
        >
          <span>Skip-the-line tickets</span>
          <span>&#x2022;</span>
          <span>Guided tours</span>
          <span>&#x2022;</span>
          <span>Free cancellation</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Geist', data: fontData, style: 'normal', weight: 400 }],
    }
  );
}
