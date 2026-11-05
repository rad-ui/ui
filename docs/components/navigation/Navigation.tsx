'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'
import { ChevronRight } from 'lucide-react'

import Collapsible from '@radui/ui/Collapsible'
import ScrollArea from '@radui/ui/ScrollArea'

import { NavBarContext } from '@/components/Main/NavBar/NavBarContext'
import { componentGroups, components, type ComponentGroupId } from '@/app/docs/componentGroups'
import { docsNavigationSections } from '@/app/docs/docsNavigationSections'
import SearchTrigger from './SearchTrigger'
import { getDocsProduct } from './products'

type NavLink = { title: string; path: string; is_new?: boolean; is_preview?: boolean }
type NavSection = { type: string; title: string; items: NavLink[] }

const flatSections = docsNavigationSections as NavSection[]
const sectionByTitle = (title: string) => flatSections.find((section) => section.title === title)

/** New and Preview flags live on the flat list; look them up by path. */
const flagsByPath = new Map<string, NavLink>()
for (const section of flatSections) for (const item of section.items) flagsByPath.set(item.path, item)

const groupedComponents = componentGroups.map((group) => ({
    ...group,
    items: components
        .filter((component) => component.group === group.id)
        .map((component) => {
            const path = `/docs/components/${component.slug}`
            const flags = flagsByPath.get(path)
            return { title: component.name, path, is_new: flags?.is_new, is_preview: flags?.is_preview }
        })
}))

const Tag = ({ children }: { children: string }) => (
    <span className="ml-auto pl-2 font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em] text-gray-950/80">
        {children}
    </span>
)

const NavItem = ({ item, pathname, onNavigate }: { item: NavLink; pathname: string | null; onNavigate: () => void }) => {
    const isActive = pathname === item.path
    return (
        <li>
            <Link
                href={item.path}
                prefetch
                onClick={onNavigate}
                aria-current={isActive ? 'page' : undefined}
                data-active={isActive || undefined}
                className="docs-nav-item relative flex items-center rounded-md py-[0.3rem] pl-3 pr-2 text-[0.84rem] text-gray-950 transition-colors hover:bg-gray-100 hover:text-gray-1000 data-[active]:bg-gray-100 data-[active]:font-medium data-[active]:text-gray-1000"
            >
                <span className="truncate">{item.title}</span>
                {item.is_new ? <Tag>New</Tag> : item.is_preview ? <Tag>Preview</Tag> : null}
            </Link>
        </li>
    )
}

const SectionLabel = ({ children, href }: { children: string; href?: string }) => {
    const className = 'block px-3 pb-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gray-950'
    return href ? (
        <Link href={href} className={`${className} transition-colors hover:text-gray-1000`}>
            {children}
        </Link>
    ) : (
        <p className={className}>{children}</p>
    )
}

/** A collapsible run of links. Open when the current page is inside it, or when asked. */
const NavGroup = ({
    title,
    items,
    pathname,
    defaultOpen,
    onNavigate
}: {
    title: string
    items: NavLink[]
    pathname: string | null
    defaultOpen: boolean
    onNavigate: () => void
}) => {
    const containsActive = items.some((item) => item.path === pathname)
    return (
        <Collapsible.Root customRootClass="docs" defaultOpen={defaultOpen || containsActive}>
            <Collapsible.Trigger className="group flex w-full items-center gap-1.5 rounded-md py-1.5 pl-2 pr-2 text-left text-[0.84rem] font-medium text-gray-1000 transition-colors hover:bg-gray-100">
                <ChevronRight
                    size={13}
                    strokeWidth={2.25}
                    aria-hidden
                    className="shrink-0 text-gray-950 transition-transform duration-200 group-data-[state=open]:rotate-90"
                />
                <span className="truncate">{title}</span>
                <span className="ml-auto font-mono text-[0.62rem] text-gray-950/70">{items.length}</span>
            </Collapsible.Trigger>
            <Collapsible.Content>
                <ul className="mb-1 ml-[0.95rem] border-l border-gray-300 pl-1.5">
                    {items.map((item) => (
                        <NavItem key={item.path} item={item} pathname={pathname} onNavigate={onNavigate} />
                    ))}
                </ul>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}

const FlatSection = ({ section, pathname, onNavigate }: { section: NavSection; pathname: string | null; onNavigate: () => void }) => (
    <div className="mb-6">
        <SectionLabel>{section.title}</SectionLabel>
        <ul>
            {section.items.map((item) => (
                <NavItem key={item.path} item={item} pathname={pathname} onNavigate={onNavigate} />
            ))}
        </ul>
    </div>
)

const UiDocsNavigation = ({ pathname, onNavigate }: { pathname: string | null; onNavigate: () => void }) => {
    const firstSteps = sectionByTitle('First Steps')
    const guides = sectionByTitle('Guides')
    const contributing = sectionByTitle('Contributing')
    const onComponentsIndex = pathname === '/docs/components'

    return (
        <>
            {firstSteps ? <FlatSection section={{ ...firstSteps, title: 'Get started' }} pathname={pathname} onNavigate={onNavigate} /> : null}

            <div className="mb-6">
                <SectionLabel href="/docs/components">Components</SectionLabel>
                <ul>
                    <li>
                        <Link
                            href="/docs/components"
                            onClick={onNavigate}
                            aria-current={onComponentsIndex ? 'page' : undefined}
                            data-active={onComponentsIndex || undefined}
                            className="docs-nav-item relative mb-1 flex items-center rounded-md py-[0.3rem] pl-3 pr-2 text-[0.84rem] text-gray-950 transition-colors hover:bg-gray-100 hover:text-gray-1000 data-[active]:bg-gray-100 data-[active]:font-medium data-[active]:text-gray-1000"
                        >
                            All components
                            <span className="ml-auto font-mono text-[0.62rem] text-gray-950/70">{components.length}</span>
                        </Link>
                    </li>
                </ul>
                {groupedComponents.map((group) => (
                    <NavGroup
                        key={group.id}
                        title={group.title}
                        items={group.items}
                        pathname={pathname}
                        defaultOpen={OPEN_BY_DEFAULT.has(group.id)}
                        onNavigate={onNavigate}
                    />
                ))}
            </div>

            {guides ? (
                <div className="mb-6">
                    <SectionLabel>Guides</SectionLabel>
                    <NavGroup title="All guides" items={guides.items} pathname={pathname} defaultOpen={false} onNavigate={onNavigate} />
                </div>
            ) : null}
            {contributing ? (
                <div className="mb-6">
                    <SectionLabel>Contributing</SectionLabel>
                    <NavGroup title="For contributors" items={contributing.items} pathname={pathname} defaultOpen={false} onNavigate={onNavigate} />
                </div>
            ) : null}
        </>
    )
}

/** Groups most readers look for first stay open; the rest open when their page is current. */
const OPEN_BY_DEFAULT = new Set<ComponentGroupId>(['forms', 'overlays'])

const Navigation = () => {
    const pathname = usePathname()
    const { setIsDocsNavOpen } = useContext(NavBarContext)
    const product = getDocsProduct(pathname)
    const closeMobileNav = () => setIsDocsNavOpen(false)

    return (
        <ScrollArea.Root customRootClass="rad-ui" className="h-full">
            <ScrollArea.Viewport style={{ height: '100%' }}>
                <nav aria-label="Documentation" className="w-[264px] px-3 pb-16 pt-4">
                    <div className="mb-5 px-1">
                        <SearchTrigger />
                    </div>
                    {product?.id === 'ui' || !product ? (
                        <UiDocsNavigation pathname={pathname} onNavigate={closeMobileNav} />
                    ) : (
                        (product.sections as unknown as NavSection[]).map((section) => (
                            <FlatSection key={section.title} section={section} pathname={pathname} onNavigate={closeMobileNav} />
                        ))
                    )}
                </nav>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    )
}

export default Navigation
