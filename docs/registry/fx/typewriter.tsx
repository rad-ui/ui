'use client'

import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import { useInViewOnce, useReducedMotion } from './use-reduced-motion'
import './typewriter.css'

type TypewriterTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

export type TypewriterProps = {
    /** The text to type. Screen readers get it whole, immediately. */
    text: string
    as?: TypewriterTag
    /** Milliseconds per character. */
    speed?: number
    /** Milliseconds before typing starts. */
    delay?: number
    /** Show a blinking caret. */
    cursor?: boolean
    /** `inView` starts when scrolled into view; `mount` starts right away. */
    trigger?: 'inView' | 'mount'
    className?: string
}

const Typewriter = ({ text, as: Tag = 'p', speed = 45, delay = 0, cursor = true, trigger = 'inView', className }: TypewriterProps) => {
    const ref = React.useRef<HTMLElement | null>(null)
    const reduced = useReducedMotion(ref)
    const [started, setStarted] = React.useState(trigger === 'mount')
    const [count, setCount] = React.useState(0)

    useInViewOnce(ref, () => setStarted(true), trigger === 'inView')

    React.useEffect(() => {
        if (!started || reduced) return
        let index = 0
        let timer = window.setTimeout(function tick() {
            index += 1
            setCount(index)
            if (index < text.length) timer = window.setTimeout(tick, speed)
        }, delay)
        return () => window.clearTimeout(timer)
    }, [started, reduced, text, speed, delay])

    const shown = reduced ? text : text.slice(0, count)
    const done = shown.length >= text.length

    return <Tag ref={ref as React.Ref<never>} className={['rad-fx-typewriter', className].filter(Boolean).join(' ')} data-state={done ? 'done' : 'typing'}>
        <VisuallyHidden asChild><span>{text}</span></VisuallyHidden>
        <span className="rad-fx-typewriter-stage" aria-hidden="true">
            {/* Invisible full text reserves the final size, so nothing reflows while typing. */}
            <span className="rad-fx-typewriter-ghost">{text}</span>
            <span className="rad-fx-typewriter-typed">
                {shown}
                {cursor ? <span className="rad-fx-typewriter-caret" /> : null}
            </span>
        </span>
    </Tag>
}

export default Typewriter
