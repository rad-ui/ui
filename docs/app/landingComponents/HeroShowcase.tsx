'use client'

import { useEffect, useState, type ReactNode } from 'react'
import {
    Bold,
    Italic,
    Link2,
    ShieldCheck,
    TriangleAlert,
    Underline,
    X
} from 'lucide-react'

import Avatar from '@radui/ui/Avatar'
import AvatarGroup from '@radui/ui/AvatarGroup'
import Badge from '@radui/ui/Badge'
import Button from '@radui/ui/Button'
import Callout from '@radui/ui/Callout'
import Checkbox from '@radui/ui/Checkbox'
import Dialog from '@radui/ui/Dialog'
import Kbd from '@radui/ui/Kbd'
import Progress from '@radui/ui/Progress'
import RadioCards from '@radui/ui/RadioCards'
import Slider from '@radui/ui/Slider'
import Switch from '@radui/ui/Switch'
import Tabs from '@radui/ui/Tabs'
import TextField from '@radui/ui/TextField'
import ToggleGroup from '@radui/ui/ToggleGroup'
import Toolbar from '@radui/ui/Toolbar'

/* ── Data ─────────────────────────────────────────────────────────────── */

const THREAD_MEMBERS = [
    { initials: 'NI', color: 'green' },
    { initials: 'OM', color: 'blue' },
    { initials: 'MA', color: 'amber' }
]

const MESSAGES = [
    {
        initials: 'NI',
        color: 'green',
        name: 'Nina Alvarez',
        note: 'The toggle focus ring is clipped on Safari',
        time: '2m',
        unread: true
    },
    {
        initials: 'OM',
        color: 'blue',
        name: 'Omar Haddad',
        note: 'Shipped the Toolbar example',
        time: '14m',
        unread: false
    },
    {
        initials: 'MA',
        color: 'amber',
        name: 'Maya Chen',
        note: 'Can we darken the Callout border?',
        time: '1h',
        unread: false
    },
    {
        initials: 'JR',
        color: 'blue',
        name: 'Jonas Ruiz',
        note: 'Tabs.List shipped a default label',
        time: '2h',
        unread: false
    }
]

const CHECKS = [
    { label: 'Keyboard paths', value: 100 },
    { label: 'Screen reader', value: 92 },
    { label: 'Contrast', value: 100 },
    { label: 'Motion', value: 100 },
    { label: 'Touch targets', value: 100 },
    { label: 'Bundle budget', value: 88 }
]

const PLANS = [
    { value: 'oss', title: 'Open source', description: 'MIT. Fork it, ship it.' },
    { value: 'team', title: 'Team', description: 'Shared tokens and review.' },
    { value: 'scale', title: 'Scale', description: 'Audits and design partners.' }
]

/* ── Shell ────────────────────────────────────────────────────────────── */

/**
 * `flex flex-col` plus `mt-auto` on each surface's last row means a card never
 * ends in a gap: the grid stretches all four to the same height and the action
 * row of each one pins itself to that bottom edge.
 */
const SHELL =
    'flex flex-col overflow-hidden rounded-xl border border-gray-500 bg-gray-50 shadow-[0_18px_40px_-26px_color-mix(in_oklab,var(--rad-ui-color-gray-1000)_55%,transparent)]'

const STRIP =
    'flex items-center justify-between gap-3 border-b border-gray-400 bg-gray-100 px-3.5 py-1.5'

/**
 * The thin window chrome that keeps the technical texture without turning the
 * hero back into a terminal. `dots` is reserved for the cards that read as
 * real application windows.
 */
function Strip({
    label,
    dots = false,
    children
}: {
    label: string
    dots?: boolean
    children?: ReactNode
}) {
    return (
        <div className={STRIP}>
            <span className="flex min-w-0 items-center gap-2">
                {dots ? (
                    <span className="flex shrink-0 items-center gap-1" aria-hidden>
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                    </span>
                ) : null}
                <span className="truncate font-mono text-[10px] uppercase tracking-[0.22em] text-gray-950">
                    {label}
                </span>
            </span>
            <span className="flex shrink-0 items-center gap-2">{children}</span>
        </div>
    )
}

/* ── Pieces ───────────────────────────────────────────────────────────── */

/**
 * `Dialog.Portal` reads `document` while rendering, so it cannot be part of
 * the server-rendered tree. Gate it on mount — the trigger has no handler
 * until hydration anyway, so nothing is lost.
 */
function MountedReply() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return <Button size="small" variant="soft" disabled>Reply</Button>
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button size="small" variant="soft">
                    Reply
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                    <Dialog.Title>Reply to Nina</Dialog.Title>
                    <Dialog.Description>
                        Focus is trapped while this is open and returns to the
                        trigger when it closes.
                    </Dialog.Description>

                    <TextField.Root className="mt-1 pb-4">
                        <TextField.Slot side="start">@</TextField.Slot>
                        <TextField.Input placeholder="Write a reply" />
                    </TextField.Root>

                    <Dialog.Footer>
                        <Dialog.Close asChild>
                            <Button size="small" variant="ghost">
                                <X className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                                Close
                            </Button>
                        </Dialog.Close>
                        <Button size="small">Send</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

/** One labelled readout row. The bar is a real Progress primitive. */
function CheckRow({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex items-center gap-3">
            <span className="w-[7.5rem] shrink-0 truncate text-[0.78rem] text-gray-950">
                {label}
            </span>
            <Progress.Root
                value={value}
                maxValue={100}
                minValue={0}
                aria-label={`${label}: ${value}%`}
                className="min-w-0 flex-1"
            >
                <Progress.Indicator />
            </Progress.Root>
            <span className="w-9 shrink-0 text-right text-[0.76rem] tabular-nums text-gray-950">
                {value}%
            </span>
        </div>
    )
}

/* ── Surfaces ─────────────────────────────────────────────────────────── */

function InboxCard() {
    const [unreadOnly, setUnreadOnly] = useState(false)

    const rows = unreadOnly ? MESSAGES.filter((m) => m.unread) : MESSAGES

    return (
        <>
            <div className="flex items-center gap-3 border-b border-gray-400 px-3.5 py-2.5 sm:px-4">
                <Avatar.Root size="lg" color="green">
                    <Avatar.Fallback>RU</Avatar.Fallback>
                </Avatar.Root>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.9rem] font-semibold text-gray-1000">Inbox</p>
                    <p className="truncate text-[0.78rem] text-gray-950">
                        Unstyled parts, styled by you
                    </p>
                </div>
                <Badge variant="soft">12 new</Badge>
            </div>

            <div className="px-3.5 pt-3 sm:px-4">
                <Tabs.Root defaultValue="inbox" className="w-full">
                    <Tabs.List aria-label="Inbox views">
                        <Tabs.Trigger value="inbox">Inbox</Tabs.Trigger>
                        <Tabs.Trigger value="mentions">Mentions</Tabs.Trigger>
                        <Tabs.Trigger value="archived">Archived</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="inbox" className="pt-3">
                        <ul className="space-y-1">
                            {rows.map((message) => (
                                <li
                                    key={message.name}
                                    className="flex items-center gap-3 rounded-lg border border-gray-400 bg-gray-100 px-2.5 py-1.5"
                                >
                                    <Avatar.Root size="sm" color={message.color}>
                                        <Avatar.Fallback>{message.initials}</Avatar.Fallback>
                                    </Avatar.Root>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-[0.8rem] font-medium text-gray-1000">
                                            {message.name}
                                        </span>
                                        <span className="block truncate text-[0.75rem] text-gray-950">
                                            {message.note}
                                        </span>
                                    </span>
                                    <span className="shrink-0 text-[0.72rem] tabular-nums text-gray-950">
                                        {message.time}
                                    </span>
                                    {message.unread ? (
                                        <span
                                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-1000"
                                            aria-label="Unread"
                                        />
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                    </Tabs.Content>

                    <Tabs.Content value="mentions" className="pt-3">
                        <p className="rounded-lg border border-gray-400 bg-gray-100 px-3 py-4 text-center text-[0.78rem] text-gray-950">
                            Two people mentioned you in{' '}
                            <span className="text-gray-1000">#design-system</span>.
                        </p>
                    </Tabs.Content>

                    <Tabs.Content value="archived" className="pt-3">
                        <p className="rounded-lg border border-gray-400 bg-gray-100 px-3 py-4 text-center text-[0.78rem] text-gray-950">
                            Nothing archived this week.
                        </p>
                    </Tabs.Content>
                </Tabs.Root>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-gray-400 px-3.5 pb-2.5 pt-3 sm:px-4">
                <MountedReply />
                <Button size="small" variant="outline">
                    Archive
                </Button>
                <label
                    htmlFor="hero-unread-only"
                    className="ml-auto flex items-center gap-2 text-[0.76rem] text-gray-1000"
                >
                    Unread
                    <Switch.Root id="hero-unread-only" checked={unreadOnly} onCheckedChange={setUnreadOnly}>
                        <Switch.Thumb />
                    </Switch.Root>
                </label>
            </div>
        </>
    )
}

function ComposerCard() {
    const [size, setSize] = useState(16)
    const sizeValue = Array.isArray(size) ? size[0] : size

    return (
        <>
            <div className="border-b border-gray-400 px-3.5 py-2.5">
                <TextField.Root>
                    <TextField.Slot side="start">@</TextField.Slot>
                    <TextField.Input placeholder="Subject" aria-label="Subject" />
                </TextField.Root>
            </div>

            <div className="border-b border-gray-400 px-3.5 py-2.5">
                <ToggleGroup.Root type="single" defaultValue="body" aria-label="Heading level">
                    <ToggleGroup.Item value="body">Body</ToggleGroup.Item>
                    <ToggleGroup.Item value="h2">H2</ToggleGroup.Item>
                    <ToggleGroup.Item value="h3">H3</ToggleGroup.Item>
                </ToggleGroup.Root>
            </div>

            <div className="border-b border-gray-400 px-3.5 py-2.5">
                {/* Wrapping labels: `Checkbox.Root` renders a hidden input with the
                    same `id` as its trigger, so `htmlFor` would be ambiguous. */}
                <label className="flex items-center gap-2">
                    <Checkbox.Root id="hero-comment" aria-labelledby="hero-comment-label">
                        <Checkbox.Indicator />
                    </Checkbox.Root>
                    <span id="hero-comment-label" className="text-[0.78rem] text-gray-1000">
                        Comment on publish
                    </span>
                </label>
                <label className="mt-2.5 flex items-center gap-2">
                    <Checkbox.Root id="hero-notify" aria-labelledby="hero-notify-label">
                        <Checkbox.Indicator />
                    </Checkbox.Root>
                    <span id="hero-notify-label" className="text-[0.78rem] text-gray-1000">
                        Notify subscribers
                    </span>
                </label>
            </div>

            <div className="flex flex-wrap items-center gap-2 px-3.5 py-3">
                <Toolbar.Root aria-label="Formatting options">
                    <Toolbar.ToggleGroup type="multiple" defaultValue={['bold']}>
                        <Toolbar.ToggleItem value="bold" aria-label="Bold">
                            <Bold />
                        </Toolbar.ToggleItem>
                        <Toolbar.ToggleItem value="italic" aria-label="Italic">
                            <Italic />
                        </Toolbar.ToggleItem>
                        <Toolbar.ToggleItem value="underline" aria-label="Underline">
                            <Underline />
                        </Toolbar.ToggleItem>
                    </Toolbar.ToggleGroup>
                    <Toolbar.Separator />
                    <Toolbar.ToggleGroup type="single" defaultValue="link">
                        <Toolbar.ToggleItem value="link" aria-label="Link">
                            <Link2 />
                        </Toolbar.ToggleItem>
                    </Toolbar.ToggleGroup>
                </Toolbar.Root>

                <span className="ml-auto">
                    <Kbd size="small">⌘B</Kbd>
                </span>
            </div>

            <div className="border-t border-gray-400 px-3.5 py-3">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                    <span id="hero-text-size" className="text-[0.78rem] text-gray-950">
                        Text size
                    </span>
                    <span className="text-[0.78rem] tabular-nums text-gray-1000">{sizeValue}px</span>
                </div>
                <Slider
                    aria-labelledby="hero-text-size"
                    value={[size]}
                    onValueChange={(next) => {
                        const picked = Array.isArray(next) ? next[0] : next
                        setSize(picked ?? 0)
                    }}
                    min={12}
                    max={24}
                    step={2}
                />
            </div>

            <div className="mt-auto flex items-center gap-2 border-t border-gray-400 px-3.5 pb-2.5 pt-3">
                <Button size="small">Send</Button>
                <Button size="small" variant="ghost">
                    Discard
                </Button>
                <span className="ml-auto">
                    <Kbd size="small">⌘⏎</Kbd>
                </span>
            </div>
        </>
    )
}

function ReleaseCard() {
    return (
        <>
            <div className="space-y-2.5 px-3.5 py-3.5">
                <Callout.Root variant="soft" color="green" size="small">
                    <Callout.Icon>
                        <ShieldCheck aria-hidden />
                    </Callout.Icon>
                    <Callout.Text>
                        <strong>All checks passed</strong>
                        <span>Deploy window opens in 2 hours</span>
                    </Callout.Text>
                </Callout.Root>

                <Callout.Root variant="soft" color="amber" size="small">
                    <Callout.Icon>
                        <TriangleAlert aria-hidden />
                    </Callout.Icon>
                    <Callout.Text>
                        <strong>Two advisories</strong>
                        <span>Tree has no keyboard reorder yet</span>
                    </Callout.Text>
                </Callout.Root>
            </div>

            <div className="space-y-2.5 px-3.5 pb-3.5">
                {CHECKS.map((check) => (
                    <CheckRow key={check.label} {...check} />
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 border-t border-gray-400 px-3.5 pb-2.5 pt-3">
                <Badge variant="soft" color="green">
                    Live
                </Badge>
                <Badge variant="outline">Beta</Badge>
                <Badge variant="ghost">MIT</Badge>
            </div>

            <div className="mt-auto flex items-center gap-2 border-t border-gray-400 px-3.5 pb-2.5 pt-3">
                <Button size="small">Promote</Button>
                <Button size="small" variant="ghost">
                    Roll back
                </Button>
            </div>
        </>
    )
}

function PlansCard() {
    return (
        <>
            <div className="px-3.5 py-3.5">
                <RadioCards.Root defaultValue="oss" aria-label="Plan" className="max-w-none!">
                    {PLANS.map((plan) => (
                        <RadioCards.Item key={plan.value} value={plan.value}>
                            <span className="block text-[0.82rem]! font-semibold text-gray-1000!">
                                {plan.title}
                            </span>
                            <span className="block text-[0.75rem]! text-gray-950!">
                                {plan.description}
                            </span>
                        </RadioCards.Item>
                    ))}
                </RadioCards.Root>
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-gray-400 px-3.5 pb-3 pt-2.5">
                <span className="text-[0.76rem] text-gray-950">Billed monthly</span>
                <Badge variant="soft">Save 20% yearly</Badge>
            </div>

            <div className="mt-auto flex items-center gap-2.5 border-t border-gray-400 px-3.5 pb-2.5 pt-3">
                <Button size="small">Continue</Button>
                <span className="ml-auto flex items-center gap-2">
                    <AvatarGroup.Root>
                        {THREAD_MEMBERS.map((member) => (
                            <AvatarGroup.Item key={member.initials} color={member.color}>
                                <AvatarGroup.Fallback>{member.initials}</AvatarGroup.Fallback>
                            </AvatarGroup.Item>
                        ))}
                    </AvatarGroup.Root>
                </span>
            </div>
        </>
    )
}

/* ── Hero object ──────────────────────────────────────────────────────── */

/**
 * The hero object.
 *
 * Four live application windows in one even grid — inbox, composer, release and
 * plans. Every control in them is a published Rad UI primitive styled with the
 * Clarity design system that ships in `@radui/ui/themes/default.css`: Avatar,
 * AvatarGroup, Badge, Button, Callout, Checkbox, Dialog, Kbd, Progress,
 * RadioCards, Slider, Switch, Tabs, TextField, ToggleGroup and Toolbar. The
 * point of the hero is breadth you can tab through, so these are working
 * surfaces rather than pictures of one.
 *
 * Nothing is padded or clipped: the grid stretches all four cards to the same
 * height, each surface's action row pins itself to that bottom edge with
 * `mt-auto`, and the content of each card is sized to meet its neighbours. Below
 * `xl` the four collapse to a 2×2 grid, then a single column, where each card
 * falls back to its own height. Focus rings are inset, so nothing gets clipped.
 */
export default function HeroShowcase() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className={SHELL}>
                <Strip label="inbox" dots>
                    <Kbd size="small">⌘K</Kbd>
                </Strip>
                <InboxCard />
            </div>

            <div className={SHELL}>
                <Strip label="composer">
                    <Badge variant="outline">Draft</Badge>
                </Strip>
                <ComposerCard />
            </div>

            <div className={SHELL}>
                <Strip label="release">
                    <span className="font-mono text-[10px] tabular-nums text-gray-950">2.4.0</span>
                </Strip>
                <ReleaseCard />
            </div>

            <div className={SHELL}>
                <Strip label="plans" />
                <PlansCard />
            </div>
        </div>
    )
}