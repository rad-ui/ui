import { BlurRevealHeadline, BlurRevealLetters } from './demos/blur-reveal'
import { AuroraBackdropHero, AuroraBackdropPausable } from './demos/aurora-backdrop'
import { TypewriterDemo } from './demos/typewriter'
import { ScrambleTextDemo, ScrambleTextHoverDemo } from './demos/scramble-text'
import { ShimmerTextDemo } from './demos/shimmer-text'
import { ColorShiftTextDemo } from './demos/color-shift-text'
import { WordCycleDemo } from './demos/word-cycle'
import { CountToDemo } from './demos/count-to'
import { WaveTextDemo, WaveTextHoverDemo, GlitchTextDemo, MarkerHighlightDemo, InkUnderlineDemo, InkUnderlineHoverDemo, SplitFlapDemo, MorphWordsDemo, SpotlightTextDemo, ExtrudedTextDemo, CircularTextDemo, NeonTextDemo } from './demos/text-effects'
import { GridBackdropDemo, DotFieldDemo, StarfieldDemo, MeteorShowerDemo, PausableStarfieldDemo } from './demos/backgrounds'
import { GlowCardDemo, PerspectiveCardDemo, MagneticDemo, ClickBurstDemo, RevealOnScrollDemo } from './demos/interactions'
import { OrbitBorderDemo, MarqueeDemo, SlidingTabsDemo } from './demos/components'
import { NoiseGrainDemo, WaveLinesDemo, LightBeamsDemo, BubbleFieldDemo, PulseRingsDemo, ShineDemo, PressRippleDemo, ConfettiBurstDemo, PointerParallaxDemo, FlipCardDemo, StaggerListDemo, DrawCheckboxDemo, OdometerDemo, DockDemo, ToggleSwitchDemo, CardStackDemo, ProgressRingDemo, SkeletonDemo, TypingIndicatorDemo, LoaderDemo } from './demos/collection-3'

// Docs-only data per FX: demos, a usage snippet and the props table. Titles,
// descriptions and accessibility contracts live in registry/registry.json.
type Prop = [name: string, type: string, defaultValue: string, description: string]

export type FxDemo = {
    title?: string
    Demo: React.ComponentType
    code?: string
    minHeight?: number
    replayable?: boolean
}

export type FxDocs = {
    demos: FxDemo[]
    usage: string
    props: Prop[]
}

const TAG_TYPE = "'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'"
const backdropProps = (extra: Prop[]): Prop[] => [
    ...extra,
    ['paused', 'boolean', 'false', 'Stop the animation. It also pauses itself offscreen.'],
    ['...props', "ComponentProps<'div'>", '—', 'Passed to the root div; children render above the effect.']
]

export const fxCatalog: Record<string, FxDocs> = {
    'blur-reveal': {
        demos: [
            { Demo: BlurRevealHeadline },
            { title: 'Letter by letter', Demo: BlurRevealLetters, minHeight: 200, code: '<BlurReveal by="letter" stagger={30} text="Motion, minus the vertigo." />' }
        ],
        usage: `import BlurReveal from "@/components/fx/blur-reveal"

<BlurReveal as="h1" text="Ship interfaces people remember" />`,
        props: [
            ['text', 'string', '—', 'Text to reveal. Read once, whole, by screen readers.'],
            ['as', "'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'", "'p'", 'Element to render, so headings keep their level.'],
            ['by', "'word' | 'letter'", "'word'", 'Animate per word or per letter. Letters never break across lines.'],
            ['trigger', "'inView' | 'mount'", "'inView'", 'Start when scrolled into view, or immediately.'],
            ['stagger', 'number', '60', 'Delay between pieces, in ms.'],
            ['duration', 'number', '700', 'Duration of each piece, in ms.'],
            ['delay', 'number', '0', 'Delay before the first piece, in ms.']
        ]
    },
    'typewriter': {
        demos: [{ Demo: TypewriterDemo }],
        usage: `import Typewriter from "@/components/fx/typewriter"

<Typewriter as="h2" text="Accessible motion, typed out." />`,
        props: [
            ['text', 'string', '—', 'Text to type. Screen readers get it whole, immediately.'],
            ['as', TAG_TYPE, "'p'", 'Element to render.'],
            ['speed', 'number', '45', 'Milliseconds per character.'],
            ['delay', 'number', '0', 'Milliseconds before typing starts.'],
            ['cursor', 'boolean', 'true', 'Show a caret.'],
            ['trigger', "'inView' | 'mount'", "'inView'", 'When typing starts.']
        ]
    },
    'scramble-text': {
        demos: [
            { Demo: ScrambleTextDemo },
            { title: 'On hover', Demo: ScrambleTextHoverDemo, minHeight: 160, replayable: false, code: '<ScrambleText trigger="hover" text="RAD-UI-FX-2026" />' }
        ],
        usage: `import ScrambleText from "@/components/fx/scramble-text"

<ScrambleText as="h2" text="ACCESS GRANTED" />`,
        props: [
            ['text', 'string', '—', 'Final text. Screen readers only ever get this.'],
            ['as', TAG_TYPE, "'span'", 'Element to render.'],
            ['duration', 'number', '1100', 'Milliseconds to settle.'],
            ['characters', 'string', 'A–Z, 0–9, symbols', 'Characters used while scrambling.'],
            ['trigger', "'inView' | 'hover' | 'mount'", "'inView'", 'When to scramble.']
        ]
    },
    'shimmer-text': {
        demos: [{ Demo: ShimmerTextDemo, replayable: false }],
        usage: `import ShimmerText from "@/components/fx/shimmer-text"

<ShimmerText>Thinking about your request…</ShimmerText>`,
        props: [
            ['children', 'ReactNode', '—', 'The text. Never split.'],
            ['as', TAG_TYPE, "'span'", 'Element to render.'],
            ['duration', 'number', '2.5', 'Seconds per sweep.'],
            ['highlight', 'string', "'rgba(255,255,255,0.85)'", 'Colour of the passing highlight.']
        ]
    },
    'color-shift-text': {
        demos: [{ Demo: ColorShiftTextDemo, replayable: false }],
        usage: `import ColorShiftText from "@/components/fx/color-shift-text"

<h2>Make it <ColorShiftText>unforgettable</ColorShiftText></h2>`,
        props: [
            ['children', 'ReactNode', '—', 'The text. Never split.'],
            ['as', TAG_TYPE, "'span'", 'Element to render.'],
            ['colors', 'string[]', 'cyan, violet, pink', 'Colours that flow through the text.'],
            ['duration', 'number', '6', 'Seconds per cycle.']
        ]
    },
    'word-cycle': {
        demos: [{ Demo: WordCycleDemo, replayable: false }],
        usage: `import WordCycle from "@/components/fx/word-cycle"

<h2>Interfaces that feel <WordCycle words={["fast", "accessible", "alive"]} /></h2>`,
        props: [
            ['words', 'string[]', '—', 'Words to cycle through.'],
            ['interval', 'number', '2200', 'Milliseconds each word stays.'],
            ['paused', 'boolean', 'false', 'Stop cycling.'],
            ['srJoiner', '(words: string[]) => string', '"a, b or c"', 'How the words are read to screen readers.']
        ]
    },
    'count-to': {
        demos: [{ Demo: CountToDemo }],
        usage: `import CountTo from "@/components/fx/count-to"

<CountTo to={12840} />
<CountTo to={49.5} format={{ style: "currency", currency: "USD", maximumFractionDigits: 1 }} />`,
        props: [
            ['to', 'number', '—', 'Final value.'],
            ['from', 'number', '0', 'Starting value.'],
            ['duration', 'number', '1600', 'Milliseconds to count.'],
            ['format', 'Intl.NumberFormatOptions', '—', 'Number formatting.'],
            ['locale', 'string', 'browser', 'Locale for formatting.']
        ]
    },
    'wave-text': {
        demos: [
            { Demo: WaveTextDemo, replayable: false },
            { title: 'On hover', Demo: WaveTextHoverDemo, minHeight: 180, replayable: false, code: '<WaveText trigger="hover" text="wiggle wiggle" amplitude={0.35} />' }
        ],
        usage: `import WaveText from "@/components/fx/wave-text"

<WaveText as="h2" text="Good vibrations" />`,
        props: [
            ['text', 'string', '—', 'The text. Read once by screen readers.'],
            ['as', TAG_TYPE, "'span'", 'Element to render.'],
            ['trigger', "'loop' | 'hover'", "'loop'", 'Ripple continuously, or only while hovered.'],
            ['amplitude', 'number', '0.22', 'Wave height in em.'],
            ['duration', 'number', '1.4', 'Seconds per ripple.'],
            ['stagger', 'number', '0.06', 'Seconds between letters.'],
            ['paused', 'boolean', 'false', 'Stop the wave.']
        ]
    },
    'glitch-text': {
        demos: [{ Demo: GlitchTextDemo, replayable: false }],
        usage: `import GlitchText from "@/components/fx/glitch-text"

<GlitchText as="h2" text="SYSTEM_OVERRIDE" />`,
        props: [
            ['text', 'string', '—', 'The text. Read once by screen readers.'],
            ['as', TAG_TYPE, "'span'", 'Element to render.'],
            ['interval', 'number', '3', 'Seconds between bursts.'],
            ['colors', '[string, string]', 'cyan, pink', 'Colours of the split channels.'],
            ['paused', 'boolean', 'false', 'Stop glitching.']
        ]
    },
    'marker-highlight': {
        demos: [{ Demo: MarkerHighlightDemo }],
        usage: `import MarkerHighlight from "@/components/fx/marker-highlight"

<p>Motion should <MarkerHighlight>never cost anyone access</MarkerHighlight>.</p>`,
        props: [
            ['children', 'ReactNode', '—', 'The highlighted text.'],
            ['as', "'mark' | 'span'", "'mark'", 'mark announces a highlight to assistive tech.'],
            ['color', 'string', 'yellow, 45%', 'Marker colour.'],
            ['duration', 'number', '900', 'Milliseconds for the stroke.'],
            ['delay', 'number', '0', 'Milliseconds before drawing.']
        ]
    },
    'ink-underline': {
        demos: [
            { Demo: InkUnderlineDemo },
            { title: 'On hover and focus', Demo: InkUnderlineHoverDemo, minHeight: 180, replayable: false, code: '<InkUnderline trigger="hover"><a href="/docs">documentation link</a></InkUnderline>' }
        ],
        usage: `import InkUnderline from "@/components/fx/ink-underline"

<h2>Design that feels <InkUnderline>handmade</InkUnderline></h2>`,
        props: [
            ['children', 'ReactNode', '—', 'The underlined content.'],
            ['color', 'string', "'#f472b6'", 'Ink colour.'],
            ['trigger', "'inView' | 'hover'", "'inView'", 'Draw once in view, or on hover and focus.'],
            ['thickness', 'number', '3', 'Stroke width.']
        ]
    },
    'split-flap': {
        demos: [{ Demo: SplitFlapDemo }],
        usage: `import SplitFlap from "@/components/fx/split-flap"

<SplitFlap text="Now boarding" />`,
        props: [
            ['text', 'string', '—', 'Final text, shown in uppercase.'],
            ['as', TAG_TYPE, "'div'", 'Element to render.'],
            ['speed', 'number', '55', 'Milliseconds per flip.'],
            ['flips', 'number', '8', 'Flips before the first tile settles.'],
            ['stagger', 'number', '2', 'Extra flips per tile, left to right.'],
            ['characters', 'string', 'A–Z, 0–9', 'Characters cycled while flipping.'],
            ['trigger', "'inView' | 'mount'", "'inView'", 'When flipping starts.']
        ]
    },
    'morph-words': {
        demos: [{ Demo: MorphWordsDemo, replayable: false }],
        usage: `import MorphWords from "@/components/fx/morph-words"

<h2>Make it <MorphWords words={["liquid", "smooth", "yours"]} /></h2>`,
        props: [
            ['words', 'string[]', '—', 'Words to morph between.'],
            ['interval', 'number', '2600', 'Milliseconds each word stays.'],
            ['paused', 'boolean', 'false', 'Stop morphing.'],
            ['srJoiner', '(words: string[]) => string', '"a, b or c"', 'How the words are read to screen readers.']
        ]
    },
    'spotlight-text': {
        demos: [{ Demo: SpotlightTextDemo, replayable: false }],
        usage: `import SpotlightText from "@/components/fx/spotlight-text"

<SpotlightText as="h2" text="Move your pointer over me" />`,
        props: [
            ['text', 'string', '—', 'The text.'],
            ['as', TAG_TYPE, "'span'", 'Element to render.'],
            ['colors', '[string, string]', 'cyan, purple', 'Colours of the light.'],
            ['radius', 'number', '110', 'Light radius in px.']
        ]
    },
    'extruded-text': {
        demos: [{ Demo: ExtrudedTextDemo, replayable: false }],
        usage: `import ExtrudedText from "@/components/fx/extruded-text"

<ExtrudedText as="h1" text="RAD FX" />`,
        props: [
            ['text', 'string', '—', 'The text.'],
            ['as', TAG_TYPE, "'span'", 'Element to render.'],
            ['depth', 'number', '10', 'Extrusion depth in px.'],
            ['sideColor', 'string', "'#6d28d9'", 'Colour of the sides.'],
            ['tilt', 'boolean', 'true', 'Tilt toward the pointer.'],
            ['maxTilt', 'number', '12', 'Maximum tilt in degrees.']
        ]
    },
    'circular-text': {
        demos: [{ Demo: CircularTextDemo, replayable: false }],
        usage: `import CircularText from "@/components/fx/circular-text"

<CircularText text="SCROLL TO EXPLORE • RAD UI FX • ">
    <ArrowDown aria-hidden="true" />
</CircularText>`,
        props: [
            ['text', 'string', '—', 'Text around the ring.'],
            ['size', 'number', '160', 'Diameter in px.'],
            ['duration', 'number', '16', 'Seconds per turn.'],
            ['direction', "'clockwise' | 'counterclockwise'", "'clockwise'", 'Spin direction.'],
            ['children', 'ReactNode', '—', 'Centre content.'],
            ['paused', 'boolean', 'false', 'Stop spinning.']
        ]
    },
    'neon-text': {
        demos: [{ Demo: NeonTextDemo, replayable: false }],
        usage: `import NeonText from "@/components/fx/neon-text"

<NeonText as="h2">Open late</NeonText>`,
        props: [
            ['children', 'ReactNode', '—', 'The text.'],
            ['as', TAG_TYPE, "'span'", 'Element to render.'],
            ['color', 'string', "'#e879f9'", 'Tube colour.'],
            ['flicker', 'boolean', 'true', 'Rare, gentle flicker.']
        ]
    },
    'aurora-backdrop': {
        demos: [
            { Demo: AuroraBackdropHero, replayable: false },
            { title: 'Pause control', Demo: AuroraBackdropPausable, minHeight: 200, replayable: false, code: `const [paused, setPaused] = useState(false)

<AuroraBackdrop paused={paused}>
    <button aria-pressed={paused} onClick={() => setPaused(p => !p)}>
        {paused ? "Play background" : "Pause background"}
    </button>
</AuroraBackdrop>` }
        ],
        usage: `import AuroraBackdrop from "@/components/fx/aurora-backdrop"

<AuroraBackdrop className="rounded-2xl px-8 py-24">
    <h1>Build something bright</h1>
</AuroraBackdrop>`,
        props: backdropProps([
            ['colors', 'string[]', 'indigo, purple, cyan, pink', 'Up to four colours for the glow.'],
            ['speed', 'number', '10', 'Seconds per drift cycle. Higher is calmer.'],
            ['blur', 'number', '64', 'Blur radius in px.'],
            ['intensity', 'number', '0.5', 'Opacity of the glow, 0–1.']
        ])
    },
    'grid-backdrop': {
        demos: [{ Demo: GridBackdropDemo, replayable: false }],
        usage: `import GridBackdrop from "@/components/fx/grid-backdrop"

<GridBackdrop className="px-8 py-28"><h2>Enter the grid</h2></GridBackdrop>`,
        props: backdropProps([
            ['color', 'string', 'violet, 45%', 'Line colour.'],
            ['glowColor', 'string', 'violet, 35%', 'Glow along the horizon.'],
            ['cellSize', 'number', '28', 'Cell size in px (before perspective).'],
            ['speed', 'number', '1.2', 'Seconds to travel one cell.']
        ])
    },
    'dot-field': {
        demos: [{ Demo: DotFieldDemo, replayable: false }],
        usage: `import DotField from "@/components/fx/dot-field"

<DotField className="px-8 py-28"><h2>Quietly alive</h2></DotField>`,
        props: backdropProps([
            ['color', 'string', 'slate', 'Colour of the dim dots.'],
            ['glowColor', 'string', "'#a78bfa'", 'Colour of the dots under the moving light.'],
            ['gap', 'number', '18', 'Spacing between dots in px.'],
            ['speed', 'number', '7', 'Seconds for the light to sweep across.']
        ])
    },
    'starfield': {
        demos: [
            { Demo: StarfieldDemo, replayable: false },
            { title: 'Pause control', Demo: PausableStarfieldDemo, minHeight: 200, replayable: false }
        ],
        usage: `import Starfield from "@/components/fx/starfield"

<Starfield className="px-8 py-28"><h2>Night shift</h2></Starfield>`,
        props: backdropProps([
            ['count', 'number', '90', 'Number of stars.'],
            ['color', 'string', "'#e2e8f0'", 'Star colour.'],
            ['seed', 'number', '7', 'Change for a different, stable sky.']
        ])
    },
    'meteor-shower': {
        demos: [{ Demo: MeteorShowerDemo, replayable: false }],
        usage: `import MeteorShower from "@/components/fx/meteor-shower"

<MeteorShower className="px-8 py-28"><h2>Make a wish</h2></MeteorShower>`,
        props: backdropProps([
            ['count', 'number', '12', 'Number of meteors.'],
            ['color', 'string', "'#cbd5e1'", 'Meteor colour.'],
            ['seed', 'number', '3', 'Change for a different, stable pattern.']
        ])
    },
    'glow-card': {
        demos: [{ Demo: GlowCardDemo, replayable: false }],
        usage: `import GlowCard from "@/components/fx/glow-card"

<GlowCard className="rounded-2xl border p-6">…</GlowCard>`,
        props: [
            ['glowColor', 'string', 'sky, 25%', 'Glow colour.'],
            ['radius', 'number', '320', 'Glow radius in px.'],
            ['...props', "ComponentProps<'div'>", '—', 'Passed to the card.']
        ]
    },
    'perspective-card': {
        demos: [{ Demo: PerspectiveCardDemo, replayable: false }],
        usage: `import PerspectiveCard from "@/components/fx/perspective-card"

<PerspectiveCard className="rounded-2xl border p-6">…</PerspectiveCard>`,
        props: [
            ['maxTilt', 'number', '8', 'Maximum tilt in degrees.'],
            ['glare', 'boolean', 'true', 'Show a soft glare.'],
            ['...props', "ComponentProps<'div'>", '—', 'Passed to the card.']
        ]
    },
    'magnetic': {
        demos: [{ Demo: MagneticDemo, replayable: false }],
        usage: `import Magnetic from "@/components/fx/magnetic"

<Magnetic><button>Get started</button></Magnetic>`,
        props: [
            ['children', 'ReactNode', '—', 'Usually a button or link. It keeps its own semantics.'],
            ['strength', 'number', '0.3', 'How far it follows the pointer, 0–1.']
        ]
    },
    'click-burst': {
        demos: [{ Demo: ClickBurstDemo, replayable: false }],
        usage: `import ClickBurst from "@/components/fx/click-burst"

<ClickBurst><button onClick={save}>Celebrate</button></ClickBurst>`,
        props: [
            ['children', 'ReactNode', '—', 'Usually a button; clicks still reach it.'],
            ['color', 'string', "'#fbbf24'", 'Spark colour.'],
            ['sparks', 'number', '8', 'Number of sparks.'],
            ['distance', 'number', '28', 'Spark travel in px.']
        ]
    },
    'reveal-on-scroll': {
        demos: [{ Demo: RevealOnScrollDemo }],
        usage: `import RevealOnScroll from "@/components/fx/reveal-on-scroll"

<RevealOnScroll from="below" delay={120}>…</RevealOnScroll>`,
        props: [
            ['from', "'below' | 'above' | 'left' | 'right' | 'none'", "'below'", 'Where the content comes from.'],
            ['distance', 'number', '24', 'Travel in px.'],
            ['duration', 'number', '700', 'Milliseconds.'],
            ['delay', 'number', '0', 'Milliseconds before starting.']
        ]
    },
    'orbit-border': {
        demos: [{ Demo: OrbitBorderDemo, replayable: false }],
        usage: `import OrbitBorder from "@/components/fx/orbit-border"

<OrbitBorder className="p-6">…</OrbitBorder>`,
        props: backdropProps([
            ['color', 'string', "'#38bdf8'", 'Colour of the travelling light.'],
            ['duration', 'number', '4', 'Seconds per lap.'],
            ['width', 'number', '1.5', 'Border width in px.'],
            ['radius', 'number', '14', 'Corner radius in px.']
        ])
    },
    'marquee': {
        demos: [{ Demo: MarqueeDemo, replayable: false }],
        usage: `import Marquee from "@/components/fx/marquee"

<Marquee label="Customers">
    {logos.map((logo) => <img key={logo.name} src={logo.src} alt={logo.name} />)}
</Marquee>`,
        props: [
            ['children', 'ReactNode', '—', 'The items.'],
            ['duration', 'number', '30', 'Seconds per loop.'],
            ['direction', "'left' | 'right'", "'left'", 'Scroll direction.'],
            ['pauseOnHover', 'boolean', 'true', 'Pause while hovered (focus always pauses).'],
            ['paused', 'boolean', 'false', 'Stop scrolling.'],
            ['gap', 'string', "'2.5rem'", 'Gap between items.'],
            ['label', 'string', '—', 'Accessible name; makes it a named region.']
        ]
    },
    'sliding-tabs': {
        demos: [{ Demo: SlidingTabsDemo, replayable: false }],
        usage: `import SlidingTabs from "@/components/fx/sliding-tabs"

<SlidingTabs tabs={[
    { value: "overview", label: "Overview", content: <Overview /> },
    { value: "activity", label: "Activity", content: <Activity /> }
]} />`,
        props: [
            ['tabs', '{ value, label, content }[]', '—', 'The tabs.'],
            ['defaultValue', 'string', 'first tab', 'Initially selected tab.'],
            ['value', 'string', '—', 'Controlled selected tab.'],
            ['onValueChange', '(value: string) => void', '—', 'Called when the selection changes.']
        ]
    },
    'noise-grain': {
        demos: [{ Demo: NoiseGrainDemo, replayable: false }],
        usage: `import NoiseGrain from "@/components/fx/noise-grain"

<NoiseGrain opacity={0.18} className="rounded-2xl bg-violet-950 p-16">…</NoiseGrain>`,
        props: backdropProps([
            ['opacity', 'number', '0.14', 'Grain opacity, 0–1.'],
            ['animated', 'boolean', 'true', 'Let the grain shimmer.']
        ])
    },
    'wave-lines': {
        demos: [{ Demo: WaveLinesDemo, replayable: false }],
        usage: `import WaveLines from "@/components/fx/wave-lines"

<WaveLines className="px-8 py-24"><h2>Ride the wave</h2></WaveLines>`,
        props: backdropProps([
            ['colors', 'string[]', 'indigo, purple, cyan', 'One colour per wave, back to front.'],
            ['speed', 'number', '14', 'Seconds for the front wave to drift one width.']
        ])
    },
    'light-beams': {
        demos: [{ Demo: LightBeamsDemo, replayable: false }],
        usage: `import LightBeams from "@/components/fx/light-beams"

<LightBeams className="px-8 py-24"><h2>Center stage</h2></LightBeams>`,
        props: backdropProps([
            ['count', 'number', '5', 'Number of beams.'],
            ['color', 'string', 'violet, 50%', 'Beam colour.'],
            ['speed', 'number', '8', 'Seconds per sway.']
        ])
    },
    'bubble-field': {
        demos: [{ Demo: BubbleFieldDemo, replayable: false }],
        usage: `import BubbleField from "@/components/fx/bubble-field"

<BubbleField className="px-8 py-24"><h2>Fizz</h2></BubbleField>`,
        props: backdropProps([
            ['count', 'number', '22', 'Number of bubbles.'],
            ['colors', 'string[]', 'sky, violet, pink', 'Bubble colours.'],
            ['seed', 'number', '11', 'Change for a different, stable layout.']
        ])
    },
    'pulse-rings': {
        demos: [{ Demo: PulseRingsDemo, replayable: false }],
        usage: `import PulseRings from "@/components/fx/pulse-rings"

<PulseRings><Avatar … /></PulseRings>`,
        props: [
            ['children', 'ReactNode', '—', 'Centre content.'],
            ['color', 'string', 'emerald, 60%', 'Ring colour.'],
            ['rings', 'number', '3', 'Rings in flight.'],
            ['duration', 'number', '2.8', 'Seconds per ring.'],
            ['size', 'number', '72', 'Starting diameter in px.'],
            ['paused', 'boolean', 'false', 'Stop pulsing.']
        ]
    },
    'shine': {
        demos: [{ Demo: ShineDemo, replayable: false }],
        usage: `import Shine from "@/components/fx/shine"

<Shine><button>Upgrade to Pro</button></Shine>`,
        props: [
            ['children', 'ReactNode', '—', 'Usually a button, link or card.'],
            ['radius', 'number | string', '8', 'Corner radius to match the child.'],
            ['color', 'string', 'white, 35%', 'Colour of the light band.']
        ]
    },
    'press-ripple': {
        demos: [{ Demo: PressRippleDemo, replayable: false }],
        usage: `import PressRipple from "@/components/fx/press-ripple"

<PressRipple><button>Press me</button></PressRipple>`,
        props: [
            ['children', 'ReactNode', '—', 'Usually a button.'],
            ['color', 'string', 'white, 35%', 'Ripple colour.'],
            ['radius', 'number | string', '8', 'Corner radius to clip to.']
        ]
    },
    'confetti-burst': {
        demos: [{ Demo: ConfettiBurstDemo, replayable: false }],
        usage: `import ConfettiBurst from "@/components/fx/confetti-burst"

<ConfettiBurst><button onClick={ship}>Ship it</button></ConfettiBurst>`,
        props: [
            ['children', 'ReactNode', '—', 'Usually a button.'],
            ['pieces', 'number', '28', 'Pieces per burst.'],
            ['colors', 'string[]', 'pink, sky, yellow, violet, green', 'Confetti colours.']
        ]
    },
    'pointer-parallax': {
        demos: [{ Demo: PointerParallaxDemo, replayable: false }],
        usage: `import PointerParallax from "@/components/fx/pointer-parallax"

<PointerParallax strength={28}>
    <PointerParallax.Layer depth={-0.4}>…</PointerParallax.Layer>
    <PointerParallax.Layer depth={0.8}>…</PointerParallax.Layer>
</PointerParallax>`,
        props: [
            ['strength', 'number', '24', 'Max shift in px for depth 1.'],
            ['Layer depth', 'number', '0.5', 'How far a layer moves; negative moves the other way.']
        ]
    },
    'flip-card': {
        demos: [{ Demo: FlipCardDemo, replayable: false }],
        usage: `import FlipCard from "@/components/fx/flip-card"

<FlipCard front={<Front />} back={<Back />} />`,
        props: [
            ['front', 'ReactNode', '—', 'Front face.'],
            ['back', 'ReactNode', '—', 'Back face.'],
            ['flipLabel', '{ toBack, toFront }', "'Show back' / 'Show front'", 'Flip button labels.'],
            ['flipped', 'boolean', '—', 'Controlled state.'],
            ['defaultFlipped', 'boolean', 'false', 'Initial state.'],
            ['onFlippedChange', '(flipped: boolean) => void', '—', 'Called on flip.']
        ]
    },
    'stagger-list': {
        demos: [{ Demo: StaggerListDemo }],
        usage: `import StaggerList from "@/components/fx/stagger-list"

<StaggerList>
    {items.map((item) => <li key={item.id}>{item.name}</li>)}
</StaggerList>`,
        props: [
            ['children', 'ReactNode', '—', 'List items, usually <li>.'],
            ['as', "'ul' | 'ol' | 'div'", "'ul'", 'List element.'],
            ['stagger', 'number', '70', 'Milliseconds between items.'],
            ['duration', 'number', '500', 'Milliseconds per item.']
        ]
    },
    'draw-checkbox': {
        demos: [{ Demo: DrawCheckboxDemo, replayable: false }],
        usage: `import DrawCheckbox from "@/components/fx/draw-checkbox"

<DrawCheckbox label="Respect reduced motion" name="motion" defaultChecked />`,
        props: [
            ['label', 'ReactNode', '—', 'Visible label.'],
            ['...props', "ComponentProps<'input'>", '—', 'Any checkbox input prop: checked, onChange, name, disabled…']
        ]
    },
    'odometer': {
        demos: [{ Demo: OdometerDemo, replayable: false }],
        usage: `import Odometer from "@/components/fx/odometer"

<Odometer value={followers} />`,
        props: [
            ['value', 'number', '—', 'The number.'],
            ['format', 'Intl.NumberFormatOptions', '—', 'Number formatting.'],
            ['locale', 'string', "'en-US'", 'Locale for formatting.'],
            ['live', 'boolean', 'false', 'Announce changes politely.']
        ]
    },
    'dock': {
        demos: [{ Demo: DockDemo, replayable: false }],
        usage: `import Dock from "@/components/fx/dock"

<Dock label="Apps" items={[
    { label: "Home", icon: <Home />, onSelect: goHome },
    { label: "Search", icon: <Search />, onSelect: openSearch }
]} />`,
        props: [
            ['items', '{ label, icon, onSelect? }[]', '—', 'Toolbar items.'],
            ['label', 'string', "'Dock'", 'Accessible name for the toolbar.'],
            ['magnification', 'number', '0.6', 'Extra scale under the pointer.']
        ]
    },
    'toggle-switch': {
        demos: [{ Demo: ToggleSwitchDemo, replayable: false }],
        usage: `import ToggleSwitch from "@/components/fx/toggle-switch"

<ToggleSwitch label="Haptic feedback" checked={on} onCheckedChange={setOn} />`,
        props: [
            ['label', 'ReactNode', '—', 'Visible label and accessible name.'],
            ['checked', 'boolean', '—', 'Controlled state.'],
            ['defaultChecked', 'boolean', 'false', 'Initial state.'],
            ['onCheckedChange', '(checked: boolean) => void', '—', 'Called on toggle.']
        ]
    },
    'card-stack': {
        demos: [{ Demo: CardStackDemo, replayable: false }],
        usage: `import CardStack from "@/components/fx/card-stack"

<CardStack label="Release notes" cards={notes.map((note) => <Note key={note.id} {...note} />)} />`,
        props: [
            ['cards', 'ReactNode[]', '—', 'Cards, front to back.'],
            ['label', 'string', '—', 'Accessible name for the stack.'],
            ['visibleBehind', 'number', '2', 'Cards peeking out behind the front.']
        ]
    },
    'progress-ring': {
        demos: [{ Demo: ProgressRingDemo, replayable: false }],
        usage: `import ProgressRing from "@/components/fx/progress-ring"

<ProgressRing value={progress} label="Uploading report.pdf" />
<ProgressRing label="Connecting" />  {/* indeterminate */}`,
        props: [
            ['value', 'number', '—', '0–100; omit for indeterminate.'],
            ['label', 'string', '—', 'Accessible name.'],
            ['size', 'number', '96', 'Diameter in px.'],
            ['thickness', 'number', '8', 'Ring thickness in px.'],
            ['showValue', 'boolean', 'true', 'Show the percentage.'],
            ['color', 'string', "'#a78bfa'", 'Ring colour.']
        ]
    },
    'skeleton': {
        demos: [{ Demo: SkeletonDemo, replayable: false }],
        usage: `import Skeleton from "@/components/fx/skeleton"

{loading ? <Skeleton label="Loading profile" avatar /> : <Profile />}`,
        props: [
            ['label', 'string', "'Loading'", 'Announced to screen readers.'],
            ['avatar', 'boolean', 'false', 'Show an avatar circle.'],
            ['lines', 'number', '3', 'Number of text lines.']
        ]
    },
    'typing-indicator': {
        demos: [{ Demo: TypingIndicatorDemo, replayable: false }],
        usage: `import TypingIndicator from "@/components/fx/typing-indicator"

<TypingIndicator label="Ada is typing" />`,
        props: [
            ['label', 'string', "'Typing'", 'Announced to screen readers.'],
            ['color', 'string', 'currentColor', 'Dot colour.']
        ]
    },
    'loader': {
        demos: [{ Demo: LoaderDemo, replayable: false }],
        usage: `import Loader from "@/components/fx/loader"

<Loader variant="bars" label="Loading audio" />`,
        props: [
            ['variant', "'dots' | 'bars' | 'orbit'", "'dots'", 'Style.'],
            ['label', 'string', "'Loading'", 'Announced to screen readers.'],
            ['size', 'number', '32', 'Size in px.'],
            ['color', 'string', 'currentColor', 'Colour.']
        ]
    }
}
