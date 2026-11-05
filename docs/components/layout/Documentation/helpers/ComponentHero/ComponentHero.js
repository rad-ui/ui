"use client"
import CodeBlock from '../CodeBlock';
import { useContext, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import Heading from "@radui/ui/Heading"
import Theme from '@radui/ui/Theme'
import ToggleGroup from '@radui/ui/ToggleGroup'

import { NavBarContext } from '@/components/Main/NavBar/NavBarContext'
import { BookMarkLink } from '@/components/layout/Documentation/utils';
import { useLightTokens } from '@/utils/useLightTokens'
import { toSectionId } from '@/app/playground/helpers/PlaygroundContext'
import { docsHeadingClassFor, docsSectionBlockClassName, docsSurfaceClassName } from '../../shared';
import { useDocsPage } from '../../DocsPageContext'

import CodeTabs from './CodeTabs';

const ACCENTS = ['gray', 'blue', 'violet', 'crimson', 'orange', 'jade']
const TAB_LABELS = { javascript: 'React', scss: 'Styles' }

function firstValue(value) {
    if (Array.isArray(value)) return value[0]
    return typeof value === 'string' && value ? value : undefined
}

const toggleItemClass = 'grid h-6 min-w-6 place-items-center rounded-[5px] px-1 text-gray-950 outline-none transition-colors hover:text-gray-1000 focus-visible:ring-2 focus-visible:ring-gray-1000 data-[state=on]:bg-gray-50 data-[state=on]:text-gray-1000 data-[state=on]:shadow-sm'

/**
 * The live example at the top of a component page. The toolbar drives a nested
 * Theme around the example only, so a reader can check the component in the
 * other appearance and with another accent without leaving the page.
 */
const ComponentHero = ({ children, title = '', codeUsage = {} }) => {
    const { darkMode } = useContext(NavBarContext)
    const page = useDocsPage()
    const [accent, setAccent] = useState('gray')
    const [appearance, setAppearance] = useState(darkMode ? 'dark' : 'light')
    const [pinned, setPinned] = useState(false)
    useEffect(() => {
        if (!pinned) setAppearance(darkMode ? 'dark' : 'light')
    }, [darkMode, pinned])
    const lightTokens = useLightTokens(appearance === 'light' && Boolean(darkMode))

    const data = useMemo(() => Object.keys(codeUsage).map((key) => ({
        label: TAB_LABELS[key] ?? key,
        value: key,
        content: <CodeBlock className="my-0" language={key === 'javascript' ? 'tsx' : key}>{codeUsage[key]?.code}</CodeBlock>
    })), [codeUsage]);

    const playgroundHref = page.title ? `/playground#${toSectionId(page.title.replace(/\s+/g, ''))}` : '/playground'

    return <section className={docsSectionBlockClassName}>
        {title && (
            <BookMarkLink id={title}>
                <Heading as="h2" className={docsHeadingClassFor('h2')}>{title}</Heading>
            </BookMarkLink>
        )}
        <div className={docsSurfaceClassName}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-gray-300 bg-gray-100 px-3 py-2">
                <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gray-950">Preview</span>
                <div className="ml-auto flex flex-wrap items-center gap-2">
                    <ToggleGroup.Root
                        type="single"
                        value={[accent]}
                        onValueChange={(value) => {
                            const next = firstValue(value)
                            if (next) setAccent(next)
                        }}
                        aria-label="Accent color"
                        className="flex items-center gap-1 rounded-md bg-gray-200 p-1"
                    >
                        {ACCENTS.map((name) => (
                            <ToggleGroup.Item
                                key={name}
                                value={name}
                                aria-label={`${name} accent`}
                                className="grid h-4.5 w-4.5 place-items-center rounded-full outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-gray-1000 data-[state=on]:ring-2 data-[state=on]:ring-gray-1000 data-[state=on]:ring-offset-1 data-[state=on]:ring-offset-gray-200"
                            >
                                <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: `var(--rad-ui-color-${name}-900)` }} />
                            </ToggleGroup.Item>
                        ))}
                    </ToggleGroup.Root>
                    <ToggleGroup.Root
                        type="single"
                        value={[appearance]}
                        onValueChange={(value) => {
                            const next = firstValue(value)
                            if (next === 'light' || next === 'dark') {
                                setPinned(true)
                                setAppearance(next)
                            }
                        }}
                        aria-label="Preview appearance"
                        className="flex items-center rounded-md bg-gray-200 p-0.5"
                    >
                        <ToggleGroup.Item value="light" aria-label="Light" className={toggleItemClass}>
                            <Sun size={13} strokeWidth={2} aria-hidden />
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value="dark" aria-label="Dark" className={toggleItemClass}>
                            <Moon size={13} strokeWidth={2} aria-hidden />
                        </ToggleGroup.Item>
                    </ToggleGroup.Root>
                    <Link
                        href={playgroundHref}
                        className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[0.75rem] font-medium text-gray-950 transition-colors hover:bg-gray-200 hover:text-gray-1000"
                    >
                        Playground
                        <ArrowUpRight size={12} strokeWidth={2.25} aria-hidden />
                    </Link>
                </div>
            </div>
            <Theme
                id="docs-preview-theme"
                appearance={appearance}
                accentColor={accent}
                classNamespace="rad-ui"
                style={lightTokens}
                className="docs-preview-stage flex min-h-[220px] items-center justify-center overflow-x-auto bg-gray-50 p-8 text-gray-1000 transition-colors duration-300 sm:p-12"
            >
                {children}
            </Theme>
            <div className="border-t border-gray-300 px-3 pb-3 pt-3 sm:px-4">
                <CodeTabs data={data} preserveCase />
            </div>
        </div>
    </section>
}

export default ComponentHero;
