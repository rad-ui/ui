#!/usr/bin/env node
// Run or build the docs app against a chosen @radui/ui.
//
//   live   docs uses the library built from this repo (dist/)
//   fixed  docs uses the published version pinned in docs/pnpm-lock.yaml
//          (exactly what Vercel deploys)
//
// Usage:
//   node scripts/docs-mode.mjs live [--no-build]    dev server, local library
//   node scripts/docs-mode.mjs fixed                dev server, pinned library
//   node scripts/docs-mode.mjs verify:fixed         isolated prod build, pinned library
//   node scripts/docs-mode.mjs verify:live [--no-build]
//                                                   isolated prod build, packed local library
//   node scripts/docs-mode.mjs status               show which library docs/ resolves
//
// Add --contrast to a verify command to also serve the isolated build and run
// the WCAG AA contrast check on every page in both themes (same as CI).
//
// Live mode only swaps the docs/node_modules/@radui/ui symlink. It never edits
// docs/package.json or docs/pnpm-lock.yaml, so it can't be committed or reach
// Vercel. `fixed` (or any `pnpm install` in docs/) restores the pinned version.
//
// The verify commands copy docs/ to a temp directory before building, because
// Vercel builds docs/ without the rest of the monorepo (see docs/AGENTS.md).
import { execFileSync, spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = path.join(repoRoot, 'docs')
const linkPath = path.join(docsDir, 'node_modules', '@radui', 'ui')

const [command, ...flags] = process.argv.slice(2)
const skipBuild = flags.includes('--no-build')
const checkContrast = flags.includes('--contrast')

// `npm run -s` sets npm_config_loglevel=silent, which pnpm also honors and
// would hide install/build errors. Drop it for child commands.
const { npm_config_loglevel: _loglevel, ...childEnv } = process.env

const run = (cmd, args, options = {}) => {
    console.log(`\n$ ${cmd} ${args.join(' ')}${options.cwd ? `   (in ${options.cwd})` : ''}`)
    execFileSync(cmd, args, { stdio: 'inherit', cwd: repoRoot, env: childEnv, ...options })
}

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'))

const resolvedLibrary = () => {
    if (!fs.existsSync(linkPath)) return null
    const realPath = fs.realpathSync(linkPath)
    return {
        mode: realPath === repoRoot ? 'live' : 'fixed',
        version: readJson(path.join(realPath, 'package.json')).version,
        realPath
    }
}

const installPinned = (cwd = docsDir) => run('pnpm', ['install', '--frozen-lockfile'], { cwd })

const buildLibrary = () => {
    if (skipBuild) {
        if (!fs.existsSync(path.join(repoRoot, 'dist', 'index.js'))) {
            throw new Error('--no-build was passed but dist/ is missing. Run `npm run build:rollup` first.')
        }
        console.log('\nSkipping library build (--no-build); using existing dist/.')
        return
    }
    run('npm', ['run', 'build:rollup'])
}

const banner = (lines) => {
    const width = Math.max(...lines.map((line) => line.length)) + 4
    console.log(`\n${'='.repeat(width)}\n${lines.map((line) => `  ${line}`).join('\n')}\n${'='.repeat(width)}\n`)
}

// Copy docs/ to a temp dir with no monorepo around it, like Vercel does.
const isolatedDocsCopy = () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'radui-docs-'))
    const target = path.join(tempRoot, 'docs')
    fs.cpSync(docsDir, target, {
        recursive: true,
        filter: (source) => !path.relative(docsDir, source)
            .split(path.sep)
            .some((segment) => segment === 'node_modules' || segment === '.next')
    })
    return target
}

// Serve an isolated production build and run the contrast check against it.
const runContrastCheck = async (target) => {
    const port = 3200 + Math.floor(Math.random() * 500)
    // Run next directly in its own process group: killing a pnpm wrapper
    // would leave the server running.
    const server = spawn(path.join(target, 'node_modules', '.bin', 'next'), ['start', '-p', String(port)], { cwd: target, env: childEnv, stdio: 'ignore', detached: true })
    try {
        for (let i = 0; i < 60; i++) {
            try { if ((await fetch(`http://127.0.0.1:${port}/`)).ok) break } catch {}
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
        run('node', ['scripts/check-docs-contrast.mjs', '--base', `http://127.0.0.1:${port}`, '--next-dir', path.join(target, '.next')])
    } finally {
        try { process.kill(-server.pid) } catch {}
    }
}

const commands = {
    status () {
        const library = resolvedLibrary()
        if (!library) {
            console.log('docs/ has no @radui/ui installed. Run `npm run docs:fixed` or `npm run docs:live`.')
            return
        }
        const pinned = readJson(path.join(docsDir, 'package.json')).dependencies['@radui/ui']
        console.log(`docs mode: ${library.mode}`)
        console.log(`@radui/ui: ${library.version} (${library.realPath})`)
        console.log(`docs/package.json range: ${pinned}`)
    },

    live () {
        if (!fs.existsSync(path.join(docsDir, 'node_modules'))) installPinned()
        buildLibrary()

        // pnpm links node_modules/@radui/ui -> .pnpm/...; point it at this repo instead.
        fs.rmSync(linkPath, { recursive: true, force: true })
        fs.symlinkSync(path.relative(path.dirname(linkPath), repoRoot), linkPath, 'dir')

        const { version } = resolvedLibrary()
        banner([
            `DOCS MODE: LIVE  (@radui/ui ${version} from ${repoRoot}/dist)`,
            'Rebuild the library (`npm run build:rollup`) in another terminal to pick up changes.',
            'This is local only. Run `npm run docs:fixed` to go back to the pinned version.'
        ])
        run('pnpm', ['dev'], { cwd: docsDir })
    },

    fixed () {
        installPinned()
        const { version } = resolvedLibrary()
        banner([`DOCS MODE: FIXED  (published @radui/ui ${version}, pinned in docs/pnpm-lock.yaml)`])
        run('pnpm', ['dev'], { cwd: docsDir })
    },

    async 'verify:fixed' () {
        const target = isolatedDocsCopy()
        installPinned(target)
        run('pnpm', ['build'], { cwd: target })
        const { version } = readJson(path.join(target, 'node_modules', '@radui', 'ui', 'package.json'))
        if (checkContrast) await runContrastCheck(target)
        banner([`OK: docs build with published @radui/ui ${version} (isolated: ${target})`])
    },

    async 'verify:live' () {
        buildLibrary()

        // Pack exactly what `npm publish` would ship (files, exports, dist).
        const packDir = fs.mkdtempSync(path.join(os.tmpdir(), 'radui-pack-'))
        run('npm', ['pack', '--pack-destination', packDir])
        const tarball = path.join(packDir, fs.readdirSync(packDir).find((file) => file.endsWith('.tgz')))

        const target = isolatedDocsCopy()
        installPinned(target)
        // Only the temp copy's package.json/lockfile change here.
        // docs/ is its own pnpm workspace root, hence -w.
        run('pnpm', ['add', '-w', `@radui/ui@file:${tarball}`], { cwd: target })
        run('pnpm', ['build'], { cwd: target })

        const { version } = readJson(path.join(repoRoot, 'package.json'))
        if (checkContrast) await runContrastCheck(target)
        banner([`OK: docs build with the local @radui/ui ${version} package (isolated: ${target})`])
    }
}

if (!commands[command]) {
    console.error(`Unknown command "${command ?? ''}". Use one of: ${Object.keys(commands).join(', ')}`)
    process.exit(1)
}

try {
    await commands[command]()
} catch (error) {
    console.error(`\ndocs-mode ${command} failed: ${error.message}`)
    process.exit(1)
}
