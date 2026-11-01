# Sonday Creatives portfolio

Plain HTML, CSS and JavaScript. No build step.

## Put it live (GitHub + Cloudflare Pages)
1. Create a GitHub repository and upload everything in this folder (index.html, assets/, functions/).
2. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git. Pick the repository.
3. Framework preset: None. Build command: leave empty. Output directory: `/` (or leave blank).
4. Save and deploy. Keep the `functions/` folder: it lets TikTok reels find their video id and poster.

## Change content
Everything editable sits at the top of the `<script>` in index.html (search for `EDIT HERE`):
- PHOTOS: add a file to assets/img as `name.jpg` (about 1800px wide) and `name-s.jpg` (about 720px wide), then add a line to PHOTOS and the dimensions to DIM.
- REELS: add `thumb:'assets/img/x.jpg'` for a poster, or `mp4:'assets/video/x.mp4'` for a silent hover preview and native playback. Short MP4s (10 to 15 seconds, under 10 MB) work best.
- FILMS: YouTube video ids and titles.

## Notes
- Instagram and TikTok previews load from their own servers, so they only work on the live site, not when you open index.html from your computer.
- Logos are in assets/logo (white, black and full colour, transparent).
