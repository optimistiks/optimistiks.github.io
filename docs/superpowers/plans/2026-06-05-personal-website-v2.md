# Personal Website — v2 Implementation Plan (Responsive + BEM + Background)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor v1 static site per `docs/superpowers/specs/2026-06-05-personal-website-v2-design.md` — DOM restructure (`main.page__content`), hybrid BEM class names, wider desktop column, fixed backgrounds.

**Architecture:** Single-pass HTML restructure, then CSS reorganized by BEM blocks with updated tokens and media queries. Verify with `rg` for stale classes and browser checks at 390px / 1280px in light and dark.

**Tech stack:** HTML5, CSS3. Skills during build: `frontend-design`, `web-design-guidelines`.

**Spec reference:** `docs/superpowers/specs/2026-06-05-personal-website-v2-design.md`

---

## File map

| File | Action |
|------|--------|
| `index.html` | Restructure DOM + BEM renames |
| `css/styles.css` | Reorganize + update all selectors + responsive tokens + background |
| `docs/superpowers/specs/2026-06-05-personal-website-v2-design.md` | Check success criteria when done |

No new files required.

---

### Task 1: HTML — DOM restructure + BEM renames

**Files:**
- Modify: `index.html`

**REQUIRED SUB-SKILL:** `frontend-design`

- [ ] **Step 1: Replace `<body>` content structure**

Move `id="main"` from `<header class="identity">` to `<main class="page__content">`. Wrap `header`, `section.contact`, `section.work` inside `main`.

Target structure:

```html
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="page">
      <main id="main" class="page__content">
        <header class="identity">
          <div class="identity__header">
            <p class="shell shell--path" aria-hidden="true">~/maxim</p>
            <span class="identity__theme-hint" aria-hidden="true" title="Follows system theme">◐</span>
          </div>
          <div class="identity__body">
            <div class="identity__photo identity__photo--placeholder" role="img" aria-label="Maxim Potapov"></div>
            <div class="identity__content">
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
          <ul class="contact__list">
            <li class="contact__item">
              <a class="contact__link" href="mailto:mail@potapovmax.com">mail@potapovmax.com</a>
            </li>
            <li class="contact__item">
              <a class="contact__link" href="https://www.linkedin.com/in/" rel="noopener noreferrer">linkedin.com/in/…</a>
            </li>
            <li class="contact__item">
              <a class="contact__link" href="https://github.com/" rel="noopener noreferrer">github.com/…</a>
            </li>
            <li class="contact__item">
              <a class="contact__link" href="assets/resume.pdf">resume.pdf</a>
            </li>
          </ul>
        </section>

        <section class="work" aria-labelledby="work-heading">
          <h2 id="work-heading" class="shell shell--work">// work</h2>
          <ol class="work__list">
            <li class="work__entry">
              <p class="work__entry-title">2024–2023 · Chapterly</p>
              <p class="work__entry-ref">
                <span class="work__entry-ref-label">ref:</span>
                <a href="https://www.linkedin.com/in/" rel="noopener noreferrer">linkedin.com/in/…</a>
              </p>
              <p class="work__entry-links">
                <a href="#" rel="noopener noreferrer">app</a>
                <span class="work__entry-sep" aria-hidden="true"> · </span>
                <a href="#" rel="noopener noreferrer">article</a>
              </p>
              <p class="work__entry-desc">Product engineering on core platform.</p>
            </li>
            <!-- repeat pattern for Beta, Gamma, Delta entries -->
          </ol>
        </section>
      </main>
    </div>
  </body>
```

Preserve all four work entries; apply renames to each.

- [ ] **Step 2: Verify no old classes remain in HTML**

```bash
cd /Users/optimistiks/Projects/figma-mcp-test
rg 'identity__top|identity__text|theme-hint|link-list|work-list|work-entry|class="sep"' index.html
```

Expected: no matches.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "refactor: restructure DOM and apply BEM class names in HTML"
```

---

### Task 2: CSS — tokens, responsive layout, backgrounds

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Update `:root` tokens**

Replace `--max-width: 28rem` with:

```css
  --max-width: min(100%, 28rem);
```

Add at end of file (replace old desktop-only padding rule):

```css
@media (min-width: 48rem) {
  :root {
    --max-width: 42rem;
    --space-page-x: 2rem;
  }

  .identity__bio {
    max-width: 42ch;
  }
}

@media (min-width: 64rem) {
  :root {
    --max-width: 44rem;
    --space-page-x: 2.5rem;
  }
}
```

Move `.page` padding-top bump into `@media (min-width: 48rem) { .page { padding-top: 2.5rem; } }`.

- [ ] **Step 2: Fix `body` backgrounds**

Remove entirely:

```css
  background-image: linear-gradient(...);
  background-size: 100% 1.25rem;
```

And the dark block that sets only `background-image: url(data:...)` without repeat.

Replace with:

```css
body {
  margin: 0;
  font-family: var(--font-sans);
  font-size: var(--text-body);
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-bg);
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: var(--color-bg);
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
  }
}
```

If vertical band still visible at 1920px after visual check, replace SVG block with fallback:

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: var(--color-bg);
    background-image: radial-gradient(
      circle at center,
      color-mix(in srgb, var(--color-text) 3%, transparent) 0.5px,
      transparent 0.5px
    );
    background-size: 4px 4px;
    background-repeat: repeat;
  }
}
```

- [ ] **Step 3: Add `.page__content` and move layout padding**

```css
.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1.5rem var(--space-page-x) 3rem;
}

.page__content {
  display: block;
}
```

- [ ] **Step 4: Rename all selectors (full map)**

| Remove / replace | With |
|------------------|------|
| `.identity__top` | `.identity__header` |
| `.identity__text` | `.identity__content` |
| `.theme-hint` | `.identity__theme-hint` |
| `.contact { margin-top` | keep `.contact` |
| `.link-list`, `.link-list li + li` | `.contact__list`, `.contact__item + .contact__item` |
| `.work-list` | `.work__list` |
| `.work-entry + .work-entry` | `.work__entry + .work__entry` |
| `.work-entry__title` | `.work__entry-title` |
| `.work-entry__ref`, `.work-entry__ref-label` | `.work__entry-ref`, `.work__entry-ref-label` |
| `.work-entry__links` | `.work__entry-links` |
| `.work-entry__links .sep` | `.work__entry-sep` |
| `.work-entry__desc` | `.work__entry-desc` |
| `.work-entry__ref a` | `.work__entry-ref a` |

Reorder file sections per spec: tokens → base → skip-link → page → shell → identity → contact → work.

- [ ] **Step 5: Verify no stale selectors**

```bash
rg 'identity__top|identity__text|theme-hint|link-list|work-list|work-entry' css/styles.css
```

Expected: no matches.

- [ ] **Step 6: Commit**

```bash
git add css/styles.css
git commit -m "refactor: responsive layout, BEM selectors, and fixed dark grain background"
```

---

### Task 3: Visual QA + spec sign-off

**Files:**
- Modify: `docs/superpowers/specs/2026-06-05-personal-website-v2-design.md`

- [ ] **Step 1: Local server check**

```bash
cd /Users/optimistiks/Projects/figma-mcp-test
python3 -m http.server 8080
```

Manual checklist:

| Check | 390px | 1280px | Light | Dark |
|-------|-------|--------|-------|------|
| Column width feels right | ✓ | ~42rem | | |
| No horizontal rules (light) | | | ✓ | |
| No center band (dark) | | | | ✓ |
| Skip link focuses `#main` / main visible | ✓ | | | |

- [ ] **Step 2: Mark v2 spec success criteria `[x]`**

All eight boxes in `2026-06-05-personal-website-v2-design.md`.

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/specs/2026-06-05-personal-website-v2-design.md
git commit -m "docs: mark personal site v2 success criteria complete"
```

---

## Plan self-review (spec coverage)

| Spec requirement | Task |
|------------------|------|
| `main.page__content` DOM | Task 1 |
| BEM renames | Task 1, 2 |
| Responsive 42rem | Task 2 |
| Bio 42ch desktop | Task 2 |
| Flat light bg | Task 2 |
| Dark repeating grain + fallback | Task 2 |
| No JS | All tasks |
| Success criteria | Task 3 |

No TBD steps. Stale-class `rg` checks included.

---

## Execution handoff

**Plan complete and saved to `docs/superpowers/plans/2026-06-05-personal-website-v2.md`.**

**Two execution options:**

1. **Subagent-driven (recommended)** — one task per subagent with reviews  
2. **Inline execution** — implement all tasks in this session  

**Which approach?**
