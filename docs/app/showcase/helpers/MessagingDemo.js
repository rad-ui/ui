"use client"

import Badge from "@radui/ui/Badge"
import Button from "@radui/ui/Button"
import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"
import {
    Bell,
    CheckCheck,
    ChevronRight,
    CircleDot,
    Command,
    Paperclip,
    Phone,
    Plus,
    Search,
    Send,
    Smile,
    Star,
    Video,
} from "lucide-react"

const channels = [
    { label: "Product launch", unread: 3, active: true },
    { label: "Design crit" },
    { label: "Growth sync", unread: 1 },
    { label: "Support ops" },
]

const threads = [
    { name: "Nina", preview: "Tightened the CTA spacing and notes rail.", time: "2m", active: true, online: true },
    { name: "Leo", preview: "Can you review the latest commerce pass?", time: "11m", online: true },
    { name: "Amara", preview: "Pushed a cleaner compact header option.", time: "23m" },
    { name: "Ops feed", preview: "Checkout confidence spiked after the copy refresh.", time: "1h" },
]

const messages = [
    {
        author: "Nina",
        role: "Product Design",
        side: "left",
        time: "09:14",
        text: "The new product page is landing. I think the right rail can get denser without hurting scan speed.",
    },
    {
        author: "You",
        role: "Workspace",
        side: "right",
        time: "09:16",
        text: "Agreed. I’m compressing the trust stack and making the recommendations feel more intentional.",
    },
    {
        author: "Nina",
        role: "Product Design",
        side: "left",
        time: "09:18",
        text: "Perfect. Also, can we keep the chat demo compact? The current showcase feels strongest when the chrome stays tight.",
    },
    {
        author: "You",
        role: "Workspace",
        side: "right",
        time: "09:20",
        text: "Yes. I’m building this page around denser rows, smaller bubbles, and clearer side context instead of oversized cards.",
    },
]

const activityItems = [
    "Pinned specs summary to the launch room.",
    "Muted low-priority release notifications.",
    "Shared product-page preview with the team.",
]

const quickActions = [
    { label: "Search", icon: Search },
    { label: "Call", icon: Phone },
    { label: "Video", icon: Video },
]

const MessagingDemo = () => {
    return (
        <div className="grid min-h-[780px] lg:grid-cols-[220px_minmax(0,1fr)_300px]">
            <aside className="border-b border-slate-500 bg-gradient-to-b from-slate-200 via-mauve-100 to-slate-100 px-3 py-3 lg:border-b-0 lg:border-r">
                <div className="rounded-[24px] border border-slate-500 bg-slate-50 px-3 py-3">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <Text className="!text-[10px] uppercase tracking-[0.28em] text-slate-1000/45">Messaging</Text>
                            <Heading as="h5" className="mt-1 !text-slate-1000">Team Relay</Heading>
                        </div>
                        <Badge variant="soft" color="orange" className="rounded-full px-2.5 py-1">
                            Live
                        </Badge>
                    </div>
                    <Text className="mt-3 !text-sm text-slate-1000/65">
                        A compact multi-pane chat surface with a clearer reading column and lighter secondary chrome.
                    </Text>
                </div>

                <div className="mt-4 rounded-[20px] border border-slate-500 bg-slate-1000/[0.03] px-3 py-2.5">
                    <div className="flex items-center gap-2.5 text-slate-1000/60">
                        <Search className="h-4 w-4" />
                        <Text className="!text-sm text-slate-1000/55">Search conversations</Text>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                        <Text className="!text-[10px] uppercase tracking-[0.28em] text-slate-1000/45">Channels</Text>
                        <button type="button" className="rounded-full border border-slate-500 bg-slate-1000/[0.03] p-1.5 text-slate-1000/55 hover:bg-slate-1000/[0.06] hover:text-slate-1000">
                            <Plus className="h-3.5 w-3.5" />
                        </button>
                    </div>
                    <div className="space-y-1.5">
                        {channels.map((channel) => (
                            <button
                                key={channel.label}
                                type="button"
                                className={`flex w-full items-center justify-between rounded-[18px] px-3 py-2.5 text-left ${
                                    channel.active
                                        ? "bg-slate-200 text-slate-1000"
                                        : "text-slate-1000/65 hover:bg-slate-1000/[0.04] hover:text-slate-1000"
                                }`}
                            >
                                <span className="truncate text-sm font-medium">{channel.label}</span>
                                {channel.unread ? (
                                    <span className={`rounded-full px-2 py-0.5 text-[11px] ${channel.active ? "bg-orange-800 text-slate-50" : "bg-slate-1000/[0.06] text-slate-1000/65"}`}>
                                        {channel.unread}
                                    </span>
                                ) : (
                                    <ChevronRight className="h-4 w-4 opacity-50" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-4 rounded-[24px] border border-slate-500 bg-slate-50 p-3">
                    <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Signal Layer</Text>
                    <div className="mt-3 space-y-2.5">
                        <div className="flex items-center gap-2 rounded-[18px] border border-slate-500 bg-slate-1000/[0.03] px-3 py-2.5">
                            <Bell className="h-4 w-4 text-orange-800" />
                            <Text className="!text-sm text-slate-1000">Focus notifications only</Text>
                        </div>
                        <div className="flex items-center gap-2 rounded-[18px] border border-slate-500 bg-slate-1000/[0.03] px-3 py-2.5">
                            <Command className="h-4 w-4 text-blue-800" />
                            <Text className="!text-sm text-slate-1000">Quick command palette</Text>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="min-w-0 border-b border-slate-500 bg-gradient-to-br from-slate-50 via-mauve-50 to-slate-100 p-3 sm:p-4 lg:border-b-0 lg:border-r">
                <div className="space-y-3">
                    <section className="rounded-[28px] border border-slate-500 bg-gradient-to-br from-slate-50 via-mauve-50 to-slate-100 p-4">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl">
                                <Text className="!text-[10px] uppercase tracking-[0.34em] text-orange-900">Messaging Showcase</Text>
                                <Heading as="h2" className="mt-2 !text-slate-1000">
                                    Chat UI built for real throughput.
                                </Heading>
                                <Text className="mt-2 max-w-2xl !text-sm text-slate-1000/68">
                                    Smaller bubbles, stronger column balance, and practical side context make the interface feel usable instead of decorative.
                                </Text>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {quickActions.map((item) => {
                                    const Icon = item.icon

                                    return (
                                        <button
                                            key={item.label}
                                            type="button"
                                            className="flex items-center gap-2 rounded-full border border-slate-500 bg-slate-1000/[0.03] px-3 py-2 text-slate-1000/68 hover:bg-slate-1000/[0.06] hover:text-slate-1000"
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </section>

                    <section className="overflow-hidden rounded-[26px] border border-slate-400 bg-gradient-to-br from-slate-100 to-slate-50">
                        <div className="flex items-center justify-between gap-3 border-b border-slate-400 px-4 py-3 text-slate-1000">
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-800" />
                                    <Text className="truncate !text-sm font-medium !text-slate-1000">Product launch</Text>
                                </div>
                                <Text className="mt-1 !text-[11px] text-slate-1000/52">Nina and 6 others active in this room</Text>
                            </div>

                            <div className="flex items-center gap-2">
                                <Badge variant="soft" color="orange" className="rounded-full px-3 py-1">
                                    Syncing
                                </Badge>
                                <button type="button" className="rounded-full border border-slate-400 bg-slate-50/70 p-2 text-slate-1000/55 hover:bg-slate-50 hover:text-slate-1000">
                                    <Phone className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-0 xl:grid-cols-[240px_minmax(0,1fr)]">
                            <div className="border-b border-slate-400 bg-slate-50/40 p-3 xl:border-b-0 xl:border-r">
                                <Text className="mb-2 !text-[10px] uppercase tracking-[0.28em] text-slate-1000/45">Inbox</Text>
                                <div className="space-y-1.5">
                                    {threads.map((thread) => (
                                        <button
                                            key={thread.name}
                                            type="button"
                                            className={`flex w-full items-start justify-between gap-3 rounded-[18px] px-3 py-2.5 text-left ${
                                                thread.active
                                                    ? "bg-slate-200 text-slate-1000"
                                                    : "text-slate-1000/72 hover:bg-slate-1000/[0.04] hover:text-slate-1000"
                                            }`}
                                        >
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <Text className={`truncate !text-sm font-medium ${thread.active ? "!text-slate-1000" : "!text-slate-1000"}`}>
                                                        {thread.name}
                                                    </Text>
                                                    {thread.online ? <span className="h-2 w-2 rounded-full bg-green-800" /> : null}
                                                </div>
                                                <Text className={`mt-1 truncate !text-[11px] ${thread.active ? "text-slate-1000/55" : "text-slate-1000/58"}`}>
                                                    {thread.preview}
                                                </Text>
                                            </div>
                                            <Text className={`shrink-0 !text-[11px] ${thread.active ? "text-slate-1000/45" : "text-slate-1000/52"}`}>
                                                {thread.time}
                                            </Text>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex min-h-[520px] flex-col bg-gradient-to-b from-slate-50 via-slate-100 to-mauve-50 text-slate-1000">
                                <div className="flex-1 space-y-3 px-4 py-4">
                                    {messages.map((message) => (
                                        <div
                                            key={`${message.author}-${message.time}`}
                                            className={`flex ${message.side === "right" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className={`max-w-[78%] ${message.side === "right" ? "items-end" : "items-start"} flex flex-col`}>
                                                <div className="mb-1 flex items-center gap-2 text-[11px] text-slate-1000/45">
                                                    <span>{message.author}</span>
                                                    <span>•</span>
                                                    <span>{message.role}</span>
                                                    <span>•</span>
                                                    <span>{message.time}</span>
                                                </div>
                                                <div
                                                    className={`rounded-[20px] px-3.5 py-3 text-sm leading-6 ${
                                                        message.side === "right"
                                                            ? "bg-gradient-to-r from-amber-900 to-orange-800 text-slate-50"
                                                            : "border border-slate-400 bg-slate-50/80 text-slate-1000"
                                                    }`}
                                                >
                                                    {message.text}
                                                </div>
                                                {message.side === "right" ? (
                                                    <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-1000/45">
                                                        <CheckCheck className="h-3.5 w-3.5" />
                                                        <span>Read</span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-slate-400 px-4 py-3">
                                    <div className="flex items-end gap-2 rounded-[22px] border border-slate-400 bg-slate-50/75 px-3 py-2.5">
                                        <button type="button" className="rounded-full border border-slate-400 bg-slate-50 p-2 text-slate-1000/55 hover:bg-slate-100 hover:text-slate-1000">
                                            <Paperclip className="h-4 w-4" />
                                        </button>
                                        <div className="min-h-[44px] flex-1">
                                            <Text className="!text-sm text-slate-1000/58">
                                                Drop a note for the launch room. Keep it short, actionable, and easy to scan.
                                            </Text>
                                        </div>
                                        <button type="button" className="rounded-full border border-slate-400 bg-slate-50 p-2 text-slate-1000/55 hover:bg-slate-100 hover:text-slate-1000">
                                            <Smile className="h-4 w-4" />
                                        </button>
                                        <Button variant="solid" className="rounded-full border-0 bg-gradient-to-r from-amber-900 to-orange-800 px-3 py-2 !text-slate-1000">
                                            <span className="flex items-center gap-2">
                                                <Send className="h-4 w-4" />
                                                Send
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <aside className="bg-gradient-to-b from-slate-200 via-mauve-100 to-slate-100 p-3 sm:p-4">
                <div className="space-y-3">
                    <section className="rounded-[24px] border border-slate-500 bg-slate-50 p-4">
                        <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Room Context</Text>
                        <Heading as="h5" className="mt-2 !text-slate-1000">Launch notes</Heading>
                        <Text className="mt-2 !text-sm text-slate-1000/65">
                            Side context stays visible without overwhelming the chat stream: pinned updates, room status, and compact task breadcrumbs.
                        </Text>
                    </section>

                    <section className="rounded-[24px] border border-slate-400 bg-gradient-to-br from-slate-100 to-slate-50 px-4 py-4 text-slate-1000">
                        <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Pinned activity</Text>
                        <div className="mt-3 space-y-2.5">
                            {activityItems.map((item) => (
                                <div key={item} className="flex items-start gap-2 rounded-[18px] border border-slate-400 bg-slate-50/70 px-3 py-2.5">
                                    <CircleDot className="mt-0.5 h-4 w-4 text-orange-800" />
                                    <Text className="!text-[11px] text-slate-1000/62">{item}</Text>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[24px] border border-slate-500 bg-gradient-to-br from-slate-100 via-mauve-100 to-slate-50 p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Team pulse</Text>
                                <Heading as="h5" className="mt-2 !text-slate-1000">Response health</Heading>
                            </div>
                            <Star className="h-4 w-4 text-orange-800" />
                        </div>

                        <div className="mt-4 rounded-[20px] border border-slate-500 bg-slate-1000/[0.03] p-3">
                            <div className="flex items-center justify-between gap-2">
                                <Text className="!text-sm font-medium !text-slate-1000">Median response time</Text>
                                <Text className="!text-[11px] text-green-800">4m</Text>
                            </div>
                            <div className="mt-3 flex h-2 gap-1 rounded-full bg-slate-1000/[0.06] p-0.5">
                                <span className="h-full w-[72%] rounded-full bg-gradient-to-r from-amber-900 to-orange-800" />
                                <span className="h-full flex-1 rounded-full bg-slate-1000/[0.08]" />
                            </div>
                        </div>
                    </section>
                </div>
            </aside>
        </div>
    )
}

export default MessagingDemo
