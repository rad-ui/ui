'use client'

import * as React from 'react'

import { useReducedMotion } from './use-reduced-motion'
import './confetti-burst.css'

export type ConfettiBurstProps = {
    /** Usually a button. Clicks still reach it as normal. */
    children: React.ReactNode
    /** Pieces per burst. */
    pieces?: number
    colors?: string[]
    className?: string
}

type Piece = { dx: number, dy: number, rotate: number, color: string, delay: number, duration: number, shape: 'square' | 'strip' }
type Burst = { id: number, x: number, y: number, pieces: Piece[] }

const DEFAULT_COLORS = ['#f472b6', '#38bdf8', '#facc15', '#a78bfa', '#34d399']

// Pieces burst outward in every direction, slow to a stop as they spin down and
// fade, and each burst is removed once its last piece has finished animating.
const ConfettiBurst = ({ children, pieces = 28, colors = DEFAULT_COLORS, className }: ConfettiBurstProps) => {
    const ref = React.useRef<HTMLSpanElement | null>(null)
    const reduced = useReducedMotion(ref)
    const [bursts, setBursts] = React.useState<Burst[]>([])
    const nextId = React.useRef(0)
    const finished = React.useRef(new Map<number, number>())
    const fallbacks = React.useRef(new Map<number, number>())

    const remove = React.useCallback((id: number) => {
        finished.current.delete(id)
        window.clearTimeout(fallbacks.current.get(id))
        fallbacks.current.delete(id)
        setBursts((current) => current.filter((b) => b.id !== id))
    }, [])

    React.useEffect(() => () => fallbacks.current.forEach((timer) => window.clearTimeout(timer)), [])

    const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        if (reduced) return
        const rect = event.currentTarget.getBoundingClientRect()
        // Keyboard "clicks" have no pointer position (detail === 0): burst from the centre.
        const fromKeyboard = event.detail === 0
        const x = fromKeyboard ? rect.width / 2 : event.clientX - rect.left
        const y = fromKeyboard ? rect.height / 2 : event.clientY - rect.top
        const id = nextId.current++
        const burst: Burst = {
            id, x, y,
            pieces: Array.from({ length: pieces }, (_, i) => {
                // Evenly spread around the full circle, jittered so it never looks like a ring.
                const angle = (i / pieces) * Math.PI * 2 + (Math.random() - 0.5) * 0.6
                const distance = 60 + Math.random() * 110
                return {
                    dx: Math.cos(angle) * distance,
                    dy: Math.sin(angle) * distance,
                    rotate: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
                    color: colors[i % colors.length],
                    delay: Math.random() * 40,
                    duration: 900 + Math.random() * 500,
                    shape: Math.random() > 0.5 ? 'square' : 'strip'
                }
            })
        }
        setBursts((current) => [...current, burst])
        // Safety net in case animationend never fires (e.g. the tab is hidden).
        fallbacks.current.set(id, window.setTimeout(() => remove(id), 2500))
    }

    // Count finished pieces; once the last one is done, drop the whole burst.
    const handleAnimationEnd = (burst: Burst) => (event: React.AnimationEvent<HTMLSpanElement>) => {
        if (!event.animationName.includes('rad-fx-confetti-fade')) return
        const done = (finished.current.get(burst.id) ?? 0) + 1
        finished.current.set(burst.id, done)
        if (done >= burst.pieces.length) remove(burst.id)
    }

    return <span ref={ref} className={['rad-fx-confetti', className].filter(Boolean).join(' ')} onClick={handleClick}>
        {children}
        {bursts.map((burst) => (
            <span
                key={burst.id}
                className="rad-fx-confetti-origin"
                aria-hidden="true"
                style={{ left: burst.x, top: burst.y }}
                onAnimationEnd={handleAnimationEnd(burst)}
            >
                {burst.pieces.map((piece, i) => (
                    <span
                        key={i}
                        className="rad-fx-confetti-piece"
                        data-shape={piece.shape}
                        style={{
                            background: piece.color,
                            animationDelay: `${piece.delay}ms`,
                            animationDuration: `${piece.duration}ms`,
                            '--rad-fx-confetti-dx': `${piece.dx.toFixed(1)}px`,
                            '--rad-fx-confetti-dy': `${piece.dy.toFixed(1)}px`,
                            '--rad-fx-confetti-rotate': `${piece.rotate.toFixed(0)}deg`
                        } as React.CSSProperties}
                    />
                ))}
            </span>
        ))}
    </span>
}

export default ConfettiBurst
