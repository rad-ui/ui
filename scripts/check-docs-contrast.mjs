#!/usr/bin/env node
// Fails if any rendered docs text misses WCAG AA contrast, in dark or light.
//
// Runs axe-core's color-contrast rule in Chromium against a running docs
// build, on every prerendered route, in both themes. It measures what users
// actually see, so it catches low-contrast palette classes, inline colors and
// syntax-highlighting colors alike. Failures are grouped by color pair so
// one bad class across every page reads as one problem.
//
// Usage:
//   node scripts/check-docs-contrast.mjs --base http://127.0.0.1:3000 --next-dir docs/.next
//   node scripts/check-docs-contrast.mjs --base https://www.rad-ui.com --routes /,/docs/components/button
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const AXE_SOURCE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')

const arg = (name, fallback) => {
    const i = process.argv.indexOf(`--${name}`)
    return i === -1 ? fallback : process.argv[i + 1]
}
const base = arg('base', 'http://127.0.0.1:3000').replace(/\/$/, '')
const nextDir = arg('next-dir', 'docs/.next')
const concurrency = Number(arg('concurrency', '4'))

// Every prerendered page route (skips route handlers like /og, /funding.json).
const routesFromBuild = () => {
    const manifest = JSON.parse(fs.readFileSync(path.join(nextDir, 'prerender-manifest.json'), 'utf8'))
    return Object.keys(manifest.routes)
        .filter((route) => !/\.(xml|txt|json|ico|png|svg|webmanifest)$/.test(route) && !route.startsWith('/_'))
        .sort()
}
const routes = arg('routes') ? arg('routes').split(',') : routesFromBuild()

const checkPage = async (browser, route, theme) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
    await context.addCookies([{ name: 'darkMode', value: String(theme === 'dark'), url: base }])
    const page = await context.newPage()
    try {
        await page.goto(`${base}${route}`, { waitUntil: 'networkidle', timeout: 60000 })
        return await page.evaluate(async (axeSource) => {
            // eslint-disable-next-line no-eval
            eval(axeSource)
            const result = await window.axe.run(document, { runOnly: ['color-contrast'], resultTypes: ['violations'] })
            return result.violations.flatMap((violation) => violation.nodes.map((node) => {
                const data = node.any[0]?.data || {}
                const el = document.querySelector(node.target[0])
                const classes = (el?.getAttribute('class') || '').split(/\s+/).filter((c) => /text-|token|gray|muted|secondary/.test(c)).slice(0, 3).join(' ')
                return { fg: data.fgColor, bg: data.bgColor, ratio: data.contrastRatio, expected: data.expectedContrastRatio, element: `${el?.tagName.toLowerCase() || '?'}${classes ? `.${classes.replace(/ /g, '.')}` : ''}`, text: (el?.textContent || '').trim().slice(0, 40) }
            }))
        }, AXE_SOURCE)
    } finally {
        await context.close()
    }
}

const browser = await chromium.launch()
const queue = routes.flatMap((route) => [[route, 'dark'], [route, 'light']])
const failures = []
const errors = []
await Promise.all(Array.from({ length: concurrency }, async () => {
    while (queue.length) {
        const [route, theme] = queue.shift()
        try {
            for (const node of await checkPage(browser, route, theme)) failures.push({ route, theme, ...node })
        } catch (error) {
            errors.push(`${route} (${theme}): ${error.message.split('\n')[0]}`)
        }
    }
}))
await browser.close()

console.log(`Checked ${routes.length} routes x 2 themes against ${base}.`)
if (errors.length) {
    console.error(`\n${errors.length} page(s) could not be checked:\n  ${errors.join('\n  ')}`)
}
if (failures.length === 0) {
    if (errors.length) process.exit(1)
    console.log('Docs contrast check passed: no text below WCAG AA in either theme.')
    process.exit(0)
}

const groups = new Map()
for (const f of failures) {
    const key = `${f.theme} | ${f.fg} on ${f.bg} = ${f.ratio}:1 (needs ${f.expected}) | ${f.element}`
    const group = groups.get(key) || { count: 0, routes: new Set(), text: f.text }
    group.count++
    group.routes.add(f.route)
    groups.set(key, group)
}
console.error(`\nDocs contrast check failed: ${failures.length} text element(s) below WCAG AA, in ${groups.size} group(s):\n`)
for (const [key, group] of [...groups].sort((a, b) => b[1].count - a[1].count)) {
    const sample = [...group.routes].slice(0, 3).join(', ')
    console.error(`  ${String(group.count).padStart(4)}x  ${key}\n         e.g. "${group.text}" on ${sample}${group.routes.size > 3 ? ` (+${group.routes.size - 3} more)` : ''}`)
}
console.error('\nUse a text step that passes in both themes (gray-950 / --rad-ui-text-secondary for secondary text),')
console.error('not lower palette steps (gray-50..900 are for fills and borders).\n')
process.exit(1)
