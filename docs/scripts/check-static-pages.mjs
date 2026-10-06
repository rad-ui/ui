#!/usr/bin/env node
// Fails the build if a docs route that should be prerendered became dynamic.
//
// Docs pages read example sources and library styles while rendering
// (getSourceCodeFromPath). That is only safe when it happens once, at build
// time. A dynamic API in a shared layout (cookies(), headers(), ...) silently
// turns every page into a per-request render, and the reads then fail on
// Vercel. This happened once already: 55 component pages returned 500.
// See docs/AGENTS.md -> "Docs app boundary".
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const nextDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '.next')

// Routes that are dynamic on purpose. Keep this list short and explained.
const ALLOWED_DYNAMIC = new Map([
    ['/docs/first-steps/changelog', 'paginates with ?page= (searchParams)'],
    ['/og', 'generates Open Graph images from query params'],
    ['/funding.json', 'route handler'],
])

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(nextDir, file), 'utf8'))

const routes = Object.values(readJson('app-path-routes-manifest.json'))
const prerendered = new Set(Object.keys(readJson('prerender-manifest.json').routes))

const dynamicRoutes = routes.filter((route) => !prerendered.has(route) && !ALLOWED_DYNAMIC.has(route))

if (dynamicRoutes.length > 0) {
    console.error(`\nStatic pages check failed: ${dynamicRoutes.length} route(s) are no longer prerendered:\n`)
    console.error(dynamicRoutes.map((route) => `  ${route}`).join('\n'))
    console.error('\nLook for a dynamic API (cookies(), headers(), searchParams, no-store fetch) in that route or a')
    console.error('layout above it. If the route really must be dynamic, add it to ALLOWED_DYNAMIC with a reason.\n')
    process.exit(1)
}

console.log(`Static pages check passed: ${prerendered.size} prerendered, ${ALLOWED_DYNAMIC.size} allowed dynamic.`)
