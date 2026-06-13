"use client"

import Badge from "@radui/ui/Badge"
import Button from "@radui/ui/Button"
import Heading from "@radui/ui/Heading"
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
    { label: "Dark", icon: MoonStar, active: true },
    { label: "System", icon: Monitor },
    { label: "Mobile", icon: Smartphone },
]

const notificationRows = [
    { label: "Product updates", detail: "Releases, changelogs, and roadmap nudges.", enabled: true },
    { label: "Mentions", detail: "Ping me when collaborators leave context.", enabled: true },
    { label: "Weekly summary", detail: "A compact digest every Friday evening.", enabled: false },
]

const automationRows = [
    { label: "Auto-archive stale threads", status: "Enabled" },
    { label: "Smart focus after 11 PM", status: "Enabled" },
    { label: "Reduce motion on battery saver", status: "Suggested" },
]

const Toggle = ({ enabled }) => {
    return (
        <button
            type="button"
            className={`relative h-6 w-11 rounded-full border ${
                enabled
                    ? "border-orange-800/30 bg-gradient-to-r from-amber-900 to-orange-800"
                    : "border-slate-500 bg-slate-1000/[0.05]"
            }`}
        >
            <span
                className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full ${
                    enabled ? "left-[22px] bg-slate-50" : "left-1 bg-slate-700"
                }`}
            />
        </button>
    )
}

const SectionCard = ({ eyebrow, title, description, action, children, accent = false }) => {
    return (
        <section
            className={`rounded-[24px] border p-4 ${
                accent
                    ? "border-slate-500 bg-gradient-to-br from-slate-100 via-mauve-100 to-slate-50"
                    : "border-slate-500 bg-gradient-to-br from-slate-50 via-mauve-50 to-slate-100"
            }`}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">{eyebrow}</Text>
                    <Heading as="h5" className="mt-2 !text-slate-1000">{title}</Heading>
                    <Text className="mt-1 max-w-xl !text-sm text-slate-1000/65">{description}</Text>
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
            <aside className="border-b border-slate-500 bg-gradient-to-b from-slate-200 via-mauve-100 to-slate-100 px-3 py-3 lg:border-b-0 lg:border-r">
                <div className="rounded-[24px] border border-slate-500 bg-slate-50 px-3 py-3">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <Text className="!text-[10px] uppercase tracking-[0.28em] text-slate-1000/45">Preferences</Text>
                            <Heading as="h5" className="mt-1 !text-slate-1000">Control Center</Heading>
                        </div>
                        <Badge variant="soft" color="orange" className="rounded-full px-2.5 py-1">
                            Live
                        </Badge>
                    </div>
                    <Text className="mt-3 !text-sm text-slate-1000/65">
                        A denser settings surface with compact controls, adaptive states, and polished grouping.
                    </Text>
                </div>

                <div className="mt-4 space-y-1.5">
                    {settingsNav.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            className={`flex w-full items-center justify-between rounded-[18px] px-3 py-2.5 text-left ${
                                item.active
                                    ? "bg-slate-200 text-slate-1000"
                                    : "text-slate-1000/65 hover:bg-slate-1000/[0.04] hover:text-slate-1000"
                            }`}
                        >
                            <span className="text-sm font-medium">{item.label}</span>
                            <ChevronRight className="h-4 w-4 opacity-60" />
                        </button>
                    ))}
                </div>

                <div className="mt-4 rounded-[24px] border border-slate-500 bg-slate-50 p-3">
                    <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Preset Stack</Text>
                    <div className="mt-3 space-y-2">
                        {["Studio contrast", "Quiet hours", "Dense tables"].map((item, index) => (
                            <div
                                key={item}
                                className={`rounded-[18px] border px-3 py-2 ${
                                    index === 0
                                        ? "border-orange-800/25 bg-gradient-to-r from-amber-900/15 to-orange-800/15"
                                        : "border-slate-500 bg-slate-1000/[0.03]"
                                }`}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <Text className="!text-sm font-medium !text-slate-1000">{item}</Text>
                                    <span className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-orange-800" : "bg-slate-600"}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            <main className="min-w-0 bg-gradient-to-br from-slate-50 via-mauve-50 to-slate-100 p-3 sm:p-4">
                <div className="space-y-4">
                    <section className="rounded-[28px] border border-slate-500 bg-gradient-to-br from-slate-50 via-mauve-50 to-slate-100 p-4">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl">
                                <Text className="!text-[10px] uppercase tracking-[0.34em] text-orange-900">Settings Showcase</Text>
                                <Heading as="h2" className="mt-2 max-w-2xl !text-slate-1000">
                                    Preferences panel, tuned for density.
                                </Heading>
                                <Text className="mt-2 max-w-2xl !text-sm text-slate-1000/68">
                                    Compact controls, clear section rhythm, and richer defaults make the settings surface feel deliberate instead of purely utilitarian.
                                </Text>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Badge variant="soft" color="orange" className="rounded-full px-3 py-1">
                                    Compact UI
                                </Badge>
                                <Badge variant="outline" className="rounded-full border-slate-500 bg-slate-1000/[0.03] px-3 py-1 text-slate-1000/70">
                                    Personalization
                                </Badge>
                                <Badge variant="outline" className="rounded-full border-slate-500 bg-slate-1000/[0.03] px-3 py-1 text-slate-1000/70">
                                    Workspace defaults
                                </Badge>
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1.05fr)_280px]">
                            <div className="rounded-[24px] border border-slate-400 bg-gradient-to-br from-slate-100 to-slate-50 px-4 py-4 text-slate-1000">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="rounded-[16px] border border-slate-500 bg-slate-50/10 p-2 text-orange-800">
                                            <Palette className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <Text className="!text-[10px] uppercase tracking-[0.28em] text-slate-1000/45">Appearance</Text>
                                            <Heading as="h5" className="mt-1 !text-slate-1000">Theme and density</Heading>
                                        </div>
                                    </div>
                                    <Badge variant="soft" color="orange" className="rounded-full px-3 py-1">
                                        Recommended
                                    </Badge>
                                </div>

                                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                                    {themeModes.map((mode) => {
                                        const Icon = mode.icon

                                        return (
                                            <button
                                                key={mode.label}
                                                type="button"
                                                className={`rounded-[20px] border px-3 py-3 text-left ${
                                                    mode.active
                                                        ? "border-orange-800/25 bg-gradient-to-br from-amber-900/18 to-orange-800/20 text-slate-1000"
                                                        : "border-slate-400 bg-slate-50/70 text-slate-1000/72 hover:bg-slate-50"
                                                }`}
                                            >
                                                <Icon className={`h-4 w-4 ${mode.active ? "text-orange-800" : "text-slate-700"}`} />
                                                <Text className={`mt-3 !text-sm font-medium ${mode.active ? "!text-slate-1000" : "!text-slate-1000"}`}>
                                                    {mode.label}
                                                </Text>
                                                <Text className={`mt-1 !text-[11px] ${mode.active ? "text-slate-1000/62" : "text-slate-1000/58"}`}>
                                                    {mode.label === "Dark" ? "High-contrast workspace" : mode.label === "System" ? "Follow active OS mode" : "Compact device preview"}
                                                </Text>
                                            </button>
                                        )
                                    })}
                                </div>

                                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                                    <div className="rounded-[20px] border border-slate-400 bg-slate-50/70 p-3">
                                        <div className="flex items-center justify-between gap-2">
                                            <Text className="!text-sm font-medium !text-slate-1000">Interface density</Text>
                                            <Text className="!text-xs text-slate-1000/52">Compact</Text>
                                        </div>
                                        <div className="mt-3 flex h-2 gap-1 rounded-full bg-slate-1000/[0.08] p-0.5">
                                            <span className="h-full w-[62%] rounded-full bg-gradient-to-r from-amber-900 to-orange-800" />
                                            <span className="h-full flex-1 rounded-full bg-slate-1000/[0.08]" />
                                        </div>
                                    </div>
                                    <div className="rounded-[20px] border border-slate-400 bg-slate-50/70 p-3">
                                        <div className="flex items-center justify-between gap-2">
                                            <Text className="!text-sm font-medium !text-slate-1000">Accent intensity</Text>
                                            <Text className="!text-xs text-slate-1000/52">Balanced</Text>
                                        </div>
                                        <div className="mt-3 flex h-2 gap-1 rounded-full bg-slate-1000/[0.08] p-0.5">
                                            <span className="h-full w-[48%] rounded-full bg-gradient-to-r from-bronze-900 to-orange-800" />
                                            <span className="h-full flex-1 rounded-full bg-slate-1000/[0.08]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[24px] border border-slate-500 bg-gradient-to-br from-slate-100 via-mauve-100 to-slate-50 p-4">
                                <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Smart Defaults</Text>
                                <Heading as="h5" className="mt-2 !text-slate-1000">Session profile</Heading>

                                <div className="mt-4 space-y-3">
                                    {automationRows.map((item, index) => (
                                        <div key={item.label} className="rounded-[18px] border border-slate-500 bg-slate-1000/[0.03] px-3 py-2.5">
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <Text className="!text-sm font-medium !text-slate-1000">{item.label}</Text>
                                                    <Text className="mt-1 !text-[11px] text-slate-1000/58">{item.status}</Text>
                                                </div>
                                                <span className={`h-2.5 w-2.5 rounded-full ${index < 2 ? "bg-green-800" : "bg-orange-800"}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 rounded-[20px] border border-slate-400 bg-slate-50/75 px-3 py-3 text-slate-1000">
                                    <Text className="!text-[10px] uppercase tracking-[0.28em] text-slate-1000/45">Focus Mode</Text>
                                    <Text className="mt-2 !text-sm text-slate-1000/68">
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
                            action={<div className="rounded-full border border-slate-500 bg-slate-1000/[0.04] px-3 py-1.5"><Text className="!text-[11px] text-slate-1000/62">4 channels active</Text></div>}
                        >
                            <div className="space-y-2.5">
                                {notificationRows.map((row) => (
                                    <div key={row.label} className="flex items-center justify-between gap-3 rounded-[18px] border border-slate-500 bg-slate-1000/[0.03] px-3 py-3">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <BellRing className="h-4 w-4 text-orange-800" />
                                                <Text className="truncate !text-sm font-medium !text-slate-1000">{row.label}</Text>
                                            </div>
                                            <Text className="mt-1 !text-[11px] text-slate-1000/58">{row.detail}</Text>
                                        </div>
                                        <Toggle enabled={row.enabled} />
                                    </div>
                                ))}
                            </div>
                        </SectionCard>

                        <SectionCard
                            eyebrow="Privacy"
                            title="Share only what matters"
                            description="Workspace visibility, link permissions, and local protections grouped into one compact review block."
                            action={<Button variant="solid" className="rounded-full border-0 bg-gradient-to-r from-amber-900 to-orange-800 px-3 py-2 !text-slate-1000">Apply</Button>}
                            accent
                        >
                            <div className="grid gap-2.5 sm:grid-cols-2">
                                <div className="rounded-[18px] border border-slate-400 bg-slate-50/75 px-3 py-3 text-slate-1000">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-green-800" />
                                        <Text className="!text-sm font-medium !text-slate-1000">Trusted workspace</Text>
                                    </div>
                                    <Text className="mt-2 !text-[11px] text-slate-1000/58">Single-team access, signed exports, and strict previews.</Text>
                                </div>
                                <div className="rounded-[18px] border border-slate-500 bg-slate-1000/[0.03] px-3 py-3">
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-blue-800" />
                                        <Text className="!text-sm font-medium !text-slate-1000">Link scope</Text>
                                    </div>
                                    <Text className="mt-2 !text-[11px] text-slate-1000/58">Restricted to teammates with comment access.</Text>
                                </div>
                                <div className="rounded-[18px] border border-slate-500 bg-slate-1000/[0.03] px-3 py-3">
                                    <div className="flex items-center gap-2">
                                        <Lock className="h-4 w-4 text-bronze-800" />
                                        <Text className="!text-sm font-medium !text-slate-1000">Auto-lock</Text>
                                    </div>
                                    <Text className="mt-2 !text-[11px] text-slate-1000/58">Relock sensitive panels after 5 minutes of inactivity.</Text>
                                </div>
                                <div className="rounded-[18px] border border-slate-500 bg-slate-1000/[0.03] px-3 py-3">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-orange-800" />
                                        <Text className="!text-sm font-medium !text-slate-1000">Redaction assist</Text>
                                    </div>
                                    <Text className="mt-2 !text-[11px] text-slate-1000/58">Suggests scrubbed fields before screenshots or export.</Text>
                                </div>
                            </div>
                        </SectionCard>
                    </div>

                    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
                        <SectionCard
                            eyebrow="Playback and Behavior"
                            title="Micro-preferences, handled cleanly"
                            description="The lower-granularity controls are still readable when the layout is compact."
                            action={<Badge variant="outline" className="rounded-full border-slate-500 bg-slate-1000/[0.03] px-3 py-1 text-slate-1000/62">6 active rules</Badge>}
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
                                        <div key={item.title} className="rounded-[18px] border border-slate-500 bg-slate-1000/[0.03] px-3 py-3">
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-[14px] border border-slate-500 bg-slate-1000/[0.05] p-2 text-orange-800">
                                                        <Icon className="h-4 w-4" />
                                                    </div>
                                                    <Text className="!text-sm font-medium !text-slate-1000">{item.title}</Text>
                                                </div>
                                                <Toggle enabled={item.enabled} />
                                            </div>
                                            <Text className="mt-2 !text-[11px] text-slate-1000/58">{item.detail}</Text>
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
                                    <div key={item} className="flex items-start gap-2 rounded-[18px] border border-slate-500 bg-slate-1000/[0.03] px-3 py-2.5">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-orange-800" />
                                        <Text className="!text-[11px] text-slate-1000/68">{item}</Text>
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
