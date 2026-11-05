'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bug, Code2, History } from 'lucide-react'
import Breadcrumb from '@radui/ui/Breadcrumb'

import Copy from '@/components/Copy'
import { getGroupForPath } from '@/app/docs/componentGroups'

const REPO = 'https://github.com/rad-ui/ui'

/** Where the page sits: Docs / Components / <group>. Component pages only. */
export const DocsBreadcrumb = () => {
    const pathname = usePathname()
    const group = getGroupForPath(pathname)
    if (!group) return null
    return (
        <Breadcrumb.Root customRootClass="docs" aria-label="Breadcrumb" className="mb-3">
            <Breadcrumb.List className="flex flex-wrap items-center gap-1.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-gray-950">
                <Breadcrumb.Item>
                    <Breadcrumb.Link asChild>
                        <Link href="/docs/components" className="transition-colors hover:text-gray-1000">Components</Link>
                    </Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator aria-hidden className="text-gray-950/60">/</Breadcrumb.Separator>
                <Breadcrumb.Item>
                    <Breadcrumb.Page className="text-green-1000">{group.title}</Breadcrumb.Page>
                </Breadcrumb.Item>
            </Breadcrumb.List>
        </Breadcrumb.Root>
    )
}

/** The import line, copyable, plus links to source, issues and the component changelog. */
export const ComponentMeta = ({ name, changelogPath }: { name: string; changelogPath: string | null }) => {
    const importLine = `import ${name} from "@radui/ui/${name}"`
    const issueUrl = `${REPO}/issues/new?title=${encodeURIComponent(`${name}: `)}&labels=${encodeURIComponent('bug')}`
    const sourceUrl = `${REPO}/tree/main/src/components/ui/${name}`
    const linkClass = 'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.8rem] font-medium text-gray-950 transition-colors hover:bg-gray-100 hover:text-gray-1000'

    return (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="flex min-w-0 items-center gap-2 rounded-lg border border-gray-400 bg-gray-100 py-1 pl-3 pr-1">
                <code className="min-w-0 flex-1 truncate font-mono text-[0.8rem] text-gray-1000">{importLine}</code>
                <Copy content={importLine} className="h-7! w-7! rounded-md! border-0! bg-transparent!" iconSize={13} />
            </div>
            <div className="-ml-2 flex flex-wrap items-center gap-0.5 sm:ml-auto">
                <a href={sourceUrl} target="_blank" rel="noreferrer" className={linkClass}>
                    <Code2 size={13} strokeWidth={2} aria-hidden />
                    Source
                </a>
                <a href={issueUrl} target="_blank" rel="noreferrer" className={linkClass}>
                    <Bug size={13} strokeWidth={2} aria-hidden />
                    Report an issue
                </a>
                {changelogPath ? (
                    <Link href={changelogPath} className={linkClass}>
                        <History size={13} strokeWidth={2} aria-hidden />
                        Changelog
                    </Link>
                ) : null}
            </div>
        </div>
    )
}
