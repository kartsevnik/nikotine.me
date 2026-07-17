# nikotine.me — digital card

Personal one-page site for **Nikolay** (Developer · Creator · Explorer).  
Static HTML / CSS / JS — ready for GitHub Pages, Netlify, Vercel or any static host.

## Local preview

Any of these options:

```bash
# Python
python -m http.server 8080

# Node (if installed)
npx serve .

# VS Code / Cursor
# Open index.html via Live Server, or just open the file in a browser
```

Then open [http://localhost:8080](http://localhost:8080).

Opening `index.html` directly in the browser also works (no build step).

## Where to edit links

All URLs, titles and descriptions live in one file:

```text
js/config.js
```

### Contacts

```js
contacts: [
  { id: "whatsapp",  url: "", /* WHATSAPP_URL */  ... },
  { id: "telegram",  url: "", /* TELEGRAM_URL */  ... },
  { id: "instagram", url: "", /* INSTAGRAM_URL */ ... },
]
```

Paste full URLs, for example:

```js
url: "https://wa.me/39XXXXXXXXXX"
url: "https://t.me/username"
url: "https://instagram.com/username"
```

### Projects

```js
projects: [
  { id: "power-platform-lab", url: "", /* POWER_PLATFORM_LAB_URL */ ... },
  { id: "animatra",           url: "", /* ANIMATRA_URL */ ... },
  { id: "jn",                 url: "", /* JN_PROJECT_URL */, comingSoon: true },
  { id: "facebook-group",     url: "", /* FACEBOOK_GROUP_URL */ ... },
]
```

- Empty `url` → card is not clickable.
- For **J&N**, set `comingSoon: false` and fill `url` when the project goes live.
- Rename the Facebook group title by editing `title` on `facebook-group`.

## Where to replace logos

| Asset | Path |
|--------|------|
| Site logo / favicon source | `assets/logo.png` |
| Favicon | `assets/favicon.png` |
| Apple touch icon | `assets/apple-touch-icon.png` |
| Power Platform Lab | `assets/projects/power-platform-lab.png` |
| Animatra | `assets/projects/animatra.png` |
| J&N | `assets/projects/jn.png` |
| Beaches & SUP Spots | `assets/projects/facebook-beaches.png` |
| Contact icons | `assets/contacts/*.png` |

Prefer square PNGs (~256×256). If an image fails to load, the card shows a letter placeholder.

Original source files are kept in `img/` for reference; the site uses optimized copies under `assets/`.

## Publish

### GitHub Pages

1. Push this folder to a GitHub repository.
2. **Settings → Pages → Source**: Deploy from branch `main` / folder `/` (root).
3. Site URL: `https://<user>.github.io/<repo>/`  
   Or connect a custom domain (see below).

### Netlify

1. Drag the project folder to [Netlify Drop](https://app.netlify.com/drop),  
   or connect the Git repo (build command empty, publish directory: `.`).
2. Add custom domain in **Domain settings**.

### Vercel

1. Import the Git repo (or `vercel` CLI).
2. Framework preset: **Other**. Output directory: `.` (root).
3. Add domain in **Project → Settings → Domains**.

### Classic hosting

Upload all files (`index.html`, `css/`, `js/`, `assets/`) preserving the folder structure. Document root must contain `index.html`.

## Connect domain `nikotine.me`

1. Publish the site on your chosen host and note their DNS instructions.
2. In your domain registrar (where `nikotine.me` is managed), set DNS:

**Apex domain (`nikotine.me`)** — typical for Netlify / Vercel / GitHub Pages:

| Type | Name | Value |
|------|------|--------|
| A / ALIAS / ANAME | `@` | host-provided IP or alias |
| CNAME | `www` | host-provided target |

Examples:

- **GitHub Pages**: A records to GitHub IPs + CNAME file or Pages custom domain UI; add `nikotine.me` in repo Pages settings.
- **Netlify**: add domain → follow Netlify DNS or point `CNAME` / `ALIAS` as shown in the dashboard.
- **Vercel**: add `nikotine.me` → use Vercel nameservers or the A/CNAME values they display.

3. Wait for DNS propagation (often minutes, sometimes up to 24–48h).
4. Enable HTTPS in the host dashboard (usually automatic).

Optional: set `og:url` in `index.html` if you want a different canonical social URL.

## Project structure

```text
index.html
css/styles.css
js/config.js
js/main.js
assets/
  logo.png
  favicon.png
  apple-touch-icon.png
  contacts/
  projects/
img/          # original source images
README.md
```

No backend, no build step, no cookie banners.
