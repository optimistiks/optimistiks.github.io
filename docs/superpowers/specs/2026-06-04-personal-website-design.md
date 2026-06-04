# Personal Website — Design Spec (v1)

**Status:** Approved in brainstorming (2026-06-04); **implementation pivot** (2026-06) — HTML/CSS, not Figma  
**Phase:** Visual + content spec (source of truth for the site)  
**Owner:** Maxim Potapov  

## Summary

A minimal, terminal-inspired personal site on a **single scrollable page**: identity → contact → work history. **Mobile-first**, **light and dark** themes, no navigation, no project gallery, no blog in v1.

**First deliverable:** static **HTML + CSS** (no JavaScript in v1), hosted on **GitHub Pages**. Figma is out of scope; the existing Figma draft file is optional reference only.

## Goals

| Goal | Detail |
|------|--------|
| Primary | Ship a readable static site matching this spec |
| Audience | Recruiters, peers, hiring managers — understand who you are, how to contact you, what you've built |
| Tone | Terminal / engineer — distinctive, not generic “GitHub portfolio” |
| Constraint | HTML + CSS only (v1); GitHub Pages hosting |

## Non-goals (v1)

- JavaScript (including manual theme toggle UI — see Theming below)
- Figma MCP / design-tool automation
- CMS, analytics, backend
- Desktop / tablet breakpoints
- Blog or writing section (optional footnote only if needed later)
- Project images, case-study cards, résumé bullet lists
- Sticky navigation or multi-page IA

## Information architecture

Single page, scroll only, three blocks (top → bottom):

1. **Identity** — who you are  
2. **Contact** — hire / reach you  
3. **Work** — credibility log (not a gallery)

### Identity block

- Shell label: `~/<slug>` in monospace (e.g. `~/maxim` — user’s preferred handle)  
- **Photo:** 80px, left-aligned, slight overlap into top padding (4–8px)  
- **Name** (sans, prominent)  
- **Role** (one line)  
- **Location · timezone**  
- **Bio:** 2–4 lines max  
- **Theming (v1, no JS):** follow system via `prefers-color-scheme` in CSS; optional `◐` label is decorative only until JS is allowed later

### Contact block

- Shell label: `$ contact` (prompt color, not body default)  
- One link per line, no bullets:  
  - Email  
  - LinkedIn  
  - GitHub  
  - PDF resume (`resume.pdf` or “Download resume (PDF)”)

### Work block

- Shell label: `// work`  
- **Flat list**, newest first  
- Per entry (repeat):  
  - Line 1: `years` + **name** (e.g. `2024–2023 · Project Name`)  
  - Line 2: `ref:` LinkedIn (or other reference)  
  - Line 3+: external **links** separated by ` · ` (press, repos, articles — credibility)  
  - Optional: one **muted** description line (not a paragraph)  
- No images, no résumé-style bullets, no card grid

## Design direction

**Chosen approach: B — Terminal-accented**

- Sans for readability (name, bio, links, descriptions)  
- Monospace for shell chrome, dates, `ref:` prefixes  
- Metaphors: `~/`, `$`, `//` — not full monospace UI  

**Rejected for v1:**

- A — Full terminal literal (mobile legibility risk)  
- C — README clone (too generic)

**Differentiation hook:** *“Personal log file”* — warm phosphor dark, printed-paper light — not SaaS landing or GitHub clone.

### Typography

| Role | Typeface | Mobile size |
|------|----------|-------------|
| Name | Sora, semibold | 24–28px |
| Body, role, bio, links | Sora, regular | 14–16px |
| Shell labels, years, `ref:` | Martian Mono | 12–13px |
| Work title | Sora or Martian Mono, medium | 15–16px |
| Muted description | Sora | 13px |

**Do not use:** Inter, Roboto, Arial, system-ui-only stack, Space Grotesk.

### Color tokens

Shared token names across light/dark frames.

**Dark — “phosphor terminal”**

| Token | Hex | Use |
|-------|-----|-----|
| `bg` | `#0C0E12` | Page |
| `text` | `#E8E6E3` | Body |
| `muted` | `#7A7F87` | Descriptions |
| `accent` | `#56B6C2` | Links, `~/` |
| `prompt` | `#E5B567` | `$ contact` |
| `border` | `#252930` | Sparse dividers |

**Light — “printed log”**

| Token | Hex | Use |
|-------|-----|-----|
| `bg` | `#F2EDE6` | Page |
| `text` | `#1A1814` | Body |
| `muted` | `#6B6560` | Secondary |
| `accent` | `#0E7490` | Links |
| `prompt` | `#B45309` | `$ contact` |
| `border` | `#D9D2C8` | Dividers |

### Atmosphere

- **Dark:** 2–3% noise overlay on background (subtle texture)  
- **Light:** flat warm paper; optional 1px inset “page margin”  
- No gradients, glow, or glassmorphism  

### Spacing (390px frame)

- Horizontal padding: 20–24px  
- Section gap: 40–48px  
- Within work entry: 6px tight; 20px between entries  
- Theme toggle: note `150ms` cross-fade for future implementation  

## Implementation deliverables (v1)

| Artifact | Purpose |
|----------|---------|
| `index.html` | Semantic structure: identity, contact, work list |
| `css/styles.css` (or `styles.css` at root) | Tokens, layout, light/dark via CSS variables + `prefers-color-scheme` |
| `assets/` (optional) | Photo, `resume.pdf`, favicon |
| GitHub Pages | Publish from repo root or `/docs` per Pages settings |

### Suggested repo layout

```
index.html
styles.css          # or css/styles.css
assets/photo.jpg    # optional
assets/resume.pdf   # optional
```

### Placeholder content

- Realistic name, role, location, timezone, 3-line bio  
- 4 sample work rows with years, `ref:`, 2–3 links each, optional one-line description  

### Superseded: Figma-first workflow

Prior plan `docs/superpowers/plans/2026-06-04-personal-website-figma.md` is **cancelled**. Optional draft: [Figma file](https://www.figma.com/design/OMJffA0p6Ky6lEkdUgT0r5) — not required.

## Brainstorming decisions log

| Topic | Decision |
|-------|----------|
| Page count (site) | One scrollable page |
| Section order | Identity → contact → work |
| Aesthetic | Terminal engineer (approach B) |
| Themes | Light + dark; site will support toggle later |
| Navigation | None |
| Contact | Email, LinkedIn, GitHub, PDF resume |
| Work layout | Flat chronological list, newest first |
| Work content | Names, years, ref, external links, optional short line; no images/bullets |
| Identity | Role, location, timezone, bio, photo |
| Implementation | HTML + CSS, GitHub Pages |
| Theming | System light/dark (no JS v1) |
| Figma | Superseded |

## Future phases (not in v1)

- Desktop (+ optional tablet) frames  
- Blog / writing block  
- Implementation plan + code (separate spec)  
- Real content swap-in from user’s work history  

## Success criteria

- [ ] `index.html` + CSS render identity → contact → work in correct order  
- [ ] Light and dark themes work via `prefers-color-scheme` (no JS)  
- [ ] Mobile-first layout readable at ~390px; acceptable on desktop  
- [ ] Typography: Sora + Martian Mono; colors per token table — not Inter/GitHub clone  
- [ ] Site loads on GitHub Pages with working links (email, LinkedIn, GitHub, PDF)  
