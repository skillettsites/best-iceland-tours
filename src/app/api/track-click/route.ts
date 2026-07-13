import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

const SITE = 'besticelandtours';

async function insert(payload: Record<string, unknown>) {
  return fetch(`${SUPABASE_URL}/rest/v1/affiliate_clicks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, city, section, variant, destination, activity_id, url_type, page_path } = body;

    const geo_city = req.headers.get('x-vercel-ip-city') || null;
    const geo_region = req.headers.get('x-vercel-ip-country-region') || null;
    const geo_country = req.headers.get('x-vercel-ip-country') || null;

    if (!type || !city) {
      return NextResponse.json({ error: 'Missing type or city' }, { status: 400 });
    }

    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      const baseRow = {
        type: String(type),
        city: String(city),
        section: String(section || 'unknown'),
        site: SITE,
      };
      const extended = {
        ...baseRow,
        variant: variant ? String(variant) : null,
        destination: destination ? String(destination) : null,
        activity_id: activity_id ? String(activity_id) : null,
        url_type: url_type ? String(url_type) : null,
        page_path: page_path ? String(page_path) : (req.headers.get('referer') || null),
        geo_city,
        geo_region,
        geo_country,
      };

      // Try full payload first; if extended columns don't exist (PGRST204 -> 400),
      // fall back to the minimal payload so existing tracking keeps working.
      const res = await insert(extended);
      if (!res.ok && res.status === 400) {
        await insert(baseRow);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
