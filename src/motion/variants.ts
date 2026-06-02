import type { Variants, Transition } from 'motion/react';

/**
 * Motion library — reusable animation "templates".
 *
 * Workflow: when you capture a clip on Dribbble/Pinterest, deconstruct it into a
 * motion spec (property · trigger · timing · easing · stagger), then add it here as
 * a named variant. Audition everything at /motion-lab (dev only).
 *
 * Every variant uses `hidden` / `show` states so it composes the same way whether
 * you drive it with `whileInView`, `animate`, or a parent's stagger:
 *
 *   import { motion } from 'motion/react'
 *   import { revealUp } from './motion/variants'
 *
 *   <motion.div variants={revealUp} initial="hidden" whileInView="show"
 *               viewport={{ once: true, amount: 0.4 }} />
 *
 * Reduced motion: prefer driving these through Motion's `useReducedMotion()` at the
 * call site, or rely on the global reduced-motion handling already in the app.
 */

// ─── Tokens ─────────────────────────────────────────────────────────────────
// The "feel" lives in the easing + duration, not the property. Reuse these so the
// whole site shares one motion vocabulary instead of ad-hoc numbers per component.

/** Easing curves. `out` is the site's existing signature curve (expo-style ease-out). */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const, // entrances — decelerate into place
  inOut: [0.65, 0, 0.35, 1] as const, // moves that start and end on screen
} as const;

/** Spring presets for physical, overshoot-y motion (pop-ins, toggles). */
export const spring: Record<'snappy' | 'soft', Transition> = {
  snappy: { type: 'spring', stiffness: 300, damping: 24 },
  soft: { type: 'spring', stiffness: 200, damping: 26 },
};

/** Durations in seconds. */
export const duration = { fast: 0.3, base: 0.5, slow: 0.8 } as const;

// ─── Variants (the templates) ────────────────────────────────────────────────

/** Plain opacity fade. The safest, most universal reveal. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.base, ease: ease.out } },
};

/** Fade + rise. The workhorse for scroll-into-view section/card reveals. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
};

/** Fade + slide from the left — for side-entering rows or list items. */
export const revealLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: duration.base, ease: ease.out } },
};

/** Pop in with a spring — for badges, icons, CTAs that should feel tactile. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: spring.snappy },
};

/** Defocus → focus. A premium, slightly cinematic reveal for hero/headline text. */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: duration.slow, ease: ease.out },
  },
};

// ─── Stagger (choreography) ──────────────────────────────────────────────────
// Put `staggerContainer` on the parent (initial="hidden" whileInView="show") and
// `staggerItem` on each child. The parent orchestrates; children inherit the state.

/** Parent orchestrator — reveals children in sequence. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Child of `staggerContainer`. Same shape as `revealUp` so items rise in turn. */
export const staggerItem: Variants = revealUp;
