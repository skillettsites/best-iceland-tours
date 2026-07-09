import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BOT_REGEX = /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Sogou|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Applebot/i;

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';

  // Let bots through without any processing
  if (BOT_REGEX.test(userAgent)) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const country = request.headers.get('x-vercel-ip-country') || '';
  if (country) res.cookies.set('country', country, { path: '/', maxAge: 2592000, sameSite: 'lax' });
  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
