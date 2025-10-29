# NICE DAY TODAY — Starter
Full-stack minimal to deploy fast on free tiers.

## Deploy
1) Push to GitHub as repo `NICEDAYTODAY`.
2) Render: New > Web Service from repo root. Uses `render.yaml`. Note backend URL.
3) Netlify: New site from Git, base directory = `frontend`. Edit `frontend/netlify.toml` -> replace `<your-render-backend>` with your real hostname. Redeploy.
4) Test audio + QR: `/qr/?u=https://<yoursite>`; auto-load `/?t=mimis-drift&user=memmi`.

Users baked: memmi, sebo, boss, jimbo, guest.
Edit `frontend/tracks.json` for Volume 1 links.
