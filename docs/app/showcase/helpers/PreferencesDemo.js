"use client"

import { useState } from "react"

import Avatar from "@radui/ui/Avatar"
import Badge from "@radui/ui/Badge"
import Button from "@radui/ui/Button"
import Progress from "@radui/ui/Progress"
import RadioCards from "@radui/ui/RadioCards"
import Separator from "@radui/ui/Separator"
import Switch from "@radui/ui/Switch"
import TextField from "@radui/ui/TextField"
import { Bell, KeyRound, Laptop, Monitor, Moon, Palette, Smartphone, Sun, User } from "lucide-react"

const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: KeyRound },
]

// Static class names so Tailwind generates them.
const accents = [
    ["blue", "bg-blue-900"],
    ["violet", "bg-violet-900"],
    ["crimson", "bg-crimson-900"],
    ["orange", "bg-orange-900"],
    ["green", "bg-green-900"],
    ["gray", "bg-gray-900"],
]

const initialProfile = { name: "Ada Lovelace", email: "ada@northwind.io", title: "Staff engineer" }

const initialNotifications = [
    { id: "mentions", label: "Mentions", detail: "When someone @mentions you or replies to your thread.", on: true },
    { id: "reviews", label: "Review requests", detail: "When you're added as a reviewer on a change.", on: true },
    { id: "digest", label: "Weekly digest", detail: "A summary of activity in your projects every Friday.", on: false },
    { id: "product", label: "Product updates", detail: "New features and release notes, about once a month.", on: false },
]

const initialSessions = [
    { id: 1, device: "MacBook Pro · Chrome", place: "Lisbon, Portugal", time: "Active now", icon: Laptop, current: true },
    { id: 2, device: "iPhone 15 · Safari", place: "Lisbon, Portugal", time: "2 hours ago", icon: Smartphone },
    { id: 3, device: "Windows · Edge", place: "Porto, Portugal", time: "Mar 9", icon: Monitor },
]

const Row = ({ title, description, children }) => (
    <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="min-w-0">
            <p className="text-sm font-medium">{title}</p>
            {description ? <p className="mt-0.5 text-sm text-gray-950">{description}</p> : null}
        </div>
        <div className="shrink-0">{children}</div>
    </div>
)

const SectionHeader = ({ title, description }) => (
    <div className="pb-2">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-gray-950">{description}</p>
    </div>
)

const PreferencesDemo = () => {
    const [section, setSection] = useState("profile")
    const [saved, setSaved] = useState(initialProfile)
    const [profile, setProfile] = useState(initialProfile)
    const [theme, setTheme] = useState("system")
    const [accent, setAccent] = useState("blue")
    const [compact, setCompact] = useState(false)
    const [notifications, setNotifications] = useState(initialNotifications)
    const [twoFactor, setTwoFactor] = useState(true)
    const [sessions, setSessions] = useState(initialSessions)

    const dirty = JSON.stringify(profile) !== JSON.stringify(saved)
    const completeness = Object.values(profile).filter((value) => value.trim()).length / 3 * 100

    return (
        <div className="grid min-h-[720px] grid-cols-1 text-gray-1000 md:grid-cols-[220px_minmax(0,1fr)]">
            <nav aria-label="Settings" className="border-b border-gray-400 bg-gray-100 p-3 md:border-b-0 md:border-r">
                <p className="hidden px-2.5 pb-2 pt-1 text-sm font-semibold md:block">Settings</p>
                <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none] md:block md:space-y-0.5">
                    {sections.map(({ id, label, icon: Icon }) => (
                        <li key={id} className="shrink-0">
                            <button
                                type="button"
                                aria-current={section === id ? "page" : undefined}
                                onClick={() => setSection(id)}
                                className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                                    section === id ? "bg-gray-300 font-medium" : "text-gray-950 hover:bg-gray-200"
                                }`}
                            >
                                <Icon className="h-4 w-4 text-gray-950" />
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="relative min-w-0 bg-gray-50 px-5 py-6 sm:px-10 sm:py-8">
                <div className="max-w-2xl">
                    {section === "profile" ? (
                        <>
                            <SectionHeader title="Profile" description="How you appear to teammates across Northwind." />
                            <div className="flex items-center gap-4 py-5">
                                <Avatar.Root size="large">
                                    <Avatar.Image src="https://i.pravatar.cc/160?img=44" alt={profile.name} />
                                    <Avatar.Fallback>AL</Avatar.Fallback>
                                </Avatar.Root>
                                <div className="flex gap-2">
                                    <Button variant="soft" size="small">Change photo</Button>
                                    <Button variant="ghost" size="small">Remove</Button>
                                </div>
                            </div>
                            <Separator />
                            <div className="grid gap-5 py-5 sm:grid-cols-2">
                                {[
                                    ["name", "Full name"],
                                    ["title", "Job title"],
                                    ["email", "Email"],
                                ].map(([key, label]) => (
                                    <label key={key} className={`block ${key === "email" ? "sm:col-span-2" : ""}`}>
                                        <span className="mb-1.5 block text-sm font-medium">{label}</span>
                                        <TextField
                                            value={profile[key]}
                                            type={key === "email" ? "email" : "text"}
                                            onChange={(event) => setProfile((current) => ({ ...current, [key]: event.target.value }))}
                                        />
                                    </label>
                                ))}
                            </div>
                            <Separator />
                            <div className="py-5">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">Profile completeness</span>
                                    <span className="tabular-nums text-gray-950">{Math.round(completeness)}%</span>
                                </div>
                                <div className="mt-2"><Progress.Root value={completeness} minValue={0} maxValue={100} aria-label="Profile completeness" className="w-full! max-w-none!"><Progress.Indicator /></Progress.Root></div>
                            </div>
                        </>
                    ) : null}

                    {section === "appearance" ? (
                        <>
                            <SectionHeader title="Appearance" description="Theme, accent color, and density for this device." />
                            <div className="py-5">
                                <p className="mb-3 text-sm font-medium">Theme</p>
                                <RadioCards.Root value={theme} onValueChange={setTheme} aria-label="Theme" className="max-w-none! [&_[role=group]]:grid! [&_[role=group]]:gap-3! sm:[&_[role=group]]:grid-cols-3 [&_.rad-ui-radio-cards-item]:min-h-0!">
                                    {[
                                        ["light", "Light", Sun],
                                        ["dark", "Dark", Moon],
                                        ["system", "System", Monitor],
                                    ].map(([value, label, Icon]) => (
                                        <RadioCards.Item key={value} value={value}>
                                            <span className="flex items-center gap-2 font-medium"><Icon className="h-4 w-4" />{label}</span>
                                        </RadioCards.Item>
                                    ))}
                                </RadioCards.Root>
                            </div>
                            <Separator />
                            <div className="py-5">
                                <p className="text-sm font-medium">Accent color</p>
                                <p className="mt-0.5 text-sm text-gray-950">Changes every Rad UI component below — no extra CSS.</p>
                                <div role="radiogroup" aria-label="Accent color" className="mt-3 flex flex-wrap gap-2.5">
                                    {accents.map(([color, swatch]) => (
                                        <button
                                            key={color}
                                            type="button"
                                            role="radio"
                                            aria-checked={accent === color}
                                            aria-label={color}
                                            onClick={() => setAccent(color)}
                                            className={`h-8 w-8 rounded-full ring-offset-2 ring-offset-gray-50 transition-shadow ${swatch} ${accent === color ? "ring-2 ring-gray-1000" : "hover:ring-2 hover:ring-gray-600"}`}
                                        />
                                    ))}
                                </div>
                                <div data-rad-ui-accent-color={accent} className="mt-5 flex flex-wrap items-center gap-4 rounded-lg border border-gray-400 p-4">
                                    <Button color={accent}>Save changes</Button>
                                    <Button color={accent} variant="soft">Cancel</Button>
                                    <Badge color={accent}>New</Badge>
                                    <Switch.Root defaultChecked color={accent} aria-label="Preview switch"><Switch.Thumb /></Switch.Root>
                                    <div className="w-40"><Progress.Root value={64} minValue={0} maxValue={100} color={accent} aria-label="Preview progress"><Progress.Indicator /></Progress.Root></div>
                                </div>
                            </div>
                            <Separator />
                            <Row title="Compact mode" description="Tighter spacing in lists and tables.">
                                <Switch.Root checked={compact} onCheckedChange={setCompact} aria-label="Compact mode"><Switch.Thumb /></Switch.Root>
                            </Row>
                        </>
                    ) : null}

                    {section === "notifications" ? (
                        <>
                            <SectionHeader title="Notifications" description="Choose what Northwind emails you about." />
                            <div className="divide-y divide-gray-300">
                                {notifications.map((item) => (
                                    <Row key={item.id} title={item.label} description={item.detail}>
                                        <Switch.Root
                                            checked={item.on}
                                            onCheckedChange={(on) => setNotifications((all) => all.map((row) => (row.id === item.id ? { ...row, on } : row)))}
                                            aria-label={item.label}
                                        >
                                            <Switch.Thumb />
                                        </Switch.Root>
                                    </Row>
                                ))}
                            </div>
                            <p className="pt-3 text-sm text-gray-950">
                                {notifications.filter((item) => item.on).length} of {notifications.length} enabled
                            </p>
                        </>
                    ) : null}

                    {section === "security" ? (
                        <>
                            <SectionHeader title="Security" description="Protect your account and review where you're signed in." />
                            <Row title="Two-factor authentication" description="Require a code from your authenticator app at sign-in.">
                                <div className="flex items-center gap-3">
                                    <Badge variant="soft" color={twoFactor ? "green" : "gray"}>{twoFactor ? "On" : "Off"}</Badge>
                                    <Switch.Root checked={twoFactor} onCheckedChange={setTwoFactor} aria-label="Two-factor authentication"><Switch.Thumb /></Switch.Root>
                                </div>
                            </Row>
                            <Separator />
                            <div className="flex items-center justify-between pb-2 pt-5">
                                <p className="text-sm font-medium">Active sessions</p>
                                {sessions.length > 1 ? (
                                    <Button variant="ghost" size="small" onClick={() => setSessions((all) => all.filter((item) => item.current))}>
                                        Sign out all others
                                    </Button>
                                ) : null}
                            </div>
                            <ul className="divide-y divide-gray-300">
                                {sessions.map(({ id, device, place, time, icon: Icon, current }) => (
                                    <li key={id} className="flex items-center gap-4 py-3.5">
                                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gray-200 text-gray-950"><Icon className="h-5 w-5" /></span>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">{device}</p>
                                            <p className="truncate text-sm text-gray-950">{place} · {time}</p>
                                        </div>
                                        {current ? (
                                            <Badge variant="soft" color="green">This device</Badge>
                                        ) : (
                                            <Button variant="outline" size="small" onClick={() => setSessions((all) => all.filter((item) => item.id !== id))}>
                                                Sign out
                                            </Button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : null}
                </div>

                {dirty && section === "profile" ? (
                    <div role="status" className="sticky bottom-4 mt-8 flex max-w-2xl items-center justify-between gap-4 rounded-lg border border-gray-500 bg-gray-100 px-4 py-3 shadow-lg">
                        <span className="text-sm font-medium">You have unsaved changes</span>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="small" onClick={() => setProfile(saved)}>Discard</Button>
                            <Button size="small" onClick={() => setSaved(profile)}>Save</Button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default PreferencesDemo
