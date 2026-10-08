'use client'
import { useEffect, useState } from 'react'
import Button from '@radui/ui/Button'
import { Home, Search, Music, Mail, Settings, Radio } from 'lucide-react'
import NoiseGrain from '@/registry/fx/noise-grain'
import WaveLines from '@/registry/fx/wave-lines'
import LightBeams from '@/registry/fx/light-beams'
import BubbleField from '@/registry/fx/bubble-field'
import PulseRings from '@/registry/fx/pulse-rings'
import Shine from '@/registry/fx/shine'
import PressRipple from '@/registry/fx/press-ripple'
import ConfettiBurst from '@/registry/fx/confetti-burst'
import PointerParallax from '@/registry/fx/pointer-parallax'
import FlipCard from '@/registry/fx/flip-card'
import StaggerList from '@/registry/fx/stagger-list'
import DrawCheckbox from '@/registry/fx/draw-checkbox'
import Odometer from '@/registry/fx/odometer'
import Dock from '@/registry/fx/dock'
import ToggleSwitch from '@/registry/fx/toggle-switch'
import CardStack from '@/registry/fx/card-stack'
import ProgressRing from '@/registry/fx/progress-ring'
import Skeleton from '@/registry/fx/skeleton'
import TypingIndicator from '@/registry/fx/typing-indicator'
import Loader from '@/registry/fx/loader'

const fill = 'flex w-full self-stretch items-center justify-center px-8 py-24'
const title = 'text-center text-3xl font-semibold tracking-tight text-gray-1000'
const card = 'rounded-2xl border border-gray-400 bg-gray-100 p-6 text-gray-1000'

// Backgrounds
export const NoiseGrainDemo = () => (
    <NoiseGrain opacity={0.22} className={fill} style={{ background: 'radial-gradient(circle at 30% 20%, #4c1d95, #0b0b12 70%)' }}>
        <p className="text-center text-3xl font-semibold tracking-tight" style={{ color: '#f5f3ff' }}>Analog warmth</p>
    </NoiseGrain>
)
export const WaveLinesDemo = () => <WaveLines className={fill}><p className={title}>Ride the wave</p></WaveLines>
export const LightBeamsDemo = () => <LightBeams className={fill}><p className={title}>Center stage</p></LightBeams>
export const BubbleFieldDemo = () => <BubbleField className={fill}><p className={title}>Fizz</p></BubbleField>
export const PulseRingsDemo = () => (
    <div className="flex flex-col items-center justify-center gap-6 p-10">
        <PulseRings>
            <span className="inline-flex h-[72px] w-[72px] items-center justify-center rounded-full" style={{ background: '#047857', color: '#ecfdf5' }}>
                <Radio size={28} aria-hidden="true" />
            </span>
        </PulseRings>
        <p className="text-sm font-medium text-gray-1000">Live now</p>
    </div>
)

// Interactions
export const ShineDemo = () => (
    <div className="flex gap-4 p-10">
        <Shine><Button size="large">Upgrade to Pro</Button></Shine>
        <Shine radius={999}><Button size="large" variant="soft" color="gray">Hover or tab</Button></Shine>
    </div>
)
export const PressRippleDemo = () => (
    <div className="flex gap-4 p-10">
        <PressRipple><Button size="large">Press me</Button></PressRipple>
        <PressRipple color="rgba(167, 139, 250, 0.45)"><Button size="large" variant="soft" color="gray">Or press Enter</Button></PressRipple>
    </div>
)
export const ConfettiBurstDemo = () => {
    const [done, setDone] = useState(false)
    return <div className="flex flex-col items-center gap-3 p-10 pt-16">
        <ConfettiBurst><Button size="large" onClick={() => setDone(true)}>Ship it</Button></ConfettiBurst>
        <p className="text-sm text-gray-950" role="status">{done ? 'Shipped!' : ' '}</p>
    </div>
}
export const PointerParallaxDemo = () => (
    <PointerParallax strength={28} className="relative flex h-72 w-full items-center justify-center overflow-hidden">
        <PointerParallax.Layer depth={-0.4} className="absolute h-56 w-56 rounded-full" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.55), transparent 70%)' }} />
        <PointerParallax.Layer depth={0.3} className="absolute left-[22%] top-[25%] h-16 w-16 rounded-2xl border border-gray-400 bg-gray-100" />
        <PointerParallax.Layer depth={0.8} className="absolute bottom-[20%] right-[24%] h-10 w-10 rounded-full" style={{ background: '#22d3ee' }} />
        <PointerParallax.Layer depth={0.15}><p className={title}>Depth on demand</p></PointerParallax.Layer>
    </PointerParallax>
)
export const FlipCardDemo = () => (
    <div className="w-80 p-8">
        <FlipCard
            front={<div className={`${card} h-48`}><p className="text-lg font-semibold">Front</p><p className="mt-2 text-sm text-gray-950">Use the button to turn the card.</p></div>}
            back={<div className={`${card} h-48`}><p className="text-lg font-semibold">Back</p><p className="mt-2 text-sm text-gray-950">Only this side is reachable now.</p></div>}
        />
    </div>
)
export const StaggerListDemo = () => (
    <StaggerList className="flex w-72 flex-col gap-2 p-8">
        {['Design tokens', 'Motion presets', 'Accessible defaults', 'Copy-paste source', 'Agent-ready registry'].map((label) => (
            <li key={label} className="list-none rounded-xl border border-gray-400 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-1000">{label}</li>
        ))}
    </StaggerList>
)

// Components
export const DrawCheckboxDemo = () => (
    <div className="flex flex-col gap-4 p-10 text-lg text-gray-1000">
        <DrawCheckbox label="Respect reduced motion" defaultChecked />
        <DrawCheckbox label="Keep focus visible" />
        <DrawCheckbox label="Never animate for its own sake" />
    </div>
)
export const OdometerDemo = () => {
    const [value, setValue] = useState(1284)
    return <div className="flex flex-col items-center gap-5 p-10">
        <Odometer value={value} className="text-6xl font-bold tracking-tight text-gray-1000" />
        <div className="flex gap-2">
            <Button variant="soft" color="gray" onClick={() => setValue((v) => Math.max(0, v - 137))}>−137</Button>
            <Button variant="soft" color="gray" onClick={() => setValue((v) => v + 249)}>+249</Button>
        </div>
    </div>
}
export const DockDemo = () => (
    <div className="flex items-end justify-center px-8 pb-10 pt-24">
        <Dock label="Apps" items={[
            { label: 'Home', icon: <Home size={22} /> },
            { label: 'Search', icon: <Search size={22} /> },
            { label: 'Music', icon: <Music size={22} /> },
            { label: 'Mail', icon: <Mail size={22} /> },
            { label: 'Settings', icon: <Settings size={22} /> }
        ]} />
    </div>
)
export const ToggleSwitchDemo = () => (
    <div className="flex flex-col gap-5 p-10 text-gray-1000">
        <ToggleSwitch label="Reduce motion everywhere" />
        <ToggleSwitch label="Haptic feedback" defaultChecked />
    </div>
)
export const CardStackDemo = () => (
    <div className="p-10 text-gray-1000">
        <CardStack label="Release notes" cards={['Accessible motion', 'Copy-paste source', 'Agent-ready registry', 'Reduced-motion states'].map((text, i) => (
            <div key={text} className="flex h-40 w-72 flex-col justify-between rounded-2xl border border-gray-400 bg-gray-100 p-6">
                <span className="font-mono text-xs text-gray-950">0{i + 1}</span>
                <span className="text-xl font-semibold">{text}</span>
            </div>
        ))} />
    </div>
)

// Feedback
export const ProgressRingDemo = () => {
    const [value, setValue] = useState(18)
    useEffect(() => {
        const timer = window.setInterval(() => setValue((v) => (v >= 100 ? 8 : v + 7)), 900)
        return () => window.clearInterval(timer)
    }, [])
    return <div className="flex items-center gap-10 p-10 text-gray-1000">
        <ProgressRing value={value} label="Uploading report.pdf" />
        <ProgressRing label="Connecting" size={56} thickness={7} color="#38bdf8" />
    </div>
}
export const SkeletonDemo = () => (
    <div className="w-80 rounded-2xl border border-gray-400 bg-gray-100 p-6">
        <Skeleton label="Loading profile" avatar lines={3} />
    </div>
)
export const TypingIndicatorDemo = () => (
    <div className="flex flex-col items-start gap-2 p-10 text-gray-1000">
        <span className="rounded-2xl bg-gray-200 px-4 py-2 text-sm">Did the release go out?</span>
        <TypingIndicator label="Ada is typing" />
    </div>
)
export const LoaderDemo = () => (
    <div className="flex items-center gap-12 p-10 text-gray-1000">
        <Loader variant="dots" label="Loading messages" size={44} />
        <Loader variant="bars" label="Loading audio" color="#a78bfa" size={44} />
        <Loader variant="orbit" label="Syncing" color="#38bdf8" size={44} />
    </div>
)
