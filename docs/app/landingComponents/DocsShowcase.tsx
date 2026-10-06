import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { docsNavigationSections } from '@/app/docs/docsNavigationSections'
import tabsTriggerApi from '@/app/docs/components/tabs/docs/component_api/trigger'
import { DOCS_ARIA_PATTERNS } from '@/app/docs/components/shared/ariaReferences'

import InstallCommand from './InstallCommand'

/**
 * "Built for humans, agents love it too" showcase.
 *
 * Everything shown here is read from the same sources the docs use, so the
 * numbers and snippets cannot drift: page counts and the llms.txt preview come
 * from `docsNavigationSections` (which `scripts/generate-llms.ts` turns into
 * /llms.txt at build time), and the API table rows are the real Tabs.Trigger
 * reference data.
 */

const BASE_URL = 'https://www.rad-ui.com'
const LLMS_COMMAND = `curl -s ${BASE_URL}/llms.txt`

type NavItem = { title: string; path?: string }
type NavSection = { type: string; title: string; items: NavItem[] }

const sections = docsNavigationSections as NavSection[]
const itemsOf = (title: string) => sections.find((section) => section.title === title)?.items ?? []

const components = itemsOf('Components')
const guides = itemsOf('Guides')
// Mirrors scripts/generate-llms.ts: every CATEGORY item with a path becomes one link.
const totalPages = sections
    .filter((section) => section.type === 'CATEGORY')
    .reduce((sum, section) => sum + section.items.filter((item) => item.path).length, 0)

type ApiRow = { prop: { name: string } | string; type?: string; default?: string; required?: boolean }
const apiRows = ((tabsTriggerApi as { data?: ApiRow[] }).data ?? []).slice(0, 4).map((row) => ({
    name: typeof row.prop === 'string' ? row.prop : row.prop.name,
    type: row.type ?? '',
    fallback: row.required ? 'required' : row.default ?? '--'
}))

const KEYBOARD_ROWS = [
    { keys: ['←', '→'], description: 'Move focus between triggers' },
    { keys: ['Home', 'End'], description: 'Jump to the first or last trigger' }
]

const TABS_ARIA = DOCS_ARIA_PATTERNS.TABS as { label: string; href: string }

const STATS = [
    { value: String(components.length), label: 'component pages' },
    { value: String(guides.length), label: 'in-depth guides' },
    { value: String(totalPages), label: 'pages indexed in llms.txt' }
]

const PROOF = [
    {
        title: 'Every part, every prop',
        body: 'API tables list each part with its props, types and defaults, beside an anatomy snippet you can copy.'
    },
    {
        title: 'Keyboard and ARIA, written down',
        body: 'Interactive components document their key bindings and link the WAI-ARIA pattern they follow.'
    },
    {
        title: 'Examples with their source',
        body: 'Live demos render next to the exact code and theme styles that produce them.'
    },
    {
        title: 'Predictable by design',
        body: 'Consistent Root and part naming, TypeScript types, and stable data-* state attributes. Guess once, guess right.'
    }
]

function llmsPreview() {
    const lines: { kind: 'heading' | 'link' | 'muted' | 'quote'; text: string }[] = [
        { kind: 'heading', text: '# Rad UI' },
        {
            kind: 'quote',
            text: '> Rad UI is a modern, headless React component library focused on accessibility, TypeScript, and unstyled primitives for building custom design systems.'
        },
        { kind: 'muted', text: '…' },
        { kind: 'heading', text: '## Components' }
    ]
    for (const item of components.slice(0, 4)) {
        lines.push({ kind: 'link', text: `- [${item.title}](${BASE_URL}${item.path})` })
    }
    lines.push({ kind: 'muted', text: `  … ${components.length - 4} more` })
    lines.push({ kind: 'heading', text: '## Guides' })
    for (const item of guides.slice(0, 2)) {
        lines.push({ kind: 'link', text: `- [${item.title}](${BASE_URL}${item.path})` })
    }
    lines.push({ kind: 'muted', text: `  … ${guides.length - 2} more` })
    return lines
}

const lineClass = {
    heading: 'font-semibold text-gray-1000',
    quote: 'text-gray-950',
    link: 'text-gray-1000',
    muted: 'text-gray-950'
}

function PanelLabel({ children }: { children: string }) {
    return <p className="text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-gray-950">{children}</p>
}

export default function DocsShowcase() {
    return (
        <div>
            <div className="grid overflow-hidden rounded-2xl border border-gray-400 lg:grid-cols-2">
                {/* ── Human view ─────────────────────────────── */}
                <div className="min-w-0 bg-gray-50 p-6 sm:p-8">
                    <PanelLabel>For you</PanelLabel>
                    <h3 className="mt-2 text-lg font-semibold tracking-[-0.01em] text-gray-1000">
                        Reference you can actually read
                    </h3>

                    <div className="mt-6 overflow-hidden rounded-xl border border-gray-400">
                        <div className="flex items-baseline justify-between gap-3 border-b border-gray-400 bg-gray-100 px-4 py-2.5">
                            <span className="font-mono text-[0.8125rem] font-medium text-gray-1000">Tabs.Trigger</span>
                            <span className="text-[0.75rem] text-gray-950">API reference</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[22rem] text-left text-[0.8125rem]">
                                <caption className="sr-only">Tabs.Trigger props, from the Rad UI docs</caption>
                                <thead>
                                    <tr className="text-gray-950">
                                        <th scope="col" className="px-4 py-2 font-medium">Prop</th>
                                        <th scope="col" className="px-4 py-2 font-medium">Type</th>
                                        <th scope="col" className="px-4 py-2 font-medium">Default</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apiRows.map((row) => (
                                        <tr key={row.name} className="border-t border-gray-300">
                                            <td className="px-4 py-2 font-mono text-gray-1000">{row.name}</td>
                                            <td className="px-4 py-2 font-mono text-gray-950">{row.type}</td>
                                            <td className="px-4 py-2 font-mono text-gray-950">{row.fallback}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-xl border border-gray-400">
                        <div className="border-b border-gray-400 bg-gray-100 px-4 py-2.5 text-[0.8125rem] font-medium text-gray-1000">
                            Keyboard interactions
                        </div>
                        <ul className="divide-y divide-gray-300 text-[0.8125rem]">
                            {KEYBOARD_ROWS.map((row) => (
                                <li key={row.description} className="flex items-center gap-4 px-4 py-2.5">
                                    <span className="flex shrink-0 gap-1">
                                        {row.keys.map((key) => (
                                            <kbd
                                                key={key}
                                                className="min-w-[1.75rem] rounded-md border border-gray-500 bg-gray-100 px-1.5 py-0.5 text-center font-mono text-[0.75rem] text-gray-1000"
                                            >
                                                {key}
                                            </kbd>
                                        ))}
                                    </span>
                                    <span className="text-gray-950">{row.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-xl border border-gray-400">
                        <div className="border-b border-gray-400 bg-gray-100 px-4 py-2.5 text-[0.8125rem] font-medium text-gray-1000">
                            ARIA references
                        </div>
                        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-2.5 text-[0.8125rem]">
                            <a
                                href={TABS_ARIA.href}
                                className="font-medium text-gray-1000 underline decoration-gray-600 underline-offset-4 hover:decoration-gray-1000"
                            >
                                {TABS_ARIA.label}
                            </a>
                            <span className="text-gray-950">Tab list, trigger and panel semantics</span>
                        </p>
                    </div>

                    <Link
                        href="/docs/components/tabs"
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gray-1000 underline decoration-gray-600 underline-offset-4 transition-colors hover:decoration-gray-1000"
                    >
                        See the full Tabs page
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>

                {/* ── Agent view ─────────────────────────────── */}
                <div className="min-w-0 border-t border-gray-400 bg-gray-200 p-6 sm:p-8 lg:border-l lg:border-t-0">
                    <PanelLabel>For your agent</PanelLabel>
                    <h3 className="mt-2 text-lg font-semibold tracking-[-0.01em] text-gray-1000">
                        One file to read the whole library
                    </h3>

                    <InstallCommand command={LLMS_COMMAND} tone="canvas" className="mt-6" />

                    <pre
                        aria-label="Excerpt of rad-ui.com/llms.txt"
                        className="mt-3 overflow-x-auto rounded-xl border border-gray-400 bg-gray-50 px-4 py-4 font-mono text-[0.75rem] leading-6 sm:text-[0.8125rem]"
                    >
                        <code>
                            {llmsPreview().map((line, index) => (
                                <span
                                    key={index}
                                    className={`block ${lineClass[line.kind]} ${line.kind === 'quote' ? 'whitespace-pre-wrap' : ''}`}
                                >
                                    {line.text}
                                </span>
                            ))}
                        </code>
                    </pre>

                    <p className="mt-4 text-[0.9375rem] leading-7 text-gray-950">
                        Regenerated from the docs navigation on every build, so your agent reads the pages that exist
                        today, not a stale crawl. Hand the link to Claude, Cursor or Copilot and it can reach any
                        component page or guide in one hop.
                    </p>

                    <Link
                        href="/llms.txt"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-1000 underline decoration-gray-600 underline-offset-4 transition-colors hover:decoration-gray-1000"
                    >
                        Open llms.txt
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-gray-400 py-6 sm:gap-8">
                {STATS.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse justify-end">
                        <dt className="mt-1 text-[0.8125rem] leading-5 text-gray-950 sm:text-sm">{stat.label}</dt>
                        <dd className="text-[1.75rem] font-semibold leading-none tracking-[-0.03em] text-gray-1000 tabular-nums sm:text-[2.25rem]">
                            {stat.value}
                        </dd>
                    </div>
                ))}
            </dl>

            <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                {PROOF.map((item) => (
                    <li key={item.title}>
                        <p className="text-[0.9375rem] font-medium text-gray-1000">{item.title}</p>
                        <p className="mt-1 text-[0.9375rem] leading-6 text-gray-950">{item.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
