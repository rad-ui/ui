'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

/**
 * Opts an element into scroll reveal once it enters the viewport.
 *
 * The hidden state lives behind `[data-landing-reveal]`, which is only
 * written from an effect. Until then — and forever, if JavaScript or
 * IntersectionObserver is unavailable — the content renders normally.
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
            data-landing-reveal=""
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={className}
            {...props}
        >
            {children}
        </Tag>
    )
}