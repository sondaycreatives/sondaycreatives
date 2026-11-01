// Cloudflare Pages Function: /api/resolve?u=<tiktok share link>
// Follows a TikTok short link, returns the video id and (when available) the poster image.
const OK = new Set(['vt.tiktok.com', 'vm.tiktok.com', 'www.tiktok.com', 'tiktok.com']);

export async function onRequestGet({ request }) {
  const u = new URL(request.url).searchParams.get('u') || '';
  let target;
  try { target = new URL(u); } catch { return json({ error: 'bad url' }, 400); }
  if (target.protocol !== 'https:' || !OK.has(target.hostname)) return json({ error: 'host not allowed' }, 400);

  try {
    const r = await fetch(target.toString(), { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (compatible; SondayPreview/1.0)' } });
    const m = (r.url || '').match(/\/video\/(\d+)/) || (await r.text()).match(/\/video\/(\d{15,})/);
    if (!m) return json({ error: 'no video id' }, 404);
    const id = m[1];
    let thumbnail = '', title = '';
    try {
      const o = await fetch('https://www.tiktok.com/oembed?url=' + encodeURIComponent('https://www.tiktok.com/video/' + id));
      if (o.ok) { const j = await o.json(); thumbnail = j.thumbnail_url || ''; title = j.title || ''; }
    } catch {}
    return json({ id, thumbnail, title }, 200, { 'cache-control': 'public, max-age=86400' });
  } catch {
    return json({ error: 'lookup failed' }, 502);
  }
}

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...extra } });
}
