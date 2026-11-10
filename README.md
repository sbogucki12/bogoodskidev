# BOGOODSKI.dev

The personal site of **Steve Bogucki**: enterprise AI enablement advisory, plus a living example of the practices it talks about (AI-assisted building, security-first defaults, and content designed to be read by people *and* AI assistants).

- **Live:** https://bogoodski.dev (served directly by Netlify with a Let's Encrypt certificate; `www` and `bogoodski.netlify.app` 301 to it)
- **Host:** Netlify, auto-deploying from `main`
- **Stack:** hand-written static HTML, CSS, and vanilla JS. No framework, no build step. The only third-party script is Google Analytics via Google Tag Manager (`GTM-5NZT7N56`), which sets first-party analytics cookies.
- **Working notes for future sessions:** [`CLAUDE.md`](CLAUDE.md) (the project manifest: philosophy, conventions, roadmap)

---

## Repository layout

| Path | What it is |
|---|---|
| `index.html` | The whole site (single page) plus the JSON-LD structured data graph in `<head>` |
| `styles.css` | All styling; self-hosted Inter font via `@font-face` |
| `script.js` | Progressive enhancement only: mobile nav, deep-link copy, active-section highlighting |
| `analytics.js` | Google tag `dataLayer` bootstrap (the inline half of Google's snippet, moved to a file so the CSP needs no `'unsafe-inline'`) |
| `llms.txt` | Concise, LLM-friendly site index ([llmstxt.org](https://llmstxt.org) format) |
| `llms-full.txt` | Entire site content as clean markdown for AI assistants |
| `robots.txt` | Allows everyone, and explicitly welcomes AI search/assistant crawlers |
| `sitemap.xml` | Single URL + image sitemap entries |
| `site.webmanifest`, `favicon.ico`, `assets/icons/` | Favicon / app-icon set |
| `assets/img/` | Optimized headshot (WebP + JPG, 360/720) and 1200×630 social card |
| `assets/fonts/` | Inter variable font (latin subset) + its SIL OFL license |
| `.well-known/security.txt` | Security contact (RFC 9116); **expires 2027-11-01, renew before then** |
| `netlify.toml` | Security headers, caching, redirects, and 404 rules that hide repo docs from the live site |
| `CLAUDE.md` | Project manifest / working agreement for future sessions |

## Running locally

No build step. Serve the folder with any static server and open it:

```sh
python -m http.server 8765
# then visit http://127.0.0.1:8765/
```

Note: Netlify headers (CSP, HSTS, etc.) are not applied by a local server. To test the CSP locally, inject it as a `<meta http-equiv="Content-Security-Policy">` tag in a throwaway copy of `index.html`.

## Deploying

Push to `main` → Netlify publishes the repo root (`publish = "."`). Every file in the repo is publicly reachable unless `netlify.toml` blocks it, so **never commit anything you wouldn't put on a billboard.**

---

## Changelog

### 2026-11-09: Google Analytics (via Google Tag Manager)
- Added the Google tag for container `GTM-5NZT7N56` right after `<head>`: `/analytics.js` (same-origin `dataLayer` bootstrap) followed by async `gtm.js` from `www.googletagmanager.com`.
- **CSP** opened only as far as GA4-through-GTM needs: `script-src` + `www.googletagmanager.com`; `img-src` + `*.google-analytics.com`, `www.googletagmanager.com`; `connect-src` + `*.google-analytics.com`, `*.analytics.google.com`, `www.googletagmanager.com`. No `'unsafe-inline'`/`'unsafe-eval'`, so GTM Custom HTML tags and custom JS variables are blocked by design; built-in GA4 tags work. All other directives and headers unchanged.
- **Disclosure kept honest:** the "Built with AI" under-the-hood list, `llms-full.txt`, `script.js` header comment, and this README no longer claim "no trackers, no cookies, no third-party requests."
- If GTM later gets tags that need other origins (Google Ads, Signals/remarketing, GTM Preview mode, etc.), the CSP must be extended deliberately; violations show in the browser console.

### 2026-11-07: Community link and Databricks experience
- **Experience** gains a bullet on architecting and scaling AI and BI services with Databricks, Palantir Foundry, and AWS Bedrock (also in `knowsAbout`, `llms.txt`, and `llms-full.txt`).
- **Experience** section now ends with a quiet outlined link to Steve's private AI architecture community on Discord (opens in a new tab; subtle lift and accent glow on hover, respects reduced motion). Also listed in `llms.txt` and `llms-full.txt`. It's a plain link, so the page still makes no third-party requests.

### 2026-11-06 (later): Readability and layout polish
- **Toolbox** cards rebuilt for scanning: a short italic lead line (the analogy) and a checkmark list, instead of dense paragraphs.
- **FAQ** is now an accessible `<details>` accordion. The first answer is open; each answer's first sentence is bold; "Link to this answer" copies a deep link. Deep links to a question auto-open it. All text stays in the HTML, so FAQ schema parity holds.
- **Footer** redesigned: brand + email, a two-column "On this page" index, and an "Elsewhere" column, above a bottom bar with the date and disclaimer. It collapses cleanly on tablets and phones.
- **Grids** use explicit breakpoints: services 1/2/3 columns (the 7th card spans the row as a closer), approach 1/2/4 columns, so there are no orphan cards at any width.
- **Cache-busting:** `styles.css` and `script.js` are referenced with `?v=` query strings. Returning visitors with a stale cached stylesheet were seeing old layouts (list numbers beside the approach cards, stacked footer links).
- Smaller polish: `text-wrap: pretty` on card headings, non-breaking hyphen in "AI-assisted", split long paragraphs, smaller hero copy on phones, tighter service-card padding.

### 2026-11-06: AI search optimization, AI transparency, security hardening

A full review and overhaul, built with Claude Code.

**AI search (GEO/SEO)**
- Added a visible **FAQ section** (9 Q&As) whose text exactly matches the `FAQPage` schema. Each answer leads with a crisp, quotable sentence.
- Rebuilt JSON-LD as one **connected `@graph`**: `WebSite`, `ProfilePage`, `ImageObject`, `Person`, `ProfessionalService` (+7 `Service` offers), `BlogPosting` (Medium field note), `FAQPage`, all linked by `@id`. Includes Cornell ML credential, `alternateName: BOGOODSKI`, `knowsAbout`, and `sameAs` (LinkedIn, Medium, GitHub, Instagram, SoundCloud).
- Removed a duplicated service (AI Governance Advisory ≈ LLM Access Governance).
- New **"Under the hood" toolbox section** with concrete technical depth: RAG engineering, LLM gateways and IAM, governance, AI vendor review, ML fundamentals, agents/MCP.
- Rewrote `llms.txt`; added `llms-full.txt`; linked both via `<link rel="alternate">`.
- `robots.txt` now explicitly allows ~18 AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, etc.).
- Image sitemap; fuller OpenGraph/Twitter metadata (site name, locale, image size and alt); canonical uses a trailing slash; dropped meta keywords; added `max-image-preview:large` robots directive.
- One-time explanation of the name: BOGOODSKI is the phonetic pronunciation of Bogucki, used across running, DJ, and developer profiles.

**Linkability (single page, deep-linkable everywhere)**
- Stable `id`s on every section, service card, toolbox card, approach step, and FAQ question.
- Hover/focus `#` anchor next to headings; clicking copies the full URL ("Link copied").
- Footer "On this page" index; `scroll-margin-top` so deep links clear the fixed header; `:target` highlight.

**AI transparency**
- New **"Full disclosure: an AI helped build this site"** section and matching FAQ: Claude Code for code, AI-assisted copy edited by Steve, real photo with a moderate AI touch-up, ChatGPT-generated logo and social card. (The original images carried C2PA provenance from OpenAI's image service, which confirmed this.)

**Performance & responsive**
- Images: ~5.3 MB → ~120 KB delivered. Center-cropped headshot as WebP + JPG at 1×/2× via `<picture>`/`srcset`; 1200×630 social card; proper favicon set (`.ico`, 32px, 180px Apple touch, 192/512 manifest).
- Self-hosted Inter variable font (no Google Fonts request, no render-blocking `@import`).
- Mobile nav: Escape closes it, body scroll lock, focus return, `100dvh`, closes on resize. Hamburger now at ≤960px (desktop nav was cramped at 861–960px).
- Grid minimums use `min(100%, …)` so nothing overflows on 320px screens; tighter section padding on phones; `text-wrap: balance` headings.
- Verified at 320, 375, 414, 768, 900, 930, 1440, and 2560px.

**Security**
- CSP tightened: no `'unsafe-inline'`, no third-party origins, plus `object-src 'none'`, `base-uri`, `form-action`, `frame-ancestors`, `upgrade-insecure-requests`. Verified in Chrome: external JS runs, injected inline JS is blocked.
- Added HSTS, COOP, and a broader Permissions-Policy.
- Fixed header globs (`*.css` → `/*.css`). Image caching is no longer `immutable` for a year on non-hashed filenames.
- 301s from old asset URLs (`/assets/social.png`, etc.) to the new files, so cached social previews don't break.
- `security.txt`; `.gitignore` covers screenshots, env files, and keys; README/CLAUDE.md/docs forced to 404 on the live site.
- Pre-commit sweep: no secrets, private IPs, or local paths; new images carry no EXIF/metadata; no unsafe DOM sinks; all `target="_blank"` links use `noopener`.

### 2026-05: Initial build
- Initial scaffold, OpenGraph social image, mobile nav fixes, and a personal/informal copy rewrite.

---

### 2026-11-06 (final): Domain moved onto Netlify
- GoDaddy URL forwarding removed. DNS: `A @ → 75.2.60.5`, `CNAME www → bogoodski.netlify.app`; the leftover GoDaddy "Parked" A record was deleted. NS/SOA and the `_dmarc` TXT record are GoDaddy defaults and stay.
- `bogoodski.dev` set as the primary domain in Netlify; Let's Encrypt certificate issued for `bogoodski.dev` and `www.bogoodski.dev`.
- `bogoodski.netlify.app/*` now 301s to `https://bogoodski.dev/`, so there's one canonical host.
- Added SoundCloud (DJ) to the linked profiles.

## Open items

See the **Roadmap** in [`CLAUDE.md`](CLAUDE.md).
