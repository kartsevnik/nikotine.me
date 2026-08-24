# nikotine.me — digital card

Personal site for **Nikolay** (Developer · Creator · Explorer).  
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

## Languages

The site supports Italian (`it`), English (`en`), Russian (`ru`) and Ukrainian
(`uk`, shown as **UA** in the language selector). The first visit uses the first
supported language from `navigator.languages`; unsupported browser languages
fall back to English. Manual selection is stored under `siteLanguage` in
`localStorage`.

All translations and localized metadata are stored in:

```text
js/i18n.js
```

English HTML text is the source and no-JavaScript fallback. To update a
translation, find the English source string inside the required language
object and change its translated value.

To add another language:

1. Add its ISO language code to `supportedLanguages` in `js/i18n.js`.
2. Add the same code to the early language-detection snippet in all HTML files.
3. Add a translation object and localized metadata in `js/i18n.js`.
4. Add a `data-language` button to all language menus.
5. Add the language to the detection test cases.

To change the fallback language, replace the final `"en"` returned by the
detection logic in `js/i18n.js` and all early HTML snippets. Keep the HTML
fallback text synchronized with that language to avoid a visible language
flash.

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
  { id: "linkedin",  url: "", /* LINKEDIN_URL */  ... },
]
```

Paste full URLs, for example:

```js
url: "https://wa.me/39XXXXXXXXXX"
url: "https://t.me/username"
url: "https://instagram.com/username"
url: "https://www.linkedin.com/in/username/"
```

### Work & Expertise

```js
work: [
  { id: "resume",             url: "resume.html", ... },
  { id: "services",           url: "services.html", ... },
  { id: "power-platform-lab", url: "", /* POWER_PLATFORM_LAB_URL */ ... },
]
```

### SUP Services

```js
supServices: [
  { id: "price-and-service", url: "sup-rental.html", /* SUP_PRICE_URL */ ... },
  { id: "facebook-group",    url: "", /* FACEBOOK_GROUP_URL */ ... },
]
```

### Creative Projects

```js
creativeProjects: [
  { id: "animatra", url: "", /* ANIMATRA_URL */ ... },
  { id: "jn",       url: "", /* JN_PROJECT_URL */, comingSoon: true },
]
```

- Empty `url` → card is not clickable.
- For **J&N**, set `comingSoon: false` and fill `url` when the project goes live.
- The SUP pricing page is `sup-rental.html`.
- Rename the Facebook group title by editing `title` on `facebook-group`.

## Where to replace logos

| Asset | Path |
|--------|------|
| Site logo / favicon source | `assets/logo.png` (source: `img/brand/logo-source.png`) |
| Favicon | `assets/favicon.png` |
| Apple touch icon | `assets/apple-touch-icon.png` |
| Resume | `assets/work/resume.png` (source: `img/home/work-resume.png`) |
| What I Can Help With | `assets/work/services.png` (source: `img/home/work-services.png`) |
| Power Platform Lab | `assets/projects/power-platform-lab.png` (source: `img/home/project-power-platform-lab.png`) |
| Animatra | `assets/projects/animatra.png` (source: `img/home/project-animatra.png`) |
| J&N | `assets/projects/jn.png` (source: `img/home/project-jn.png`) |
| Price and service | `assets/sup/price_ico.png` (source: `img/home/sup-price.png`) |
| Beaches & SUP Spots | `assets/sup/geo_ico.png` (source: `img/home/sup-geo.png`) |
| Contact icons | `assets/contacts/*.png` (sources: `img/home/contact-*.png`) |

Prefer square PNGs (~256×256). If an image fails to load, the card shows a letter placeholder.

- **`assets/`** — optimized images used by the live site (home page cards, contacts, brand).
- **`img/`** — sources and resume-page media, grouped by page/section:

```text
img/
  brand/                 # logo source
  home/                  # sources for home cards / contacts / SUP
  resume/
    it-development/      # career timeline icons
    education/           # education timeline icons
    languages/           # language card illustrations
    portfolio/
      web/               # web project thumbnails
      angular-*/         # gallery screenshots (+ web/*.webp)
      pcf-*/             # PCF gallery screenshots (+ web/*.webp)
```

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
resume.html
services.html
sup-rental.html
css/styles.css
css/content-page.css
css/sup-rental.css
js/config.js
js/main.js
js/i18n.js
js/sup-rental.js
assets/
  logo.png
  favicon.png
  apple-touch-icon.png
  contacts/
  work/
  projects/
  sup/
img/
  brand/
  home/
  resume/
    it-development/
    education/
    languages/
    portfolio/
README.md
```

No backend, no build step, no cookie banners.
