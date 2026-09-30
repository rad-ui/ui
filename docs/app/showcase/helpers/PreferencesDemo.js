"use client"

import Badge from "@radui/ui/Badge"
import Button from "@radui/ui/Button"
import Heading from "@radui/ui/Heading"
import Progress from "@radui/ui/Progress"
import RadioCards from "@radui/ui/RadioCards"
import Switch from "@radui/ui/Switch"
import Text from "@radui/ui/Text"
import {
    BellRing,
    ChevronRight,
    Globe,
    Lock,
    Monitor,
    MoonStar,
    Palette,
    ShieldCheck,
    SlidersHorizontal,
    Smartphone,
    Sparkles,
    Volume2,
    WandSparkles,
} from "lucide-react"

const settingsNav = [
    { label: "General", active: true },
    { label: "Appearance" },
    { label: "Notifications" },
    { label: "Privacy" },
    { label: "Playback" },
]

const themeModes = [
    {
        value: "dark",
        label: "Dark",
        description: "High-contrast workspace",
        icon: MoonStar,
    },
    {
        value: "system",
        label: "System",
        description: "Follow the active OS mode",
        icon: Monitor,
    },
    {
        value: "mobile",
        label: "Mobile",
        description: "Compact device preview",
        icon: Smartphone,
    },
]

const notificationRows = [
    { label: "Product updates", detail: "Releases, changelogs, and roadmap nudges.", enabled: true },
    { label: "Mentions", detail: "Ping me when collaborators leave context.", enabled: true },
    { label: "Weekly summary", detail: "A compact digest every Friday evening.", enabled: false },
]

const automationRows = [
    { label: "Auto-archive stale threads", status: "Enabled", tone: "bg-green-800" },
    { label: "Smart focus after 11 PM", status: "Enabled", tone: "bg-green-800" },
    { label: "Reduce motion on battery saver", status: "Suggested", tone: "bg-green-400" },
]

const PreferenceSwitch = ({ enabled, label }) => {
    return (
        <Switch.Root color="green" defaultChecked={enabled} aria-label={label}>
            <Switch.Thumb />
        </Switch.Root>
    )
}

const densityLevels = [
    { label: "Interface density", value: 62, readout: "Compact" },
    { label: "Accent intensity", value: 48, readout: "Balanced" },
]

const SectionCard = ({ eyebrow, title, description, action, children, accent = false }) => {
    return (
        <section
            className={`rounded-2xl border p-4 ${
                accent
                    ? "border-gray-600 bg-gray-100"
                    : "border-gray-600 bg-gray-50"
            }`}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <Text className="!text-[10px] uppercase tracking-[0.3em] text-gray-1000/60">{eyebrow}</Text>
                    <Heading as="h5" className="mt-2 !text-gray-1000">{title}</Heading>
                    <Text className="mt-1 max-w-xl !text-sm text-gray-1000/70">{description}</Text>
                </div>
                {action}
            </div>
            <div className="mt-4">{children}</div>
        </section>
    )
}

const PreferencesDemo = () => {
    return (
        <div className="grid min-h-[780px] lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="border-b border-gray-600 bg-gray-200 px-3 py-3 lg:border-b-0 lg:border-r">
                <div className="rounded-2xl border border-gray-600 bg-gray-50 px-3 py-3">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <Text className="!text-[10px] uppercase tracking-[0.28em] text-gray-1000/60">Preferences</Text>
                            <Heading as="h5" className="mt-1 !text-gray-1000">Control Center</Heading>
                        </div>
                        <Badge variant="soft" color="green" className="rounded-full px-2.5 py-1">
                            Live
                        </Badge>
                    </div>
                    <Text className="mt-3 !text-sm text-gray-1000/70">
                        A denser settings surface with compact controls, adaptive states, and polished grouping.
                    </Text>
                </div>

                <div className="mt-4 space-y-1.5">
                    {settingsNav.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left ${
                                item.active
                                    ? "bg-gray-200 text-gray-1000"
                                    : "text-gray-1000/70 hover:bg-gray-1000/[0.04] hover:text-gray-1000"
                            }`}
                        >
                            <span className="text-sm font-medium">{item.label}</span>
                            <ChevronRight className="h-4 w-4 opacity-60" />
                        </button>
                    ))}
                </div>

                <div className="mt-4 rounded-2xl border border-gray-600 bg-gray-50 p-3">
                    <Text className="!text-[10px] uppercase tracking-[0.3em] text-gray-1000/60">Preset Stack</Text>
                    <div className="mt-3 space-y-2">
                        {["Studio contrast", "Quiet hours", "Dense tables"].map((item, index) => (
                            <div
                                key={item}
                                className={`rounded-xl border px-3 py-2 ${
                                    index === 0
                                        ? "border-green-800/25 bg-gradient-to-r from-green-900/20 to-green-800/20"
                                        : "border-gray-600 bg-gray-1000/[0.03]"
                                }`}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <Text className="!text-sm font-medium !text-gray-1000">{item}</Text>
                                    <span className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-green-800" : "bg-gray-600"}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            <main className="min-w-0 bg-gray-50 p-3 sm:p-4">
                <div className="space-y-4">
                    <section className="rounded-2xl border border-gray-600 bg-gray-50 p-4">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl">
                                <Text className="!text-[10px] uppercase tracking-[0.34em] text-green-900">Settings Showcase</Text>
                                <Heading as="h2" className="mt-2 max-w-2xl !text-gray-1000">
                                    Preferences panel, tuned for density.
                                </Heading>
                                <Text className="mt-2 max-w-2xl !text-sm text-gray-1000/70">
                                    Compact controls, clear section rhythm, and richer defaults make the settings surface feel deliberate instead of purely utilitarian.
                                </Text>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Badge variant="soft" color="green" className="rounded-full px-3 py-1">
                                    Compact UI
                                </Badge>
                                <Badge variant="outline" className="rounded-full border-gray-600 bg-gray-1000/[0.03] px-3 py-1 text-gray-1000/70">
                                    Personalization
                                </Badge>
                                <Badge variant="outline" className="rounded-full border-gray-600 bg-gray-1000/[0.03] px-3 py-1 text-gray-1000/70">
                                    Workspace defaults
                                </Badge>
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1.05fr)_280px]">
                            <div className="rounded-2xl border border-gray-600 bg-gray-100 px-4 py-4 text-gray-1000">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="rounded-lg border border-gray-600 bg-gray-50/10 p-2 text-green-800">
                                            <Palette className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <Text className="!text-[10px] uppercase tracking-[0.28em] text-gray-1000/60">Appearance</Text>
                                            <Heading as="h5" className="mt-1 !text-gray-1000">Theme and density</Heading>
                                        </div>
                                    </div>
                                    <Badge variant="soft" color="green" className="rounded-full px-3 py-1">
                                        Recommended
                                    </Badge>
                                </div>

                                <RadioCards.Root
                                    color="green"
                                    defaultValue="dark"
                                    aria-label="Theme"
                                    className="mt-4 !max-w-none [&_[role=group]]:!grid [&_[role=group]]:!grid-cols-1 [&_[role=group]]:!gap-2 sm:[&_[role=group]]:!grid-cols-3"
                                >
                                    {themeModes.map((mode) => {
                                        const Icon = mode.icon

                                        return (
                                            <RadioCards.Item
                                                key={mode.value}
                                                value={mode.value}
                                                className="!py-3 !pl-3 !pr-10"
                                            >
                                                <Icon className="h-4 w-4" />
                                                <Text className="mt-3 !text-sm font-medium">{mode.label}</Text>
                                                <Text className="mt-1 !text-[11px]">{mode.description}</Text>
                                            </RadioCards.Item>
                                        )
                                    })}
                                </RadioCards.Root>

                                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                                    {densityLevels.map((level) => (
                                        <div key={level.label} className="rounded-xl border border-gray-600 bg-gray-50/70 p-3">
                                            <div className="flex items-center justify-between gap-2">
                                                <Text className="!text-sm font-medium !text-gray-1000">{level.label}</Text>
                                                <Text className="!text-xs text-gray-1000/60">{level.readout}</Text>
                                            </div>
                                            <Progress.Root
                                                data-color="green"
                                                value={level.value}
                                                minValue={0}
                                                maxValue={100}
                                                getValueLabel={(value) => `${level.label}: ${value}%`}
                                                className="mt-3 max-w-none"
                                            >
                                                <Progress.Indicator />
                                            </Progress.Root>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-600 bg-gray-100 p-4">
                                <Text className="!text-[10px] uppercase tracking-[0.3em] text-gray-1000/60">Smart Defaults</Text>
                                <Heading as="h5" className="mt-2 !text-gray-1000">Session profile</Heading>

                                <div className="mt-4 space-y-3">
                                    {automationRows.map((item) => (
                                        <div key={item.label} className="rounded-xl border border-gray-600 bg-gray-1000/[0.03] px-3 py-2.5">
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <Text className="!text-sm font-medium !text-gray-1000">{item.label}</Text>
                                                    <Text className="mt-1 !text-[11px] text-gray-1000/60">{item.status}</Text>
                                                </div>
                                                <span className={`h-2.5 w-2.5 rounded-full ${item.tone}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 rounded-xl border border-gray-600 bg-gray-50/75 px-3 py-3 text-gray-1000">
                                    <Text className="!text-[10px] uppercase tracking-[0.28em] text-gray-1000/60">Focus Mode</Text>
                                    <Text className="mt-2 !text-sm text-gray-1000/70">
                                        Noise reduced after 11 PM, motion softened, and tertiary chrome collapsed.
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="grid gap-3 xl:grid-cols-2">
                        <SectionCard
                            eyebrow="Notifications"
                            title="Signal over noise"
                            description="Trim routine chatter and keep the alerts that change what you do next."
                            action={<div className="rounded-full border border-gray-600 bg-gray-1000/[0.04] px-3 py-1.5"><Text className="!text-[11px] text-gray-1000/60">4 channels active</Text></div>}
                        >
                            <div className="space-y-2.5">
                                {notificationRows.map((row) => (
                                    <div key={row.label} className="flex items-center justify-between gap-3 rounded-xl border border-gray-600 bg-gray-1000/[0.03] px-3 py-3">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <BellRing className="h-4 w-4 text-green-800" />
                                                <Text className="truncate !text-sm font-medium !text-gray-1000">{row.label}</Text>
                                            </div>
                                            <Text className="mt-1 !text-[11px] text-gray-1000/60">{row.detail}</Text>
                                        </div>
                                        <PreferenceSwitch enabled={row.enabled} label={row.label} />
                                    </div>
                                ))}
                            </div>
                        </SectionCard>

                        <SectionCard
                            eyebrow="Privacy"
                            title="Share only what matters"
                            description="Workspace visibility, link permissions, and local protections grouped into one compact review block."
                            action={<Button variant="solid" className="rounded-full border-0 !bg-gray-1000 px-3 py-2 !text-gray-50">Apply</Button>}
                            accent
                        >
                            <div className="grid gap-2.5 sm:grid-cols-2">
                                <div className="rounded-xl border border-gray-600 bg-gray-50/75 px-3 py-3 text-gray-1000">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-green-800" />
                                        <Text className="!text-sm font-medium !text-gray-1000">Trusted workspace</Text>
                                    </div>
                                    <Text className="mt-2 !text-[11px] text-gray-1000/60">Single-team access, signed exports, and strict previews.</Text>
                                </div>
                                <div className="rounded-xl border border-gray-600 bg-gray-1000/[0.03] px-3 py-3">
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-green-1000" />
                                        <Text className="!text-sm font-medium !text-gray-1000">Link scope</Text>
                                    </div>
                                    <Text className="mt-2 !text-[11px] text-gray-1000/60">Restricted to teammates with comment access.</Text>
                                </div>
                                <div className="rounded-xl border border-gray-600 bg-gray-1000/[0.03] px-3 py-3">
                                    <div className="flex items-center gap-2">
                                        <Lock className="h-4 w-4 text-green-800" />
                                        <Text className="!text-sm font-medium !text-gray-1000">Auto-lock</Text>
                                    </div>
                                    <Text className="mt-2 !text-[11px] text-gray-1000/60">Relock sensitive panels after 5 minutes of inactivity.</Text>
                                </div>
                                <div className="rounded-xl border border-gray-600 bg-gray-1000/[0.03] px-3 py-3">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-green-800" />
                                        <Text className="!text-sm font-medium !text-gray-1000">Redaction assist</Text>
                                    </div>
                                    <Text className="mt-2 !text-[11px] text-gray-1000/60">Suggests scrubbed fields before screenshots or export.</Text>
                                </div>
                            </div>
                        </SectionCard>
                    </div>

                    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
                        <SectionCard
                            eyebrow="Playback and Behavior"
                            title="Micro-preferences, handled cleanly"
                            description="The lower-granularity controls are still readable when the layout is compact."
                            action={<Badge variant="outline" className="rounded-full border-gray-600 bg-gray-1000/[0.03] px-3 py-1 text-gray-1000/60">6 active rules</Badge>}
                        >
                            <div className="grid gap-2.5 sm:grid-cols-2">
                                {[
                                    { icon: Volume2, title: "Preview audio", detail: "Let system sounds confirm completed actions.", enabled: true },
                                    { icon: WandSparkles, title: "Smart suggestions", detail: "Promote commonly used presets near the top.", enabled: true },
                                    { icon: SlidersHorizontal, title: "Dense tables", detail: "Reduce row height across workspace views.", enabled: true },
                                    { icon: Monitor, title: "Remember layout", detail: "Restore panel widths and section expansion.", enabled: false },
                                ].map((item) => {
                                    const Icon = item.icon

                                    return (
                                        <div key={item.title} className="rounded-xl border border-gray-600 bg-gray-1000/[0.03] px-3 py-3">
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-lg border border-gray-600 bg-gray-1000/[0.05] p-2 text-green-800">
                                                        <Icon className="h-4 w-4" />
                                                    </div>
                                                    <Text className="!text-sm font-medium !text-gray-1000">{item.title}</Text>
                                                </div>
                                                <PreferenceSwitch enabled={item.enabled} label={item.title} />
                                            </div>
                                            <Text className="mt-2 !text-[11px] text-gray-1000/60">{item.detail}</Text>
                                        </div>
                                    )
                                })}
                            </div>
                        </SectionCard>

                        <SectionCard
                            eyebrow="Review Snapshot"
                            title="Before you leave"
                            description="A compact right-rail summary helps confirm that the panel is doing real work."
                        >
                            <div className="space-y-2.5">
                                {[
                                    "Dark mode and compact density are active.",
                                    "Mentions and product updates are enabled.",
                                    "Workspace links are team-restricted.",
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-2 rounded-xl border border-gray-600 bg-gray-1000/[0.03] px-3 py-2.5">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-green-800" />
                                        <Text className="!text-[11px] text-gray-1000/70">{item}</Text>
                                    </div>
                                ))}
                            </div>
                        </SectionCard>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PreferencesDemo
