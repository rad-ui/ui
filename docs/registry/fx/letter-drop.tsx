'use client'

import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import { useInViewOnce } from './use-reduced-motion'
import './letter-drop.css'

type DropTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'

export type LetterDropProps = {
    text: string
    as?: DropTag
    /** Milliseconds between letters. */
    stagger?: number
    className?: string
}

// Letters fall in from above and land with a little bounce.
const LetterDrop = ({ text, as: Tag = 'span', stagger = 45, className }: LetterDropProps) => {
    const ref = React.useRef<HTMLElement | null>(null)
    const [dropped, setDropped] = React.useState(false)
    useInViewOnce(ref, () => setDropped(true), !dropped, 0.4)

    return <Tag
        ref={ref as React.Ref<never>}
        className={['rad-fx-drop', className].filter(Boolean).join(' ')}
        data-state={dropped ? 'dropped' : 'waiting'}
        style={{ '--rad-fx-drop-stagger': `${stagger}ms` } as React.CSSProperties}
    >
        <VisuallyHidden asChild><span>{text}</span></VisuallyHidden>
        <span aria-hidden="true">
            {text.split(/(\s+)/).filter(Boolean).map((word, w, words) => {
                if (/^\s+$/.test(word)) return word
                const offset = words.slice(0, w).join('').replace(/\s/g, '').length
                return <span key={w} className="rad-fx-drop-word">
                    {Array.from(word).map((char, i) => (
                        <span key={i} className="rad-fx-drop-char" style={{ '--rad-fx-drop-i': offset + i } as React.CSSProperties}>{char}</span>
                    ))}
                </span>
            })}
        </span>
    </Tag>
}

export default LetterDrop
