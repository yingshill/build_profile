import { useState } from 'react';
import { motion, type Variants } from 'motion/react';
import {
  fadeIn,
  revealUp,
  revealLeft,
  scaleIn,
  blurIn,
  staggerContainer,
  staggerItem,
} from './motion/variants';

/**
 * /motion-lab — dev-only catalog of the motion library in `src/motion/variants.ts`.
 *
 * This is the "audition" surface: see every templated effect side by side, replay it,
 * read its motion spec, and copy the usage snippet — before deciding to use it on a
 * real page. The route is registered only when import.meta.env.DEV in main.tsx, so it
 * never ships to production and never touches prerender/SEO.
 */

type Spec = {
  property: string;
  trigger: string;
  timing: string;
  easing: string;
};

type Entry = {
  name: string;
  blurb: string;
  spec: Spec;
  variants: Variants;
  demo: 'single' | 'stagger';
  usage: string;
};

const CATALOG: Entry[] = [
  {
    name: 'fadeIn',
    blurb: 'Plain opacity fade. The safest, most universal reveal.',
    spec: { property: 'opacity', trigger: 'in-view / mount', timing: '0.5s', easing: 'ease.out' },
    variants: fadeIn,
    demo: 'single',
    usage: `<motion.div variants={fadeIn} initial="hidden" whileInView="show"
            viewport={{ once: true }} />`,
  },
  {
    name: 'revealUp',
    blurb: 'Fade + rise. The workhorse for scroll-into-view sections and cards.',
    spec: { property: 'opacity + y(24→0)', trigger: 'in-view', timing: '0.5s', easing: 'ease.out' },
    variants: revealUp,
    demo: 'single',
    usage: `<motion.section variants={revealUp} initial="hidden" whileInView="show"
                viewport={{ once: true, amount: 0.4 }} />`,
  },
  {
    name: 'revealLeft',
    blurb: 'Fade + slide from the left. For side-entering rows or list items.',
    spec: { property: 'opacity + x(-24→0)', trigger: 'in-view', timing: '0.5s', easing: 'ease.out' },
    variants: revealLeft,
    demo: 'single',
    usage: `<motion.li variants={revealLeft} initial="hidden" whileInView="show" />`,
  },
  {
    name: 'scaleIn',
    blurb: 'Pop in with a spring. For badges, icons, CTAs that should feel tactile.',
    spec: { property: 'opacity + scale(0.85→1)', trigger: 'mount / hover', timing: 'spring.snappy', easing: 'spring' },
    variants: scaleIn,
    demo: 'single',
    usage: `<motion.span variants={scaleIn} initial="hidden" animate="show" />`,
  },
  {
    name: 'blurIn',
    blurb: 'Defocus → focus. A cinematic reveal for hero / headline text.',
    spec: { property: 'opacity + blur(8px→0)', trigger: 'mount', timing: '0.8s', easing: 'ease.out' },
    variants: blurIn,
    demo: 'single',
    usage: `<motion.h1 variants={blurIn} initial="hidden" animate="show" />`,
  },
  {
    name: 'staggerContainer + staggerItem',
    blurb: 'Choreography: parent reveals children in sequence (0.08s apart).',
    spec: { property: 'per-child revealUp', trigger: 'in-view', timing: '0.5s, stagger 0.08s', easing: 'ease.out' },
    variants: staggerContainer,
    demo: 'stagger',
    usage: `<motion.ul variants={staggerContainer} initial="hidden" whileInView="show">
  {items.map(i => <motion.li key={i} variants={staggerItem} />)}
</motion.ul>`,
  },
];

function DemoCard({ entry }: { entry: Entry }) {
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">{entry.name}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{entry.blurb}</p>
        </div>
        <button
          onClick={replay}
          className="shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          ▶ Replay
        </button>
      </div>

      {/* Live demo stage */}
      <div className="min-h-28 rounded-xl bg-background/60 border border-border/60 flex items-center justify-center p-6">
        {entry.demo === 'single' ? (
          <motion.div
            key={key}
            variants={entry.variants}
            initial="hidden"
            animate="show"
            className="px-6 py-4 rounded-xl bg-gradient-theme text-white font-medium shadow-lg"
          >
            {entry.name}
          </motion.div>
        ) : (
          <motion.div
            key={key}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2 justify-center"
          >
            {['Detect', 'Spec', 'Build', 'Ship'].map((label) => (
              <motion.span
                key={label}
                variants={staggerItem}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                {label}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Motion spec */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        {(['property', 'trigger', 'timing', 'easing'] as const).map((k) => (
          <div key={k} className="flex gap-1.5">
            <dt className="text-muted-foreground capitalize">{k}:</dt>
            <dd className="text-foreground font-medium">{entry.spec[k]}</dd>
          </div>
        ))}
      </dl>

      {/* Usage */}
      <pre className="text-xs bg-muted/40 rounded-lg p-3 overflow-x-auto text-muted-foreground">
        <code>{entry.usage}</code>
      </pre>
    </div>
  );
}

export default function MotionLab() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <header className="mb-10">
          <p className="text-sm font-medium text-primary uppercase tracking-wide">Dev only · /motion-lab</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-2">Motion Library</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Audition every templated effect from <code className="text-foreground">src/motion/variants.ts</code>.
            Capture a clip → deconstruct into a spec → add a variant here → reuse across the site.
            This page never ships to production.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CATALOG.map((entry) => (
            <DemoCard key={entry.name} entry={entry} />
          ))}
        </div>
      </div>
    </main>
  );
}
