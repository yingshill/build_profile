# Portfolio Rebuild Roadmap
**Owner:** Yingshi (Elena) Liu  
**Project:** build_profile (React/Vite/Vercel)  
**Languages:** English (EN) + Chinese (ZH)

---

## Portfolio Thesis
> "I build Trust & Safety systems at scale — protecting users, advertisers, and marketplace participants through AI-driven enforcement, automation, and operational excellence."

Every page element either supports this sentence or it's cut.

**Primary audience:** T&S PM / Integrity PM / Policy Manager hiring managers at Lyft, Discord, Pinterest, Meta, TikTok, Anthropic.
**Domains covered:** content moderation, advertiser integrity, seller/marketplace trust — all three matter for the pipeline.

---

## Status Legend
- `[x]` Done
- `[~]` In progress
- `[ ]` Backlog
- `[-]` Deliberately cut

---

## Phase 0 — Re-identity (EN + ZH skeleton) `[x]`
> Goal: Site shows Elena's name, contact, bio at localhost:5173. No more "santifer".

- [x] Rename language key `es` → `zh` across all source files
- [x] Rewrite `src/i18n.ts` — identity, summary, roles, competencies, CTA, UI, chat
- [x] Rewrite `src/about-i18n.ts` — bio, timeline, education, certifications
- [ ] Update `chatbot-prompt.txt` — retrain chatbot persona on Elena's background
- [ ] Update `public/llms.txt` — replace santifer persona
- [ ] Update `package.json` name/description
- [x] Replace `hola@santifer.io` → `yingshiliu.j@gmail.com` everywhere

---

## Phase 1 — Experience Section `[~]` ← CURRENT
> Goal: Home page shows Elena's real 4-company career history.
> Priority: HIGH — resume must match site; Lyft/Discord reviewing today.

- [ ] Rewrite `experience` block in `src/i18n.ts` (Moody's, Flip, LeanData, Modis)
- [ ] Update component keys in `App.tsx` if needed
- [ ] Add metrics/highlights for each role (22% accuracy, 15% AHT, 65% automation, 40% onboarding)
- [ ] ZH translation of all experience content

---

## Phase 2 — Case Study: Moody's Moderation OS `[ ]`
> Priority: HIGH — artifact PDF exists, lowest writing effort, highest T&S hiring signal.
> Audience: Lyft T&S Policy Manager, Discord Ads Integrity, Pinterest Enforcement Systems

**Page: `/moderation-os` (EN) + `/zh/moderation-os` (ZH)**
- [ ] Write case study narrative from `artifact-1-moody-case-study.pdf`
  - Problem: 3 legacy moderation tools, fragmented workflow
  - Built: unified Internal Safety OS
  - Results: 40% onboarding ↓, 22% accuracy ↑, 15% AHT ↓
- [ ] LLM-assisted moderator agent deep dive (Safety Index System: Precision, Recall, FPR)
- [ ] Architecture diagram: moderation pipeline
- [ ] ZH translation
- [ ] Register in `src/articles/registry.ts`

---

## Phase 3 — Projects Grid (GitHub repos featured) `[ ]`
> Priority: HIGH — technical proof, quick to build.

- [ ] Rewrite `projects` block in `src/i18n.ts`:
  - **Feature**: `ai-content-moderation-edge-case-eval-framework` — T&S hiring managers pattern-match on "edge case eval"
  - **Include**: `ai-governance-red-team-control-pipeline` — AI governance differentiator
  - **Include**: Career-Ops — multi-agent systems proof
  - **List only** (no case study): `incident-drill-kit`
  - **Remove**: santifer.io, Content Digest, Life OS (off-narrative)
- [ ] ZH translation

---

## Phase 4 — Case Study: Career-Ops (meta) `[ ]`
> Priority: MEDIUM-HIGH — demonstrates multi-agent systems + AI fluency end-to-end.
> Writes itself from existing pipeline data.

- [ ] Update `src/career-ops-i18n.ts` — re-author as Elena's perspective
- [ ] Add real data: 85+ evaluated jobs, top scores, pipeline metrics
- [ ] Highlight: eval pipeline design, multi-agent architecture, automation coverage
- [ ] ZH translation

---

## Phase 5 — Case Study: Flip ML Pipeline `[ ]`
> Priority: MEDIUM — supporting evidence for automation claims.

**Page: `/ml-pipeline` (EN) + ZH**
- [ ] Write case study: Flip Tier-1 automation
  - 65% Tier-1 reports automated with ML classifiers
  - 12% moderator decision speed improvement
  - GenAI policy enforcement tool pilot
- [ ] Write case study: LeanData data governance (can combine with Flip page)
  - JSON taxonomy standardization
  - Python Scikit-learn: 35% automation coverage ↑
- [ ] ZH translation
- [ ] Register in registry

---

## Phase 6 — Home Page Refresh `[ ]`
> Priority: LOW — polish after substance is in.

- [ ] Rewrite `story` block (intro animation copy)
- [ ] Replace `linkedinPosts` — T&S/AI-ops posts only, or remove section
- [ ] Remove `speaking` section — nothing to show yet, creates wrong expectation
- [ ] Remove `xPost` / `redditPosts` — off-narrative
- [ ] Update `education` and `certifications` blocks

---

## Phase 7 — Polish & SEO `[ ]`
- [ ] ZH SEO metadata (all pages)
- [ ] Update `public/llms.txt` with Elena's complete profile
- [ ] Update JSON-LD structured data (Person, FAQPage, BreadcrumbList)
- [ ] Replace all OG images with Elena-branded versions
- [ ] Custom domain setup
- [ ] Final content audit — no "Santiago / santifer / Sevilla / Spain" references

---

## Deliberately Cut (noise, off-narrative)
- `[-]` Speaking section — no engagements yet, defer until real talks
- `[-]` Notion AI Command Center as a case study — internal tool, dilutes T&S PM signal
- `[-]` Notion Marketing Command Center as a case study — same reason
- `[-]` `incident-drill-kit` as a full case study — SecOps angle, different buyer
- `[-]` LinkedIn/X/Reddit posts unless T&S-focused
- `[-]` Stellar report "unexpected paths" (LX Designer, Sports Analytics, Marketing Ops) — 6–12 month pivots to explore *after* landing T&S role, not portfolio content

---

## Backlog / Future
- [ ] Chinese-specific landing page for ByteDance/TikTok/Alibaba hiring teams
- [ ] Resume download (PDF) generated from career-ops
- [ ] GitHub activity feed (real)
- [ ] Analytics review after 30 days live

---

## Key Files Reference
| File | Purpose |
|------|---------|
| `src/i18n.ts` | Home page all content (EN + ZH) |
| `src/about-i18n.ts` | About page content |
| `src/career-ops-i18n.ts` | Career-Ops case study |
| `src/articles/registry.ts` | URL routing + slug mapping |
| `chatbot-prompt.txt` | RAG chatbot system prompt |
| `public/llms.txt` | AI crawler persona file |

---

*Last updated: 2026-04-30*
