'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import BlurReveal from '@/registry/fx/blur-reveal'
import GlitchText from '@/registry/fx/glitch-text'
import WaveText from '@/registry/fx/wave-text'
import SplitFlap from '@/registry/fx/split-flap'
import StrikeSwap from '@/registry/fx/strike-swap'
import CountTo from '@/registry/fx/count-to'
import MarkerHighlight from '@/registry/fx/marker-highlight'
import WipeReveal from '@/registry/fx/wipe-reveal'
import ColorShiftText from '@/registry/fx/color-shift-text'
import ExtrudedText from '@/registry/fx/extruded-text'
import NeonText from '@/registry/fx/neon-text'
import ConfettiBurst from '@/registry/fx/confetti-burst'
import { useOffscreen, useReducedMotion } from '@/registry/fx/use-reduced-motion'

import './fx-hero.css'

// The landing hero: a short story told in scenes, each built from FX components.
// The stage is aria-hidden; screen readers get the whole story once, as a list.
type Scene = {
    /** What screen readers get, and the static fallback. */
    text: string
    /** Milliseconds on screen, including the exit fade. */
    duration: number
    render: () => React.ReactNode
}

const EXIT_MS = 300

// Every colour here is ≥ 4.5:1 on black.
const CYAN = '#3de8ff'
const LIME = '#b8ff3c'
const YELLOW = '#ffe14d'
const ORANGE = '#ff9a3c'
const VIOLET = '#c79bff'

// A departure board, used twice: once for the problem, once for the payoff.
const Board = ({ rows, ink }: { rows: [string, string][], ink: string }) => (
    <div className="fx-hero-board" style={{ '--rad-fx-flap-ink': ink } as React.CSSProperties}>
        {rows.map(([label, status]) => (
            <div key={label} className="fx-hero-board-row">
                <span className="fx-hero-board-label">{label}</span>
                <SplitFlap trigger="mount" text={status} speed={34} flips={7} stagger={1} className="fx-hero-board-flap" />
            </div>
        ))}
    </div>
)

// The end card fires two confetti bursts by itself (ConfettiBurst bursts on click;
// keyboard-style clicks burst from the centre).
const EndCard = () => {
    const ref = useRef<HTMLSpanElement | null>(null)
    useEffect(() => {
        const fire = () => (ref.current?.firstElementChild as HTMLElement | null)?.click()
        const first = window.setTimeout(fire, 200)
        const second = window.setTimeout(fire, 650)
        return () => { window.clearTimeout(first); window.clearTimeout(second) }
    }, [])
    return <>
        <span ref={ref} className="fx-hero-endcard">
            <ConfettiBurst pieces={70} colors={[CYAN, LIME, YELLOW, ORANGE, VIOLET, '#ffffff']}>
                <span className="fx-hero-sticker fx-hero-impact">
                    <ExtrudedText text="RAD UI FX" depth={5} sideColor={ORANGE} tilt={false} className="fx-hero-mega fx-hero-endcard-face" />
                </span>
            </ConfettiBurst>
        </span>
        <p className="fx-hero-display">
            Motion with <NeonText color={CYAN} flicker={false} className="fx-hero-tilt-r">manners.</NeonText>
        </p>
    </>
}

const SCENES: Scene[] = [
    {
        text: 'Stop.',
        duration: 1600,
        render: () => <p className="fx-hero-giant fx-hero-ink-yellow fx-hero-impact">STOP.</p>
    },
    {
        text: 'Most animations are broken for anyone with a screen reader, a keyboard, or an inner ear.',
        duration: 3000,
        render: () => <>
            <p className="fx-hero-lead">Most animations are</p>
            <GlitchText text="BROKEN" interval={1} colors={[CYAN, YELLOW]} className="fx-hero-giant fx-hero-mono fx-hero-ink-orange fx-hero-tilt-l" />
            <p className="fx-hero-sub">for anyone with a screen reader, a keyboard, or an <WaveText text="inner ear." amplitude={0.4} duration={0.9} className="fx-hero-ink-lime" /></p>
        </>
    },
    {
        text: 'Screen readers: lost. Keyboards: stuck. Inner ears: seasick.',
        duration: 2900,
        render: () => <Board ink={ORANGE} rows={[['Screen readers', 'LOST'], ['Keyboards', 'STUCK'], ['Inner ears', 'SEASICK']]} />
    },
    {
        text: 'Plot twist: animations aren’t broken any more. They’re accessible.',
        duration: 2900,
        render: () => <>
            <BlurReveal as="p" trigger="mount" stagger={40} duration={400} text="Plot twist." className="fx-hero-lead fx-hero-ink-violet" />
            <p className="fx-hero-display">
                Animations are{' '}
                <StrikeSwap from="broken" to="accessible." color={LIME} />
            </p>
        </>
    },
    {
        text: 'Screen readers: happy. Keyboards: free. Inner ears: calm.',
        duration: 2900,
        render: () => <Board ink={LIME} rows={[['Screen readers', 'HAPPY'], ['Keyboards', 'FREE'], ['Inner ears', 'CALM']]} />
    },
    {
        text: '90 effects, each with an accessibility contract. In writing. Like adults.',
        duration: 3200,
        render: () => <>
            <p className="fx-hero-count fx-hero-impact">
                <ColorShiftText colors={[CYAN, LIME, YELLOW, ORANGE, CYAN]} duration={2}><CountTo to={90} duration={800} /></ColorShiftText>
                <span className="fx-hero-count-label">effects.</span>
            </p>
            <p className="fx-hero-sub fx-hero-sub-lg">
                Each with an accessibility contract.{' '}
                <MarkerHighlight as="span" color="rgba(255, 225, 77, 0.32)" duration={400} delay={700}>In writing. Like adults.</MarkerHighlight>
            </p>
        </>
    },
    {
        text: 'Copy it. Own it. Ship it.',
        duration: 2700,
        render: () => <div className="fx-hero-stack">
            <WipeReveal color={CYAN} duration={500} className="fx-hero-display fx-hero-tilt-l fx-hero-ink-cyan">Copy it.</WipeReveal>
            <WipeReveal color={LIME} duration={500} delay={300} className="fx-hero-display fx-hero-tilt-r fx-hero-ink-lime">Own it.</WipeReveal>
            <WipeReveal color={YELLOW} duration={550} delay={600} className="fx-hero-mega fx-hero-tilt-l fx-hero-ink-yellow">Ship it.</WipeReveal>
        </div>
    },
    {
        text: 'Rad UI FX. Motion with manners.',
        duration: 6000,
        render: () => <EndCard />
    }
]

const LAST = SCENES.length - 1

// Plays the story once and settles on the final scene, pausing while offscreen.
// It does not pause on hover or focus: clicking Replay leaves both on the hero,
// which used to freeze the replay on scene 1. Under reduced motion it never
// auto-plays: the final scene shows straight away, and Replay walks through the
// story on request.
const FxHeroStory = () => {
    const rootRef = useRef<HTMLDivElement | null>(null)
    const reduced = useReducedMotion(rootRef)
    const offscreen = useOffscreen(rootRef)
    const [index, setIndex] = useState(0)
    const [run, setRun] = useState(0)
    const [leaving, setLeaving] = useState(false)
    const [playing, setPlaying] = useState(true)

    useEffect(() => {
        if (!reduced) return
        setPlaying(false)
        setLeaving(false)
        setIndex(LAST)
    }, [reduced])

    const stopped = !playing || offscreen

    // Scene 1 is painted by the server long before hydration, so its clock starts
    // at navigation; otherwise a slow hydration silently stretches the first scene.
    const firstScene = useRef(true)

    useEffect(() => {
        if (stopped || index === LAST) return
        let duration = SCENES[index].duration
        if (index === 0 && firstScene.current) {
            duration = Math.max(EXIT_MS + 400, duration - performance.now())
        }
        const exit = window.setTimeout(() => setLeaving(true), duration - EXIT_MS)
        const next = window.setTimeout(() => {
            // Only cleared once the story actually moves on, so re-running this
            // effect (Strict Mode, a pause) never restarts scene 1's clock.
            firstScene.current = false
            setLeaving(false)
            setIndex(index + 1)
        }, duration)
        return () => { window.clearTimeout(exit); window.clearTimeout(next) }
    }, [index, run, stopped])

    // Reaching the final scene ends the story; it stays put.
    useEffect(() => { if (index === LAST) setPlaying(false) }, [index])

    const replay = () => {
        setLeaving(false)
        setIndex(0)
        setRun((r) => r + 1)
        setPlaying(true)
    }

    const scene = SCENES[index]

    return <section
        ref={rootRef}
        className="fx-hero"
        aria-label="Rad UI FX: the ad, in eight scenes"
        data-docs-toc-ignore=""
    >
        <VisuallyHidden asChild>
            <ol>{SCENES.map((s) => <li key={s.text}>{s.text}</li>)}</ol>
        </VisuallyHidden>

        {/* Plain black canvas: the type is the show. */}
        <div className="fx-hero-stage" aria-hidden="true">
            <div
                key={`${index}-${run}`}
                className="fx-hero-scene"
                data-state={leaving ? 'leaving' : 'entering'}
            >
                {scene.render()}
            </div>
        </div>

        <div className="fx-hero-bar">
            <div className="fx-hero-cta">
                <Link href="/fx/blur-reveal" className="fx-hero-link fx-hero-link-primary">Browse the effects</Link>
                <Link href="/fx/installation" className="fx-hero-link">Install one in a single command</Link>
            </div>
            <button type="button" className="fx-hero-button" onClick={replay}>Replay</button>
        </div>
    </section>
}

export default FxHeroStory
