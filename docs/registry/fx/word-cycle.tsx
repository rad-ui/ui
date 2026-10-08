'use client'

import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import { useOffscreen, useReducedMotion } from './use-reduced-motion'
import './word-cycle.css'

export type WordCycleProps = {
    /** Words to cycle through. Screen readers hear them once, as a list. */
    words: string[]
    /** Milliseconds each word stays. */
    interval?: number
    /** Stop cycling. Wire to a visible pause control if the cycle sits next to other content. */
    paused?: boolean
    /** One colour per word, cycling if there are fewer colours than words. Each must keep contrast with the background. */
    colors?: string[]
    /** Joiner for the screen-reader version, e.g. "fast, accessible or yours". */
    srJoiner?: (words: string[]) => string
    className?: string
}

const defaultJoiner = (words: string[]) =>
    words.length < 2 ? words.join('') : `${words.slice(0, -1).join(', ')} or ${words[words.length - 1]}`

const WordCycle = ({ words, interval = 2200, paused = false, colors, srJoiner = defaultJoiner, className }: WordCycleProps) => {
    const ref = React.useRef<HTMLSpanElement | null>(null)
    const reduced = useReducedMotion(ref)
    const offscreen = useOffscreen(ref)
    const [index, setIndex] = React.useState(0)
    const [hovered, setHovered] = React.useState(false)
    const stopped = paused || reduced || offscreen || hovered

    React.useEffect(() => {
        if (stopped || words.length < 2) return
        const timer = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
        return () => window.clearInterval(timer)
    }, [stopped, words.length, interval])

    return <span
        ref={ref}
        className={['rad-fx-word-cycle', className].filter(Boolean).join(' ')}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
    >
        <VisuallyHidden asChild><span>{srJoiner(words)}</span></VisuallyHidden>
        <span className="rad-fx-word-cycle-stage" aria-hidden="true">
            {/* Every word is stacked in the same cell, so the slot is as wide as the longest word. */}
            {words.map((word, i) => (
                <span
                    key={word + i}
                    className="rad-fx-word-cycle-word"
                    data-state={i === index ? 'active' : 'inactive'}
                    style={colors?.length ? { color: colors[i % colors.length] } : undefined}
                >
                    {word}
                </span>
            ))}
        </span>
    </span>
}

export default WordCycle
