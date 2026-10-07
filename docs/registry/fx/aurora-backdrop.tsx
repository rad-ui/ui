'use client'

import * as React from 'react'

import './aurora-backdrop.css'

export type AuroraBackdropProps = React.ComponentPropsWithoutRef<'div'> & {
    /** Up to four CSS colors for the glow. */
    colors?: string[]
    /** Seconds for one full drift cycle. Higher is calmer. */
    speed?: number
    /** Blur radius of the glow, in px. */
    blur?: number
    /** Opacity of the glow layer, 0–1. */
    intensity?: number
    /** Stop the drift. Wire this to a visible pause control on pages where the backdrop runs for long. */
    paused?: boolean
}

const DEFAULT_COLORS = ['#22d3ee', '#a78bfa', '#34d399', '#f472b6']

const AuroraBackdrop = React.forwardRef<HTMLDivElement, AuroraBackdropProps>(({
    colors = DEFAULT_COLORS,
    speed = 10,
    blur = 64,
    intensity = 0.55,
    paused = false,
    className,
    style,
    children,
    ...props
}, forwardedRef) => {
    const localRef = React.useRef<HTMLDivElement | null>(null)
    const [offscreen, setOffscreen] = React.useState(false)

    const setRef = React.useCallback((node: HTMLDivElement | null) => {
        localRef.current = node
        if (typeof forwardedRef === 'function') forwardedRef(node)
        else if (forwardedRef) forwardedRef.current = node
    }, [forwardedRef])

    // Don't spend GPU time on a backdrop nobody can see.
    React.useEffect(() => {
        const node = localRef.current
        if (!node || typeof IntersectionObserver === 'undefined') return
        const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting))
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    const palette = colors.length ? colors : DEFAULT_COLORS
    const colorVars = Object.fromEntries(
        Array.from({ length: 4 }, (_, i) => [`--rad-fx-aurora-color-${i + 1}`, palette[i % palette.length]])
    )

    return <div
        ref={setRef}
        className={['rad-fx-aurora', className].filter(Boolean).join(' ')}
        data-state={paused || offscreen ? 'paused' : 'running'}
        style={{
            ...colorVars,
            '--rad-fx-aurora-speed': `${speed}s`,
            '--rad-fx-aurora-blur': `${blur}px`,
            '--rad-fx-aurora-intensity': intensity,
            ...style
        } as React.CSSProperties}
        {...props}
    >
        {/* Purely decorative: hidden from assistive tech and from pointer events. */}
        <div className="rad-fx-aurora-glow" aria-hidden="true">
            <span className="rad-fx-aurora-blob" />
            <span className="rad-fx-aurora-blob" />
            <span className="rad-fx-aurora-blob" />
            <span className="rad-fx-aurora-blob" />
        </div>
        <div className="rad-fx-aurora-content">{children}</div>
    </div>
})

AuroraBackdrop.displayName = 'AuroraBackdrop'

export default AuroraBackdrop
