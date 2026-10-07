'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import CountTo from '@/registry/fx/count-to'
import NeonText from '@/registry/fx/neon-text'
import { useOffscreen } from '@/registry/fx/use-reduced-motion'

import './fx-hero-kinetic.css'

// Hero v2: kinetic typography. The same story as v1, told in fast "beats" of one
// or two huge words, each with its own entrance (slam, zoom, whip, drop…).
// Emphasis beats cut the whole stage to a solid colour.
//
// This hero deliberately trades accessibility for punch (product decision): it
// autoplays for everyone, cuts fast and flips full-screen colours. Screen readers
// still get the story as text.
const MIN_BEAT = 200

type Move = 'slam' | 'zoom' | 'whip-l' | 'whip-r' | 'drop' | 'rise' | 'spin' | 'shake'
type Ink = 'white' | 'yellow' | 'cyan' | 'lime' | 'orange' | 'violet'
type Size = 'xl' | 'l' | 'm'
type Backdrop = 'yellow' | 'cyan' | 'lime' | 'orange' | 'violet' | 'white'

type Beat = {
    /** Milliseconds on screen. Never below MIN_BEAT. */
    ms: number
    move: Move
    ink?: Ink
    size?: Size
    /** Cut the whole stage to this colour for emphasis; words turn black. */
    bg?: Backdrop
    /** Flip the whole site to the opposite theme for just this beat. */
    site?: 'flip'
    words: React.ReactNode
}

// Every ink is ≥ 4.5:1 on black.
const CYAN = '#3de8ff'

const BEATS: Beat[] = [
    // Hook
    { ms: 650, move: 'slam', bg: 'yellow', size: 'xl', words: 'STOP.' },
    { ms: 300, move: 'whip-l', size: 'l', words: 'Most' },
    { ms: 360, move: 'zoom', size: 'l', words: 'animations' },
    { ms: 260, move: 'drop', size: 'l', words: 'are' },
    { ms: 900, move: 'shake', bg: 'orange', size: 'xl', words: 'BROKEN.' },
    // The problem
    { ms: 420, move: 'whip-r', size: 'm', words: 'Screen readers?' },
    { ms: 420, move: 'slam', bg: 'orange', size: 'xl', words: 'LOST.' },
    { ms: 380, move: 'whip-l', size: 'm', words: 'Keyboards?' },
    { ms: 420, move: 'slam', bg: 'orange', size: 'xl', words: 'STUCK.' },
    { ms: 380, move: 'whip-r', size: 'm', words: 'Inner ears?' },
    { ms: 700, move: 'spin', bg: 'orange', size: 'xl', words: 'SEASICK.' },
    // The twist
    { ms: 320, move: 'rise', ink: 'violet', size: 'l', words: 'Plot' },
    { ms: 560, move: 'slam', bg: 'violet', size: 'xl', site: 'flip', words: 'twist.' },
    { ms: 340, move: 'zoom', size: 'l', words: 'What if' },
    { ms: 340, move: 'whip-l', size: 'l', words: 'motion' },
    { ms: 280, move: 'drop', size: 'l', words: 'had' },
    { ms: 1000, move: 'slam', bg: 'cyan', size: 'xl', words: 'MANNERS?' },
    // The payoff
    { ms: 1200, move: 'zoom', ink: 'yellow', size: 'xl', words: <><CountTo to={90} duration={650} /> <span className="fx-kinetic-small">effects.</span></> },
    { ms: 380, move: 'whip-r', size: 'l', words: 'Every one' },
    { ms: 700, move: 'slam', bg: 'lime', size: 'xl', words: 'accessible.' },
    { ms: 400, move: 'whip-l', size: 'm', words: 'Reduced motion?' },
    { ms: 340, move: 'drop', bg: 'lime', size: 'l', words: 'HANDLED.' },
    { ms: 380, move: 'whip-r', size: 'm', words: 'Screen readers?' },
    { ms: 340, move: 'drop', bg: 'lime', size: 'l', words: 'HANDLED.' },
    { ms: 360, move: 'whip-l', size: 'm', words: 'Keyboards?' },
    { ms: 440, move: 'drop', bg: 'lime', size: 'l', words: 'HANDLED.' },
    { ms: 380, move: 'slam', ink: 'cyan', size: 'l', words: 'Copy it.' },
    { ms: 380, move: 'slam', ink: 'lime', size: 'l', words: 'Own it.' },
    { ms: 800, move: 'slam', bg: 'yellow', size: 'xl', words: 'Ship it.' }
]

// What screen readers get: the whole story once, in sentences.
const STORY = [
    'Stop. Most animations are broken.',
    'Screen readers: lost. Keyboards: stuck. Inner ears: seasick.',
    'Plot twist. What if motion had manners?',
    '90 effects. Every one accessible.',
    'Reduced motion, screen readers, keyboards: handled.',
    'Copy it. Own it. Ship it.',
    'Rad UI FX. Motion with manners.'
]

const END = BEATS.length

// Must match THEME_PREVIEW_EVENT in components/Main/Main.js.
const THEME_PREVIEW_EVENT = 'rad-docs:theme-preview'
const previewTheme = (mode: 'light' | 'dark' | null) => {
    window.dispatchEvent(new CustomEvent(THEME_PREVIEW_EVENT, { detail: mode }))
}
// The site's theme as the user chose it (the hero's own preview aside).
const siteTheme = (): 'light' | 'dark' =>
    document.cookie.split('; ').includes('darkMode=false') ? 'light' : 'dark'

const EndCard = () => <div className="fx-kinetic-end">
    <p className="fx-kinetic-end-title">Rad UI FX</p>
    <p className="fx-kinetic-end-line">Motion with <NeonText color={CYAN} flicker={false}>manners.</NeonText></p>
</div>

// Plays once on load and settles on the end card; pauses while offscreen.
const FxHeroKinetic = () => {
    const rootRef = useRef<HTMLElement | null>(null)
    const offscreen = useOffscreen(rootRef)
    const [index, setIndex] = useState(0)
    const [run, setRun] = useState(0)
    const [playing, setPlaying] = useState(true)
    // Beat 1 is painted by the server, so its clock starts at navigation.
    const firstBeat = useRef(true)

    useEffect(() => {
        if (!playing || offscreen || index >= END) return
        let ms = Math.max(MIN_BEAT, BEATS[index].ms)
        if (index === 0 && firstBeat.current) ms = Math.max(MIN_BEAT, ms - performance.now())
        const timer = window.setTimeout(() => {
            firstBeat.current = false
            setIndex(index + 1)
        }, ms)
        return () => window.clearTimeout(timer)
    }, [index, run, playing, offscreen])

    useEffect(() => { if (index >= END) setPlaying(false) }, [index])

    // The plot twist flips the whole site to the opposite theme for that beat only;
    // the next beat, Replay and leaving the page all hand the user's own theme back.
    useEffect(() => {
        const flipped = BEATS[index]?.site === 'flip'
        previewTheme(flipped ? (siteTheme() === 'dark' ? 'light' : 'dark') : null)
    }, [index])
    useEffect(() => () => previewTheme(null), [])

    const replay = () => {
        firstBeat.current = false
        setIndex(0)
        setRun((r) => r + 1)
        setPlaying(true)
    }

    const beat = BEATS[index]

    return <section
        ref={rootRef}
        className="fx-kinetic"
        aria-label="Rad UI FX: the ad"
        data-docs-toc-ignore=""
    >
        <VisuallyHidden asChild>
            <div>{STORY.map((line) => <p key={line}>{line}</p>)}</div>
        </VisuallyHidden>

        <div className="fx-kinetic-stage" aria-hidden="true" data-bg={beat?.bg}>
            {beat ? (
                <div
                    key={`${index}-${run}`}
                    className="fx-kinetic-beat"
                    data-move={beat.move}
                    data-ink={beat.ink ?? 'white'}
                    data-size={beat.size ?? 'l'}
                    style={{ '--fx-kinetic-ms': `${Math.max(MIN_BEAT, beat.ms)}ms` } as React.CSSProperties}
                >
                    <span className="fx-kinetic-words">{beat.words}</span>
                </div>
            ) : (
                <div key={`end-${run}`} className="fx-kinetic-beat" data-move="zoom" data-ink="white" data-size="xl">
                    <EndCard />
                </div>
            )}
        </div>

        <div className="fx-kinetic-bar">
            <div className="fx-kinetic-cta">
                <Link href="/fx/blur-reveal" className="fx-kinetic-link fx-kinetic-link-primary">Browse the effects</Link>
                <Link href="/fx/installation" className="fx-kinetic-link">Install one in a single command</Link>
            </div>
            <button type="button" className="fx-kinetic-button" onClick={replay}>Replay</button>
        </div>
    </section>
}

export default FxHeroKinetic
