# Portfolio Artifact Design Baseline

Use this file as the baseline artifact contract inside each project repo. The goal is not to make every artifact look identical. The goal is to make every artifact feel like evidence from a real build while keeping enough visual consistency that the portfolio feels coherent.

## Relationship To `REDESIGN.md`

This document is the artifact production standard. `REDESIGN.md` is the portfolio site redesign tracker and owns the broader brand direction: warmth, palette, typography, and overall taste.

Use `REDESIGN.md` as the taste source, but do not turn artifacts into copies of the site UI. Artifacts should share the portfolio's maturity and warmth while still using project-specific evidence, accent colors, layouts, and proof formats.

## Core Standard

Every artifact must be generated from repo context, not from memory or a generic project description.

Before designing, read:

- `README.md`, `CASE_STUDY.md`, `roadmap.md`, or equivalent project intro docs.
- `package.json`, `pyproject.toml`, `requirements.txt`, or equivalent dependency and script files.
- Main entrypoints, CLI commands, API routes, database models, schema files, tests, and sample outputs.
- Existing screenshots, demos, fixtures, notebooks, or generated artifacts.

If the artifact cannot point to concrete source evidence, do not build it yet.

## Artifact Pack

Each project should have three portfolio artifacts.

1. Architecture

Show how the system actually works. Include real modules, services, scripts, APIs, data stores, and output destinations. Avoid vague boxes such as "AI processing" unless the repo has that exact abstraction.

2. Case Study

Show one concrete user or operator scenario. Use before, trigger, system action, output, and result. Avoid generic "Problem / System / Outcome" unless each box contains real repo-specific facts.

3. Proof Artifact

Choose the proof type that best matches the project:

- CLI tool: terminal trace, command flow, generated file, or script map.
- Data workflow: schema, table relationships, state transitions, or ingestion pipeline.
- UI product: product screen, interaction flow, component states, or before/after UX.
- Automation project: trigger, queue, worker, API writeback, and failure handling.
- Research/design project: source capture, extracted tokens, generated challenge, exported CSS, or gallery output.

## Required Evidence

Each artifact must include at least five repo-specific facts.

Good evidence:

- File names: `pipeline.py`, `notion_writer.py`, `packages/cli/dist/index.js`.
- Commands: `npm run lore capture`, `python pipeline.py --url ...`.
- Database/table fields: `title`, `episode_url`, `score`, `status`, `source_id`.
- API boundaries: FastAPI route, Notion database write, Google Docs annotation fetch.
- Output examples: generated note title, task name, asset type, CSS variable, CLI result.
- Real constraints: local-only, human approval gate, OAuth setup, SQLite storage, ignored data folder.

Weak evidence:

- "AI-powered workflow"
- "Reusable knowledge"
- "Faster design starts"
- "End-to-end automation"
- "Scalable system"

Replace weak evidence with concrete mechanisms.

## Visual System

Use the same foundation across projects, but vary the layout by artifact type.

Canvas:

- Size: `1600 x 900`.
- Safe margin: `88px`.
- Outer card: `x=88 y=72 w=1424 h=756 rx=24`.
- Header band: dark, usually `#111827`, with artifact type and project name.
- Body grid: 12-column mental grid, enough whitespace for readable text.

Typography:

- Header label: 18-20px, uppercase, letter spaced.
- Hero title: 48-60px. Keep under 48 characters when possible.
- Section headings: 26-36px.
- Body copy: 20-24px.
- Micro labels: 16-18px.
- Never rely on SVG text wrapping. Manually split long text into separate `<text>` lines.

Color:

Every artifact uses a four-role semantic color system. Roles are fixed; the specific hex values come from the chosen template (see Design Token Source section).

| Role | Applied to | Must be consistent across all 3 artifacts |
|---|---|---|
| **Accent** | Section labels, pill left borders, flow box accents, links | Yes |
| **Output / after** | ✓ tick marks, output flow box border, metric card tint, result values | Yes |
| **Problem / before** | Pain-state stats ("30–60 min"), friction boxes | Yes |
| **Header highlight** | The colored accent word(s) inside the dark header title | Yes |

Rules:
- Time references that represent the **before state** always use the problem color.
- Time references that represent the **after/result state** always use the output color.
- Never use the problem color for structural elements (borders, labels). It means friction only.
- Never use the output color for problem states. It means success/completion only.
- Accent color is for navigation and labeling — never for emotional states.
- Avoid decorative gradients unless they explain hierarchy.

### Active palette: Navy + Amber (signal-to-asset, established 2026-05)

Derived from `signal` template in the beautiful-html-template repo. Use this as the default for new projects unless the project mood clearly calls for a different direction.

| Role | Hex | Used for |
|---|---|---|
| Accent | `#C8A870` | Section labels, pill borders, flow box accents |
| Output / after | `#7B9EA6` | ✓ marks, output boxes, metric values, result states |
| Problem / before | `#9E6B55` | Pain stats, friction labels |
| Header highlight | `#E8C98A` | Title accent word in dark header |
| Page background | `#F0ECE3` | Outer canvas |
| Card inner areas | `#F5F0E8` | Step boxes, pill backgrounds |
| Primary text | `#1A2030` | All headings and body |
| Header band | `#1A2030` | Dark header background |
| Muted text | `#787774` | Captions, subtitles |
| Borders | `#e9e9e7` | Card and element borders |

Consistency:

- Same frame, margins, and typography scale.
- Different artifact layouts based on evidence type.
- No repeated generic three-column template across all projects.

## Layout Patterns

Architecture layout options:

- Pipeline: input -> parser/worker -> model/API -> storage/output.
- Layered system: frontend, backend, data, external services.
- Hub and spoke: core CLI or agent in center, commands/modules around it.
- State machine: queued, processing, reviewed, written, failed.

Case study layout options:

- Before -> trigger -> execution trace -> output.
- User intent -> command/API call -> system actions -> generated artifact.
- Manual workflow pain -> automated path -> verification point.
- One real example object moving through the system.

Proof artifact layout options:

- Terminal transcript with annotated side notes.
- Database schema with exact fields and relationships.
- UI screen with callouts for component states.
- Code map showing entrypoint, key functions, and outputs.
- Demo storyboard with 4-6 frames from the real run.

## Anti-AI-Slop Rules

Do not use:

- Generic labels like "AI engine", "workflow layer", "insights", or "business impact" without repo evidence.
- Stock cards that could apply to any project.
- Overly smooth marketing claims without screenshots, commands, filenames, or outputs.
- More than one artifact per project using the same three-card layout.
- Text that overflows a box or depends on browser-specific font rendering.
- Emoji as primary meaning. Icons are optional, but labels must carry the meaning.

Every artifact should pass this test:

"Could someone reconstruct the project architecture or run path from this image?"

If no, it is too generic.

## Project-Specific Brief Template

Create this brief before designing any artifact.

```md
# Artifact Brief: <project-name>

## Repo Evidence Read

- Docs:
- Entrypoints:
- Commands:
- Data/schema files:
- Tests/fixtures:
- Existing screenshots/demo:

## Real Build Summary

What this project actually does in one sentence:

## Artifact 1: Architecture

- Artifact question:
- Real components to show:
- Required file/module labels:
- Input:
- Output:
- Failure/review states:

## Artifact 2: Case Study

- Real scenario:
- Trigger:
- System actions:
- Generated output:
- Proof point:

## Artifact 3: Proof

- Proof type:
- Why this proof fits this project:
- Concrete evidence to include:
- Export filename:

## Accent System

- Template picked: <slug from beautiful-html-template>
- Accent color: <from template CSS>
- Secondary color: <from template CSS>
- Font: <from template font-family>
- Decorative vocabulary: <corner brackets / paper grain / geometric / none>
- Visual metaphor:
```

## Design Token Source

Per-project visual tokens (accent colors, fonts, decorative vocabulary) come from the **beautiful-html-template** repo:

```
https://github.com/yingshill/beautiful-html-template
```

The structural baseline (canvas size, margins, card, header band) is fixed across all projects. Only the tokens vary.

### How to pick a template for a new project

1. Read `index.json` at the repo root.
2. Match the project's mood and audience against each template's `mood`, `tone`, `formality`, and `best_for` fields.
3. Pick one template. Prefer `light` scheme for portfolio artifacts (legible at thumbnail size). Use `dark` only when the project itself has a dark/technical identity.
4. Read `templates/<slug>/template.html` — extract the `:root` CSS variables for colors and the `font-family` declarations.
5. Fill the "Accent System" section of the brief with those values.

### What to extract from the template

| What | Where to find it |
|---|---|
| Accent color | `:root` CSS variable (often `--accent`, `--color-accent`, or the first non-neutral hex) |
| Secondary color | Second non-neutral color in `:root` |
| Background / neutral | `--bg`, `--surface`, `--paper`, or `background` on the outermost element |
| Font | `font-family` on `body` or `h1` — use the same Google Fonts import |
| Decorative vocabulary | Look for `.corner-bracket`, `.grain`, `.rule`, `clip-path`, or inline SVG ornaments in the HTML |

### What stays fixed regardless of template

- Canvas: `1600 × 900`, `viewBox="0 0 1600 900"`
- Outer card: `x=88 y=72 w=1424 h=756 rx=24`
- Safe margin: `88px`
- Header band: dark, at top of card
- Body grid: 12-column mental model
- Typography scale: header label 11px / hero 40-48px / section heading 22-26px / body 13px / micro 10-11px

### Template quick reference

| Project type | Suggested template slugs |
|---|---|
| AI / automation / technical | `signal`, `cobalt-grid`, `neo-grid-bold`, `cartesian` |
| Data / research / analytical | `cobalt-grid`, `monochrome`, `vellum` |
| Product / design / creative | `creative-mode`, `studio`, `coral`, `bold-poster` |
| Content / writing / personal brand | `soft-editorial`, `grove`, `pin-and-paper`, `mat` |
| Warm / approachable / indie | `playful`, `long-table`, `capsule` |

## Export Rules

Portfolio path:

- `public/personal-project-artifacts/<project>-architecture.svg`
- `public/personal-project-artifacts/<project>-case-study.svg`
- `public/personal-project-artifacts/<project>-<proof-name>.svg`
- Demo video: `public/demos/<project>-demo.mp4`

Project repo path:

- `portfolio-artifacts/README.md`
- `portfolio-artifacts/<project>-architecture.svg`
- `portfolio-artifacts/<project>-case-study.svg`
- `portfolio-artifacts/<project>-<proof-name>.svg`
- `portfolio-artifacts/<project>-demo.mp4` when video is the proof artifact.

SVG requirements:

- Use `width="1600" height="900" viewBox="0 0 1600 900"`.
- Keep text editable as SVG `<text>` when possible.
- Use ASCII text unless the project specifically needs non-English labels.
- Manually line-break long copy.
- Open in browser before committing.

Video requirements:

- Prefer MP4 over GIF for demos.
- Target `1600x900`.
- Keep under 10MB if possible.
- Use controls in the portfolio modal.
- Remove stale GIFs when replacing with MP4.

## Acceptance Checklist

Before shipping, verify:

- The artifact was built after reading the repo, not just the portfolio card.
- Every artifact contains at least five concrete repo facts.
- No text overflows its box at browser rendering size.
- The three artifacts for one project use different layouts or evidence types.
- The project accent color is consistent within that project.
- The portfolio repo and project repo have matching artifact files.
- `npm run build` passes in the portfolio repo after wiring artifacts.
- Stale artifact files are removed or intentionally kept with references.

## Recommended Workflow

1. Read repo context and fill the artifact brief.
2. Choose the three artifact types.
3. Sketch text-only layout first.
4. Build SVGs from the brief.
5. Open each SVG and check for overflow.
6. Add or update portfolio links.
7. Copy the same files into the project repo `portfolio-artifacts/`.
8. Build the portfolio.
9. Commit portfolio and project repo changes separately.
