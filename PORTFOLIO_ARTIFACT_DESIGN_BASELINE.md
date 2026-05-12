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

- Use a stable neutral base: `#F6F7FB`, `#FFFFFF`, `#111827`, `#D8DEE9`.
- Use one project accent color per repo.
- Use green only for verified output, completion, or success.
- Use red only for real friction, failure, or problem states.
- Avoid decorative gradients unless they explain hierarchy.

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

- Accent color:
- Secondary color:
- Visual metaphor:
```

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
