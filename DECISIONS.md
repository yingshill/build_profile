# Decisions

Append-only log of significant architecture, stack, and design decisions. Never delete old entries — if a decision is reversed, add a new entry.

---

## Purge all previous-owner (Santiago / santifer.io) content from the forked repo
**Date:** 2026-05-26
**Context:** This portfolio repo was forked from the previous owner Santiago Fernández de Valderrama (santifer.io). A request to fix one fabricated LinkedIn URL revealed a large hidden layer of his leftover content: dead case-study components, Spanish copy under the `zh` key, santifer.io branding in live files, and an entire `index.html` JSON-LD identity graph describing Santiago (including the CLAUDE.md-banned Career-Ops).
**Options considered:** (a) fix only the LinkedIn URL; (b) fix branding strings but keep the dead code; (c) full purge of all previous-owner content and rewrite the structured-data identity for Elena.
**Decision:** Full purge. Deleted the dead-island feature cluster (`chatbot-i18n`, CareerOps, BusinessOS, SantiferIRepair/Jacobo, ProgrammaticSeo, N8nForPMs + their i18n) and the `public/jacobo/` & `public/chatbot/` asset folders — none were reachable from the router or registry. Rebranded live files (GlobalNav, useVoiceMode, components.tsx, the `/ops` LLMOps dashboard which was kept as Elena's own). Rewrote the `index.html` JSON-LD `@graph` into Elena's WebSite + ProfilePage + Person + FAQPage, sourced entirely from `about-i18n.ts` (no fabricated data). Kept `/ops` and `foto-avatar.png` (Elena's photo, Spanish-derived filename).
**Tradeoffs:** Gained: a clean repo with zero previous-owner traces (verified by grep), correct site-wide structured data for SEO/AI crawlers, compliance with the CLAUDE.md Career-Ops exclusion rule. Gave up: ~150 asset files and several built-out (but unused) case-study components that could theoretically have been re-skinned for Elena rather than deleted — judged not worth keeping since they were Santiago's domain (phone repair, job-search automation) and unrelated to Elena's Trust & Safety positioning.
