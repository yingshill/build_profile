/**
 * Build-time validation: checks that llms.txt stays in sync with i18n.ts content.
 *
 * Defines "proof points" — key terms/phrases that MUST appear in llms.txt
 * because they represent real content from the website. When i18n.ts adds
 * new sections or projects, add matching proof points here so the check
 * catches the drift on next build.
 *
 * Usage:
 *   npx tsx --tsconfig tsconfig.app.json scripts/validate-llms-txt.ts
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ---------------------------------------------------------------------------
// Proof points: key terms that MUST appear in llms.txt
// Grouped by source section for readable error messages.
// ---------------------------------------------------------------------------

interface ProofPoint {
  /** Where this content lives in the codebase */
  source: string
  /** Terms that must ALL appear in llms.txt (case-insensitive) */
  terms: string[]
}

const PROOF_POINTS: ProofPoint[] = [
  // -- Open source repos (i18n.ts → repos) --
  {
    source: 'i18n.ts → repos → ai-content-moderation-edge-case-eval-framework',
    terms: ['ai-content-moderation-edge-case-eval-framework', 'precision/recall'],
  },
  {
    source: 'i18n.ts → repos → ai-governance-red-team-control-pipeline',
    terms: ['ai-governance-red-team-control-pipeline', 'prompt injection'],
  },
  {
    source: 'i18n.ts → repos → incident-drill-kit',
    terms: ['incident-drill-kit'],
  },

  // -- Key achievement: Moderation OS (i18n.ts → projects + experience) --
  {
    source: 'i18n.ts → projects → Moderation OS',
    terms: ['Internal Safety OS', 'Safety Index'],
  },
  {
    source: 'i18n.ts → experience → Moody\'s Analytics',
    terms: ['22%', 'AHT', 'onboarding'],
  },

  // -- Key achievement: ML Pipeline (i18n.ts → experience) --
  {
    source: 'i18n.ts → experience → Flip',
    terms: ['Tier-1', '65%', 'ML classifiers'],
  },
  {
    source: 'i18n.ts → experience → LeanData',
    terms: ['JSON taxonomy', '35%'],
  },

  // -- Target roles & contact --
  {
    source: 'llms.txt → target roles',
    terms: ['Trust & Safety', 'AI Operations Manager'],
  },
  {
    source: 'llms.txt → contact',
    terms: ['yingshiliu.j@gmail.com', 'elanaliu.io'],
  },
]

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

const llmsTxtPath = resolve(root, 'public/llms.txt')
let llmsTxt: string

try {
  llmsTxt = readFileSync(llmsTxtPath, 'utf-8').toLowerCase()
} catch {
  console.error(`\n❌ public/llms.txt not found\n`)
  process.exit(1)
}

let errors = 0

for (const pp of PROOF_POINTS) {
  const missing = pp.terms.filter(t => !llmsTxt.includes(t.toLowerCase()))
  if (missing.length > 0) {
    errors++
    console.error(
      `❌ llms.txt missing content from [${pp.source}]:\n` +
      `   Missing terms: ${missing.map(t => `"${t}"`).join(', ')}\n`
    )
  }
}

if (errors > 0) {
  console.error(
    `\n🔴 llms.txt is out of sync — ${errors} section(s) have missing content.\n` +
    `   Update public/llms.txt to include the missing information,\n` +
    `   or add the proof point to scripts/validate-llms-txt.ts if intentionally omitted.\n`
  )
  process.exit(1)
} else {
  console.log('✅ llms.txt is in sync with i18n content')
}
