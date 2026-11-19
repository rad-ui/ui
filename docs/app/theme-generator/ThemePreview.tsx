'use client'

import { useState, type CSSProperties } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'

import Badge from '@radui/ui/Badge'
import Button from '@radui/ui/Button'
import Card from '@radui/ui/Card'
import Checkbox from '@radui/ui/Checkbox'
import Dialog from '@radui/ui/Dialog'
import Progress from '@radui/ui/Progress'
import Select from '@radui/ui/Select'
import Switch from '@radui/ui/Switch'
import Tabs from '@radui/ui/Tabs'
import TextField from '@radui/ui/TextField'
import Theme from '@radui/ui/Theme'

import { useLightTokens } from '@/utils/useLightTokens'
import { themeVars, type Appearance, type GeneratedTheme } from '@/utils/theme-generator/scale'

const STATS = [
    { label: 'Active projects', value: '12', delta: '+3 this week', progress: 64 },
    { label: 'Open reviews', value: '7', delta: '2 due today', progress: 38 },
    { label: 'Release health', value: '98%', delta: 'All checks green', progress: 98 },
]

const ACTIVITY = [
    { who: 'Maya', what: 'approved', item: 'Billing settings', state: 'Merged' },
    { who: 'Jon', what: 'commented on', item: 'Onboarding flow', state: 'Review' },
    { who: 'Ana', what: 'opened', item: 'Dark mode polish', state: 'Draft' },
]

/**
 * Real Rad UI components in a nested <Theme> whose gray and accent scales are
 * the generated ones. Every value is set inline on the Theme element, so the
 * Clarity semantic tokens (surfaces, text, borders) re-resolve against them.
 */
export default function ThemePreview({
    theme,
    appearance,
    siteDark,
}: {
    theme: GeneratedTheme
    appearance: Appearance
    siteDark: boolean
}) {
    // Light preview inside the dark site: restore the light shadows too.
    const lightTokens = useLightTokens(appearance === 'light' && siteDark)
    const style = { ...lightTokens, ...themeVars(theme, appearance) } as CSSProperties

    return (
        <Theme
            id="theme-generator-preview"
            appearance={appearance}
            classNamespace="rad-ui"
            style={style}
            className="overflow-hidden rounded-xl border border-gray-500 bg-gray-50 text-gray-1000"
        >
            <div className="grid gap-5 p-4 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-[0.8125rem] font-medium text-gray-950">Acme workspace</p>
                        <h3 className="text-xl font-semibold tracking-[-0.01em]">Overview</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="soft">Pro plan</Badge>
                        <NewProjectDialog />
                    </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                    {STATS.map((stat) => (
                        <Card key={stat.label} variant="outline" size="small">
                            <Card.Content>
                                <p className="text-[0.8125rem] text-gray-950">{stat.label}</p>
                                <p className="mt-1 text-2xl font-semibold tabular-nums">{stat.value}</p>
                                <Progress.Root
                                    value={stat.progress}
                                    minValue={0}
                                    maxValue={100}
                                    aria-label={`${stat.label} progress`}
                                    className="mt-3"
                                >
                                    <Progress.Indicator />
                                </Progress.Root>
                                <p className="mt-2 text-[0.8125rem] text-gray-950">{stat.delta}</p>
                            </Card.Content>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                    <Card variant="outline" size="small">
                        <Card.Content>
                            <Tabs.Root defaultValue="activity">
                                <Tabs.List aria-label="Workspace">
                                    <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
                                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                                </Tabs.List>
                                <Tabs.Content value="activity">
                                    <ul className="divide-y divide-gray-400 pt-2">
                                        {ACTIVITY.map((row) => (
                                            <li key={row.item} className="flex items-center justify-between gap-3 py-2.5">
                                                <p className="min-w-0 text-sm">
                                                    <span className="font-medium">{row.who}</span>{' '}
                                                    <span className="text-gray-950">{row.what}</span>{' '}
                                                    <span className="font-medium">{row.item}</span>
                                                </p>
                                                <Badge variant={row.state === 'Merged' ? 'soft' : 'outline'}>{row.state}</Badge>
                                            </li>
                                        ))}
                                    </ul>
                                </Tabs.Content>
                                <Tabs.Content value="settings">
                                    <div className="grid gap-4 pt-3">
                                        <label className="flex items-center justify-between gap-3 text-sm">
                                            <span>
                                                <span className="block font-medium">Email digests</span>
                                                <span className="block text-[0.8125rem] text-gray-950">A summary every Monday</span>
                                            </span>
                                            <Switch.Root defaultChecked aria-label="Email digests">
                                                <Switch.Thumb />
                                            </Switch.Root>
                                        </label>
                                        <label className="flex items-center gap-2.5 text-sm">
                                            <Checkbox.Root defaultChecked>
                                                <Checkbox.Indicator />
                                            </Checkbox.Root>
                                            Require two-factor sign-in
                                        </label>
                                    </div>
                                </Tabs.Content>
                            </Tabs.Root>
                        </Card.Content>
                    </Card>

                    <Card variant="outline" size="small">
                        <Card.Content>
                            <form className="grid gap-3" onSubmit={(event) => event.preventDefault()}>
                                <div className="grid gap-1.5">
                                    <label htmlFor="theme-preview-name" className="text-sm font-medium">
                                        Project name
                                    </label>
                                    <TextField.Root>
                                        <TextField.Input id="theme-preview-name" defaultValue="Marketing site" />
                                    </TextField.Root>
                                </div>
                                <div className="grid gap-1.5" style={{ ['--rad-select-width' as string]: '100%' }}>
                                    <span id="theme-preview-visibility" className="text-sm font-medium">
                                        Visibility
                                    </span>
                                    <Select.Root defaultValue="team">
                                        <Select.Trigger aria-labelledby="theme-preview-visibility">Choose</Select.Trigger>
                                        <Select.Content>
                                            <Select.Group>
                                                <Select.Item value="private">
                                                    <Select.Indicator />
                                                    Private
                                                </Select.Item>
                                                <Select.Item value="team">
                                                    <Select.Indicator />
                                                    Team
                                                </Select.Item>
                                                <Select.Item value="public">
                                                    <Select.Indicator />
                                                    Public
                                                </Select.Item>
                                            </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                </div>
                                <label className="flex items-center gap-2.5 text-sm">
                                    <Switch.Root defaultChecked aria-label="Notify the team">
                                        <Switch.Thumb />
                                    </Switch.Root>
                                    Notify the team
                                </label>
                                <div className="mt-1 flex flex-wrap items-center justify-end gap-2">
                                    <Button type="button" variant="ghost">
                                        Cancel
                                    </Button>
                                    <Button type="button" variant="outline">
                                        Preview
                                    </Button>
                                    <Button type="submit">Save</Button>
                                </div>
                            </form>
                        </Card.Content>
                    </Card>
                </div>

                <div className="flex flex-wrap items-center gap-2 border-t border-gray-400 pt-4">
                    <Button>Solid</Button>
                    <Button variant="soft">Soft</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <a
                        href="#theme-generator-export"
                        className="ml-auto inline-flex min-h-6 items-center gap-1 text-sm font-medium underline underline-offset-4"
                        style={{ color: 'var(--rad-ui-color-accent-950)' }}
                    >
                        Get the CSS
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                </div>
            </div>
        </Theme>
    )
}

function NewProjectDialog() {
    const [open, setOpen] = useState(false)
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <Button size="small">
                    <Plus className="h-3.5 w-3.5" aria-hidden />
                    New project
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content style={{ margin: 0, maxWidth: 'min(440px, calc(100% - 2rem))' }}>
                    <Dialog.Title>New project</Dialog.Title>
                    <Dialog.Description>
                        This dialog uses your generated tokens too. Press Escape to close it.
                    </Dialog.Description>
                    <Dialog.Footer>
                        <Dialog.Close asChild>
                            <Button variant="ghost">Cancel</Button>
                        </Dialog.Close>
                        <Button onClick={() => setOpen(false)}>Create</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
