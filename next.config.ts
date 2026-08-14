import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.getyourguide.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/tours/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=1800',
          },
        ],
      },
      {
        source: '/category/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=43200',
          },
        ],
      },
      {
        source: '/guides/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=43200',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // De-cannibalisation: the "best Iceland tours" guide was a near-duplicate of the
      // top-10 blog post, which ranks better and carries far more impressions.
      {
        source: '/guides/best-iceland-tours-2026',
        destination: '/blog/top-10-tours',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
