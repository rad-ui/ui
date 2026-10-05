#!/usr/bin/env node
// Fails if any docs source file references a path outside docs/.
//
// Vercel builds the docs app with docs/ as the project root, so files in the
// rest of the monorepo (../src, ../styles, ...) do not exist at build time.
// Everything the docs app needs must live in docs/ or come from an installed
// package (e.g. @radui/ui). See docs/AGENTS.md -> "Docs app boundary".
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const docsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const IGNORED_DIRS = new Set(['node_modules', '.next', 'public', '.vercel', '.turbo'])
const SOURCE_EXTENSIONS = /\.(m?[jt]sx?|cjs|mdx|css|scss)$/

// Any quoted string that starts with ./ or ../ (imports, require, @import,
// @source, fs paths, new URL(...), etc).
const RELATIVE_STRING = /(['"`])(\.{1,2}\/[^'"`\s]*)\1/g
// path.join/resolve(__dirname | process.cwd(), 'a', '..', ...) built from literals.
const PATH_CALL = /path\.(?:join|resolve)\(\s*(__dirname|process\.cwd\(\))\s*,([^)]*)\)/g
// process.cwd() + '/../' style string concatenation. process.cwd() is docs/.
const CWD_CONCAT = /process\.cwd\(\)\s*\+\s*['"`]\/?\.\./

const isOutsideDocs = (resolvedPath) => path.relative(docsRoot, resolvedPath).startsWith('..')

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (IGNORED_DIRS.has(entry.name)) return []
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(fullPath)
    return SOURCE_EXTENSIONS.test(entry.name) ? [fullPath] : []
})

const violations = []

const selfPath = fileURLToPath(import.meta.url)

for (const file of walk(docsRoot).filter((file) => file !== selfPath)) {
    const lines = fs.readFileSync(file, 'utf8').split('\n')
    const relFile = path.relative(docsRoot, file)

    lines.forEach((line, index) => {
        const report = (reason) => violations.push(`${relFile}:${index + 1}  ${reason}\n    ${line.trim()}`)

        for (const [, , specifier] of line.matchAll(RELATIVE_STRING)) {
            if (isOutsideDocs(path.resolve(path.dirname(file), specifier))) {
                report(`"${specifier}" resolves outside docs/`)
            }
        }
        for (const [, base, args] of line.matchAll(PATH_CALL)) {
            const segments = [...args.matchAll(/['"`]([^'"`]*)['"`]/g)].map(([, segment]) => segment)
            const baseDir = base === '__dirname' ? path.dirname(file) : docsRoot
            if (isOutsideDocs(path.resolve(baseDir, ...segments))) {
                report('path.join/resolve resolves outside docs/')
            }
        }
        if (CWD_CONCAT.test(line)) {
            report('process.cwd() + "/.." points outside docs/')
        }
    })
}

if (violations.length > 0) {
    console.error(`\nDocs boundary check failed: ${violations.length} reference(s) outside docs/.\n`)
    console.error(violations.join('\n\n'))
    console.error('\nVercel only has docs/ at build time. Import from an installed package (e.g. @radui/ui)')
    console.error('or move the file into docs/. See docs/AGENTS.md -> "Docs app boundary".\n')
    process.exit(1)
}

console.log('Docs boundary check passed: no references outside docs/.')
