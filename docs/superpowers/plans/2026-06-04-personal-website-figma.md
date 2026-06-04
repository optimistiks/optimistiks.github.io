# Personal Website — Figma Mobile v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build two mobile frames (dark + light) for a terminal-inspired personal site on **one Figma page**, matching `docs/superpowers/specs/2026-06-04-personal-website-design.md`.

**Architecture:** Figma MCP only — `create_new_file` for drafts file, incremental `use_figma` scripts (load `figma-use` + `figma-generate-library` skills before every write). Single variable collection with Light/Dark modes; assemble screen from auto-layout frames + small components; verify with `get_screenshot`.

**Tech stack:** Figma Plugin API via MCP (`use_figma`, `create_new_file`, `get_screenshot`, `whoami`). Fonts: **Sora**, **Martian Mono** (Google Fonts — load via `figma.loadFontAsync` before text edits).

**Spec reference:** `docs/superpowers/specs/2026-06-04-personal-website-design.md`

**Record deliverable:** After Task 8, add `file_key` and `file_url` to `docs/superpowers/plans/2026-06-04-personal-website-figma.md` § Delivery.

---

## File / artifact map

| Artifact | Location | Responsibility |
|----------|----------|----------------|
| Design spec | `docs/superpowers/specs/2026-06-04-personal-website-design.md` | Source of truth |
| This plan | `docs/superpowers/plans/2026-06-04-personal-website-figma.md` | Execution steps |
| Figma file | Figma drafts — `Personal Site — Mobile v1` | All visual deliverables on **Page 1** |
| Delivery log | Bottom of this plan file | `file_key`, `file_url` after build |

No application code in this plan.

---

## Prerequisites (human)

- Figma MCP connected in Cursor (verify: `whoami` returns your account).
- Use **Personal** plan key (`team::1053724110161125624`) for `create_new_file` (Full seat on drafts).
- Optional: install **Sora** and **Martian Mono** in Figma font picker if MCP font load fails (Google Fonts).

---

### Task 0: Create Figma file

**Skills:** `figma-create-new-file` → `create_new_file`

- [ ] **Step 1: Confirm account**

Call MCP `whoami`. Expect `mail@potapovmax.com` and Personal plan key `team::1053724110161125624`.

- [ ] **Step 2: Create design file**

```json
{
  "planKey": "team::1053724110161125624",
  "fileName": "Personal Site — Mobile v1",
  "editorType": "design"
}
```

Expected: `file_key` and `file_url` in response. Save both to this plan’s **Delivery** section.

- [ ] **Step 3: Commit delivery stub**

```bash
cd /Users/optimistiks/Projects/figma-mcp-test
# Edit Delivery section with file_key + file_url, then:
git add docs/superpowers/plans/2026-06-04-personal-website-figma.md
git commit -m "docs: record Figma file for personal site mobile v1"
```

---

### Task 1: Color variables (Light + Dark modes)

**Skills:** `figma-use`, `figma-generate-library`  
**MCP:** `use_figma` with `skillNames: "figma-use,figma-generate-library"`

Replace `FILE_KEY` with actual `file_key` in all scripts below.

- [ ] **Step 1: Create collection + modes + variables**

```javascript
const collection = figma.variables.createVariableCollection("theme");
const lightModeId = collection.modes[0].modeId;
const darkModeId = collection.addMode("Dark");

const vars = {};
const defs = [
  { name: "bg", light: { r: 0.949, g: 0.929, b: 0.902 }, dark: { r: 0.047, g: 0.055, b: 0.071 } },
  { name: "text", light: { r: 0.102, g: 0.094, b: 0.078 }, dark: { r: 0.910, g: 0.902, b: 0.890 } },
  { name: "muted", light: { r: 0.420, g: 0.396, b: 0.376 }, dark: { r: 0.478, g: 0.498, b: 0.529 } },
  { name: "accent", light: { r: 0.055, g: 0.455, b: 0.565 }, dark: { r: 0.337, g: 0.714, b: 0.761 } },
  { name: "prompt", light: { r: 0.706, g: 0.325, b: 0.035 }, dark: { r: 0.898, g: 0.710, b: 0.404 } },
  { name: "border", light: { r: 0.851, g: 0.824, b: 0.784 }, dark: { r: 0.145, g: 0.161, b: 0.188 } },
];

for (const d of defs) {
  const v = figma.variables.createVariable(d.name, collection, "COLOR");
  v.scopes = ["ALL_FILLS", "TEXT_FILL", "STROKE_COLOR"];
  v.setValueForMode(lightModeId, d.light);
  v.setValueForMode(darkModeId, d.dark);
  vars[d.name] = v.id;
}

return { collectionId: collection.id, lightModeId, darkModeId, variableIds: vars };
```

- [ ] **Step 2: Verify**

Re-run read-only script or inspect Variables panel in Figma. Expect 6 variables × 2 modes.

- [ ] **Step 3: Checkpoint**

Share variable list with user; continue only after OK (or proceed if user pre-approved spec).

---

### Task 2: Foundations strip (one Figma page)

**MCP:** `use_figma`

- [ ] **Step 1: Rename page + place foundations frame**

```javascript
const page = figma.currentPage;
page.name = "v1 — Mobile";

const foundations = figma.createFrame();
foundations.name = "Foundations";
foundations.resize(360, 520);
foundations.x = 40;
foundations.y = 40;
foundations.layoutMode = "VERTICAL";
foundations.itemSpacing = 12;
foundations.paddingLeft = foundations.paddingRight = 16;
foundations.paddingTop = foundations.paddingBottom = 16;
foundations.fills = [{ type: "SOLID", color: { r: 0.95, g: 0.95, b: 0.95 } }];

await figma.loadFontAsync({ family: "Sora", style: "Regular" });
const title = figma.createText();
title.fontName = { family: "Sora", style: "Regular" };
title.characters = "Tokens — see Variables panel";
title.fontSize = 14;
foundations.appendChild(title);

page.appendChild(foundations);
return { createdNodeIds: [foundations.id, title.id] };
```

Expected: small frame top-left on Page 1 labeled Foundations.

---

### Task 3: Work row component

**MCP:** `use_figma` (2–3 calls if needed)

- [ ] **Step 1: Load fonts**

```javascript
await figma.loadFontAsync({ family: "Sora", style: "Regular" });
await figma.loadFontAsync({ family: "Sora", style: "Medium" });
await figma.loadFontAsync({ family: "Martian Mono", style: "Regular" });
return { ok: true };
```

If Martian Mono fails, fallback: `JetBrains Mono` and note in Delivery.

- [ ] **Step 2: Build `WorkRow` component**

```javascript
const row = figma.createComponent();
row.name = "WorkRow";
row.layoutMode = "VERTICAL";
row.itemSpacing = 6;
row.paddingLeft = row.paddingRight = 0;
row.paddingTop = row.paddingBottom = 0;
row.layoutSizingHorizontal = "FILL";
row.primaryAxisSizingMode = "AUTO";
row.counterAxisSizingMode = "AUTO";
row.fills = [];

const titleLine = figma.createText();
titleLine.name = "title";
titleLine.fontName = { family: "Sora", style: "Medium" };
titleLine.characters = "2024–2023 · Project Alpha";
titleLine.fontSize = 15;
row.appendChild(titleLine);

const refLine = figma.createText();
refLine.name = "ref";
refLine.fontName = { family: "Martian Mono", style: "Regular" };
refLine.characters = "ref: linkedin.com/in/example";
refLine.fontSize = 12;
row.appendChild(refLine);

const linksLine = figma.createText();
linksLine.name = "links";
linksLine.fontName = { family: "Sora", style: "Regular" };
linksLine.characters = "github.com · article · demo";
linksLine.fontSize = 14;
row.appendChild(linksLine);

const descLine = figma.createText();
descLine.name = "description";
descLine.fontName = { family: "Sora", style: "Regular" };
descLine.characters = "One-line description (optional)";
descLine.fontSize = 13;
row.appendChild(descLine);

row.x = 40;
row.y = 600;
figma.currentPage.appendChild(row);

return { createdNodeIds: [row.id, titleLine.id, refLine.id, linksLine.id, descLine.id], componentKey: row.key };
```

- [ ] **Step 3: Screenshot**

`get_screenshot` on WorkRow node id. Expect readable 4-line stack.

---

### Task 4: Theme toggle component

- [ ] **Step 1: Build `ThemeToggle`**

```javascript
await figma.loadFontAsync({ family: "Martian Mono", style: "Regular" });

const toggle = figma.createComponent();
toggle.name = "ThemeToggle";
toggle.resize(44, 44);
toggle.layoutMode = "HORIZONTAL";
toggle.primaryAxisAlignItems = "CENTER";
toggle.counterAxisAlignItems = "CENTER";
toggle.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0, a: 0 } }];

const label = figma.createText();
label.fontName = { family: "Martian Mono", style: "Regular" };
label.characters = "◐";
label.fontSize = 18;
toggle.appendChild(label);

toggle.x = 320;
toggle.y = 600;
figma.currentPage.appendChild(toggle);

return { createdNodeIds: [toggle.id, label.id], componentKey: toggle.key };
```

---

### Task 5: Mobile / Dark frame (390 × 844)

- [ ] **Step 1: Create screen frame with bound background**

Use variable aliases from Task 1 for fills (bind `bg` in Dark mode on frame). Script creates:

- Frame `Mobile / Dark` at x=480, y=40, 390×844, vertical auto-layout, padding 24, gap 48
- Header row: `~/maxim` (mono accent) + instance of ThemeToggle
- Identity block: 80px photo placeholder (ellipse, muted fill), name 26px Sora Semibold, role, location·TZ, 3-line bio
- `$ contact` label (prompt color) + 4 link lines
- `// work` label + 4× WorkRow instances (newest first placeholder copy)

- [ ] **Step 2: Dark noise overlay**

Add child rectangle on screen frame, 2–3% opacity noise or subtle gray texture fill; name `noise-overlay`; locked.

- [ ] **Step 3: Screenshot + spec check**

`get_screenshot` full frame. Verify against spec § Identity, Contact, Work.

**Placeholder copy (use verbatim for consistency):**

| Field | Text |
|-------|------|
| Path | `~/maxim` |
| Name | `Maxim Potapov` |
| Role | `Software engineer` |
| Location | `Location · Europe/Berlin` |
| Bio | `Building reliable systems. Previously startups and product teams.` (max 3 lines) |
| Email | `mail@potapovmax.com` |
| LinkedIn | `linkedin.com/in/...` |
| GitHub | `github.com/...` |
| Resume | `resume.pdf` |
| Work 1 | `2024–2023 · Chapterly` |
| Work 2 | `2022–2020 · Project Beta` |
| Work 3 | `2019–2018 · Project Gamma` |
| Work 4 | `2017–2016 · Project Delta` |

---

### Task 6: Mobile / Light frame

- [ ] **Step 1: Duplicate Dark frame**

Duplicate `Mobile / Dark` → rename `Mobile / Light`, position x=900, y=40.

- [ ] **Step 2: Swap variable mode to Light**

Set explicit variable mode on light frame to collection’s Light mode; confirm bg `#F2EDE6`, text `#1A1814`, accent teal.

- [ ] **Step 3: Remove or soften noise overlay**

Delete noise child on light frame only.

- [ ] **Step 4: Screenshot both frames side by side**

Two `get_screenshot` calls. User checkpoint: approve before marking spec success criteria done.

---

### Task 7: QA pass (spec success criteria)

- [ ] **Step 1: Structure audit**

Read-only `use_figma`: list top-level nodes on Page 1 — expect Foundations, WorkRow, ThemeToggle, Mobile/Dark, Mobile/Light.

- [ ] **Step 2: Visual audit checklist**

| Criterion | Pass? |
|-----------|-------|
| Two mobile frames on one page | |
| Section order: identity → contact → work | |
| No nav, no gallery, no bullets | |
| Sora + Martian Mono (no Inter) | |
| Dark ≠ GitHub default blue/green | |
| Theme toggle visible top-right | |
| 4 work rows, flat list | |

- [ ] **Step 3: Update spec checkboxes**

In `docs/superpowers/specs/2026-06-04-personal-website-design.md`, check the four Success criteria boxes when all pass.

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/specs/2026-06-04-personal-website-design.md docs/superpowers/plans/2026-06-04-personal-website-figma.md
git commit -m "docs: mark Figma v1 QA complete and record file URL"
```

---

### Task 8: Handoff to user

- [ ] **Step 1: Post Figma link**

Send user `file_url` with instruction: review on phone frame preview in Figma mirror if available.

- [ ] **Step 2: Note follow-ups (out of scope)**

Desktop frames, real copy swap, blog block, website code — separate specs/plans.

---

## Delivery

| Field | Value |
|-------|-------|
| `file_key` | _filled after Task 0_ |
| `file_url` | _filled after Task 0_ |
| Completed | _date after Task 7_ |

---

## Plan self-review (spec coverage)

| Spec section | Task |
|--------------|------|
| Single page IA, 3 blocks | Task 5–6 |
| Identity fields + photo + toggle | Task 5 |
| Contact links | Task 5 |
| Work flat list | Task 3, 5 |
| Typography Sora + Martian Mono | Tasks 3, 5 |
| Color tokens both themes | Task 1, 6 |
| Dark noise / light paper | Task 5–6 |
| One Figma page | Tasks 2, 5–6 |
| Mobile 390×844 only | Task 5–6 |
| No code | Entire plan |
| Placeholder content | Task 5 table |

No TBD steps. Font fallback documented if Martian Mono unavailable.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-04-personal-website-figma.md`.

**Two execution options:**

1. **Subagent-driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline execution** — run tasks in this session with checkpoints after Tasks 1, 5, 6, 7  

**Which approach do you want?**
