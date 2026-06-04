# Personal Website — v2 Design Spec (Responsive + BEM + Background)

**Status:** Approved in brainstorming (2026-06-05)  
**Phase:** Iteration on v1 static site — HTML/CSS only, no JS  
**Builds on:** `docs/superpowers/specs/2026-06-04-personal-website-design.md` (concept, tokens, IA unchanged)

## Summary

Second pass on the local static site: **wider centered column on desktop**, **hybrid BEM naming** with **semantic DOM restructure** (`main.page__content`), and **fixed backgrounds** (flat light; subtle tiled grain in dark only).

## Goals

| Goal | Detail |
|------|--------|
| Responsive | Mobile-first; content column grows to ~42rem from `48rem` viewport up |
| CSS architecture | Hybrid BEM: `page` layout block + section blocks (`identity`, `contact`, `work`) + shared `shell` block |
| DOM | Restructure markup: skip link → `.page` → `<main class="page__content">` → sections |
| Background | Remove broken stripe/noise artifacts; flat light; proper dark grain |
| Constraint | No JavaScript; no hosting changes in this pass |

## Non-goals (v2)

- Manual theme toggle (still system `prefers-color-scheme`)
- Two-column layout
- Copy/URL/asset updates (unless needed for HTML validity)
- GitHub Pages / new remote repo
- Figma

---

## Responsive layout

| Breakpoint | Behavior |
|------------|----------|
| **Default (< 48rem)** | Full-width column inside viewport; `--max-width: min(100%, 28rem)`; `--space-page-x: 1.25rem` |
| **`min-width: 48rem`** | `--max-width: 42rem`; `--space-page-x: 2rem`; increased top padding on `.page` |
| **`min-width: 64rem` (optional)** | `--max-width: 44rem`; `--space-page-x: 2.5rem` — enable only if 42rem feels tight in QA |

`.page` remains centered (`margin: 0 auto`). Single column only.

**Bio line length:** `.identity__bio` `max-width` → `42ch` from `48rem` up (was `36ch` on mobile).

---

## DOM structure (approach C)

```html
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="page">
    <main id="main" class="page__content">
      <header class="identity">…</header>
      <section class="contact">…</section>
      <section class="work">…</section>
    </main>
  </div>
</body>
```

| Node | Role |
|------|------|
| `.page` | Layout block: max-width, horizontal centering, outer padding |
| `.page__content` | Semantic main landmark; all sections live here |
| `#main` | Skip-link target (on `main`, not `header`) |

**Accessibility:** One primary `<main>`; section headings keep `aria-labelledby` where present.

---

## BEM naming (hybrid)

### Layout: `page`

- `page` — outer layout wrapper
- `page__content` — main content area (element)

### Section blocks (siblings inside `page__content`)

**`identity`**

| Old class | New class |
|-----------|-----------|
| `identity__top` | `identity__header` |
| `identity__text` | `identity__content` |
| `theme-hint` | `identity__theme-hint` |
| `identity__photo`, `identity__photo--placeholder` | unchanged |
| `identity__name`, `identity__role`, `identity__meta`, `identity__bio` | unchanged |

**`contact`**

| Old class | New class |
|-----------|-----------|
| `link-list` | `contact__list` |
| (list item) | `contact__item` |
| (link) | `contact__link` (optional; or style `contact__list a`) |

**`work`**

| Old class | New class |
|-----------|-----------|
| `work-list` | `work__list` |
| `work-entry` | `work__entry` |
| `work-entry__title` | `work__entry-title` (prefer single hyphen for element per strict BEM) |
| `work-entry__ref` | `work__entry-ref` |
| `work-entry__ref-label` | `work__entry-ref-label` |
| `work-entry__links` | `work__entry-links` |
| `work-entry__desc` | `work__entry-desc` |
| `.sep` inside links | `work__entry-sep` |

**Shared block: `shell`** (cross-section labels)

- `shell`, `shell--path`, `shell--prompt`, `shell--work`
- Used on `<h2>` / `<p>` in identity, contact, work — not prefixed with section name

**Utilities (outside BEM blocks)**

- `skip-link` — global utility, unchanged

### CSS organization (supports approach C)

Prefer grouped sections in `css/styles.css`:

1. Tokens (`:root`, dark variables)
2. Base (`body`, `a`, focus)
3. Utilities (`skip-link`)
4. Block `page`
5. Block `shell`
6. Block `identity`
7. Block `contact`
8. Block `work`

Optional follow-up: split into `css/blocks/*.css` — out of scope unless plan adds it.

---

## Background

### Remove from `body`

- Ruled `linear-gradient` with `background-size: 100% 1.25rem` (horizontal stripes)
- Dark-mode SVG noise as a single unstretched tile (causes vertical band / seam)

### New behavior

| Theme | Treatment |
|-------|-----------|
| **Light** | `background-color: var(--color-bg)` only — flat “printed paper” |
| **Dark** | `background-color` + **repeating** subtle grain layer |

### Dark grain implementation

**Primary:** tiled SVG noise (if used):

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: var(--color-bg);
    background-image: url("data:image/svg+xml,...");
    background-repeat: repeat;
    background-size: 128px 128px;
  }
}
```

**Fallback if SVG still artifacts:** CSS-only pattern, e.g. low-opacity `repeating-radial-gradient` — no single-tile center band.

**Rules:**

- Texture on **`body` only**, not `.page` / `.page__content`
- Grain must look uniform at 1920px+ width — **no visible vertical line down the center**
- Opacity target ~2–3% effective (subtle phosphor feel)

---

## Visual / IA (unchanged from v1)

- Section order: identity → contact → work  
- Tokens, fonts (Sora, Martian Mono), colors per v1 spec  
- No nav, no gallery  

---

## Success criteria

- [x] At 1280px+ viewport, content column ~42rem wide, centered; not locked to 28rem  
- [x] At 390px, layout unchanged from v1 intent (readable, padded)  
- [x] DOM: `main.page__content` wraps all sections; skip link targets `#main`  
- [x] All v2 BEM renames applied in HTML + CSS; no stale old class names  
- [x] Light: flat background, no horizontal rules  
- [x] Dark: subtle grain, no stripe/band artifacts  
- [x] No JavaScript added  
- [x] Local preview: `python3 -m http.server` — manual check light/dark + two widths  

---

## Relationship to v1 spec

`2026-06-04-personal-website-design.md` remains the product/visual source of truth. This document **only** defines v2 engineering/layout changes. On conflict, v2 wins for DOM/CSS structure; v1 wins for brand and content IA.
