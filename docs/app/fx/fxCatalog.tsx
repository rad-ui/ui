import { BlurRevealHeadline, BlurRevealLetters } from './demos/blur-reveal'
import { AuroraBackdropHero, AuroraBackdropPausable } from './demos/aurora-backdrop'
import { TypewriterDemo } from './demos/typewriter'
import { ScrambleTextDemo, ScrambleTextHoverDemo } from './demos/scramble-text'
import { ShimmerTextDemo } from './demos/shimmer-text'
import { ColorShiftTextDemo } from './demos/color-shift-text'
import { WordCycleDemo } from './demos/word-cycle'
import { CountToDemo } from './demos/count-to'
import { GridBackdropDemo, DotFieldDemo, StarfieldDemo, MeteorShowerDemo, PausableStarfieldDemo } from './demos/backgrounds'
import { GlowCardDemo, PerspectiveCardDemo, MagneticDemo, ClickBurstDemo, RevealOnScrollDemo } from './demos/interactions'
import { OrbitBorderDemo, MarqueeDemo, SlidingTabsDemo } from './demos/components'

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
    }
}
