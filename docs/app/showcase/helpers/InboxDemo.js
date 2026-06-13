"use client"

import Badge from "@radui/ui/Badge"
import Button from "@radui/ui/Button"
import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"
import {
    Archive,
    CheckCheck,
    ChevronRight,
    Clock3,
    Inbox,
    Pencil,
    Search,
    Send,
    ShieldCheck,
    Star,
    Tag,
    Trash2,
    TriangleAlert,
    Users,
} from "lucide-react"

const mailboxItems = [
    { label: "Inbox", count: 18, active: true, icon: Inbox },
    { label: "Sent", count: 6, icon: Send },
    { label: "Archive", count: 142, icon: Archive },
    { label: "Scheduled", count: 4, icon: Clock3 },
]

const categoryItems = [
    { label: "Product", tone: "bg-blue-800" },
    { label: "Finance", tone: "bg-green-800" },
    { label: "Legal", tone: "bg-bronze-800" },
    { label: "Needs reply", tone: "bg-orange-800" },
]

const inboxRows = [
    {
        sender: "Acme Finance",
        subject: "Q2 budget approval and revised vendor totals",
        preview: "Need final sign-off before the board packet is locked.",
        time: "8:42",
        unread: true,
        active: true,
        star: true,
    },
    {
        sender: "Nina Carter",
        subject: "Updated launch copy for review",
        preview: "Tightened the right rail messaging and the hero badge language.",
        time: "8:19",
        unread: true,
        star: false,
    },
    {
        sender: "Ops Digest",
        subject: "Checkout performance improved 11%",
        preview: "Compact purchase controls are reducing abandonment in mobile sessions.",
        time: "Yesterday",
        unread: false,
        star: true,
    },
    {
        sender: "Legal",
        subject: "Contract redlines are ready",
        preview: "Please confirm whether we can circulate the revised language today.",
        time: "Yesterday",
        unread: false,
        star: false,
    },
]

const messageBullets = [
    "Vendor consolidation moved annual spend down by 6.4%.",
    "Two line items still need approval before Thursday 5 PM.",
    "Board packet export is scheduled immediately after sign-off.",
]

const sidebarNotes = [
    "18 unread messages remain across Product and Finance.",
    "Three threads are waiting on your reply today.",
    "Automated triage tagged four high-priority messages correctly.",
]

const InboxDemo = () => {
    return (
        <div className="grid min-h-[780px] lg:grid-cols-[216px_320px_minmax(0,1fr)]">
            <aside className="border-b border-slate-500 bg-gradient-to-b from-slate-200 via-mauve-100 to-slate-100 px-3 py-3 lg:border-b-0 lg:border-r">
                <div className="rounded-[24px] border border-slate-500 bg-slate-50 px-3 py-3">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <Text className="!text-[10px] uppercase tracking-[0.28em] text-slate-1000/45">Mail</Text>
                            <Heading as="h5" className="mt-1 !text-slate-1000">Relay Inbox</Heading>
                        </div>
                        <Badge variant="soft" color="orange" className="rounded-full px-2.5 py-1">
                            Live
                        </Badge>
                    </div>
                    <Text className="mt-3 !text-sm text-slate-1000/65">
                        A compact inbox surface for heavier triage, closer to real email clients than a generic communications mockup.
                    </Text>
                </div>

                <Button variant="solid" className="mt-4 w-full rounded-[18px] border-0 bg-gradient-to-r from-amber-900 to-orange-800 px-4 py-2.5 !text-slate-1000">
                    <span className="flex items-center justify-center gap-2">
                        <Pencil className="h-4 w-4" />
                        Compose
                    </span>
                </Button>

                <div className="mt-4 space-y-1.5">
                    {mailboxItems.map((item) => {
                        const Icon = item.icon

                        return (
                            <button
                                key={item.label}
                                type="button"
                                className={`flex w-full items-center justify-between rounded-[18px] px-3 py-2.5 text-left ${
                                    item.active
                                        ? "bg-slate-200 text-slate-1000"
                                        : "text-slate-1000/65 hover:bg-slate-1000/[0.04] hover:text-slate-1000"
                                }`}
                            >
                                <span className="flex items-center gap-2.5">
                                    <Icon className="h-4 w-4" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </span>
                                <span className={`rounded-full px-2 py-0.5 text-[11px] ${item.active ? "bg-orange-800 text-slate-50" : "bg-slate-1000/[0.05] text-slate-1000/60"}`}>
                                    {item.count}
                                </span>
                            </button>
                        )
                    })}
                </div>

                <div className="mt-4 rounded-[24px] border border-slate-500 bg-slate-50 p-3">
                    <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Labels</Text>
                    <div className="mt-3 space-y-2">
                        {categoryItems.map((item) => (
                            <div key={item.label} className="flex items-center gap-2 rounded-[16px] border border-slate-500 bg-slate-1000/[0.03] px-3 py-2">
                                <span className={`h-2.5 w-2.5 rounded-full ${item.tone}`} />
                                <Text className="!text-sm text-slate-1000">{item.label}</Text>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            <section className="border-b border-slate-500 bg-gradient-to-b from-slate-50 via-mauve-50 to-slate-100 px-3 py-3 lg:border-b-0 lg:border-r">
                <div className="rounded-[20px] border border-slate-500 bg-slate-1000/[0.03] px-3 py-2.5">
                    <div className="flex items-center gap-2.5 text-slate-1000/60">
                        <Search className="h-4 w-4" />
                        <Text className="!text-sm text-slate-1000/55">Search mail</Text>
                    </div>
                </div>

                <div className="mt-4 rounded-[24px] border border-slate-500 bg-slate-50">
                    <div className="flex items-center justify-between gap-3 border-b border-slate-500 px-3 py-3">
                        <div>
                            <Text className="!text-[10px] uppercase tracking-[0.28em] text-slate-1000/45">Primary</Text>
                            <Heading as="h5" className="mt-1 !text-slate-1000">Inbox</Heading>
                        </div>
                        <Badge variant="outline" className="rounded-full border-slate-500 bg-slate-1000/[0.03] px-3 py-1 text-slate-1000/60">
                            18 unread
                        </Badge>
                    </div>

                    <div className="divide-y divide-slate-500">
                        {inboxRows.map((mail) => (
                            <button
                                key={mail.subject}
                                type="button"
                                className={`flex w-full items-start gap-3 px-3 py-3 text-left ${
                                    mail.active
                                        ? "bg-gradient-to-r from-amber-900/12 to-orange-800/10"
                                        : "hover:bg-slate-1000/[0.03]"
                                }`}
                            >
                                <button type="button" className="mt-0.5 text-slate-1000/45">
                                    <Star className={`h-4 w-4 ${mail.star ? "fill-orange-800 text-orange-800" : ""}`} />
                                </button>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <Text className={`truncate !text-sm ${mail.unread ? "font-semibold !text-slate-1000" : "font-medium !text-slate-1000/75"}`}>
                                            {mail.sender}
                                        </Text>
                                        <Text className="shrink-0 !text-[11px] text-slate-1000/45">{mail.time}</Text>
                                    </div>
                                    <Text className={`mt-1 truncate !text-sm ${mail.unread ? "font-medium !text-slate-1000" : "!text-slate-1000/72"}`}>
                                        {mail.subject}
                                    </Text>
                                    <Text className="mt-1 line-clamp-2 !text-[11px] text-slate-1000/55">
                                        {mail.preview}
                                    </Text>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <main className="min-w-0 bg-gradient-to-br from-slate-50 via-mauve-50 to-slate-100 p-3 sm:p-4">
                <div className="space-y-3">
                    <section className="rounded-[28px] border border-slate-500 bg-gradient-to-br from-slate-50 via-mauve-50 to-slate-100 p-4">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-3xl">
                                <Text className="!text-[10px] uppercase tracking-[0.34em] text-orange-900">Inbox Showcase</Text>
                                <Heading as="h2" className="mt-2 !text-slate-1000">
                                    Email UI with real triage rhythm.
                                </Heading>
                                <Text className="mt-2 max-w-3xl !text-sm text-slate-1000/68">
                                    Dense mailbox chrome, clearer sender hierarchy, and a practical reading pane push this closer to Gmail or Outlook behavior than a generic list-and-card layout.
                                </Text>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {[
                                    { label: "Archive", icon: Archive },
                                    { label: "Label", icon: Tag },
                                    { label: "Spam", icon: TriangleAlert },
                                    { label: "Delete", icon: Trash2 },
                                ].map((item) => {
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

                    <section className="rounded-[26px] border border-slate-500 bg-slate-50">
                        <div className="flex items-center justify-between gap-3 border-b border-slate-500 px-4 py-3">
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <Text className="truncate !text-sm font-semibold !text-slate-1000">Q2 budget approval and revised vendor totals</Text>
                                    <Badge variant="soft" color="orange" className="rounded-full px-2.5 py-1">
                                        Needs reply
                                    </Badge>
                                </div>
                                <Text className="mt-1 !text-[11px] text-slate-1000/52">
                                    Acme Finance · to leadership@acme.dev · 8:42 AM
                                </Text>
                            </div>

                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="rounded-full border-slate-500 bg-slate-1000/[0.03] px-3 py-1 text-slate-1000/60">
                                    Threaded
                                </Badge>
                                <button type="button" className="rounded-full border border-slate-500 bg-slate-1000/[0.03] p-2 text-slate-1000/55 hover:bg-slate-1000/[0.06] hover:text-slate-1000">
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-3 p-4 xl:grid-cols-[minmax(0,1fr)_280px]">
                            <article className="rounded-[24px] border border-slate-500 bg-gradient-to-br from-slate-50 via-mauve-50 to-slate-100 p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <Text className="!text-[10px] uppercase tracking-[0.28em] text-slate-1000/45">Reading pane</Text>
                                        <Text className="mt-2 !text-sm font-semibold !text-slate-1000">From: Acme Finance</Text>
                                        <Text className="mt-1 !text-[11px] text-slate-1000/58">
                                            Mara Jensen · VP Finance · finance@acme.dev
                                        </Text>
                                    </div>
                                    <div className="flex items-center gap-2 rounded-full border border-slate-500 bg-slate-1000/[0.03] px-3 py-1.5">
                                        <CheckCheck className="h-4 w-4 text-green-800" />
                                        <Text className="!text-[11px] text-slate-1000/60">AI triaged</Text>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-4">
                                    <Text className="!text-sm leading-7 text-slate-1000/78">
                                        We closed the vendor reconciliation pass and the numbers are ready for final sign-off. If the revised totals look correct, we can push the approved packet to the board workflow this afternoon.
                                    </Text>

                                    <div className="rounded-[20px] border border-slate-400 bg-gradient-to-br from-slate-100 to-slate-50 px-4 py-4 text-slate-1000">
                                        <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Executive summary</Text>
                                        <div className="mt-3 space-y-2.5">
                                            {messageBullets.map((item) => (
                                                <div key={item} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-800" />
                                                    <Text className="!text-[11px] text-slate-1000/62">{item}</Text>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Text className="!text-sm leading-7 text-slate-1000/78">
                                        Please reply with approval or any changes before 5 PM so the final export stays on schedule. I also attached the condensed variance sheet to make the review pass faster.
                                    </Text>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2.5">
                                    <Button variant="solid" className="rounded-full border-0 bg-gradient-to-r from-amber-900 to-orange-800 px-4 py-2.5 !text-slate-1000">
                                        Reply
                                    </Button>
                                    <Button variant="outline" className="rounded-full border-slate-500 bg-slate-1000/[0.03] px-4 py-2.5 text-slate-1000 hover:bg-slate-1000/[0.06]">
                                        Forward
                                    </Button>
                                </div>
                            </article>

                            <aside className="space-y-3">
                                <section className="rounded-[24px] border border-slate-400 bg-gradient-to-br from-slate-100 to-slate-50 px-4 py-4 text-slate-1000">
                                    <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Thread state</Text>
                                    <div className="mt-3 space-y-2.5">
                                        <div className="rounded-[18px] border border-slate-400 bg-slate-50/70 px-3 py-2.5">
                                            <div className="flex items-center justify-between gap-2">
                                                <Text className="!text-sm font-medium !text-slate-1000">Priority</Text>
                                                <Text className="!text-[11px] text-orange-800">High</Text>
                                            </div>
                                        </div>
                                        <div className="rounded-[18px] border border-slate-400 bg-slate-50/70 px-3 py-2.5">
                                            <div className="flex items-center justify-between gap-2">
                                                <Text className="!text-sm font-medium !text-slate-1000">Stakeholders</Text>
                                                <span className="flex items-center gap-1 text-slate-1000/65">
                                                    <Users className="h-4 w-4" />
                                                    <span className="text-[11px]">5</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="rounded-[18px] border border-slate-400 bg-slate-50/70 px-3 py-2.5">
                                            <div className="flex items-center justify-between gap-2">
                                                <Text className="!text-sm font-medium !text-slate-1000">Protection</Text>
                                                <span className="flex items-center gap-1 text-green-800">
                                                    <ShieldCheck className="h-4 w-4" />
                                                    <span className="text-[11px]">Verified</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="rounded-[24px] border border-slate-500 bg-gradient-to-br from-slate-100 via-mauve-100 to-slate-50 p-4">
                                    <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Triage notes</Text>
                                    <Heading as="h5" className="mt-2 !text-slate-1000">Inbox health</Heading>
                                    <div className="mt-3 space-y-2.5">
                                        {sidebarNotes.map((item) => (
                                            <div key={item} className="flex items-start gap-2 rounded-[18px] border border-slate-500 bg-slate-1000/[0.03] px-3 py-2.5">
                                                <span className="mt-1 h-2 w-2 rounded-full bg-orange-800" />
                                                <Text className="!text-[11px] text-slate-1000/62">{item}</Text>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </aside>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default InboxDemo
