'use client'

import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import { useInViewOnce, useReducedMotion } from './use-reduced-motion'
import './scramble-text.css'

type ScrambleTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

export type ScrambleTextProps = {
    /** Final text. Screen readers only ever get this. */
    text: string
    as?: ScrambleTag
    /** Total time to settle, in ms. */
    duration?: number
    /** Characters used while scrambling. */
    characters?: string
    /** `inView` runs once when visible, `hover` re-runs on pointer enter, `mount` runs right away. */
    trigger?: 'inView' | 'hover' | 'mount'
    className?: string
}

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=?'

const ScrambleText = ({ text, as: Tag = 'span', duration = 1100, characters = DEFAULT_CHARACTERS, trigger = 'inView', className }: ScrambleTextProps) => {
    const ref = React.useRef<HTMLElement | null>(null)
    const reduced = useReducedMotion(ref)
    // Server and first client render show the final text, so hydration always matches.
    const [display, setDisplay] = React.useState(text)
    const frame = React.useRef<number | null>(null)

    const run = React.useCallback(() => {
        if (reduced) return
        if (frame.current) cancelAnimationFrame(frame.current)
        const start = performance.now()
        const step = (now: number) => {
            const progress = Math.min(1, (now - start) / duration)
            const settled = Math.floor(progress * text.length)
            setDisplay(Array.from(text, (char, i) =>
                i < settled || /\s/.test(char) ? char : characters[Math.floor(Math.random() * characters.length)]
            ).join(''))
            if (progress < 1) frame.current = requestAnimationFrame(step)
        }
        frame.current = requestAnimationFrame(step)
    }, [reduced, duration, text, characters])

    useInViewOnce(ref, run, trigger === 'inView' && !reduced)
    React.useEffect(() => { if (trigger === 'mount') run() }, [trigger, run])
    React.useEffect(() => () => { if (frame.current) cancelAnimationFrame(frame.current) }, [])
    React.useEffect(() => { setDisplay(text) }, [text])

    return <Tag
        ref={ref as React.Ref<never>}
        className={['rad-fx-scramble', className].filter(Boolean).join(' ')}
        onPointerEnter={trigger === 'hover' ? run : undefined}
    >
        <VisuallyHidden asChild><span>{text}</span></VisuallyHidden>
        <span aria-hidden="true">{display}</span>
    </Tag>
}

export default ScrambleText
