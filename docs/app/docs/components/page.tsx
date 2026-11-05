import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import Heading from '@radui/ui/Heading'
import Text from '@radui/ui/Text'

import { BookMarkLink } from '@/components/layout/Documentation/utils'
import { docsBodyClassName, docsSectionHeadingClassName } from '@/components/layout/Documentation/shared'
import generateSeoMetadata from '@/utils/seo/generateSeoMetadata'
import { componentGroups, components, componentsInGroup } from '../componentGroups'
import { docsNavigationSections } from '../docsNavigationSections'

export const metadata = generateSeoMetadata({
    title: 'Components - Rad UI',
    description: `All ${components.length} Rad UI React components, grouped by what they are for: forms, overlays and menus, navigation, feedback, data display, layout and typography. Each one is headless and accessible.`,
    keywords: ['React components', 'headless UI components', 'accessible React components', 'component library'],
    canonicalUrl: 'https://www.rad-ui.com/docs/components'
})

type NavLink = { title: string; path: string; is_new?: boolean; is_preview?: boolean }
const flags = new Map<string, NavLink>()
for (const section of docsNavigationSections as unknown as { items: NavLink[] }[]) {
    for (const item of section.items) flags.set(item.path, item)
}

const Tag = ({ children }: { children: string }) => (
    <span className="rounded-md border border-gray-400 px-1.5 py-0.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em] text-gray-950">
        {children}
    </span>
)

/** Every component on one page, in the sidebar's groups, each with its one-line purpose. */
export default function ComponentsIndex() {
    return (
        <div className="docs-article text-gray-1000">
            <header className="pb-2">
                <p className="mb-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-green-1000">Components</p>
                <BookMarkLink id="Components">
                    <Heading className="text-[clamp(2.125rem,4vw,2.75rem)]! font-semibold! leading-[1.05]! tracking-[-0.04em]! text-[var(--rad-ui-text-strong)]">
                        {components.length} components, one import each
                    </Heading>
                </BookMarkLink>
                <Text className={`${docsBodyClassName} mt-3 max-w-[62ch] text-[1.0625rem]! leading-8`}>
                    Every component owns its roles, keyboard handling and focus. Style it with the Clarity theme, with
                    your own CSS on its <code className="docs-inline-code">data-*</code> attributes, or not at all.
                    Each page has a live preview, the parts and props, the keyboard map and the ARIA pattern it follows.
                </Text>
                <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                        href="/playground"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-gray-1000 px-3.5 py-2 text-[0.875rem] font-medium text-gray-50 transition-colors hover:bg-gray-900"
                    >
                        Open the playground
                        <ArrowRight size={14} strokeWidth={2.25} aria-hidden />
                    </Link>
                    <Link
                        href="/docs/first-steps/installation"
                        className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[0.875rem] font-medium text-gray-1000 ring-1 ring-gray-500 ring-inset transition-colors hover:bg-gray-100"
                    >
                        Install Rad UI
                    </Link>
                </div>
            </header>

            <div className="mt-10 flex flex-col gap-12">
                {componentGroups.map((group) => {
                    const items = componentsInGroup(group.id)
                    return (
                        <section key={group.id} className="space-y-4">
                            <div className="space-y-1">
                                <BookMarkLink id={group.title}>
                                    <Heading as="h2" className={docsSectionHeadingClassName}>{group.title}</Heading>
                                </BookMarkLink>
                                <Text className={docsBodyClassName}>{group.blurb}</Text>
                            </div>
                            <ul className="grid gap-3 sm:grid-cols-2">
                                {items.map((component) => {
                                    const path = `/docs/components/${component.slug}`
                                    const flag = flags.get(path)
                                    return (
                                        <li key={component.slug}>
                                            <Link
                                                href={path}
                                                className="group flex h-full flex-col gap-1.5 rounded-xl border border-gray-400 bg-gray-50 px-4 py-3.5 transition-colors hover:border-gray-600 hover:bg-gray-100"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span className="text-[0.95rem] font-semibold text-gray-1000">{component.name}</span>
                                                    {flag?.is_new ? <Tag>New</Tag> : flag?.is_preview ? <Tag>Preview</Tag> : null}
                                                    <ArrowRight
                                                        size={14}
                                                        strokeWidth={2.25}
                                                        aria-hidden
                                                        className="ml-auto text-gray-950 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                                                    />
                                                </span>
                                                <span className="text-[0.85rem] leading-6 text-gray-950">{component.purpose}</span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </section>
                    )
                })}
            </div>
        </div>
    )
}
