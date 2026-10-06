'use client'

import { useContext, useEffect, useState, type CSSProperties } from 'react'
import { Moon, Plus, Sun } from 'lucide-react'

import Avatar from '@radui/ui/Avatar'
import Badge from '@radui/ui/Badge'
import Button from '@radui/ui/Button'
import Checkbox from '@radui/ui/Checkbox'
import Dialog from '@radui/ui/Dialog'
import RadioGroup from '@radui/ui/RadioGroup'
import Select from '@radui/ui/Select'
import Slider from '@radui/ui/Slider'
import Switch from '@radui/ui/Switch'
import Tabs from '@radui/ui/Tabs'
import Theme from '@radui/ui/Theme'
import ToggleGroup from '@radui/ui/ToggleGroup'

import { NavBarContext } from '@/components/Main/NavBar/NavBarContext'

import Unthemed from './Unthemed'

const ACCENTS = ['blue', 'violet', 'crimson', 'orange', 'jade', 'gray'] as const
type Accent = (typeof ACCENTS)[number]

/** Radius presets expressed as the Clarity radius tokens they override. */
const RADII = {
    none: { label: 'None', sm: '0px', md: '0px', lg: '0px', xl: '0px' },
    small: { label: 'Small', sm: '0.125rem', md: '0.25rem', lg: '0.375rem', xl: '0.5rem' },
    medium: { label: 'Medium', sm: '0.375rem', md: '0.5rem', lg: '0.75rem', xl: '1rem' },
    large: { label: 'Large', sm: '0.625rem', md: '0.875rem', lg: '1.125rem', xl: '1.5rem' }
} as const
type Radius = keyof typeof RADII

const MEMBERS = [
    { name: 'Ada Lovelace', initials: 'AL', role: 'Owner' },
    { name: 'Grace Hopper', initials: 'GH', role: 'Admin' },
    { name: 'Alan Turing', initials: 'AT', role: 'Member' }
]

const NOTIFICATIONS = [
    { id: 'mentions', label: 'Mentions', hint: 'When someone tags you', on: true },
    { id: 'releases', label: 'Release notes', hint: 'New versions and changelogs', on: true },
    { id: 'digest', label: 'Weekly digest', hint: 'One summary every Monday', on: false }
]

/** ToggleGroup reports arrays in some modes and strings in others. */
function firstValue(value: unknown): string | undefined {
    if (Array.isArray(value)) return value[0]
    return typeof value === 'string' && value ? value : undefined
}

function ControlLabel({ children }: { children: string }) {
    return <span className="text-[0.8125rem] font-medium text-gray-950">{children}</span>
}


const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000]
const RAMPS = ['gray', 'blue', 'violet', 'crimson', 'orange', 'jade', 'red', 'green', 'amber']
const LIGHT_TOKENS = [
    ...RAMPS.flatMap((ramp) => STEPS.map((step) => `--rad-ui-color-${ramp}-${step}`)),
    ...['xs', 'sm', 'md', 'lg', 'xl'].map((size) => `--rad-ui-shadow-${size}`)
]

/**
 * Clarity declares its light ramps on :root and only overrides them under
 * [data-rad-ui-theme="dark"], so a light Theme nested in a dark page would
 * inherit dark values. When that happens, re-declare the root (light) values
 * on the stage so the nested appearance is honest.
 */
function useLightTokens(enabled: boolean) {
    const [vars, setVars] = useState<Record<string, string>>({})
    useEffect(() => {
        if (!enabled) {
            setVars({})
            return
        }
        const root = getComputedStyle(document.documentElement)
        const next: Record<string, string> = {}
        for (const name of LIGHT_TOKENS) {
            const value = root.getPropertyValue(name).trim()
            if (value) next[name] = value
        }
        setVars(next)
    }, [enabled])
    return vars
}

export default function ThemePlayground() {
    const { darkMode } = useContext(NavBarContext)
    const [accent, setAccent] = useState<Accent>('blue')
    const [radius, setRadius] = useState<Radius>('medium')
    const [appearance, setAppearance] = useState<'light' | 'dark'>(darkMode ? 'dark' : 'light')
    const [timeout, setTimeoutValue] = useState(30)

    // Follow the site toggle until the visitor picks an appearance here.
    const [pinned, setPinned] = useState(false)
    useEffect(() => {
        if (!pinned) setAppearance(darkMode ? 'dark' : 'light')
    }, [darkMode, pinned])

    const r = RADII[radius]
    const lightTokens = useLightTokens(appearance === 'light' && Boolean(darkMode))
    const tokens = {
        ...lightTokens,
        '--rad-ui-radius-sm': r.sm,
        '--rad-ui-radius-md': r.md,
        '--rad-ui-radius-lg': r.lg,
        '--rad-ui-radius-xl': r.xl
    } as CSSProperties

    return (
        <div className="rounded-2xl border border-gray-400 bg-gray-100 shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--rad-ui-color-gray-1000)_45%,transparent)]">
            {/* Controls drive a nested <Theme>. Everything below them is a real component. */}
            <Unthemed>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3.5 sm:px-5">
                    <div className="flex items-center gap-2.5">
                        <ControlLabel>Accent</ControlLabel>
                        <ToggleGroup.Root
                            type="single"
                            value={[accent]}
                            onValueChange={(value: unknown) => {
                                const next = firstValue(value)
                                if (next) setAccent(next as Accent)
                            }}
                            aria-label="Accent color"
                            className="landing-swatches flex items-center gap-1"
                        >
                            {ACCENTS.map((name) => (
                                <ToggleGroup.Item
                                    key={name}
                                    value={name}
                                    aria-label={name}
                                    className="grid h-6 w-6 place-items-center rounded-full outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-gray-1000 data-[state=on]:ring-2 data-[state=on]:ring-gray-1000 data-[state=on]:ring-offset-2 data-[state=on]:ring-offset-gray-100"
                                >
                                    <span
                                        aria-hidden
                                        className="h-[18px] w-[18px] rounded-full"
                                        style={{ background: `var(--rad-ui-color-${name}-900)` }}
                                    />
                                </ToggleGroup.Item>
                            ))}
                        </ToggleGroup.Root>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <ControlLabel>Radius</ControlLabel>
                        <ToggleGroup.Root
                            type="single"
                            value={[radius]}
                            onValueChange={(value: unknown) => {
                                const next = firstValue(value)
                                if (next) setRadius(next as Radius)
                            }}
                            aria-label="Corner radius"
                            className="flex items-center rounded-lg bg-gray-200 p-0.5"
                        >
                            {(Object.keys(RADII) as Radius[]).map((key) => (
                                <ToggleGroup.Item
                                    key={key}
                                    value={key}
                                    className="rounded-md px-2.5 py-1 text-[0.8125rem] text-gray-950 outline-none transition-colors hover:text-gray-1000 focus-visible:ring-2 focus-visible:ring-gray-1000 data-[state=on]:bg-gray-50 data-[state=on]:text-gray-1000 data-[state=on]:shadow-sm data-[state=on]:ring-1 data-[state=on]:ring-gray-500"
                                >
                                    {RADII[key].label}
                                </ToggleGroup.Item>
                            ))}
                        </ToggleGroup.Root>
                    </div>

                    <div className="flex items-center gap-2.5 sm:ml-auto">
                        <ToggleGroup.Root
                            type="single"
                            value={[appearance]}
                            onValueChange={(value: unknown) => {
                                const next = firstValue(value)
                                if (next === 'light' || next === 'dark') {
                                    setPinned(true)
                                    setAppearance(next)
                                }
                            }}
                            aria-label="Appearance"
                            className="flex items-center rounded-lg bg-gray-200 p-0.5"
                        >
                            <ToggleGroup.Item
                                value="light"
                                aria-label="Light"
                                className="grid h-7 w-8 place-items-center rounded-md text-gray-950 outline-none hover:text-gray-1000 focus-visible:ring-2 focus-visible:ring-gray-1000 data-[state=on]:bg-gray-50 data-[state=on]:text-gray-1000 data-[state=on]:shadow-sm data-[state=on]:ring-1 data-[state=on]:ring-gray-500"
                            >
                                <Sun className="h-4 w-4" aria-hidden />
                            </ToggleGroup.Item>
                            <ToggleGroup.Item
                                value="dark"
                                aria-label="Dark"
                                className="grid h-7 w-8 place-items-center rounded-md text-gray-950 outline-none hover:text-gray-1000 focus-visible:ring-2 focus-visible:ring-gray-1000 data-[state=on]:bg-gray-50 data-[state=on]:text-gray-1000 data-[state=on]:shadow-sm data-[state=on]:ring-1 data-[state=on]:ring-gray-500"
                            >
                                <Moon className="h-4 w-4" aria-hidden />
                            </ToggleGroup.Item>
                        </ToggleGroup.Root>
                    </div>
                </div>
            </Unthemed>

            <Theme
                id="landing-theme-playground"
                appearance={appearance}
                accentColor={accent}
                classNamespace="rad-ui"
                style={tokens}
                className="rounded-b-2xl bg-gray-50 text-gray-1000 transition-colors duration-300"
            >
                <div className="p-5 sm:p-7">
                    <div className="flex items-center gap-3">
                        <Avatar.Root color={accent}>
                            <Avatar.Fallback>AC</Avatar.Fallback>
                        </Avatar.Root>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[0.9375rem] font-semibold">Acme workspace</p>
                            <p className="truncate text-[0.8125rem] text-gray-950">acme.dev · 12 members</p>
                        </div>
                        <Badge variant="soft" color={accent}>
                            Pro
                        </Badge>
                    </div>

                    <Tabs.Root defaultValue="general" className="mt-5">
                        <Tabs.List aria-label="Workspace settings">
                            <Tabs.Trigger value="general">General</Tabs.Trigger>
                            <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
                            <Tabs.Trigger value="members">Members</Tabs.Trigger>
                        </Tabs.List>

                        <Tabs.Content value="general">
                            <div className="grid min-h-[236px] gap-5 pt-5">
                                <div className="grid gap-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center">
                                    <span id="landing-pg-role" className="text-sm font-medium">
                                        Default role
                                    </span>
                                    <Select.Root defaultValue="member">
                                        <Select.Trigger aria-labelledby="landing-pg-role">Choose a role</Select.Trigger>
                                        <Select.Content>
                                            <Select.Group>
                                                <Select.Item value="viewer">
                                                    <Select.Indicator />
                                                    Viewer
                                                </Select.Item>
                                                <Select.Item value="member">
                                                    <Select.Indicator />
                                                    Member
                                                </Select.Item>
                                                <Select.Item value="admin">
                                                    <Select.Indicator />
                                                    Admin
                                                </Select.Item>
                                            </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                </div>

                                <div className="grid gap-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center">
                                    <span id="landing-pg-density" className="text-sm font-medium">
                                        Density
                                    </span>
                                    <RadioGroup.Root
                                        defaultValue="comfortable"
                                        aria-labelledby="landing-pg-density"
                                        className="flex flex-wrap gap-x-5 gap-y-2"
                                    >
                                        {['Compact', 'Comfortable'].map((label) => (
                                            <RadioGroup.Label key={label}>
                                                <RadioGroup.Item value={label.toLowerCase()}>
                                                    <RadioGroup.Indicator />
                                                </RadioGroup.Item>
                                                {label}
                                            </RadioGroup.Label>
                                        ))}
                                    </RadioGroup.Root>
                                </div>

                                <div className="grid gap-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center">
                                    <span id="landing-pg-timeout" className="text-sm font-medium">
                                        Session timeout
                                    </span>
                                    <div className="flex items-center gap-4">
                                        <Slider
                                            aria-labelledby="landing-pg-timeout"
                                            value={timeout}
                                            min={5}
                                            max={120}
                                            step={5}
                                            onValueChange={(value) =>
                                                setTimeoutValue(Array.isArray(value) ? value[0] : value)
                                            }
                                            className="flex-1"
                                        />
                                        <span className="w-14 shrink-0 text-right font-mono text-[0.8125rem] tabular-nums text-gray-950">
                                            {timeout} min
                                        </span>
                                    </div>
                                </div>

                                <label className="flex items-center gap-2.5 text-sm">
                                    <Checkbox.Root defaultChecked>
                                        <Checkbox.Indicator />
                                    </Checkbox.Root>
                                    Require two-factor authentication
                                </label>
                            </div>
                        </Tabs.Content>

                        <Tabs.Content value="notifications">
                            <ul className="min-h-[236px] divide-y divide-gray-300 pt-2">
                                {NOTIFICATIONS.map((item) => (
                                    <li key={item.id} className="flex items-center justify-between gap-4 py-3.5">
                                        <label htmlFor={`landing-pg-${item.id}`} className="min-w-0">
                                            <span className="block text-sm font-medium">{item.label}</span>
                                            <span className="block text-[0.8125rem] text-gray-950">{item.hint}</span>
                                        </label>
                                        <Switch.Root id={`landing-pg-${item.id}`} defaultChecked={item.on}>
                                            <Switch.Thumb />
                                        </Switch.Root>
                                    </li>
                                ))}
                            </ul>
                        </Tabs.Content>

                        <Tabs.Content value="members">
                            <div className="min-h-[236px] pt-2">
                                <ul className="divide-y divide-gray-300">
                                    {MEMBERS.map((member) => (
                                        <li key={member.name} className="flex items-center gap-3 py-3">
                                            <Avatar.Root size="small">
                                                <Avatar.Fallback>{member.initials}</Avatar.Fallback>
                                            </Avatar.Root>
                                            <span className="min-w-0 flex-1 truncate text-sm font-medium">
                                                {member.name}
                                            </span>
                                            <Badge
                                                variant={member.role === 'Owner' ? 'soft' : 'outline'}
                                                color={accent}
                                            >
                                                {member.role}
                                            </Badge>
                                        </li>
                                    ))}
                                </ul>
                                <InviteDialog />
                            </div>
                        </Tabs.Content>
                    </Tabs.Root>

                    <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
                        <Button variant="ghost">Discard</Button>
                        <Button variant="solid" color={accent}>
                            Save changes
                        </Button>
                    </div>
                </div>
            </Theme>
        </div>
    )
}

function InviteDialog() {
    const [open, setOpen] = useState(false)
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <Button variant="soft" size="small" className="mt-3">
                    <Plus className="h-3.5 w-3.5" aria-hidden />
                    Invite member
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                    <Dialog.Title>Invite to Acme</Dialog.Title>
                    <Dialog.Description>
                        Focus is trapped in here. Press Escape and it returns to the button you came from.
                    </Dialog.Description>
                    <Dialog.Footer>
                        <Dialog.Close asChild>
                            <Button variant="ghost">Cancel</Button>
                        </Dialog.Close>
                        <Button variant="solid" onClick={() => setOpen(false)}>
                            Send invite
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
