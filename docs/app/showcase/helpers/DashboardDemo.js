"use client"

import Badge from "@radui/ui/Badge"
import Button from "@radui/ui/Button"
import Card from "@radui/ui/Card"
import Heading from "@radui/ui/Heading"
import Table from "@radui/ui/Table"
import Text from "@radui/ui/Text"
import {
    ArrowUpRight,
    Bell,
    ChevronRight,
    FileText,
    FolderKanban,
    HelpCircle,
    LayoutDashboard,
    MoreHorizontal,
    Search,
    Settings,
    Sparkles,
    TrendingDown,
    TrendingUp,
    Users,
} from "lucide-react"

const metricCards = [
    {
        title: "Total Revenue",
        value: "$1,250.00",
        delta: "+12.5%",
        detail: "Trending up this month",
        note: "Visitors for the last 6 months",
        icon: TrendingUp,
        tone: "text-green-1000",
        badgeColor: "green",
    },
    {
        title: "New Customers",
        value: "1,234",
        delta: "-20%",
        detail: "Down 20% this period",
        note: "Acquisition needs attention",
        icon: TrendingDown,
        tone: "text-red-1000",
        badgeColor: "red",
    },
    {
        title: "Active Accounts",
        value: "45,678",
        delta: "+12.5%",
        detail: "Strong user retention",
        note: "Engagement exceeds targets",
        icon: Users,
        tone: "text-blue-1000",
        badgeColor: "blue",
    },
    {
        title: "Growth Rate",
        value: "4.5%",
        delta: "+4.5%",
        detail: "Steady performance increase",
        note: "Meets growth projections",
        icon: ArrowUpRight,
        tone: "text-orange-1000",
        badgeColor: "orange",
    },
]

const chartBars = [
    { month: "Jan", value: 44 },
    { month: "Feb", value: 58 },
    { month: "Mar", value: 73 },
    { month: "Apr", value: 67 },
    { month: "May", value: 85 },
    { month: "Jun", value: 96 },
]

const navGroups = [
    {
        label: "Workspace",
        items: [
            { label: "Dashboard", icon: LayoutDashboard, active: true },
            { label: "Lifecycle", icon: Sparkles },
            { label: "Analytics", icon: TrendingUp },
            { label: "Projects", icon: FolderKanban },
            { label: "Team", icon: Users },
        ],
    },
    {
        label: "Documents",
        items: [
            { label: "Data Library", icon: FileText },
            { label: "Reports", icon: FileText },
            { label: "Word Assistant", icon: Sparkles },
        ],
    },
]

const documents = [
    {
        name: "Cover page",
        type: "Overview",
        status: "In Process",
        target: "Target",
        limit: "Limit",
        reviewer: "Eddie Lake",
    },
    {
        name: "Table of contents",
        type: "Structure",
        status: "Done",
        target: "Target",
        limit: "Limit",
        reviewer: "Eddie Lake",
    },
    {
        name: "Executive summary",
        type: "Narrative",
        status: "Done",
        target: "Target",
        limit: "Limit",
        reviewer: "Jamik Tashpulatov",
    },
    {
        name: "Technical approach",
        type: "Narrative",
        status: "Done",
        target: "Target",
        limit: "Limit",
        reviewer: "Jamik Tashpulatov",
    },
    {
        name: "Design",
        type: "Narrative",
        status: "In Process",
        target: "Target",
        limit: "Limit",
        reviewer: "Jamik Tashpulatov",
    },
    {
        name: "Innovation and advantages",
        type: "Narrative",
        status: "Review",
        target: "Target",
        limit: "Limit",
        reviewer: "Assign reviewer",
    },
]

const quickActions = [
    "Create scope",
    "Invite reviewers",
    "Export draft",
]

const statusTone = {
    Done: "green",
    "In Process": "orange",
    Review: "blue",
}

const DashboardMetricCard = ({ card }) => {
    const Icon = card.icon

    return (
        <Card variant="outline" className="h-full rounded-[26px] border-slate-400 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-1000">
            <Card.Header className="space-y-5 p-0">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <Text className="!text-sm text-slate-300">{card.title}</Text>
                        <Heading as="h4" className="mt-5 !text-[1.85rem] !leading-none text-slate-1000">
                            {card.value}
                        </Heading>
                    </div>
                    <div className={`shrink-0 rounded-[20px] border border-slate-300 bg-slate-50 p-4 ${card.tone}`}>
                        <Icon className="h-5 w-5" />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="soft" color={card.badgeColor} className="rounded-full px-3 py-1">
                        <span className="font-semibold">{card.delta}</span>
                    </Badge>
                    <Text className="max-w-[14rem] !text-sm leading-6 text-slate-1000/68">{card.detail}</Text>
                </div>
            </Card.Header>
            <Card.Content className="mt-5 p-0">
                <Text className="!text-sm text-slate-1000/58">{card.note}</Text>
            </Card.Content>
        </Card>
    )
}

const DashboardSidebar = () => {
    return (
        <aside className="flex min-h-[880px] flex-col border-b border-slate-300 bg-gradient-to-b from-slate-100 via-slate-50 to-mauve-50 px-4 py-4 text-slate-1000 lg:min-h-[980px] lg:border-b-0 lg:border-r lg:border-slate-300">
            <div className="flex items-center justify-between gap-3 rounded-[24px] border border-slate-400 bg-slate-50/80 px-4 py-3">
                <div>
                    <Text className="!text-xs uppercase tracking-[0.28em] text-slate-1000/45">Showcase</Text>
                    <Heading as="h5" className="mt-1 !text-slate-1000">Acme Inc.</Heading>
                </div>
                <Badge variant="soft" color="green" className="rounded-full px-3 py-1">
                    Live
                </Badge>
            </div>

            <div className="mt-4 rounded-[22px] border border-slate-400 bg-slate-50/70 px-3 py-2.5">
                <div className="flex items-center gap-3 text-sm text-slate-1000/65">
                    <Search className="h-4 w-4" />
                    <span>Search dashboard</span>
                </div>
            </div>

            <div className="mt-6 space-y-6">
                {navGroups.map((group) => (
                    <div key={group.label}>
                        <Text className="mb-3 !text-[11px] uppercase tracking-[0.28em] text-slate-1000/45">
                            {group.label}
                        </Text>
                        <div className="space-y-1.5">
                            {group.items.map((item) => {
                                const Icon = item.icon

                                return (
                                    <button
                                        key={item.label}
                                        type="button"
                                        className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left ${
                                            item.active
                                                ? "bg-slate-200 text-slate-1000"
                                                : "text-slate-1000/72 hover:bg-slate-1000/[0.04] hover:text-slate-1000"
                                        }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <Icon className="h-4 w-4" />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </span>
                                        <ChevronRight className="h-4 w-4 opacity-50" />
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto space-y-2 pt-6">
                <button type="button" className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-slate-1000/68 hover:bg-slate-1000/[0.04] hover:text-slate-1000">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                </button>
                <button type="button" className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-slate-1000/68 hover:bg-slate-1000/[0.04] hover:text-slate-1000">
                    <HelpCircle className="h-4 w-4" />
                    <span>Get Help</span>
                </button>
            </div>
        </aside>
    )
}

const ChartPanel = () => {
    return (
        <Card variant="outline" className="rounded-[30px] border-slate-400 bg-gradient-to-br from-slate-100 to-slate-50 text-slate-1000">
            <Card.Header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <Text className="!text-sm text-slate-1000/58">Total Visitors</Text>
                    <Heading as="h3" className="mt-2 text-slate-1000">Performance snapshot</Heading>
                    <Text className="mt-2 max-w-xl !text-sm leading-6 text-slate-1000/68">
                        A compact chart surface that mirrors the shadcn dashboard rhythm while staying aligned
                        with Rad UI primitives and the docs site styling.
                    </Text>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="rounded-full border-slate-400 bg-slate-50 px-3 py-1 text-slate-1000/70">
                        Last 3 months
                    </Badge>
                    <Badge variant="ghost" className="rounded-full px-3 py-1 text-slate-1000/52">
                        Last 30 days
                    </Badge>
                    <Badge variant="ghost" className="rounded-full px-3 py-1 text-slate-1000/52">
                        Last 7 days
                    </Badge>
                </div>
            </Card.Header>
            <Card.Content>
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
                    <div className="rounded-[26px] border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-100 p-5">
                        <div className="flex items-end gap-3">
                            {chartBars.map((bar) => (
                                <div key={bar.month} className="flex flex-1 flex-col items-center gap-3">
                                    <div className="flex h-56 w-full items-end rounded-full bg-gradient-to-t from-sky-100 via-slate-50 to-slate-50 px-1.5 pb-1.5">
                                        <div
                                            className="w-full rounded-full bg-gradient-to-t from-blue-900 via-sky-700 to-cyan-500"
                                            style={{ height: `${bar.value}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-1000/40">
                                        {bar.month}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-[26px] border border-slate-300 bg-slate-50 p-5">
                            <Text className="!text-xs uppercase tracking-[0.26em] text-slate-1000/40">
                                View
                            </Text>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {["Outline", "Past Performance", "Key Personnel", "Focus Documents"].map((item, index) => (
                                    <Badge
                                        key={item}
                                        variant={index === 0 ? "soft" : "outline"}
                                        color={index === 0 ? "blue" : ""}
                                        className="rounded-full"
                                    >
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[26px] border border-slate-700 bg-gradient-to-br from-slate-50 via-slate-100 to-green-100 p-5">
                            <Text className="!text-xs uppercase tracking-[0.26em] text-slate-1000/50">
                                Quick Create
                            </Text>
                            <div className="mt-4 space-y-2">
                                {quickActions.map((action) => (
                                    <div key={action} className="flex items-center justify-between rounded-2xl border border-slate-50/70 bg-slate-50/80 px-3 py-2.5">
                                        <span className="text-sm font-medium text-slate-1000">{action}</span>
                                        <ArrowUpRight className="h-4 w-4 text-green-1000" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Content>
        </Card>
    )
}

const DocumentsTable = () => {
    return (
        <Card variant="outline" className="rounded-[30px] border-slate-300 bg-slate-50/85 backdrop-blur">
            <Card.Header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <Text className="!text-sm text-slate-1000/55">Documents</Text>
                    <Heading as="h3" className="mt-2 text-slate-1000">Delivery board</Heading>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="ghost" size="small" className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-1000">
                        Customize Columns
                    </Button>
                    <Button variant="solid" size="small" color="green" className="rounded-full px-4 py-2 text-sm">
                        Add Section
                    </Button>
                </div>
            </Card.Header>
            <Card.Content>
                <div className="overflow-hidden rounded-[24px] border border-slate-300 bg-slate-50">
                    <div className="overflow-x-auto">
                        <Table.Root>
                            <Table.Head>
                                <Table.Row>
                                    <Table.ColumnCellHeader>Header</Table.ColumnCellHeader>
                                    <Table.ColumnCellHeader>Section Type</Table.ColumnCellHeader>
                                    <Table.ColumnCellHeader>Status</Table.ColumnCellHeader>
                                    <Table.ColumnCellHeader>Target</Table.ColumnCellHeader>
                                    <Table.ColumnCellHeader>Limit</Table.ColumnCellHeader>
                                    <Table.ColumnCellHeader>Reviewer</Table.ColumnCellHeader>
                                    <Table.ColumnCellHeader aria-label="Actions" />
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                {documents.map((document) => (
                                    <Table.Row key={document.name}>
                                        <Table.Cell>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-slate-1000">{document.name}</span>
                                                <span className="mt-1 text-xs text-slate-1000/45">Drag to reorder</span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>{document.type}</Table.Cell>
                                        <Table.Cell>
                                            <Badge variant="soft" color={statusTone[document.status]} className="rounded-full">
                                                {document.status}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell>{document.target}</Table.Cell>
                                        <Table.Cell>{document.limit}</Table.Cell>
                                        <Table.Cell>{document.reviewer}</Table.Cell>
                                        <Table.Cell>
                                            <button type="button" className="rounded-full p-2 text-slate-1000/45 hover:bg-slate-100 hover:text-slate-1000">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 border-t border-slate-300 pt-4 text-sm text-slate-1000/55 sm:flex-row sm:items-center sm:justify-between">
                    <div>0 of 68 row(s) selected.</div>
                    <div className="flex items-center gap-4">
                        <span>Rows per page 10</span>
                        <span>Page 1 of 7</span>
                    </div>
                </div>
            </Card.Content>
        </Card>
    )
}

const DashboardDemo = () => {
    return (
        <div className="relative min-h-[760px]">
            <div className="grid lg:grid-cols-[260px_minmax(0,1fr)]">
                <DashboardSidebar />

                <main className="min-w-0 p-3 sm:p-4 lg:p-5">
                    <div className="rounded-[30px] border border-slate-50/70 bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 p-4 backdrop-blur">
                        <div className="flex flex-col gap-4 border-b border-slate-300 pb-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="soft" color="blue" className="rounded-full">
                                        Documents
                                    </Badge>
                                    <Badge variant="outline" className="rounded-full">
                                        Draft 08
                                    </Badge>
                                </div>
                                <Heading as="h2" className="mt-3 text-slate-1000">Proposal workspace</Heading>
                                <Text className="mt-2 max-w-2xl !text-sm leading-6 text-slate-1000/60">
                                    A multi-panel dashboard surface for revenue stats, planning, and document
                                    operations.
                                </Text>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <Button variant="ghost" size="small" className="rounded-full border-0 bg-transparent px-4 py-2 text-sm text-slate-1000">
                                    <Bell className="mr-2 h-4 w-4" />
                                    Notifications
                                </Button>
                                <Button variant="solid" size="small" color="green" className="rounded-2xl border-0 px-5 py-2.5 text-sm">
                                    Create Project
                                </Button>
                            </div>
                        </div>

                        <section className="mt-4 grid gap-4 xl:grid-cols-4">
                            {metricCards.map((card) => (
                                <DashboardMetricCard key={card.title} card={card} />
                            ))}
                        </section>

                        <section className="mt-4">
                            <ChartPanel />
                        </section>

                        <section className="mt-4">
                            <DocumentsTable />
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardDemo
