import { build } from 'esbuild'
import { rmSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const [, , entryArg, ...scriptArgs] = process.argv

if (!entryArg) {
  console.error('Usage: node scripts/run-tsx.mjs <entry.tsx> [args...]')
  process.exit(1)
}

const entryPath = resolve(process.cwd(), entryArg)
const entryDir = dirname(entryPath)
const outFile = join(
  entryDir,
  `.${basename(entryPath).replace(/\.[^.]+$/, '')}.run-${process.pid}-${Date.now()}.mjs`,
)

try {
  await build({
    entryPoints: [entryPath],
    outfile: outFile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: `node${process.versions.node.split('.')[0]}`,
    jsx: 'automatic',
    loader: {
      '.ts': 'ts',
      '.tsx': 'tsx',
    },
    packages: 'external',
    sourcemap: 'inline',
    logLevel: 'silent',
  })

  process.argv = [process.argv[0], entryPath, ...scriptArgs]
  await import(pathToFileURL(outFile).href)
} catch (error) {
  console.error(error)
  process.exitCode = 1
} finally {
  rmSync(outFile, { force: true })
}
