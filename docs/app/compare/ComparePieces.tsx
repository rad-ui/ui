import Link from 'next/link'
import type { ReactNode } from 'react'
import { Check, Minus } from 'lucide-react'

import type { Cell } from './data'

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
    return (
        <section aria-labelledby={id} className="grid grid-cols-[minmax(0,1fr)] gap-4 border-t border-gray-400 pt-8">
            <h2 id={id} className="text-[1.375rem] font-semibold tracking-[-0.02em] text-gray-1000">
                {title}
            </h2>
            {children}
        </section>
    )
}

export function Prose({ children }: { children: ReactNode }) {
    return <div className="grid max-w-[72ch] gap-3 text-[0.9375rem] leading-7 text-gray-950">{children}</div>
}

export function CellValue({ value, unverified }: { value: Cell; unverified?: boolean }) {
    const mark = unverified ? <span className="ml-1 text-gray-950">(unverified)</span> : null
    if (value === true)
        return (
            <span className="inline-flex items-center gap-1 text-gray-1000">
                <Check className="h-4 w-4" aria-hidden />
                <span>Yes</span>
                {mark}
            </span>
        )
    if (value === false)
        return (
            <span className="inline-flex items-center gap-1 text-gray-950">
                <Minus className="h-4 w-4" aria-hidden />
                <span>No</span>
                {mark}
            </span>
        )
    return (
        <span className="text-gray-1000">
            {value}
            {mark}
        </span>
    )
}

export function CodeSample({ title, code }: { title: string; code: string }) {
    return (
        <figure className="min-w-0 overflow-hidden rounded-xl border border-gray-400 bg-gray-100">
            <figcaption className="border-b border-gray-400 px-3 py-2 font-mono text-[0.8125rem] text-gray-950">{title}</figcaption>
            <pre className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-6 text-gray-1000">
                <code>{code}</code>
            </pre>
        </figure>
    )
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
    const external = href.startsWith('http')
    return (
        <Link
            href={href}
            className="font-medium text-gray-1000 underline decoration-gray-700 underline-offset-4 hover:decoration-gray-1000"
            {...(external ? { rel: 'noopener' } : {})}
        >
            {children}
        </Link>
    )
}
