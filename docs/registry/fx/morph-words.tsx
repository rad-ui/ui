'use client'

import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import { useOffscreen, useReducedMotion } from './use-reduced-motion'
import './morph-words.css'

export type MorphWordsProps = {
    /** Words to morph between. Screen readers hear them once, as a list. */
    words: string[]
    /** Milliseconds each word stays. */
    interval?: number
    /** Stop morphing. Wire to a visible pause control if it sits next to reading content. */
    paused?: boolean
    srJoiner?: (words: string[]) => string
    className?: string
}

const MORPH_MS = 900
const defaultJoiner = (words: string[]) =>
    words.length < 2 ? words.join('') : `${words.slice(0, -1).join(', ')} or ${words[words.length - 1]}`

const MorphWords = ({ words, interval = 2600, paused = false, srJoiner = defaultJoiner, className }: MorphWordsProps) => {
    const ref = React.useRef<HTMLSpanElement | null>(null)
    const reduced = useReducedMotion(ref)
    const offscreen = useOffscreen(ref)
    const [index, setIndex] = React.useState(0)
    const [morphing, setMorphing] = React.useState(false)
    const [hovered, setHovered] = React.useState(false)
    const filterId = `rad-fx-morph-${React.useId().replace(/[^a-zA-Z0-9-]/g, '')}`
    const stopped = paused || reduced || offscreen || hovered

    React.useEffect(() => {
        if (stopped || words.length < 2) return
        let settle: number | undefined
        const timer = window.setInterval(() => {
            setMorphing(true)
            setIndex((i) => (i + 1) % words.length)
            // The gooey filter only runs during the morph, so resting text stays crisp.
            settle = window.setTimeout(() => setMorphing(false), MORPH_MS)
        }, interval)
        return () => { window.clearInterval(timer); window.clearTimeout(settle) }
    }, [stopped, words.length, interval])

    return <span
        ref={ref}
        className={['rad-fx-morph', className].filter(Boolean).join(' ')}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
    >
        <VisuallyHidden asChild><span>{srJoiner(words)}</span></VisuallyHidden>
        <span
            className="rad-fx-morph-stage"
            aria-hidden="true"
            data-morphing={morphing ? '' : undefined}
            style={{ '--rad-fx-morph-filter': `url(#${filterId})` } as React.CSSProperties}
        >
            {words.map((word, i) => (
                <span key={word + i} className="rad-fx-morph-word" data-state={i === index ? 'active' : 'inactive'}>{word}</span>
            ))}
        </span>
        <svg className="rad-fx-morph-defs" aria-hidden="true" focusable="false">
            <filter id={filterId}>
                <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
            </filter>
        </svg>
    </span>
}

export default MorphWords
