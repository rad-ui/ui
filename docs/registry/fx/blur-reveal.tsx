'use client'

import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import './blur-reveal.css'

type BlurRevealTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'

export type BlurRevealProps = {
    /** The text to reveal. Screen readers always get it whole, never piece by piece. */
    text: string
    /** Element to render. Keep the heading level your page outline needs. */
    as?: BlurRevealTag
    /** Animate word by word, or letter by letter (letters never break across lines). */
    by?: 'word' | 'letter'
    /** `inView` waits until the text scrolls into view; `mount` starts right away. */
    trigger?: 'inView' | 'mount'
    /** Delay between pieces, in ms. */
    stagger?: number
    /** Duration of each piece, in ms. */
    duration?: number
    /** Delay before the first piece, in ms. */
    delay?: number
    className?: string
    style?: React.CSSProperties
}

type Piece = { kind: 'space', value: string } | { kind: 'word', parts: string[] }

// Graphemes, not UTF-16 code units, so emoji and combining accents stay whole.
const splitGraphemes = (word: string): string[] => {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
        const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
        return Array.from(segmenter.segment(word), (s) => s.segment)
    }
    return Array.from(word)
}

const splitText = (text: string, by: 'word' | 'letter'): Piece[] =>
    text.split(/(\s+)/).filter(Boolean).map((chunk) =>
        /^\s+$/.test(chunk)
            ? { kind: 'space', value: chunk }
            : { kind: 'word', parts: by === 'letter' ? splitGraphemes(chunk) : [chunk] }
    )

const BlurReveal = React.forwardRef<HTMLElement, BlurRevealProps>(({
    text,
    as: Tag = 'p',
    by = 'word',
    trigger = 'inView',
    stagger = 60,
    duration = 700,
    delay = 0,
    className,
    style
}, forwardedRef) => {
    const localRef = React.useRef<HTMLElement | null>(null)
    const [revealed, setRevealed] = React.useState(trigger === 'mount')

    const setRef = React.useCallback((node: HTMLElement | null) => {
        localRef.current = node
        if (typeof forwardedRef === 'function') forwardedRef(node)
        else if (forwardedRef) forwardedRef.current = node
    }, [forwardedRef])

    React.useEffect(() => {
        if (trigger !== 'inView' || revealed) return
        const node = localRef.current
        if (!node || typeof IntersectionObserver === 'undefined') {
            setRevealed(true)
            return
        }
        const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                setRevealed(true)
                observer.disconnect()
            }
        }, { threshold: 0.2 })
        observer.observe(node)
        return () => observer.disconnect()
    }, [trigger, revealed])

    const pieces = React.useMemo(() => splitText(text, by), [text, by])

    let index = 0
    const visual = pieces.map((piece, pieceIndex) => {
        if (piece.kind === 'space') return piece.value
        return <span key={pieceIndex} className="rad-fx-blur-reveal-word">
            {piece.parts.map((part, partIndex) => (
                <span
                    key={partIndex}
                    className="rad-fx-blur-reveal-piece"
                    style={{ '--rad-fx-index': index++ } as React.CSSProperties}
                >
                    {part}
                </span>
            ))}
        </span>
    })

    return <Tag
        ref={setRef as React.Ref<never>}
        className={['rad-fx-blur-reveal', className].filter(Boolean).join(' ')}
        data-state={revealed ? 'visible' : 'hidden'}
        style={{
            '--rad-fx-stagger': `${stagger}ms`,
            '--rad-fx-duration': `${duration}ms`,
            '--rad-fx-delay': `${delay}ms`,
            ...style
        } as React.CSSProperties}
    >
        <VisuallyHidden asChild><span>{text}</span></VisuallyHidden>
        <span aria-hidden="true">{visual}</span>
    </Tag>
})

BlurReveal.displayName = 'BlurReveal'

export default BlurReveal
