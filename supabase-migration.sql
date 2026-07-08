-- Run once in Supabase dashboard -> SQL editor.
-- Adds the 5 columns the new TrackedGYGLink dimensions write to.
-- Until this runs, /api/track-click on both BLT and TBT falls back to the
-- minimal payload (type, city, section, site) so existing tracking still works.

ALTER TABLE affiliate_clicks
  ADD COLUMN IF NOT EXISTS activity_id text,
  ADD COLUMN IF NOT EXISTS url_type    text,
  ADD COLUMN IF NOT EXISTS variant     text,
  ADD COLUMN IF NOT EXISTS destination text,
  ADD COLUMN IF NOT EXISTS page_path   text;

-- Helpful indexes for the 4-week A/B analysis:
CREATE INDEX IF NOT EXISTS affiliate_clicks_activity_id_idx ON affiliate_clicks (activity_id);
CREATE INDEX IF NOT EXISTS affiliate_clicks_url_type_idx    ON affiliate_clicks (url_type);
CREATE INDEX IF NOT EXISTS affiliate_clicks_variant_idx     ON affiliate_clicks (variant);

-- Refresh PostgREST schema cache so the columns are immediately visible to the API:
NOTIFY pgrst, 'reload schema';
