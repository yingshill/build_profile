# Decisions

Append-only log of significant architecture, stack, and design decisions. Never delete old entries — if a decision is reversed, add a new entry.

---

## Purge all previous-owner (Santiago / santifer.io) content from the forked repo

**Date:** 2026-05-26
**Context:** This portfolio repo was forked from the previous owner Santiago Fernández de Valderrama (santifer.io). A request to fix one fabricated LinkedIn URL revealed a large hidden layer of his leftover content: dead case-study components, Spanish copy under the `zh` key, santifer.io branding in live files, and an entire `index.html` JSON-LD identity graph describing Santiago (including the CLAUDE.md-banned Career-Ops).
**Options considered:** (a) fix only the LinkedIn URL; (b) fix branding strings but keep the dead code; (c) full purge of all previous-owner content and rewrite the structured-data identity for Elena.
**Decision:** Full purge. Deleted the dead-island feature cluster (`chatbot-i18n`, CareerOps, BusinessOS, SantiferIRepair/Jacobo, ProgrammaticSeo, N8nForPMs + their i18n) and the `public/jacobo/` & `public/chatbot/` asset folders — none were reachable from the router or registry. Rebranded live files (GlobalNav, useVoiceMode, components.tsx, the `/ops` LLMOps dashboard which was kept as Elena's own). Rewrote the `index.html` JSON-LD `@graph` into Elena's WebSite + ProfilePage + Person + FAQPage, sourced entirely from `about-i18n.ts` (no fabricated data). Kept `/ops` and `foto-avatar.png` (Elena's photo, Spanish-derived filename).
**Tradeoffs:** Gained: a clean repo with zero previous-owner traces (verified by grep), correct site-wide structured data for SEO/AI crawlers, compliance with the CLAUDE.md Career-Ops exclusion rule. Gave up: ~150 asset files and several built-out (but unused) case-study components that could theoretically have been re-skinned for Elena rather than deleted — judged not worth keeping since they were Santiago's domain (phone repair, job-search automation) and unrelated to Elena's Trust & Safety positioning.

## Route transitions: AnimatePresence crossfade replacing CSS-only enter fade

**Date:** 2026-05-27
**Context:** Navigation used `PageTransition` — a raw CSS `page-fade-in 0.25s` keyed on pathname, enter-only. The new page swapped in instantly then faded, with no exit, reading as a hard cut. Goal was a real, subtle page transition matching the site's existing restrained motion vocabulary.
**Options considered:** (a) keep CSS, add a matching exit fade by hand; (b) `AnimatePresence` with overlapping/sync mode (true crossfade); (c) `AnimatePresence mode="wait"` (exit fully, then enter). For lazy routes: hover-preload vs. accept blank flash vs. exclude lazy routes from the effect.
**Decision:** `AnimatePresence mode="wait"` keyed on `location.pathname`, exit ~150ms / enter ~200ms opacity crossfade (`AnimatedRoutes` in `main.tsx`). `initial={false}` suppresses the enter animation on first load so it matches the prerendered HTML (no hydration flash). `useReducedMotion` collapses durations to 0. Scroll-to-top + hash-scroll/highlight moved into a `ScrollManager` rendered _inside_ the keyed wrapper so it fires when the new page mounts (after exit), avoiding a mid-transition scroll jump. Lazy case-study chunks are warmed via a single delegated `pointerover`/`focusin` document listener (`useArticlePreload`) that preloads on link hover/focus — chosen over per-`<Link>` wiring (scattered, fragile) and over tolerating a Suspense blank beat.
**Tradeoffs:** Gained a continuous enter/exit transition, reduced-motion support, and seamless lazy-route navigation with no new motion vocabulary. Gave up ~150ms added latency before the new page appears (inherent to `mode="wait"`; rejected sync/overlap because the tall scrolling pages would need absolute positioning and break scroll). The `page-fade-in` keyframe in `index.css` is now unused (left in place; harmless). `pointerover` fires often but the handler is cheap and dedupes warmed paths via a Set.

## UX animation pass: count-up on impact metrics

**Date:** 2026-06-01
**Context:** Request to add "design taste" via per-section UX animation. Audit showed the site is already animation-rich (typewriter hero, 3D-tilt cards, scroll-spy rail, reflective story typer, pop-in springs). The gap: the impact metrics — the actual portfolio currency for a Trust & Safety / Ops PM — were static text. Decided to build the proposal one item at a time, starting with metric count-up.
**Options considered:** (a) Motion's `animate()`/`useMotionValue` for the tween; (b) self-contained `requestAnimationFrame` easing. For SSR: (a) initialize display to 0 (animation-true) vs (b) initialize to the final value (SEO/no-JS-true). For the `3→1` style values: skip animation vs count the leading integer and keep the rest as a static suffix.
**Decision:** Self-contained rAF `easeOutCubic` count-up in a reusable `CountUpMetric` component (no new deps, consistent with the existing local `useInView`/IntersectionObserver pattern). Parses the leading integer via `/^(\d+)(.*)$/`; the number counts 0→target, the remainder (`%`, `↑`, `↓`, `→1`) rides along as a static suffix. State initializes to the **final** value so prerendered HTML, no-JS, and hydration all show the real number — the count only runs client-side once the chip scrolls into view. `useReducedMotion` shows the final value with no animation. Applied to all four metric render sites (Moody's, Flip, LeanData, featured project).
**Tradeoffs:** Gained an on-brand "measured confidence" reveal that draws the eye to the numbers, with zero SSR/SEO regression and full reduced-motion support. Gave up: a single frame where an in-view-at-mount metric snaps to 0 before climbing (not perceptible for the below-fold experience cards); counting the leading `3` of `3→1` is slightly arbitrary but reads as the value settling. Chose rAF over Motion's `animate()` to avoid threading more of the Motion API through a tiny leaf component.

## Custom decode-text animation hook (no npm dep)

    **Date:** 2026-06-01
    **Context:** Wanted a "decode/scramble" text reveal effect for the portfolio
    (e.g. hero name/role line). Surveyed existing GitHub libraries.
    **Options considered:**
    - `use-scramble` (tol-is) — 1KB react-hook, typed, well-designed core algorithm
    - `react-decode-animation`, `react-text-scramble`, `react-scramble` — heavier / less flexible
    - Vanilla libs (`scrambling-letters`, twistezo `text-scramble`)
    - DIY hook owning the code, zero dependencies
    **Decision:** Wrote our own `src/useDecodeText.ts` (~40 lines), adapting the core
    technique from **tol-is/use-scramble** (MIT) — a per-character countdown "control
    array" ticked down inside a throttled requestAnimationFrame loop, with a reveal
    frontier sweeping left→right. Source/credit: https://github.com/tol-is/use-scramble
    (file: src/index.ts). Our version uses `textContent` (not `innerHTML`), respects
    `prefers-reduced-motion`, and re-runs on ZH⇄EN text change.
    **Tradeoffs:** Gained — zero added dependency, full control, no supply-chain/XSS
    surface, matches existing flat-hook convention (`useAudioAnalyser.ts`). Gave up —
    we now maintain the animation code ourselves rather than getting upstream fixes;
    fewer config knobs than the original (`overdrive`, `seed`, custom unicode range,
    `chance` were dropped as unneeded).

    A few notes on the attribution since that was your concern:
    - The hook's JSDoc header already credits the source inline: Technique (adapted from tol-is/use-scramble).
    - The original is MIT-licensed, so adapting the algorithm is fine; the DECISIONS entry above records the provenance at the project level (the "why"), which is the right home for it per your global rules.
    - If you want belt-and-suspenders, you could also add a one-line // Adapted from tol-is/use-scramble (MIT) comment at the very top of the file above the import — but the JSDoc already covers it.

## Reverted: removed decode-text animation

**Date:** 2026-06-01
**Context:** Reverses the "Custom decode-text animation hook" decision above. After
seeing it wired into the hero greeting line (scroll-triggered, ZH CJK / EN Latin
glyph pools), the effect read as too fancy for the portfolio's tone.
**Options considered:** Keep but tune timing/placement · keep the hook unused for
later · remove entirely.
**Decision:** Removed entirely — deleted `src/useDecodeText.ts` and
`src/DecodeText.tsx`, reverted the hero greeting line in `src/App.tsx` back to plain
`{t.greeting}`. The original decision entry above is retained per append-only policy.
The section-by-section UX animation pass committed alongside it (`5ed3a64`) is kept.
**Tradeoffs:** Gained — a cleaner, less gimmicky hero that matches the site's
measured tone; one fewer piece of bespoke animation code to maintain. Gave up — the
on-mount/scroll decode reveal. The technique survives in git history (`5ed3a64`) and
in this log if we ever want it back.
