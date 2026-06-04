# Personal Website — Static HTML/CSS (GitHub Pages) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a mobile-first, terminal-inspired personal site as static HTML + CSS (no JavaScript), hosted on GitHub Pages, matching `docs/superpowers/specs/2026-06-04-personal-website-design.md`.

**Architecture:** Single `index.html` with semantic sections (`identity`, `contact`, `work`). One stylesheet defines design tokens as CSS custom properties; light theme in `:root`, dark overrides in `@media (prefers-color-scheme: dark)`. Google Fonts for Sora + Martian Mono. Optional assets under `assets/`. No build step.

**Tech stack:** HTML5, CSS3 (`prefers-color-scheme`, custom properties), GitHub Pages. Skills: `frontend-design`, `web-design-guidelines` during implementation.

**Spec reference:** `docs/superpowers/specs/2026-06-04-personal-website-design.md`

---

## File map

| File | Responsibility |
|------|----------------|
| `index.html` | Document structure, content, font preconnect, link to CSS |
| `css/styles.css` | Tokens, layout, typography, themes, noise texture (dark) |
| `assets/photo.jpg` | Profile photo (optional; use placeholder until provided) |
| `assets/resume.pdf` | Downloadable resume (placeholder OK) |
| `.nojekyll` | Empty file — prevents Jekyll processing on GitHub Pages |
| `README.md` | Repo note + local preview command (optional) |

**Out of scope:** `*.js`, frameworks, Figma MCP, CI beyond Pages.

---

## Content (placeholder v1 — swap later)

Use this copy until Maxim provides final URLs/text:

| Field | Value |
|-------|-------|
| `~/` slug | `~/maxim` |
| Name | Maxim Potapov |
| Role | Software engineer |
| Location | Location · Europe/Berlin |
| Bio | Building reliable systems. Previously startups and product teams. |
| Email | mail@potapovmax.com |
| LinkedIn | https://www.linkedin.com/in/ (update path) |
| GitHub | https://github.com/ (update username) |
| Resume | assets/resume.pdf |
| Work 1 | 2024–2023 · Chapterly |
| Work 2 | 2022–2020 · Project Beta |
| Work 3 | 2019–2018 · Project Gamma |
| Work 4 | 2017–2016 · Project Delta |

---

### Task 1: Project scaffold

**Files:**
- Create: `.nojekyll`
- Create: `assets/.gitkeep`
- Modify: `README.md` (create if missing)

- [ ] **Step 1: Create `.nojekyll`**

```bash
touch /Users/optimistiks/Projects/figma-mcp-test/.nojekyll
```

- [ ] **Step 2: Create assets directory**

```bash
mkdir -p /Users/optimistiks/Projects/figma-mcp-test/assets
touch /Users/optimistiks/Projects/figma-mcp-test/assets/.gitkeep
```

- [ ] **Step 3: Add README with preview hint**

Create `README.md`:

```markdown
# Personal site

Static HTML/CSS portfolio. Design spec: `docs/superpowers/specs/2026-06-04-personal-website-design.md`.

## Local preview

python3 -m http.server 8080
# open http://localhost:8080
```

- [ ] **Step 4: Commit**

```bash
cd /Users/optimistiks/Projects/figma-mcp-test
git add .nojekyll assets/.gitkeep README.md
git commit -m "chore: scaffold static site for GitHub Pages"
```

---

### Task 2: HTML structure

**Files:**
- Create: `index.html`

**REQUIRED SUB-SKILL:** `frontend-design` — intentional typography and structure, not generic portfolio markup.

- [ ] **Step 1: Write `index.html`**

Create `/Users/optimistiks/Projects/figma-mcp-test/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Maxim Potapov — software engineer" />
    <title>Maxim Potapov</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@400;500&family=Sora:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="page">
      <header class="identity" id="main">
        <div class="identity__top">
          <p class="shell shell--path" aria-hidden="true">~/maxim</p>
          <span class="theme-hint" aria-hidden="true" title="Follows system theme">◐</span>
        </div>
        <div class="identity__body">
          <!-- Omit img until assets/photo.jpg exists; or use img with alt only -->
          <div class="identity__photo identity__photo--placeholder" role="img" aria-label="Maxim Potapov"></div>
          <div class="identity__text">
            <h1 class="identity__name">Maxim Potapov</h1>
            <p class="identity__role">Software engineer</p>
            <p class="identity__meta">Location · Europe/Berlin</p>
            <p class="identity__bio">
              Building reliable systems. Previously startups and product teams.
            </p>
          </div>
        </div>
      </header>

      <section class="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading" class="shell shell--prompt">$ contact</h2>
        <ul class="link-list">
          <li>
            <a href="mailto:mail@potapovmax.com">mail@potapovmax.com</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/" rel="noopener noreferrer"
              >linkedin.com/in/…</a
            >
          </li>
          <li>
            <a href="https://github.com/" rel="noopener noreferrer">github.com/…</a>
          </li>
          <li>
            <a href="assets/resume.pdf">resume.pdf</a>
          </li>
        </ul>
      </section>

      <section class="work" aria-labelledby="work-heading">
        <h2 id="work-heading" class="shell shell--work">// work</h2>
        <ol class="work-list">
          <li class="work-entry">
            <p class="work-entry__title">2024–2023 · Chapterly</p>
            <p class="work-entry__ref">
              <span class="work-entry__ref-label">ref:</span>
              <a href="https://www.linkedin.com/in/" rel="noopener noreferrer"
                >linkedin.com/in/…</a
              >
            </p>
            <p class="work-entry__links">
              <a href="#" rel="noopener noreferrer">app</a>
              <span class="sep" aria-hidden="true"> · </span>
              <a href="#" rel="noopener noreferrer">article</a>
            </p>
            <p class="work-entry__desc">Product engineering on core platform.</p>
          </li>
          <li class="work-entry">
            <p class="work-entry__title">2022–2020 · Project Beta</p>
            <p class="work-entry__ref">
              <span class="work-entry__ref-label">ref:</span>
              <a href="https://www.linkedin.com/in/" rel="noopener noreferrer"
                >linkedin.com/in/…</a
              >
            </p>
            <p class="work-entry__links">
              <a href="#" rel="noopener noreferrer">github</a>
              <span class="sep" aria-hidden="true"> · </span>
              <a href="#" rel="noopener noreferrer">demo</a>
            </p>
          </li>
          <li class="work-entry">
            <p class="work-entry__title">2019–2018 · Project Gamma</p>
            <p class="work-entry__ref">
              <span class="work-entry__ref-label">ref:</span>
              <a href="https://www.linkedin.com/in/" rel="noopener noreferrer"
                >linkedin.com/in/…</a
              >
            </p>
            <p class="work-entry__links">
              <a href="#" rel="noopener noreferrer">repo</a>
            </p>
            <p class="work-entry__desc">Backend services and observability.</p>
          </li>
          <li class="work-entry">
            <p class="work-entry__title">2017–2016 · Project Delta</p>
            <p class="work-entry__ref">
              <span class="work-entry__ref-label">ref:</span>
              <a href="https://www.linkedin.com/in/" rel="noopener noreferrer"
                >linkedin.com/in/…</a
              >
            </p>
            <p class="work-entry__links">
              <a href="#" rel="noopener noreferrer">write-up</a>
            </p>
          </li>
        </ol>
      </section>
    </div>
  </body>
</html>
```

**Note:** v1 uses a CSS placeholder `div` for photo (no inline handlers, no JS). Swap to `<img src="assets/photo.jpg" …>` when photo is ready.

- [ ] **Step 2: Open in browser (unstyled OK)**

```bash
cd /Users/optimistiks/Projects/figma-mcp-test && python3 -m http.server 8080
```

Expected: three sections in order; links present. Stop server after check.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add semantic HTML structure for personal site"
```

---

### Task 3: CSS foundation (tokens + themes)

**Files:**
- Create: `css/styles.css`

**REQUIRED SUB-SKILL:** `frontend-design` + `web-design-guidelines`

- [ ] **Step 1: Write base `css/styles.css`**

Create `/Users/optimistiks/Projects/figma-mcp-test/css/styles.css` with full content:

```css
/* --- Design tokens (light default = printed log) --- */
:root {
  --font-sans: "Sora", system-ui, sans-serif;
  --font-mono: "Martian Mono", ui-monospace, monospace;

  --color-bg: #f2ede6;
  --color-text: #1a1814;
  --color-muted: #6b6560;
  --color-accent: #0e7490;
  --color-prompt: #b45309;
  --color-border: #d9d2c8;

  --space-page-x: 1.25rem;
  --space-section: 2.75rem;
  --space-work-gap: 1.25rem;
  --space-work-inner: 0.375rem;
  --max-width: 28rem;

  --text-name: clamp(1.5rem, 5vw, 1.75rem);
  --text-body: 0.9375rem;
  --text-shell: 0.8125rem;
  --text-desc: 0.8125rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0c0e12;
    --color-text: #e8e6e3;
    --color-muted: #7a7f87;
    --color-accent: #56b6c2;
    --color-prompt: #e5b567;
    --color-border: #252930;
  }
}

/* --- Reset + base --- */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--text-body);
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-bg);
  background-image: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-border) 30%, transparent),
    transparent 1px
  );
  background-size: 100% 1.25rem;
}

@media (prefers-color-scheme: dark) {
  body {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  }
}

a {
  color: var(--color-accent);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.15em;
}

a:hover {
  text-decoration-thickness: 2px;
}

a:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  padding: 0.5rem 1rem;
  background: var(--color-accent);
  color: var(--color-bg);
  z-index: 100;
}

.skip-link:focus {
  left: var(--space-page-x);
}

.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1.5rem var(--space-page-x) 3rem;
}

/* --- Shell labels --- */
.shell {
  font-family: var(--font-mono);
  font-size: var(--text-shell);
  margin: 0 0 1rem;
  font-weight: 400;
}

.shell--path {
  color: var(--color-accent);
}

.shell--prompt {
  color: var(--color-prompt);
}

.shell--work {
  color: var(--color-muted);
}

/* --- Identity --- */
.identity__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.theme-hint {
  font-family: var(--font-mono);
  font-size: var(--text-shell);
  color: var(--color-muted);
  line-height: 1;
}

.identity__body {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.identity__photo {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: -0.25rem;
  border: 1px solid var(--color-border);
}

.identity__photo--placeholder {
  background: color-mix(in srgb, var(--color-muted) 25%, var(--color-bg));
}

.identity__photo img,
img.identity__photo {
  object-fit: cover;
}

.identity__name {
  font-size: var(--text-name);
  font-weight: 600;
  margin: 0 0 0.25rem;
  line-height: 1.2;
}

.identity__role,
.identity__meta,
.identity__bio {
  margin: 0 0 0.35rem;
}

.identity__meta {
  color: var(--color-muted);
  font-size: var(--text-body);
}

.identity__bio {
  max-width: 36ch;
}

/* --- Contact --- */
.contact {
  margin-top: var(--space-section);
}

.link-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.link-list li + li {
  margin-top: 0.5rem;
}

/* --- Work --- */
.work {
  margin-top: var(--space-section);
}

.work-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.work-entry + .work-entry {
  margin-top: var(--space-work-gap);
}

.work-entry__title {
  font-weight: 500;
  margin: 0 0 var(--space-work-inner);
}

.work-entry__ref,
.work-entry__links,
.work-entry__desc {
  margin: 0 0 var(--space-work-inner);
  font-size: var(--text-body);
}

.work-entry__ref-label,
.work-entry__ref {
  font-family: var(--font-mono);
  font-size: var(--text-shell);
  color: var(--color-muted);
}

.work-entry__ref a {
  color: var(--color-accent);
}

.work-entry__links .sep {
  color: var(--color-muted);
}

.work-entry__desc {
  color: var(--color-muted);
  font-size: var(--text-desc);
}

/* --- Desktop: still single column, slightly wider --- */
@media (min-width: 48rem) {
  .page {
    padding-top: 2.5rem;
  }
}
```

- [ ] **Step 2: Visual check at 390px and desktop**

Browser devtools → 390px width. Toggle system light/dark. Expected: readable contrast, Sora/Martian visible, phosphor vs paper palettes.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: add terminal-inspired styles with system theme support"
```

---

### Task 4: Assets and link hygiene

**Files:**
- Create: `assets/resume.pdf` (minimal placeholder) OR document skip
- Modify: `index.html` — real LinkedIn/GitHub URLs when provided

- [ ] **Step 1: Placeholder resume**

If no PDF yet, add `README` note in `assets/README.md`:

```markdown
Add `resume.pdf` here. Link from index.html already points to assets/resume.pdf.
```

Or add a one-page minimal PDF — optional for v1 if link 404 is acceptable until upload.

- [ ] **Step 2: Photo**

Add `assets/photo.jpg` when available; replace placeholder `div` with `img` in HTML.

- [ ] **Step 3: Replace `#` work links**

Update `index.html` work-entry links from `#` to real URLs as user supplies them.

- [ ] **Step 4: Commit**

```bash
git add assets/
git commit -m "docs: asset placeholders for photo and resume"
```

---

### Task 5: GitHub Pages deployment

**Files:**
- Modify: repository settings (GitHub UI) — document in README

- [ ] **Step 1: Push repository**

```bash
cd /Users/optimistiks/Projects/figma-mcp-test
git remote -v
# If no remote: gh repo create figma-mcp-test --public --source=. --push
# Or: git remote add origin <url> && git push -u origin master
```

Use branch name matching repo default (`main` or `master`).

- [ ] **Step 2: Enable GitHub Pages**

Via GitHub UI or CLI:

```bash
gh api repos/{owner}/{repo}/pages -X POST -f build_type=legacy -f source[branch]=master -f source[path]=/
```

Replace `master` with `main` if needed. **Source:** root `/` (because `index.html` is at repo root).

- [ ] **Step 3: Custom domain (if already owned)**

Settings → Pages → Custom domain → add domain; configure DNS per GitHub docs. Optional CNAME file:

```
echo "yourdomain.com" > CNAME
git add CNAME && git commit -m "chore: add custom domain for GitHub Pages"
```

- [ ] **Step 4: Verify live URL**

```bash
gh api repos/{owner}/{repo}/pages
```

Open Pages URL; confirm HTML/CSS load, mailto works, theme follows OS.

- [ ] **Step 5: Commit README deployment section**

Add to `README.md`:

```markdown
## Deploy

GitHub Pages serves from `/` on `master` (or `main`).
```

---

### Task 6: Spec success criteria + handoff

**Files:**
- Modify: `docs/superpowers/specs/2026-06-04-personal-website-design.md`

- [ ] **Step 1: Manual QA checklist**

| Check | Pass |
|-------|------|
| Section order identity → contact → work | |
| `prefers-color-scheme` light/dark | |
| 390px readable | |
| Sora + Martian Mono (not Inter) | |
| No JS files loaded | |
| Pages URL loads | |

- [ ] **Step 2: Mark spec success criteria**

Check all five boxes in design spec § Success criteria.

- [ ] **Step 3: Record live URL in plan Delivery section**

```markdown
## Delivery
| Field | Value |
|-------|-------|
| Pages URL | https://<user>.github.io/<repo>/ or custom domain |
| Completed | YYYY-MM-DD |
```

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/specs/2026-06-04-personal-website-design.md docs/superpowers/plans/2026-06-04-personal-website-static.md
git commit -m "docs: mark static site v1 complete"
```

---

## Plan self-review (spec coverage)

| Spec requirement | Task |
|------------------|------|
| Single page IA | Task 2 |
| Identity fields + photo | Task 2, 4 |
| Contact links | Task 2 |
| Work flat list | Task 2 |
| Sora + Martian Mono | Task 2–3 |
| Color tokens | Task 3 |
| Dark noise / light paper | Task 3 |
| No JS | Tasks 2–3 (no .js) |
| prefers-color-scheme | Task 3 |
| GitHub Pages | Task 5 |
| Mobile-first | Task 3 CSS |

**Adjustment vs old spec:** Manual theme toggle → decorative `◐` + system theme only (documented in spec).

---

## Delivery

| Field | Value |
|-------|-------|
| Pages URL | _filled after Task 5_ |
| Completed | _filled after Task 6_ |

---

## Execution handoff

**Plan complete and saved to `docs/superpowers/plans/2026-06-04-personal-website-static.md`.**

**Two execution options:**

1. **Subagent-driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline execution** — implement in this session with checkpoints after Tasks 2, 3, 5  

**Which approach?**
