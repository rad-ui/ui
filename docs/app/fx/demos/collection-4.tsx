'use client'
import { useEffect, useState } from 'react'
import Button from '@radui/ui/Button'
import WipeReveal from '@/registry/fx/wipe-reveal'
import LetterDrop from '@/registry/fx/letter-drop'
import StrikeSwap from '@/registry/fx/strike-swap'
import FillText from '@/registry/fx/fill-text'
import LavaLamp from '@/registry/fx/lava-lamp'
import Fireflies from '@/registry/fx/fireflies'
import CrtOverlay from '@/registry/fx/crt-overlay'
import HaloGlow from '@/registry/fx/halo-glow'
import Flashlight from '@/registry/fx/flashlight'
import ExpandStrip from '@/registry/fx/expand-strip'
import CompareSlider from '@/registry/fx/compare-slider'
import CopyButton from '@/registry/fx/copy-button'
import ExpandSearch from '@/registry/fx/expand-search'
import Stepper from '@/registry/fx/stepper'
import NotificationBell from '@/registry/fx/notification-bell'
import SmoothDetails from '@/registry/fx/smooth-details'
import ToastStack, { type Toast } from '@/registry/fx/toast-stack'
import SuccessCheck from '@/registry/fx/success-check'
import ProgressBar from '@/registry/fx/progress-bar'
import StrengthMeter from '@/registry/fx/strength-meter'

const fill = 'flex w-full self-stretch items-center justify-center px-8 py-24'
const title = 'text-center text-3xl font-semibold tracking-tight text-gray-1000'
const onDark = { color: '#f4f4f5' }

// Text
export const WipeRevealDemo = () => (
    <h2 className="flex flex-col items-center gap-2 px-6 text-center text-4xl font-semibold tracking-tight text-gray-1000">
        <WipeReveal>Motion with manners.</WipeReveal>
        <WipeReveal color="#38bdf8" delay={250}>Accessible by default.</WipeReveal>
    </h2>
)
export const LetterDropDemo = () => <LetterDrop as="h2" text="Drop it like it's hot" className={`px-6 ${title} text-4xl`} />
export const StrikeSwapDemo = () => (
    <p className="px-6 text-center text-3xl font-semibold tracking-tight text-gray-1000">
        Animation should be <StrikeSwap from="decoration" to="communication" color="var(--rad-ui-color-pink-950)" />
    </p>
)
export const FillTextDemo = () => (
    <div className="flex flex-col items-center gap-4 px-6">
        <FillText as="h2" color="var(--rad-ui-color-gray-1000)" className="text-6xl font-black tracking-tight">FILL ME UP</FillText>
        <FillText trigger="hover" color="var(--rad-ui-color-purple-950)" className="text-2xl font-bold">Hover to fill</FillText>
    </div>
)

// Backgrounds
export const LavaLampDemo = () => <LavaLamp className={fill} style={{ background: '#0c0414' }}><p className="text-center text-3xl font-semibold tracking-tight" style={onDark}>Groovy</p></LavaLamp>
export const FirefliesDemo = () => <Fireflies className={fill} style={{ background: '#03060a' }}><p className="text-center text-3xl font-semibold tracking-tight" style={onDark}>Summer night</p></Fireflies>
export const CrtOverlayDemo = () => (
    <CrtOverlay className={fill} style={{ background: 'radial-gradient(circle, #0f2a1a, #020403 75%)' }}>
        <p className="font-mono text-3xl font-bold tracking-widest" style={{ color: '#86efac' }}>READY_</p>
    </CrtOverlay>
)
export const HaloGlowDemo = () => (
    <div className="flex items-center justify-center p-16">
        <HaloGlow>
            <span className="inline-flex h-24 w-24 items-center justify-center rounded-3xl text-3xl font-black" style={{ background: '#0b0b0f', color: '#f4f4f5', border: '1px solid rgba(255,255,255,0.12)' }}>FX</span>
        </HaloGlow>
    </div>
)

// Interactions
export const FlashlightDemo = () => (
    <Flashlight className="grid w-full max-w-2xl grid-cols-3 gap-3 p-8">
        {['Search', 'Inbox', 'Calendar', 'Files', 'People', 'Settings'].map((item) => (
            <a key={item} href="#" className="rounded-xl border border-gray-400 bg-gray-100 p-5 text-center font-medium text-gray-1000">{item}</a>
        ))}
    </Flashlight>
)
export const ExpandStripDemo = () => (
    <div className="w-full max-w-3xl p-8">
        <ExpandStrip label="Destinations" items={[
            { title: 'Kyoto', description: 'Temples, tea and quiet lanes.', background: 'linear-gradient(160deg, #be185d, #4c0519)' },
            { title: 'Reykjavik', description: 'Northern lights and hot springs.', background: 'linear-gradient(160deg, #0e7490, #082f49)' },
            { title: 'Marrakesh', description: 'Souks, spice and rooftops.', background: 'linear-gradient(160deg, #c2410c, #431407)' },
            { title: 'Patagonia', description: 'Glaciers at the end of the world.', background: 'linear-gradient(160deg, #4d7c0f, #1a2e05)' }
        ]} />
    </div>
)
const Scene = ({ tone, label }: { tone: 'warm' | 'cool', label: string }) => (
    <div role="img" aria-label={label} className="flex h-64 items-end p-4 font-semibold" style={{
        background: tone === 'warm' ? 'linear-gradient(135deg, #f97316, #db2777 60%, #4c1d95)' : 'linear-gradient(135deg, #64748b, #334155 60%, #0f172a)',
        color: '#fff'
    }}>{tone === 'warm' ? 'After' : 'Before'}</div>
)
export const CompareSliderDemo = () => (
    <div className="w-full max-w-xl p-8">
        <CompareSlider label="Before and after colour grade" before={<Scene tone="cool" label="Photo before colour grading: flat grey tones" />} after={<Scene tone="warm" label="Photo after colour grading: warm sunset tones" />} />
    </div>
)
export const CopyButtonDemo = () => (
    <div className="flex items-center gap-3 rounded-xl border border-gray-400 bg-gray-100 py-2 pl-4 pr-2 font-mono text-sm text-gray-1000">
        npx shadcn@latest add https://www.rad-ui.com/r/copy-button.json
        <CopyButton value="npx shadcn@latest add https://www.rad-ui.com/r/copy-button.json" label="Copy install command" />
    </div>
)

// Components
export const ExpandSearchDemo = () => (
    <div className="p-10 text-gray-1000"><ExpandSearch label="Search docs" placeholder="Search components…" /></div>
)
export const StepperDemo = () => {
    const [current, setCurrent] = useState(1)
    const steps = ['Cart', 'Shipping', 'Payment', 'Review']
    return <div className="flex w-full max-w-xl flex-col items-center gap-6 p-8 text-gray-1000">
        <Stepper label="Checkout progress" steps={steps} current={current} className="w-full" />
        <div className="flex gap-2">
            <Button variant="soft" color="gray" onClick={() => setCurrent((c) => Math.max(0, c - 1))}>Back</Button>
            <Button onClick={() => setCurrent((c) => Math.min(steps.length, c + 1))}>Next</Button>
        </div>
    </div>
}
export const NotificationBellDemo = () => {
    const [count, setCount] = useState(2)
    return <div className="flex items-center gap-6 p-10 text-gray-1000">
        <NotificationBell count={count} />
        <Button variant="soft" color="gray" onClick={() => setCount((c) => c + 1)}>New notification</Button>
        <Button variant="ghost" color="gray" onClick={() => setCount(0)}>Mark all read</Button>
    </div>
}
export const SmoothDetailsDemo = () => (
    <div className="w-full max-w-lg p-8 text-gray-1000">
        <SmoothDetails title="Is it accessible?">Yes: it is a native details element, so keyboard, screen readers and find-in-page all work.</SmoothDetails>
        <SmoothDetails title="Does it need JavaScript?">No. The animation is pure CSS, and it still opens without it.</SmoothDetails>
        <SmoothDetails title="What about reduced motion?">It opens instantly, with no height animation.</SmoothDetails>
    </div>
)

// Feedback
const SAMPLE_TOASTS: Toast[] = [
    { id: 1, title: 'Deployment finished', description: 'rad-ui.com is live.' },
    { id: 2, title: 'New comment', description: 'Ada replied to your PR.' },
    { id: 3, title: 'Backup complete', description: '128 files saved.' }
]
export const ToastStackDemo = () => {
    const [toasts, setToasts] = useState<Toast[]>(SAMPLE_TOASTS)
    const [next, setNext] = useState(4)
    return <div className="flex flex-col items-center gap-24 p-10 pt-40">
        <ToastStack toasts={toasts} onDismiss={(id) => setToasts((all) => all.filter((t) => t.id !== id))} />
        <Button variant="soft" color="gray" onClick={() => { setToasts((all) => [...all, { id: next, title: `Notification ${next}`, description: 'Hover or tab to fan the stack out.' }]); setNext((n) => n + 1) }}>Add toast</Button>
    </div>
}
export const SuccessCheckDemo = () => {
    const [run, setRun] = useState(0)
    return <div className="flex flex-col items-center gap-4 p-10 text-gray-1000">
        <SuccessCheck key={run} label="Payment complete" />
        <p className="font-semibold">Payment complete</p>
        <Button size="small" variant="ghost" color="gray" onClick={() => setRun((r) => r + 1)}>Play again</Button>
    </div>
}
export const ProgressBarDemo = () => {
    const [value, setValue] = useState(20)
    useEffect(() => {
        const timer = window.setInterval(() => setValue((v) => (v >= 100 ? 10 : v + 9)), 800)
        return () => window.clearInterval(timer)
    }, [])
    return <div className="flex w-full max-w-md flex-col gap-8 p-8 text-gray-1000">
        <ProgressBar value={value} label="Installing dependencies" />
        <ProgressBar label="Waiting for server" color="#38bdf8" />
    </div>
}
const scorePassword = (password: string): 0 | 1 | 2 | 3 | 4 => {
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password) || password.length >= 14) score++
    return Math.min(4, score) as 0 | 1 | 2 | 3 | 4
}
export const StrengthMeterDemo = () => {
    const [password, setPassword] = useState('Motion2026')
    return <div className="flex w-full max-w-sm flex-col gap-3 p-8 text-gray-1000">
        <label htmlFor="fx-strength-demo" className="text-sm font-medium">Password</label>
        <input id="fx-strength-demo" type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-lg border border-gray-500 bg-gray-50 px-3 py-2 text-gray-1000" />
        <StrengthMeter score={scorePassword(password)} label="Password strength" />
    </div>
}
