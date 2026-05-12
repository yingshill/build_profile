# UI/UX Redesign Tracker

**Owner:** Elena Liu  
**Status:** 🟡 In Progress — collecting references  
**Goal:** Replace teal + purple theme with a palette that fits Elena's aesthetic and T&S PM brand

---

## Related Design Contracts

- [Portfolio Artifact Design Baseline](PORTFOLIO_ARTIFACT_DESIGN_BASELINE.md): portable rules for rebuilding project artifacts from each repo's real context.

Keep this file focused on the portfolio site's brand, theme, layout, and taste decisions. Use the artifact baseline for project-specific SVG/video artifact creation. Artifact visuals should respect the confirmed brand direction here, but they should not all copy the same site layout or palette.

---

## Current Theme (to replace)

| Token | Value | Notes |
|---|---|---|
| Primary | `hsl(187, 74%, 28%)` | Dark teal |
| Accent | `hsl(270, 70%, 38%)` | Purple |
| Background | `hsl(220, 6%, 96%)` | Near-white |
| Font display | Instrument Serif | Italic serif for headings |
| Font sans | Inter / system-ui | Body text |

**Problem:** Purple + teal reads as "AI startup" — not sharp enough for a T&S PM targeting Lyft, Discord, Meta, TikTok hiring managers.

---

## Reference Images

| # | Source | Report | Status |
|---|---|---|---|
| 01 | `public/explore/` — 6 wedding stationery images (小红书 · 少羽) | [report-01.md](public/explore/report-01.md) | 🟡 Awaiting confirmation |

---

## Inferred Taste Profile

*Built from references — awaiting Elena's confirmation.*

- **Warmth:** Warm-dominant. Dusty salmon, terracotta, chartreuse lead; powder blue as one cool counterweight.
- **Mode default:** TBD — references are all light/paper-based
- **Color approach:** Muted, earthy, multi-color (5-color palette that coheres because nothing is saturated)
- **Typography:** Drawn to serif + script pairings; letterpress / editorial register
- **Layout density:** Editorial, layered — not minimalist; maximalist in spirit but curated
- **Overall vibe:** Warm · Editorial · Artisanal · Tactile · Rooted · Cultured

---

## Confirmed Design Decisions

*Locked in — don't revisit unless Elena says so.*

- [x] Primary color: Deep sage — `hsl(145 28% 40%)` light / `hsl(145 38% 58%)` dark
- [x] Accent color: Dusty salmon — `hsl(12 48% 62%)` light / `hsl(12 52% 68%)` dark
- [x] Background: Warm cream ivory — `hsl(38 35% 94%)` light / warm charcoal `hsl(30 12% 10%)` dark
- [x] Font pairing: Keep current (Space Grotesk display + DM Sans body) — no serif
- [x] Warmth level: Match the stationery energy — full warmth, not dialed back
- [x] Direction: Palette B — Sage Lead (confirmed 2026-05-06)

---

## Implementation Plan

*Filled in after decisions are confirmed.*

- [ ] Update CSS variables in `src/index.css`
- [ ] Update dark mode overrides
- [ ] Update OG image colors (if applicable)
- [ ] Update diagram colors in `ModerationOsDiagram.tsx`
- [ ] Spot-check all pages: home, about, `/moderation-os`, `/ml-pipeline`, `/safety-index`

---

## Session Log

| Date | What happened |
|---|---|
| 2026-05-06 | Started redesign process. Collected 6 reference images (wedding stationery). Generated report-01. Awaiting taste confirmation. |
| 2026-05-06 | Elena confirmed taste read. Direction B (Sage Lead) chosen. Full warmth. No serif. Applied to `src/index.css` — all 4 mode blocks updated. Live at localhost:5173. |
