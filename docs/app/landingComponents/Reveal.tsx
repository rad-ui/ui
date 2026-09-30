'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

/**
 * Opts an element into scroll reveal once it enters the viewport.
 *
 * The hidden state lives behind `[data-landing-reveal]`, which is only
 * written from an effect, after we have confirmed this browser can undo
 * it. Rendering the attribute server-side would leave the content stuck
 * at `opacity: 0` whenever JavaScript or IntersectionObserver is
 * unavailable, so we opt in only once the reveal is actually wired up.
 */
export default function Reveal({
    as: Tag = 'div',
    delay = 0,
    className = '',
    children,
    ...props
}: {
    as?: ElementType
    delay?: number
    className?: string
    children: ReactNode
    [key: string]: unknown
}) {
    const ref = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const node = ref.current
        if (!node) return

        if (typeof IntersectionObserver === 'undefined') return

        // Opt in to the hidden state only now, so a browser without
        // IntersectionObserver keeps the content visible.
        node.dataset.landingReveal = ''

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue
                    node.dataset.landingReveal = 'in'
                    observer.disconnect()
                }
            },
            { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return (
        <Tag
            ref={ref}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={className}
            {...props}
        >
            {children}
        </Tag>
    )
}