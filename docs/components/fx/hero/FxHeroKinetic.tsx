'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import CountTo from '@/registry/fx/count-to'
import GlitchText from '@/registry/fx/glitch-text'
import ScrambleText from '@/registry/fx/scramble-text'
import WaveText from '@/registry/fx/wave-text'
import SplitFlap from '@/registry/fx/split-flap'
import InkUnderline from '@/registry/fx/ink-underline'
import Typewriter from '@/registry/fx/typewriter'
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

type Move = 'slam' | 'zoom' | 'whip-l' | 'whip-r' | 'drop' | 'rise' | 'spin' | 'shake' | 'pop' | 'mega'
type Ink = 'white' | 'yellow' | 'cyan' | 'lime' | 'orange' | 'violet'
type Size = 'xxl' | 'xl' | 'l' | 'm' | 's'
type Backdrop = 'yellow' | 'cyan' | 'lime' | 'orange' | 'violet' | 'white' | 'black'

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
    /** A full-height colour panel swipes across the stage as the beat lands. */
    swipe?: { from: 'left' | 'right' | 'bottom', color: string }
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
    // Effects only where they act out the word.
    { ms: 1000, move: 'shake', bg: 'orange', size: 'xl', words: <GlitchText text="BROKEN." interval={0.45} colors={['#3de8ff', '#ffe14d']} /> },
    // The problem
    { ms: 420, move: 'whip-r', size: 'm', words: 'Screen readers?' },
    { ms: 600, move: 'slam', bg: 'orange', size: 'xl', words: <ScrambleText text="LOST." trigger="mount" duration={340} characters="ABCDEFGHJKLMNPQRSTUVWXYZ?#%&" className="fx-kinetic-inherit-font" /> },
    { ms: 380, move: 'whip-l', size: 'm', words: 'Keyboards?' },
    { ms: 420, move: 'slam', bg: 'orange', size: 'xl', words: 'STUCK.' },
    { ms: 380, move: 'whip-r', size: 'm', words: 'Inner ears?' },
    { ms: 1000, move: 'zoom', bg: 'orange', size: 'xl', words: <WaveText text="SEASICK." amplitude={0.16} duration={0.8} stagger={0.06} /> },
    // The twist
    // A quiet beat after all the noise: small white type on black, even while
    // the site around it has flipped to light.
    { ms: 1200, move: 'zoom', bg: 'black', size: 's', site: 'flip', words: 'Plot twist.' },
    { ms: 340, move: 'zoom', size: 'l', words: 'What if' },
    { ms: 340, move: 'whip-l', size: 'l', words: 'motion' },
    { ms: 280, move: 'drop', size: 'l', words: 'had' },
    { ms: 1100, move: 'zoom', bg: 'cyan', size: 'm', words: <SplitFlap text="MANNERS?" trigger="mount" speed={30} flips={5} stagger={1} className="fx-kinetic-flap" /> },
    // The payoff
    { ms: 1200, move: 'zoom', ink: 'yellow', size: 'xl', words: <><CountTo to={90} duration={650} /> <span className="fx-kinetic-small">effects.</span></> },
    { ms: 380, move: 'whip-r', size: 'l', words: 'Every one' },
    { ms: 1050, move: 'slam', bg: 'lime', size: 'xl', words: <InkUnderline color="#000" thickness={5}>accessible.</InkUnderline> },
    // HANDLED escalates: each one bigger and more violent than the last.
    { ms: 400, move: 'whip-l', size: 'm', words: 'Reduced motion?' },
    { ms: 380, move: 'drop', bg: 'lime', size: 'l', words: 'HANDLED.' },
    { ms: 380, move: 'whip-r', size: 'm', words: 'Screen readers?' },
    { ms: 480, move: 'pop', bg: 'lime', size: 'xl', words: 'HANDLED.' },
    { ms: 360, move: 'whip-l', size: 'm', words: 'Keyboards?' },
    { ms: 900, move: 'mega', bg: 'lime', size: 'xxl', words: 'HANDLED.' },
    // Make / Copy / Ship / OWN: each one arrives behind a swipe, alternating
    // directions, building to a full-size OWN IT.
    { ms: 520, move: 'whip-l', ink: 'orange', size: 'xl', swipe: { from: 'left', color: '#ff9a3c' }, words: 'Make it.' },
    { ms: 520, move: 'whip-r', ink: 'cyan', size: 'xl', swipe: { from: 'right', color: '#3de8ff' }, words: 'Copy it.' },
    { ms: 520, move: 'whip-l', ink: 'lime', size: 'xl', swipe: { from: 'left', color: '#b8ff3c' }, words: 'Ship it.' },
    { ms: 1500, move: 'zoom', bg: 'yellow', size: 'xxl', swipe: { from: 'bottom', color: '#ffe14d' }, words: <Typewriter as="span" trigger="mount" text="OWN IT." speed={85} delay={260} /> }
]

// What screen readers get: the whole story once, in sentences.
const STORY = [
    'Stop. Most animations are broken.',
    'Screen readers: lost. Keyboards: stuck. Inner ears: seasick.',
    'Plot twist. What if motion had manners?',
    '90 effects. Every one accessible.',
    'Reduced motion, screen readers, keyboards: handled.',
    'Make it. Copy it. Ship it. Own it.',
    'Rad UI FX. Motion with manners.'
]

// First load only: a slow countdown before the ad. Replay skips straight to STOP.
const COUNTDOWN: Beat[] = ['3', '2', '1'].map((n) => ({ ms: 1000, move: 'zoom', bg: 'black', size: 's', words: n }))
const FIRST_RUN = [...COUNTDOWN, ...BEATS]
const sequenceFor = (run: number) => (run === 0 ? FIRST_RUN : BEATS)

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
        const sequence = sequenceFor(run)
        if (!playing || offscreen || index >= sequence.length) return
        let ms = Math.max(MIN_BEAT, sequence[index].ms)
        if (index === 0 && firstBeat.current) ms = Math.max(MIN_BEAT, ms - performance.now())
        const timer = window.setTimeout(() => {
            firstBeat.current = false
            setIndex(index + 1)
        }, ms)
        return () => window.clearTimeout(timer)
    }, [index, run, playing, offscreen])

    useEffect(() => { if (index >= sequenceFor(run).length) setPlaying(false) }, [index, run])

    // The plot twist flips the whole site to the opposite theme for that beat only;
    // the next beat, Replay and leaving the page all hand the user's own theme back.
    useEffect(() => {
        const flipped = sequenceFor(run)[index]?.site === 'flip'
        previewTheme(flipped ? (siteTheme() === 'dark' ? 'light' : 'dark') : null)
    }, [index, run])
    useEffect(() => () => previewTheme(null), [])

    const replay = () => {
        firstBeat.current = false
        setIndex(0)
        setRun((r) => r + 1)
        setPlaying(true)
    }

    const beat = sequenceFor(run)[index]

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
            ) : null}
            {beat?.swipe ? (
                <span key={`swipe-${index}-${run}`} className="fx-kinetic-swipe" data-from={beat.swipe.from} style={{ '--fx-kinetic-swipe': beat.swipe.color } as React.CSSProperties}>
                    <span className="fx-kinetic-swipe-streak" />
                    <span className="fx-kinetic-swipe-streak" />
                </span>
            ) : null}
            {beat ? null : (
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
