# Artifact Rebuild Workflow

Use this workflow when rebuilding personal project artifacts from inside each project's own repo. The purpose is to prevent generic, AI-feeling artifacts by forcing the artifact brief to come from real project files, commands, schemas, tests, and outputs.

## Source Contract

The baseline contract lives in the portfolio repo:

```bash
/Users/mac/Desktop/Job Hunting/build_profile/PORTFOLIO_ARTIFACT_DESIGN_BASELINE.md
```

Copy it into each project repo before starting:

```bash
cp /Users/mac/Desktop/Job\ Hunting/build_profile/PORTFOLIO_ARTIFACT_DESIGN_BASELINE.md ./PORTFOLIO_ARTIFACT_DESIGN_BASELINE.md
```

Commit the copied baseline only if you want the project repo to permanently own the artifact standard. Otherwise, keep it as working context and remove it before committing.

## Recommended AI Prompt: Brief First

Run this from inside the project repo:

```text
Read ./PORTFOLIO_ARTIFACT_DESIGN_BASELINE.md first.

Then audit this repo before generating visuals. Read README, package files, entrypoints, tests, schemas, fixtures, existing screenshots/demos, and generated outputs.

Fill the Artifact Brief section from real repo evidence. Do not create SVGs yet.

After the brief is complete, propose three artifacts:
1. Architecture
2. Case Study
3. Proof Artifact

Each artifact must include at least five repo-specific facts and avoid generic "AI workflow" language.
```

Do not let the AI generate visuals until the brief is specific enough.

## Approval Check

Before asking for SVGs, verify the brief includes:

- Real files or modules.
- Real commands or scripts.
- Real data fields, API boundaries, or output destinations.
- One concrete user/operator scenario.
- A proof artifact that matches the project type.
- A project-specific accent direction.

Reject briefs that rely on phrases like "AI-powered workflow", "reusable knowledge", "faster design starts", or "end-to-end automation" without concrete source evidence.

## Recommended AI Prompt: Build Artifacts

After approving the brief:

```text
Build the three artifacts as 1600x900 SVGs in ./portfolio-artifacts/.

Use ./PORTFOLIO_ARTIFACT_DESIGN_BASELINE.md as the contract.

Keep text editable as SVG <text>. Manually split long lines. Check for text overflow. Use different layouts for the three artifacts. Do not use a generic Problem/System/Outcome layout unless every box contains concrete repo evidence.

After building, list every artifact file and the repo evidence used in each one.
```

For video proof artifacts:

```text
Create or export a 1600x900 MP4 demo in ./portfolio-artifacts/. Prefer MP4 over GIF. Keep it under 10MB if possible.
```

## Expected Project Repo Output

Each project repo should end with:

```text
portfolio-artifacts/
  README.md
  <project>-architecture.svg
  <project>-case-study.svg
  <project>-<proof-name>.svg
  <project>-demo.mp4
```

Not every project needs a video. If a video is the proof artifact, it can replace the third SVG.

## Sync Back To Portfolio

After artifacts are approved in the project repo, copy them back to the portfolio:

```bash
cp portfolio-artifacts/<project>-architecture.svg /Users/mac/Desktop/Job\ Hunting/build_profile/public/personal-project-artifacts/
cp portfolio-artifacts/<project>-case-study.svg /Users/mac/Desktop/Job\ Hunting/build_profile/public/personal-project-artifacts/
cp portfolio-artifacts/<project>-<proof-name>.svg /Users/mac/Desktop/Job\ Hunting/build_profile/public/personal-project-artifacts/
```

For MP4 demos:

```bash
cp portfolio-artifacts/<project>-demo.mp4 /Users/mac/Desktop/Job\ Hunting/build_profile/public/demos/
```

Then update `src/i18n.ts` in the portfolio if filenames or artifact labels changed.

## Portfolio Verification

From the portfolio repo:

```bash
npm run build
```

Check:

- Artifact links in both Chinese and English locales point to existing files.
- Demo assets use MP4 URLs when the proof artifact is video.
- Old GIFs or stale SVGs are removed if no longer referenced.
- Modal preview still opens images and videos correctly.

## Commit Order

Use separate commits:

1. Project repo: commit `portfolio-artifacts/`.
2. Portfolio repo: commit copied artifacts and `src/i18n.ts` changes.

This keeps each project repo aligned with the portfolio and makes future artifact updates traceable.

---

## Cross-Project Sync

Use this section when maintaining artifacts across multiple child project repos. Each child project follows the same contract; this workflow makes syncing repeatable.

### Project repo structure (required)

Every child project must have:

```
artifacts/
  architecture-diagram/notion-light/diagram.svg
  case-study/notion-light/diagram.svg
  <proof-type>/notion-light/diagram.svg
portfolio-artifacts/
  <project>-architecture.svg
  <project>-case-study.svg
  <project>-<proof-name>.svg
```

`portfolio-artifacts/` is the canonical export layer. It holds renamed copies ready to drop into the portfolio. **HTML files are not valid** — the portfolio renders artifacts as `type: 'image'`, so only SVG files work.

### Sync a single project to the portfolio

Replace `<project>` and `<proof-name>` with the actual values.

```bash
# 1. Refresh portfolio-artifacts/ from the latest SVGs in the project repo
cp artifacts/architecture-diagram/notion-light/diagram.svg portfolio-artifacts/<project>-architecture.svg
cp artifacts/case-study/notion-light/diagram.svg           portfolio-artifacts/<project>-case-study.svg
cp artifacts/<proof-type>/notion-light/diagram.svg         portfolio-artifacts/<project>-<proof-name>.svg

# 2. Push to portfolio
PORTFOLIO=/Users/mac/Desktop/Job\ Hunting/build_profile
cp portfolio-artifacts/<project>-architecture.svg $PORTFOLIO/public/personal-project-artifacts/
cp portfolio-artifacts/<project>-case-study.svg   $PORTFOLIO/public/personal-project-artifacts/
cp portfolio-artifacts/<project>-<proof-name>.svg $PORTFOLIO/public/personal-project-artifacts/

# 3. Build and verify
cd $PORTFOLIO && npm run build
```

### Projects currently wired

| Project | Proof artifact name | Notes |
|---|---|---|
| signal-to-asset | code-carousel | Three SVGs in portfolio-artifacts/ |

Add a row here whenever a new child project is wired into the portfolio.

### Checklist before pushing

- [ ] All three SVGs open correctly in browser (no blank viewport, no clipped text)
- [ ] `npm run build` passes in portfolio repo
- [ ] `src/i18n.ts` artifact URLs match the filenames just copied
- [ ] Stale SVGs in `public/personal-project-artifacts/` removed if renamed
- [ ] Project repo committed first, portfolio repo committed second

