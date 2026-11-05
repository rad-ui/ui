'use client'
import { useContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, Box, Compass, GitPullRequest, Palette, Sparkles, SwatchBook } from 'lucide-react'
import Command from '@radui/ui/Command'

import { NavBarContext } from '@/components/Main/NavBar/NavBarContext'
import { componentGroups, components } from '@/app/docs/componentGroups'
import { docsNavigationSections } from '@/app/docs/docsNavigationSections'
import { fxNavigationSections } from '@/app/fx/fxNavigationSections'

type Entry = { title: string; path: string; hint?: string; keywords?: string[] }
type Section = { title: string; items: { title: string; path: string }[] }

const sectionItems = (sections: readonly Section[], title: string) =>
    sections.find((section) => section.title === title)?.items ?? []

const SITE: Entry[] = [
    { title: 'Playground', path: '/playground', hint: 'Every component, every variant' },
    { title: 'Colors', path: '/colors', hint: 'The 12-step scales' },
    { title: 'Showcase', path: '/showcase/music-app', hint: 'Real screens built with Rad UI' },
    { title: 'Case studies', path: '/built-with', hint: 'Products that run on Rad UI' },
    { title: 'Rad UI FX', path: '/fx', hint: 'Accessible motion components' }
]

const GROUP_TITLE = new Map(componentGroups.map((group) => [group.id, group.title]))

/**
 * Site-wide search over every docs page, opened from the sidebar, the top bar
 * or Cmd/Ctrl+K. Filtering is the Command component's own; each component
 * carries its one-line purpose as keywords so "modal" finds Dialog.
 */
const SearchPalette = () => {
    const { isSearchOpen, setIsSearchOpen } = useContext(NavBarContext)
    const router = useRouter()

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault()
                setIsSearchOpen(!isSearchOpen)
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [isSearchOpen, setIsSearchOpen])

    const groups = useMemo(() => {
        const docs = docsNavigationSections as unknown as Section[]
        const fx = fxNavigationSections as unknown as Section[]
        return [
            { title: 'Get started', icon: BookOpen, items: sectionItems(docs, 'First Steps') as Entry[] },
            {
                title: 'Components',
                icon: Box,
                items: components.map<Entry>((component) => ({
                    title: component.name,
                    path: `/docs/components/${component.slug}`,
                    hint: component.purpose,
                    keywords: [GROUP_TITLE.get(component.group) ?? '', component.purpose]
                }))
            },
            { title: 'Guides', icon: Compass, items: sectionItems(docs, 'Guides') as Entry[] },
            { title: 'Contributing', icon: GitPullRequest, items: sectionItems(docs, 'Contributing') as Entry[] },
            { title: 'Site', icon: SwatchBook, items: SITE },
            {
                title: 'FX',
                icon: Sparkles,
                items: fx.flatMap((section) => section.items).map<Entry>((item) => ({ title: item.title, path: item.path }))
            }
        ].filter((group) => group.items.length > 0)
    }, [])

    const go = (path: string) => {
        setIsSearchOpen(false)
        router.push(path)
    }

    return (
        <Command.Dialog
            open={isSearchOpen}
            onOpenChange={(open) => setIsSearchOpen(open)}
            contentClassName="docs-search-dialog"
            label="Search documentation"
        >
            <Command.Input placeholder="Search components, guides and pages" autoFocus />
            <Command.List className="docs-search-list">
                <Command.Empty>Nothing matches. Try a component name or what it does, like “modal”.</Command.Empty>
                {groups.map((group) => (
                    <Command.Group key={group.title} heading={group.title}>
                        {group.items.map((item) => (
                            <Command.Item
                                key={item.path}
                                value={`${group.title} ${item.title}`}
                                keywords={item.keywords}
                                onSelect={() => go(item.path)}
                            >
                                <span className="rad-ui-command-item-main">
                                    <group.icon aria-hidden />
                                    <span className="rad-ui-command-item-copy">
                                        <span className="rad-ui-command-item-label">{item.title}</span>
                                        {item.hint ? <span className="rad-ui-command-item-description">{item.hint}</span> : null}
                                    </span>
                                </span>
                            </Command.Item>
                        ))}
                    </Command.Group>
                ))}
            </Command.List>
        </Command.Dialog>
    )
}

export default SearchPalette
