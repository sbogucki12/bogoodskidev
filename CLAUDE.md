# CLAUDE.md: Project manifest for BOGOODSKI.dev

This file is the working agreement for anyone (human or AI) picking this project back up. Claude Code loads it automatically at the start of every session in this repo. **Read it before changing anything**, and update it at the end of any session that changes direction, conventions, or the roadmap.

> ⚠️ The GitHub repo is **public**, and this file is in it. Keep this file free of anything private: no credentials, no unannounced plans, no internal employer details.

---

## 1. What this site is (and why)

BOGOODSKI.dev is the single-page professional site of **Steve Bogucki**, an enterprise AI enablement advisor and practitioner (governed LLM access, RAG programs, AI software review, use-case lifecycles, AI/ML training).

**Goals, in priority order**
1. **Be found and cited by AI search** (ChatGPT search, Perplexity, Claude, Google AI Overviews, Copilot) and classic search when someone asks about enterprise AI enablement, LLM governance, RAG programs, AI vendor review, and so on.
2. **Establish authenticity and technical competence.** A real person with real inside experience, who can go deep technically.
3. **Convert interest into conversations.** Audiences: consulting/advisory clients *and* organizations building AI teams. Signals toward the latter stay **light and subtle** (currently: one line in Contact, one sentence in the "who does Steve work with" FAQ). Don't make the site read like a job-seeking page.

**Name:** "BOGOODSKI" is the phonetic pronunciation of "Bogucki" (bo-GOOD-ski) and Steve's brand across running, DJ, and developer profiles. It is explained **once** on the page (About section, `.name-note`). Don't repeat it elsewhere on the page. Schema `alternateName` and the llms files may mention it.

---

## 2. Voice & copy guidelines

Steve's voice: **professional but informal; fun and light; flowing, stream-of-consciousness sentences (not choppy); highly descriptive, with generous analogies, adverbs, and adjectives.** Like a smart friend explaining something over coffee.

- Analogies used so far (don't overuse; add fresh ones): model home (RAG demo), hotel front desk (LLM gateway), airport PreCheck lane (governance), used car "only driven to church on Sundays" (vendor claims), caffeinated intern with production keys (agents), personal trainer taking the elevator (AI disclosure), storefront vs. warehouse (RAG program).
- The **existing short, punchy lines are approved and staying** ("One person. A little goofy. Pretty informal."). Steve is fine with that abruptness. Don't "fix" existing copy unless asked; write *new* copy in the flowing style.
- **AI-search pattern:** every section/FAQ answer should *open* with one crisp, factual, self-contained sentence an AI engine can lift and quote. Then let the voice take over.
- **Technical competence:** use concrete, correct vocabulary (chunking, embeddings, hybrid search, re-ranking, groundedness evals, IAM least privilege, token metering, zero-data-retention, FedRAMP, MCP), but frame toolbox content as *how Steve thinks and works*. **Never invent experience, clients, metrics, or credentials.** Facts must come from Steve.
- **Employment context:** experience is described as "a massive, heavily regulated federal environment" / "a government AI platform" without naming the agency or detailing its internal architecture. Keep that pattern unless Steve says otherwise.
- Avoid em-dash-heavy, buzzwordy, "AI-sounding" copy. Steve should be able to read it aloud and recognize himself.

## 3. Design decisions (intentional; don't change without asking)

- **Single page**, deep-linkable everywhere (every section, card, and FAQ has a stable `id` and a hover/focus `#` anchor that copies the URL). Don't rename existing `id`s; external links may depend on them.
- **Dark theme**; palette in `:root` CSS custom properties. Accent `#63b3ed`, secondary `#a78bfa`.
- **Headshot at 70% opacity.** Steve likes the faded look. Keep it.
- **Personal Gmail is published** (stevebogucki12@gmail.com). Steve is fine with scraping/spam. Don't swap it for a form or an obfuscated address.
- **AI transparency is a feature.** The "Built with AI" section and FAQ must stay accurate. If tools or processes change (new images, new AI tools), update both, the schema FAQ, and `llms-full.txt`.
- **No frameworks, no build step, no trackers, no cookies, no third-party requests.** The page claims this publicly, so adding analytics, embeds, CDNs, or web fonts from other origins makes the disclosure false *and* requires CSP changes. Discuss first.
- JavaScript is **progressive enhancement only**; the page must work with JS off.

## 4. Engineering conventions & checklists

### When you change any visible copy, keep these in sync
1. `index.html` body
2. **FAQ:** visible `<h3>`/`<p>` text must match the `FAQPage` JSON-LD `name`/`text` **exactly** (Google's guidelines; also how AI engines verify). A parity check script is easy: extract both and compare.
3. JSON-LD (`Person`, services, `hasPart` anchors, `dateModified`)
4. `llms.txt` and `llms-full.txt`
5. Footer "Last updated" `<time>` and `sitemap.xml` `<lastmod>`
6. `README.md` changelog

### New section checklist
`<section id="…" aria-labelledby="…">` → `.heading-row` with `h2` + `.anchor-link` → add to footer `.footer-nav` → add to `ProfilePage.hasPart` → add to `llms.txt` / `llms-full.txt` → nav only if it's a top-level destination (header nav holds ~6 items max).

### Images
- Source images go through re-encoding (Pillow) to strip metadata, at 1×/2× sizes, WebP + JPG fallback, in `assets/img/`.
- `assets/img/*` and `assets/icons/*` are cached 7 days (not immutable). If you replace an image in place, that's fine; for big changes, prefer a new filename.
- Keep the social card at 1200×630.

### Security rules (the site is public, and so is the repo)
- Netlify publishes the **repo root**. Anything committed is potentially served. Repo-only docs must be blocked in `netlify.toml` (README.md, CLAUDE.md, `/docs/*` are already forced to 404).
- CSP has **no `'unsafe-inline'`**: no inline `<script>` (JSON-LD data blocks are fine), no `style=""` attributes, no `on*=` handlers. Put JS in `script.js` and CSS in `styles.css`.
- No `innerHTML`/`eval`-style sinks in JS. External links use `target="_blank" rel="noopener noreferrer"` (plus `me` for Steve's own profiles).
- **Before every commit:** scan the staged diff for secrets/keys/tokens, private IPs, local file paths, unintended PII, and stray files (screenshots are gitignored: `assets/screenshot*`). Check new images for metadata.
- Before pushing header changes, test the CSP locally via an injected `<meta>` tag. After deploy, check https://securityheaders.com and https://search.google.com/test/rich-results.

### Testing responsive layouts
Headless Chrome on Windows enforces a ~500px minimum window width, so a `--window-size=320,…` screenshot is **not** a real 320px viewport. Use an HTML harness with fixed-width `<iframe>`s (320/375/414/930px) pointing at a local server instead. Use a fresh `--user-data-dir` per run to avoid stale cache.

---

## 5. Roadmap / open items

**High priority**
- [ ] **Fix the domain.** As of 2026-11-06, `https://bogoodski.dev` (and `www`) answer with a **301 to `https://bogoodski.netlify.app/`** (registrar URL forwarding). Crawlers and AI engines therefore see content on `netlify.app` while the canonical says `bogoodski.dev`. Fix: Netlify → Domain management → add `bogoodski.dev` as the **primary domain**, then at the registrar remove URL forwarding and point DNS at Netlify (apex A/ALIAS per Netlify's instructions, `www` CNAME → `bogoodski.netlify.app`, or delegate DNS to Netlify). Netlify then provisions TLS automatically.
- [ ] **After** the domain serves directly from Netlify (not before, or it will loop): add a 301 in `netlify.toml` from `https://bogoodski.netlify.app/*` → `https://bogoodski.dev/:splat`.
- [ ] Run securityheaders.com and Google Rich Results Test against the live domain; fix anything flagged.

**Soon**
- [ ] Add Steve's **DJ profile URL** to `Person.sameAs` and the footer (running and GitHub were added 2026-11-06).
- [ ] Refresh the LinkedIn post-inspector cache for the new social card (`/assets/img/social-card.jpg`).
- [ ] Renew `.well-known/security.txt` **before 2027-11-01** (update `Expires`).

**Ideas / later (discuss before doing)**
- More field notes or articles, either linked from Medium or hosted here as their own pages. More citable, dated content is the biggest remaining AI-search lever.
- If the site grows, consider splitting into real pages (`/services`, `/faq`, `/how-this-site-was-built`) with redirects from the current anchors. Single page was a deliberate choice as of 2026-11-06.
- Speaking/training topics list; a short "how I'd approach your first 90 days of AI enablement" piece (useful to both clients and teams hiring).
- Fill `areaServed` in the `ProfessionalService` schema once Steve confirms the geographic scope (left out to avoid guessing).

---

## 6. Session log
- **2026-05:** Initial build and copy rewrite.
- **2026-11-06:** AI-search overhaul, AI transparency section, toolbox section, FAQ, deep links, image/font optimization, responsive fixes, CSP/HSTS hardening, README + this manifest. Branch `ai-search-optimization` merged to `main`. See README changelog for details.
