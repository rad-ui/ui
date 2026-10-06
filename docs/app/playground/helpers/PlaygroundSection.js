'use client'

import Link from "@radui/ui/Link"
import { toSectionId } from "./PlaygroundContext"

// Compact, anchor-linked section in the style of a component reference sheet.
const PlaygroundSection = ({ title = "", docsLink = "", description = "", children }) => {
    const id = toSectionId(title)

    return (
        <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-6">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 id={`${id}-heading`} className="text-lg font-semibold tracking-tight text-gray-1000">
                        <a href={`#${id}`} className="hover:underline">{title}</a>
                    </h2>
                    {description ? <p className="text-sm text-gray-950">{description}</p> : null}
                </div>
                {docsLink ? <Link href={docsLink} size="small">Docs</Link> : null}
            </div>
            <div className="min-w-0 rounded-xl border border-gray-300 bg-gray-50 p-5">
                {children}
            </div>
        </section>
    )
}

export default PlaygroundSection
