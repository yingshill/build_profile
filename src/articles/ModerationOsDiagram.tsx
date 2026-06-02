export default function ModerationOsDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 415"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Moderation OS pipeline: 3 legacy tools consolidated into a unified Internal Safety OS with LLM agent and Safety Index feedback loop"
      style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif', overflow: 'visible' }}
    >
      {/* ── SECTION LABEL ── */}
      <text x="10" y="20" fontSize="9" fontWeight="600" letterSpacing="0.08em"
        style={{ fill: 'hsl(var(--muted-foreground))' }}>
        BEFORE — 3 SILOED TOOLS
      </text>

      {/* ── ROW 1: LEGACY TOOLS ── */}
      <rect x="10" y="26" width="210" height="52" rx="8" strokeWidth="1.5"
        style={{ fill: 'hsl(var(--muted))', stroke: 'hsl(var(--border))' }} />
      <text x="115" y="50" textAnchor="middle" fontSize="12" fontWeight="600"
        style={{ fill: 'hsl(var(--foreground))' }}>Legacy Review Tool A</text>
      <text x="115" y="67" textAnchor="middle" fontSize="10"
        style={{ fill: 'hsl(var(--muted-foreground))' }}>Fragmented workflow</text>

      <rect x="255" y="26" width="210" height="52" rx="8" strokeWidth="1.5"
        style={{ fill: 'hsl(var(--muted))', stroke: 'hsl(var(--border))' }} />
      <text x="360" y="50" textAnchor="middle" fontSize="12" fontWeight="600"
        style={{ fill: 'hsl(var(--foreground))' }}>Legacy Review Tool B</text>
      <text x="360" y="67" textAnchor="middle" fontSize="10"
        style={{ fill: 'hsl(var(--muted-foreground))' }}>No shared taxonomy</text>

      <rect x="500" y="26" width="210" height="52" rx="8" strokeWidth="1.5"
        style={{ fill: 'hsl(var(--muted))', stroke: 'hsl(var(--border))' }} />
      <text x="605" y="50" textAnchor="middle" fontSize="12" fontWeight="600"
        style={{ fill: 'hsl(var(--foreground))' }}>Legacy Review Tool C</text>
      <text x="605" y="67" textAnchor="middle" fontSize="10"
        style={{ fill: 'hsl(var(--muted-foreground))' }}>No performance tracking</text>

      {/* ── CONVERGENCE ARROWS ── */}
      <line x1="115" y1="78" x2="115" y2="100" strokeWidth="1.5"
        style={{ stroke: 'hsl(var(--border))' }} />
      <line x1="360" y1="78" x2="360" y2="100" strokeWidth="1.5"
        style={{ stroke: 'hsl(var(--border))' }} />
      <line x1="605" y1="78" x2="605" y2="100" strokeWidth="1.5"
        style={{ stroke: 'hsl(var(--border))' }} />
      <line x1="115" y1="100" x2="605" y2="100" strokeWidth="1.5"
        style={{ stroke: 'hsl(var(--border))' }} />
      <line x1="360" y1="100" x2="360" y2="114" strokeWidth="2"
        style={{ stroke: 'hsl(var(--primary))' }} />
      <polygon points="360,118 354,110 366,110"
        style={{ fill: 'hsl(var(--primary))' }} />

      {/* ── ROW 2: INTERNAL SAFETY OS ── */}
      <rect x="70" y="120" width="580" height="72" rx="10"
        style={{ fill: 'hsl(var(--primary))' }} />
      <text x="360" y="148" textAnchor="middle" fontSize="16" fontWeight="700"
        style={{ fill: 'hsl(var(--primary-foreground))' }}>Internal Safety OS</text>
      <text x="360" y="168" textAnchor="middle" fontSize="11"
        style={{ fill: 'hsl(var(--primary-foreground))', opacity: 0.85 }}>
        Unified platform · Shared taxonomy · End-to-end workflow ownership
      </text>

      {/* ── DIVERGENCE ARROWS ── */}
      <line x1="360" y1="192" x2="360" y2="212" strokeWidth="2"
        style={{ stroke: 'hsl(var(--primary))' }} />
      <line x1="205" y1="212" x2="530" y2="212" strokeWidth="1.5"
        style={{ stroke: 'hsl(var(--primary))' }} />
      <line x1="205" y1="212" x2="205" y2="226" strokeWidth="1.5"
        style={{ stroke: 'hsl(var(--primary))' }} />
      <polygon points="205,230 199,222 211,222"
        style={{ fill: 'hsl(var(--primary))' }} />
      <line x1="530" y1="212" x2="530" y2="226" strokeWidth="1.5"
        style={{ stroke: 'hsl(var(--primary))' }} />
      <polygon points="530,230 524,222 536,222"
        style={{ fill: 'hsl(var(--primary))' }} />

      {/* ── ROW 3: COMPONENTS ── */}
      <rect x="50" y="232" width="310" height="68" rx="8"
        style={{ fill: 'hsl(var(--accent))' }} />
      <text x="205" y="257" textAnchor="middle" fontSize="13" fontWeight="700"
        style={{ fill: 'hsl(var(--accent-foreground))' }}>LLM Moderation Agent</text>
      <text x="205" y="274" textAnchor="middle" fontSize="10"
        style={{ fill: 'hsl(var(--accent-foreground))', opacity: 0.85 }}>AI-assisted decision support</text>
      <text x="205" y="291" textAnchor="middle" fontSize="10" fontWeight="600"
        style={{ fill: 'hsl(var(--accent-foreground))' }}>22%↑ accuracy · 15%↓ AHT</text>

      <rect x="390" y="232" width="280" height="68" rx="8"
        style={{ fill: 'hsl(var(--support))' }} />
      <text x="530" y="257" textAnchor="middle" fontSize="13" fontWeight="700"
        style={{ fill: 'hsl(var(--support-foreground))' }}>Safety Index System</text>
      <text x="530" y="274" textAnchor="middle" fontSize="10"
        style={{ fill: 'hsl(var(--support-foreground))', opacity: 0.85 }}>Precision · Recall · FPR</text>
      <text x="530" y="291" textAnchor="middle" fontSize="10"
        style={{ fill: 'hsl(var(--support-foreground))', opacity: 0.85 }}>Per-category thresholds</text>

      {/* ── CONVERGENCE TO FEEDBACK ── */}
      <line x1="205" y1="300" x2="205" y2="326" strokeWidth="1.5"
        style={{ stroke: 'hsl(var(--accent))' }} />
      <line x1="530" y1="300" x2="530" y2="326" strokeWidth="1.5"
        style={{ stroke: 'hsl(var(--support))' }} />
      <line x1="205" y1="326" x2="530" y2="326" strokeWidth="1.5"
        style={{ stroke: 'hsl(var(--accent))' }} />
      <line x1="368" y1="326" x2="368" y2="340" strokeWidth="2"
        style={{ stroke: 'hsl(var(--accent))' }} />
      <polygon points="368,344 362,336 374,336"
        style={{ fill: 'hsl(var(--accent))' }} />

      {/* ── ROW 4: FEEDBACK LOOP ── */}
      <rect x="120" y="346" width="496" height="56" rx="8" strokeWidth="1.5"
        style={{ fill: 'hsl(var(--muted))', stroke: 'hsl(var(--border))' }} />
      <text x="368" y="370" textAnchor="middle" fontSize="13" fontWeight="600"
        style={{ fill: 'hsl(var(--foreground))' }}>Structured Feedback Loop</text>
      <text x="368" y="389" textAnchor="middle" fontSize="10"
        style={{ fill: 'hsl(var(--muted-foreground))' }}>
        Moderator observations → AI Research iteration → model improvement
      </text>

      {/* ── LOOP-BACK ARROW (dashed, right side) ── */}
      <path d="M 616,374 C 690,374 690,156 650,156"
        strokeWidth="1.5" strokeDasharray="5,4" fill="none"
        style={{ stroke: 'hsl(var(--border))' }} />
      <polygon points="650,156 658,150 658,162"
        style={{ fill: 'hsl(var(--border))' }} />
      <text x="697" y="295" textAnchor="middle" fontSize="9" fontWeight="600"
        transform="rotate(-90, 697, 295)"
        style={{ fill: 'hsl(var(--muted-foreground))', letterSpacing: '0.06em' }}>
        CONTINUOUS LOOP
      </text>
    </svg>
  )
}
