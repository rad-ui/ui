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

type Piece = { dx: number, dy: number, rotate: number, color: string, delay: number, shape: 'square' | 'strip' }
type Burst = { id: number, x: number, y: number, pieces: Piece[] }

const DEFAULT_COLORS = ['#f472b6', '#38bdf8', '#facc15', '#a78bfa', '#34d399']

const ConfettiBurst = ({ children, pieces = 28, colors = DEFAULT_COLORS, className }: ConfettiBurstProps) => {
    const ref = React.useRef<HTMLSpanElement | null>(null)
    const reduced = useReducedMotion(ref)
    const [bursts, setBursts] = React.useState<Burst[]>([])
    const nextId = React.useRef(0)

    const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        if (reduced) return
        const rect = event.currentTarget.getBoundingClientRect()
        const fromKeyboard = event.detail === 0
        const x = fromKeyboard ? rect.width / 2 : event.clientX - rect.left
        const y = fromKeyboard ? rect.height / 2 : event.clientY - rect.top
        const id = nextId.current++
        const burst: Burst = {
            id, x, y,
            pieces: Array.from({ length: pieces }, (_, i) => {
                const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1
                const power = 70 + Math.random() * 90
                return {
                    dx: Math.cos(angle) * power,
                    dy: Math.sin(angle) * power,
                    rotate: Math.random() * 720 - 360,
                    color: colors[i % colors.length],
                    delay: Math.random() * 60,
                    shape: Math.random() > 0.5 ? 'square' : 'strip'
                }
            })
        }
        setBursts((current) => [...current, burst])
        window.setTimeout(() => setBursts((current) => current.filter((b) => b.id !== id)), 1300)
    }

    return <span ref={ref} className={['rad-fx-confetti', className].filter(Boolean).join(' ')} onClick={handleClick}>
        {children}
        {bursts.map((burst) => (
            <span key={burst.id} className="rad-fx-confetti-origin" aria-hidden="true" style={{ left: burst.x, top: burst.y }}>
                {burst.pieces.map((piece, i) => (
                    <span
                        key={i}
                        className="rad-fx-confetti-piece"
                        data-shape={piece.shape}
                        style={{
                            background: piece.color,
                            animationDelay: `${piece.delay}ms`,
                            '--rad-fx-confetti-dx': `${piece.dx}px`,
                            '--rad-fx-confetti-dy': `${piece.dy}px`,
                            '--rad-fx-confetti-rotate': `${piece.rotate}deg`
                        } as React.CSSProperties}
                    />
                ))}
            </span>
        ))}
    </span>
}

export default ConfettiBurst
