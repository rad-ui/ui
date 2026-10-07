'use client'
import { ArrowDown } from 'lucide-react'
import WaveText from '@/registry/fx/wave-text'
import GlitchText from '@/registry/fx/glitch-text'
import MarkerHighlight from '@/registry/fx/marker-highlight'
import InkUnderline from '@/registry/fx/ink-underline'
import SplitFlap from '@/registry/fx/split-flap'
import MorphWords from '@/registry/fx/morph-words'
import SpotlightText from '@/registry/fx/spotlight-text'
import ExtrudedText from '@/registry/fx/extruded-text'
import CircularText from '@/registry/fx/circular-text'
import NeonText from '@/registry/fx/neon-text'

const headline = 'px-6 text-center text-4xl font-semibold tracking-tight text-gray-1000'

export const WaveTextDemo = () => (
    <WaveText as="h2" text="Good vibrations" className={headline} />
)

export const WaveTextHoverDemo = () => (
    <p className="text-xl text-gray-950">Hover me: <WaveText trigger="hover" text="wiggle wiggle" amplitude={0.35} className="font-semibold text-gray-1000" /></p>
)

export const GlitchTextDemo = () => (
    <GlitchText as="h2" text="SYSTEM_OVERRIDE" interval={2.4} className="font-mono text-4xl font-bold tracking-widest text-gray-1000" />
)

export const MarkerHighlightDemo = () => (
    <p className="max-w-xl px-6 text-center text-2xl leading-relaxed text-gray-1000">
        Motion should <MarkerHighlight>never cost anyone access</MarkerHighlight> to the content, and
        {' '}<MarkerHighlight color="rgba(56, 189, 248, 0.35)" delay={400}>every effect here proves it</MarkerHighlight>.
    </p>
)

export const InkUnderlineDemo = () => (
    <p className="px-6 text-center text-3xl font-semibold tracking-tight text-gray-1000">
        Design that feels <InkUnderline>handmade</InkUnderline>
    </p>
)

export const InkUnderlineHoverDemo = () => (
    <p className="text-lg text-gray-950">
        Hover or tab to the <InkUnderline trigger="hover" color="#38bdf8"><a href="#" className="font-medium text-gray-1000">documentation link</a></InkUnderline>.
    </p>
)

export const SplitFlapDemo = () => (
    <div className="flex flex-col items-center gap-3 px-6">
        <SplitFlap text="Now boarding" className="text-4xl font-bold" />
        <SplitFlap text="Gate 42" className="text-2xl font-bold" speed={70} />
    </div>
)

export const MorphWordsDemo = () => (
    <h2 className={headline}>
        Make it <MorphWords words={['liquid', 'smooth', 'yours', 'alive']} className="text-purple-950" />
    </h2>
)

export const SpotlightTextDemo = () => (
    <SpotlightText as="h2" text="Move your pointer over me" className="px-6 text-center text-5xl font-bold tracking-tight text-gray-1000" />
)

export const ExtrudedTextDemo = () => (
    <ExtrudedText as="h2" text="RAD FX" className="text-7xl font-black tracking-tight text-gray-1000" />
)

export const CircularTextDemo = () => (
    <CircularText text="SCROLL TO EXPLORE • RAD UI FX • " size={180} className="text-gray-1000">
        <ArrowDown size={28} aria-hidden="true" />
    </CircularText>
)

export const NeonTextDemo = () => (
    <div className="flex w-full self-stretch items-center justify-center" style={{ background: '#050507' }}>
        <NeonText as="h2" className="text-6xl font-bold tracking-wide">Open late</NeonText>
    </div>
)
