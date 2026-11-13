#!/usr/bin/env node
// Fails if a showcase loses something on a phone.
//
// The showcases are reference layouts: people (and the AI tools they prompt)
// copy them. A column that is hidden on a small screen with no other way to
// reach what was in it teaches the wrong pattern. So this opens every showcase
// in Chromium twice, at desktop width and as a touch phone, and checks:
//
//   1. Nothing is lost. Every control you can reach on desktop can be reached
//      on the phone, either on screen or behind a button whose name starts
//      with "Open " or "Back to " (a drawer, a sheet, a list).
//   2. Nothing needs hover. No control is invisible until the pointer is over it.
//   3. Targets are big enough. Every control is at least 24x24 CSS px (WCAG 2.5.8).
//   4. The page does not scroll sideways.
//
// Usage:
//   node scripts/check-docs-mobile.mjs --base http://127.0.0.1:3000
//   node scripts/check-docs-mobile.mjs --base http://127.0.0.1:3000 --routes /showcase/inbox
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const arg = (name, fallback) => {
    const i = process.argv.indexOf(`--${name}`)
    return i === -1 ? fallback : process.argv[i + 1]
}
const base = arg('base', 'http://127.0.0.1:3000').replace(/\/$/, '')
const routes = (arg('routes') || [
    '/showcase/music-app',
    '/showcase/dashboard',
    '/showcase/inbox',
    '/showcase/messaging',
    '/showcase/preferences',
    '/showcase/product-page'
].join(',')).split(',')

const DESKTOP = { viewport: { width: 1440, height: 900 } }
const PHONE = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 }
const MIN_TARGET = 24

// Controls whose name is different on a phone for a good reason.
// Key: the desktop name. Value: the phone name that stands in for it.
const RENAMED = {
    // The queue is a column on desktop (hide/show) and part of the player sheet on a phone.
    'Hide queue': 'Open player',
    'Show queue': 'Open player'
}

// Runs in the page. Lists every control inside the showcase frame and any open
// overlay, with what a person would need to use it.
const collectControls = () => {
    const selector = [
        'a[href]', 'button', 'input:not([type=hidden])', 'textarea', 'select',
        '[role=button]', '[role=link]', '[role=tab]', '[role=slider]', '[role=switch]',
        '[role=checkbox]', '[role=radio]', '[role=radiogroup]', '[role=menuitem]', '[tabindex="0"]'
    ].join(',')
    const frame = document.querySelector('[data-showcase-frame]')
    const overlays = [...document.querySelectorAll('[role=dialog]')]
    const seen = new Set()
    const controls = []

    const nameOf = (el) => {
        const labelledBy = el.getAttribute('aria-labelledby')
        const fromIds = labelledBy ? labelledBy.split(/\s+/).map((id) => document.getElementById(id)?.textContent || '').join(' ') : ''
        const label = el.labels?.[0]?.textContent || ''
        return (el.getAttribute('aria-label') || fromIds || label || el.getAttribute('placeholder') || el.textContent || '')
            .replace(/\s+/g, ' ').trim().slice(0, 80)
    }

    // Opacity multiplies down the tree; an ancestor at 0 hides the control too.
    const opacityOf = (el) => {
        let value = 1
        for (let node = el; node && node !== document.documentElement; node = node.parentElement) {
            value *= Number(getComputedStyle(node).opacity)
        }
        return value
    }

    for (const root of [frame, ...overlays]) {
        if (!root) continue
        for (const el of root.querySelectorAll(selector)) {
            if (seen.has(el)) continue
            seen.add(el)
            if (el.disabled || el.getAttribute('aria-hidden') === 'true') continue
            if (!el.checkVisibility({ visibilityProperty: true })) continue
            if (el.closest('[aria-hidden=true], [inert]')) continue
            const name = nameOf(el)
            if (!name) continue
            const rect = el.getBoundingClientRect()
            const style = getComputedStyle(el)
            // What counts as the target: the control itself, a label wrapped
            // around it, or an absolutely positioned ::before/::after that
            // grows its tappable area.
            const sizes = [[rect.width, rect.height]]
            const label = el.closest('label')
            if (label) sizes.push([label.getBoundingClientRect().width, label.getBoundingClientRect().height])
            for (const pseudo of ['::before', '::after']) {
                const pseudoStyle = getComputedStyle(el, pseudo)
                if (pseudoStyle.content !== 'none' && pseudoStyle.position === 'absolute') {
                    sizes.push([parseFloat(pseudoStyle.width) || 0, parseFloat(pseudoStyle.height) || 0])
                }
            }
            controls.push({
                name,
                width: Math.round(Math.max(...sizes.map((size) => size[0]))),
                height: Math.round(Math.max(...sizes.map((size) => size[1]))),
                opacity: opacityOf(el),
                // A link or a control that sits in a line of text is exempt from the target size rule.
                inline: style.display === 'inline',
                // The visually hidden input behind a custom checkbox, radio or switch: the visible part is what gets tapped.
                hiddenInput: el.tagName === 'INPUT' && (rect.width <= 1 || rect.height <= 1 || style.position === 'absolute')
            })
        }
    }
    return {
        controls,
        frame: Boolean(frame),
        overflow: document.documentElement.scrollWidth - window.innerWidth
    }
}

const open = async (browser, route, options) => {
    const context = await browser.newContext(options)
    const page = await context.newPage()
    await page.goto(`${base}${route}`, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForSelector('[data-showcase-frame]', { timeout: 30000 })
    return { context, page }
}

const openerPattern = /^(Open |Back to )/

// Everything reachable on the phone: what is on screen, plus what each
// "Open …" or "Back to …" button reveals.
const collectPhone = async (page) => {
    const first = await page.evaluate(collectControls)
    const all = [...first.controls]
    const openers = [...new Set(first.controls.map((control) => control.name).filter((name) => openerPattern.test(name)))]

    for (const name of openers) {
        const button = page.locator('[data-showcase-frame]').getByRole('button', { name, exact: true }).first()
        if (!(await button.isVisible().catch(() => false))) continue
        await button.tap()
        await page.waitForTimeout(700)
        const revealed = await page.evaluate(collectControls)
        all.push(...revealed.controls.map((control) => ({ ...control, behind: name })))
        await page.keyboard.press('Escape')
        await page.waitForTimeout(500)
    }

    // Some lists only appear after a choice, such as the message list behind an open message.
    return { ...first, controls: all, openers }
}

const checkRoute = async (browser, route) => {
    const problems = []

    const desktop = await open(browser, route, DESKTOP)
    const wide = await desktop.page.evaluate(collectControls)
    await desktop.context.close()

    const phone = await open(browser, route, PHONE)
    const narrow = await collectPhone(phone.page)

    // Open one item where the showcase has a list-and-detail layout, so the
    // detail view's controls count as reachable too.
    const firstItem = phone.page.locator('[data-showcase-frame] [data-showcase-item]').first()
    if (await firstItem.count()) {
        await firstItem.tap()
        await phone.page.waitForTimeout(400)
        const detail = await collectPhone(phone.page)
        narrow.controls.push(...detail.controls)
    }
    await phone.context.close()

    const narrowNames = new Set(narrow.controls.map((control) => control.name))
    const lost = [...new Set(wide.controls.map((control) => control.name))]
        .filter((name) => !narrowNames.has(name) && !narrowNames.has(RENAMED[name]))
    for (const name of lost) problems.push(`lost on a phone: "${name}"`)

    const reported = new Set()
    for (const control of narrow.controls) {
        if (control.hiddenInput) continue
        const where = control.behind ? ` (behind "${control.behind}")` : ''
        if (control.opacity < 0.05 && !reported.has(`o:${control.name}`)) {
            reported.add(`o:${control.name}`)
            problems.push(`invisible without hover: "${control.name}"${where}`)
        }
        if (!control.inline && (control.width < MIN_TARGET || control.height < MIN_TARGET) && !reported.has(`s:${control.name}`)) {
            reported.add(`s:${control.name}`)
            problems.push(`target ${control.width}x${control.height} is under ${MIN_TARGET}px: "${control.name}"${where}`)
        }
    }

    if (narrow.overflow > 1) problems.push(`page scrolls sideways by ${narrow.overflow}px`)

    return { route, problems, desktopControls: wide.controls.length, phoneControls: narrowNames.size, openers: narrow.openers }
}

const browser = await chromium.launch()
let failed = false
try {
    for (const route of routes) {
        const result = await checkRoute(browser, route)
        const summary = `${result.desktopControls} desktop controls, ${result.phoneControls} on phone, openers: ${result.openers.join(', ') || 'none'}`
        if (result.problems.length === 0) {
            console.log(`ok   ${route}  (${summary})`)
            continue
        }
        failed = true
        console.log(`FAIL ${route}  (${summary})`)
        for (const problem of result.problems) console.log(`       ${problem}`)
    }
} finally {
    await browser.close()
}

if (failed) {
    console.error('\nMobile check failed. See docs/app/docs/guides/mobile-layouts for the patterns to use.')
    process.exit(1)
}
console.log('\nMobile check passed.')
