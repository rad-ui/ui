"use client"

import { useState } from "react"

import Avatar from "@radui/ui/Avatar"
import Badge from "@radui/ui/Badge"
import Button from "@radui/ui/Button"
import Card from "@radui/ui/Card"
import Heading from "@radui/ui/Heading"
import Kbd from "@radui/ui/Kbd"
import Progress from "@radui/ui/Progress"
import Table from "@radui/ui/Table"
import Text from "@radui/ui/Text"
import ToggleGroup from "@radui/ui/ToggleGroup"
import {
    ArrowUpRight,
    FileText,
    FolderKanban,
    HelpCircle,
    LayoutDashboard,
    MoreHorizontal,
    Plus,
    Search,
    Settings,
    SlidersHorizontal,
    Sparkles,
    TrendingUp,
    Users,
} from "lucide-react"

const rangeOptions = [
    { value: "7d", label: "7 days" },
    { value: "30d", label: "30 days" },
    { value: "90d", label: "90 days" },
]

// Values are thousands of dollars closed-won, per bucket.
const revenueSeries = {
    "7d": {
        caption: "Daily closed-won revenue",
        points: [
            { label: "Mon", value: 18.2 },
            { label: "Tue", value: 22.4 },
            { label: "Wed", value: 19.8 },
            { label: "Thu", value: 26.1 },
            { label: "Fri", value: 31.5 },
            { label: "Sat", value: 24.2 },
            { label: "Sun", value: 28.7 },
        ],
    },
    "30d": {
        caption: "Closed-won revenue per 3-day period",
        points: [
            { label: "Sep 01", value: 62.4 },
            { label: "Sep 04", value: 58.1 },
            { label: "Sep 07", value: 71.6 },
            { label: "Sep 10", value: 66.9 },
            { label: "Sep 13", value: 79.3 },
            { label: "Sep 16", value: 74.2 },
            { label: "Sep 19", value: 88.5 },
            { label: "Sep 22", value: 81.7 },
            { label: "Sep 25", value: 94.2 },
            { label: "Sep 28", value: 103.6 },
        ],
    },
    "90d": {
        caption: "Closed-won revenue per 2-week period",
        points: [
            { label: "Jun 30", value: 118.4 },
            { label: "Jul 14", value: 126.9 },
            { label: "Jul 28", value: 109.7 },
            { label: "Aug 11", value: 141.3 },
            { label: "Aug 25", value: 152.8 },
            { label: "Sep 08", value: 174.5 },
        ],
    },
}

const metrics = [
    {
        label: "Net revenue",
        value: "$248.9k",
        delta: "+12.4%",
        trend: "up",
        series: [38, 41, 39, 46, 44, 52, 50, 58, 55, 62, 67, 74],
    },
    {
        label: "Pipeline value",
        value: "$1.42M",
        delta: "+6.1%",
        trend: "up",
        series: [72, 70, 75, 74, 80, 78, 84, 82, 88, 86, 90, 96],
    },
    {
        label: "New accounts",
        value: "1,234",
        delta: "-8.3%",
        trend: "down",
        series: [82, 80, 78, 74, 76, 71, 69, 66, 68, 63, 61, 58],
    },
    {
        label: "Avg. deal size",
        value: "$12.4k",
        delta: "+3.7%",
        trend: "up",
        series: [44, 46, 45, 47, 48, 47, 50, 49, 51, 52, 51, 54],
    },
]

const navGroups = [
    {
        label: "Workspace",
        items: [
            { label: "Overview", icon: LayoutDashboard, active: true },
            { label: "Pipeline", icon: TrendingUp, count: 12 },
            { label: "Accounts", icon: Users },
            { label: "Projects", icon: FolderKanban },
            { label: "Automations", icon: Sparkles, count: 3 },
        ],
    },
    {
        label: "Documents",
        items: [
            { label: "Library", icon: FileText },
            { label: "Templates", icon: FileText },
        ],
    },
]

const documents = [
    { name: "Cover page", type: "Overview", status: "Done", done: 1, total: 1, due: "Mar 12", reviewer: "Eddie Lake", updated: "2h ago" },
    { name: "Table of contents", type: "Structure", status: "Done", done: 6, total: 6, due: "Mar 09", reviewer: "Eddie Lake", updated: "5h ago" },
    { name: "Executive summary", type: "Narrative", status: "Done", done: 4, total: 4, due: "Mar 14", reviewer: "Jamik Tashpulatov", updated: "1d ago" },
    { name: "Technical approach", type: "Narrative", status: "Review", done: 9, total: 9, due: "Mar 18", reviewer: "Jamik Tashpulatov", updated: "3h ago" },
    { name: "Design system audit", type: "Narrative", status: "In Process", done: 3, total: 7, due: "Mar 26", reviewer: "Priya Raman", updated: "26m ago" },
    { name: "Innovation and advantages", type: "Narrative", status: "Review", done: 5, total: 5, due: "Mar 22", reviewer: "Unassigned", updated: "2d ago" },
]

const statuses = ["Done", "In Process", "Review"]

// Rounds the axis up to a readable "nice" number so the tallest bar never touches the top.
const niceAxisMax = (value) => {
    const rough = value / 4
    const magnitude = Math.pow(10, Math.floor(Math.log10(rough)))
    const step = [1, 2, 2.5, 5, 10].find((candidate) => candidate * magnitude >= rough) * magnitude

    return step * 4
}

const getInitials = (name) =>
    name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

const Sparkline = ({ series, trend }) => {
    const min = Math.min(...series)
    const max = Math.max(...series)
    const span = max - min || 1

    const points = series
        .map((value, index) => {
            const x = (index / (series.length - 1)) * 100
            const y = 28 - ((value - min) / span) * 24

            return `${x.toFixed(2)},${y.toFixed(2)}`
        })
        .join(" ")

    return (
        <svg
            viewBox="0 0 100 32"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
            className="h-8 w-full overflow-visible"
        >
            <polyline
                points={points}
                fill="none"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className={trend === "up" ? "stroke-green-700" : "stroke-red-700"}
            />
        </svg>
    )
}

const MetricCard = ({ metric }) => {
    const isUp = metric.trend === "up"

    return (
        <div className="rounded-xl border border-gray-600 bg-gray-50 p-4">
            <Text className="text-xs! uppercase tracking-[0.18em] text-gray-1000/60">{metric.label}</Text>

            <div className="mt-3 flex items-end justify-between gap-3">
                <Heading
                    as="h3"
                    className="text-2xl! font-semibold! leading-none! tracking-[-0.02em]! text-gray-1000"
                >
                    {metric.value}
                </Heading>
                <Badge variant="soft" color={isUp ? "green" : "red"} className="rounded-full tabular-nums">
                    {metric.delta}
                </Badge>
            </div>

            <div className="mt-4">
                <Sparkline series={metric.series} trend={metric.trend} />
            </div>

            <Text className="mt-2 block text-xs! text-gray-1000/60">vs. previous 30 days</Text>
        </div>
    )
}

const SidebarLink = ({ icon: Icon, label }) => (
    <button
        type="button"
        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-gray-1000/70 transition-colors hover:bg-gray-1000/[0.04] hover:text-gray-1000"
    >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="truncate">{label}</span>
    </button>
)

const DashboardSidebar = () => (
    <aside className="flex flex-col gap-3 border-b border-gray-600 bg-gray-100 p-4 sm:flex-row lg:flex-col lg:gap-6 text-gray-1000 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3 rounded-lg border border-gray-600 bg-gray-50 px-3 py-2.5 sm:flex-1 lg:flex-none">
            <Avatar.Root size="sm" color="green">
                <Avatar.Fallback>AC</Avatar.Fallback>
            </Avatar.Root>
            <div className="min-w-0 flex-1">
                <Text className="block truncate text-sm! font-medium! text-gray-1000">Acme Inc.</Text>
                <Text className="block truncate text-xs! text-gray-1000/60">Series B proposal</Text>
            </div>
            <Badge variant="soft" color="green" className="rounded-full">
                Live
            </Badge>
        </div>

        <button
            type="button"
            aria-label="Search workspace"
            className="flex items-center sm:flex-1 lg:flex-none gap-2 rounded-lg border border-gray-600 bg-gray-50 px-3 py-2 text-left text-sm text-gray-1000/60 transition-colors hover:border-gray-700 hover:text-gray-1000"
        >
            <Search className="h-4 w-4 shrink-0" />
            <span className="flex-1 truncate">Search</span>
            <Kbd className="border-gray-600! bg-gray-1000/[0.04]! text-gray-1000/60! shadow-none!">⌘K</Kbd>
        </button>

        <nav className="hidden flex-1 flex-col gap-6 lg:flex">
            {navGroups.map((group) => (
                <div key={group.label}>
                    <Text className="mb-2 block text-[11px]! uppercase tracking-[0.2em] text-gray-1000/50">
                        {group.label}
                    </Text>
                    <div className="space-y-0.5">
                        {group.items.map((item) => {
                            const Icon = item.icon

                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    aria-current={item.active ? "page" : undefined}
                                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                                        item.active
                                            ? "bg-gray-200 font-medium text-gray-1000"
                                            : "text-gray-1000/70 hover:bg-gray-1000/[0.04] hover:text-gray-1000"
                                    }`}
                                >
                                    <Icon className="h-4 w-4 shrink-0" />
                                    <span className="flex-1 truncate">{item.label}</span>
                                    {item.count ? (
                                        <span className="rounded-full border border-gray-600 bg-gray-50 px-1.5 py-0.5 text-[10px] tabular-nums text-gray-1000/60">
                                            {item.count}
                                        </span>
                                    ) : null}
                                </button>
                            )
                        })}
                    </div>
                </div>
            ))}
        </nav>

        <div className="hidden space-y-0.5 border-t border-gray-600 pt-4 lg:block">
            <SidebarLink icon={Settings} label="Settings" />
            <SidebarLink icon={HelpCircle} label="Help center" />
        </div>
    </aside>
)

const SummaryStat = ({ label, value }) => (
    <div>
        <Text className="block text-[11px]! uppercase tracking-[0.18em] text-gray-1000/50">{label}</Text>
        <Text className="mt-1 block text-sm! font-medium! tabular-nums text-gray-1000">{value}</Text>
    </div>
)

const RevenueChart = ({ range, onRangeChange }) => {
    const series = revenueSeries[range]
    const values = series.points.map((point) => point.value)
    const axisMax = niceAxisMax(Math.max(...values))
    const total = values.reduce((sum, value) => sum + value, 0)
    const peak = series.points.reduce((best, point) => (point.value > best.value ? point : best), series.points[0])

    return (
        <Card variant="outline" className="border-gray-600! bg-gray-50!">
            <Card.Header>
                <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <Text className="text-xs! uppercase tracking-[0.18em] text-gray-1000/60">Revenue</Text>
                    <Heading
                        as="h3"
                        className="mt-2 text-xl! font-semibold! tracking-[-0.02em]! text-gray-1000"
                    >
                        ${total.toFixed(1)}k closed-won
                    </Heading>
                    <Text className="mt-1 block text-sm! text-gray-1000/60">{series.caption}</Text>
                </div>

                <ToggleGroup.Root
                    type="single"
                    value={[range]}
                    onValueChange={(next) => {
                        const picked = Array.isArray(next) ? next[0] : next

                        if (picked) onRangeChange(picked)
                    }}
                    aria-label="Chart time range"
                    className="shrink-0 border-gray-600!"
                >
                    {rangeOptions.map((option) => (
                        <ToggleGroup.Item
                            key={option.value}
                            value={option.value}
                            aria-label={option.label}
                            className="flex-auto! whitespace-nowrap text-xs! font-medium!"
                        >
                            {option.label}
                        </ToggleGroup.Item>
                    ))}
                </ToggleGroup.Root>
                </div>
            </Card.Header>

            <Card.Content>
                <div className="flex h-48 items-end gap-1.5 border-b border-gray-300">
                    {series.points.map((point) => (
                        <div key={point.label} className="group relative flex h-full flex-1 items-end">
                            <span
                                className="w-full rounded-t-md bg-green-800/75 transition-colors group-hover:bg-green-800"
                                style={{ height: `${(point.value / axisMax) * 100}%` }}
                            />
                            <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gray-600 bg-gray-50 px-2 py-0.5 text-[10px] font-medium tabular-nums text-gray-1000 opacity-0 transition-opacity group-hover:opacity-100">
                                ${point.value.toFixed(1)}k
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-2 flex gap-1.5">
                    {series.points.map((point) => (
                        <span
                            key={point.label}
                            className="flex-1 truncate text-center text-[10px] uppercase tracking-[0.1em] text-gray-1000/50"
                        >
                            {point.label}
                        </span>
                    ))}
                </div>
            </Card.Content>

            <Card.Footer>
                <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
                    <SummaryStat label="Total" value={`$${total.toFixed(1)}k`} />
                    <SummaryStat label="Average" value={`$${(total / values.length).toFixed(1)}k`} />
                    <SummaryStat label="Peak" value={`${peak.label} · $${peak.value.toFixed(1)}k`} />
                </div>
            </Card.Footer>
        </Card>
    )
}

const ReviewerCell = ({ name }) => {
    const isUnassigned = name === "Unassigned"

    return (
        <div className="flex items-center gap-2">
            <Avatar.Root size="sm" color={isUnassigned ? undefined : "green"}>
                <Avatar.Fallback>{isUnassigned ? "–" : getInitials(name)}</Avatar.Fallback>
            </Avatar.Root>
            <span className="truncate">{name}</span>
        </div>
    )
}

const DeliveryBoard = ({ filters, onFiltersChange }) => {
    const visible = documents.filter((document) => filters.includes(document.status))

    return (
        <section>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <Text className="text-xs! uppercase tracking-[0.18em] text-gray-1000/60">Delivery board</Text>
                    <Heading
                        as="h3"
                        className="mt-2 text-xl! font-semibold! tracking-[-0.02em]! text-gray-1000"
                    >
                        Proposal sections
                    </Heading>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <ToggleGroup.Root
                        type="multiple"
                        value={filters}
                        onValueChange={(next) => onFiltersChange(Array.isArray(next) ? next : [])}
                        aria-label="Filter sections by status"
                        className="shrink-0 border-gray-600!"
                    >
                        {statuses.map((status) => (
                            <ToggleGroup.Item
                                key={status}
                                value={status}
                                aria-label={status}
                                className="flex-auto! whitespace-nowrap text-xs! font-medium!"
                            >
                                {status}
                            </ToggleGroup.Item>
                        ))}
                    </ToggleGroup.Root>

                    <Button
                        variant="outline"
                        className="rounded-lg! border-gray-600! bg-gray-50! text-gray-1000"
                    >
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Columns
                    </Button>

                    <Button
                        variant="solid"
                        className="rounded-lg! border-0! bg-gray-1000! px-4 text-gray-50!"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add section
                    </Button>
                </div>
            </div>

            <Table.Root
                className="mt-4 border-gray-600! [&_.cell]:!font-normal [&_.cell-header]:!text-[11px] [&_.cell-header]:!font-semibold [&_.cell-header]:!uppercase [&_.cell-header]:!tracking-[0.14em] [&_.cell-header]:!text-gray-1000/60 [&_.row:hover_.cell]:!bg-gray-1000/[0.03]"
            >
                <Table.Head>
                    <Table.Row>
                        <Table.ColumnCellHeader>Section</Table.ColumnCellHeader>
                        <Table.ColumnCellHeader>Type</Table.ColumnCellHeader>
                        <Table.ColumnCellHeader>Status</Table.ColumnCellHeader>
                        <Table.ColumnCellHeader>Progress</Table.ColumnCellHeader>
                        <Table.ColumnCellHeader>Due</Table.ColumnCellHeader>
                        <Table.ColumnCellHeader>Reviewer</Table.ColumnCellHeader>
                        <Table.ColumnCellHeader aria-label="Actions" />
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    {visible.map((document) => (
                        <Table.Row key={document.name}>
                            <Table.Cell>
                                <div className="flex flex-col">
                                    <span className="whitespace-nowrap font-medium text-gray-1000">{document.name}</span>
                                    <span className="mt-1 text-xs text-gray-1000/60">
                                        Updated {document.updated}
                                    </span>
                                </div>
                            </Table.Cell>
                            <Table.Cell>{document.type}</Table.Cell>
                            <Table.Cell>
                                <Badge
                                    variant="soft"
                                    color={document.status === "Done" ? "green" : undefined}
                                    className="rounded-full"
                                >
                                    {document.status}
                                </Badge>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-28">
                                        <Progress.Root
                                            data-color="green"
                                            value={document.done}
                                            minValue={0}
                                            maxValue={document.total}
                                            getValueLabel={() =>
                                                `${document.name}: ${document.done} of ${document.total} sections complete`
                                            }
                                        >
                                            <Progress.Indicator />
                                        </Progress.Root>
                                    </div>
                                    <span className="w-9 shrink-0 text-right text-xs tabular-nums text-gray-1000/60">
                                        {document.done}/{document.total}
                                    </span>
                                </div>
                            </Table.Cell>
                            <Table.Cell>{document.due}</Table.Cell>
                            <Table.Cell>
                                <ReviewerCell name={document.reviewer} />
                            </Table.Cell>
                            <Table.Cell>
                                <button
                                    type="button"
                                    aria-label={`More actions for ${document.name}`}
                                    className="rounded-full p-1.5 text-gray-1000/60 transition-colors hover:bg-gray-1000/[0.06] hover:text-gray-1000"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-1000/60">
                <Text className="text-sm! text-gray-1000/60">
                    Showing {visible.length} of {documents.length} sections
                </Text>
                {filters.length === 0 ? (
                    <Text className="text-sm! text-gray-1000/60">All statuses are filtered out.</Text>
                ) : null}
            </div>
        </section>
    )
}

const DashboardDemo = () => {
    const [range, setRange] = useState("7d")
    const [filters, setFilters] = useState(statuses)

    return (
        <div className="bg-gray-50">
            <div className="grid lg:grid-cols-[248px_minmax(0,1fr)]">
                <DashboardSidebar />

                <main className="min-w-0">
                    <header className="border-b border-gray-600 px-5 py-5 sm:px-7 sm:py-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="soft" color="green" className="rounded-full">
                                Documents
                            </Badge>
                            <Badge variant="outline" className="rounded-full">
                                Draft 08
                            </Badge>
                        </div>

                        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <Heading
                                    as="h2"
                                    className="text-2xl! font-semibold! tracking-[-0.02em]! text-gray-1000"
                                >
                                    Proposal workspace
                                </Heading>
                                <Text className="mt-2 block max-w-2xl text-sm! leading-6! text-gray-1000/60">
                                    Revenue reporting and section-level delivery tracking for the Acme Inc.
                                    Series B proposal.
                                </Text>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <Button
                                    variant="outline"
                                    className="rounded-lg! border-gray-600! bg-gray-50! text-gray-1000"
                                >
                                    Share report
                                </Button>
                                <Button
                                    variant="solid"
                                    className="rounded-lg! border-0! bg-gray-1000! px-4 text-gray-50!"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    New project
                                </Button>
                            </div>
                        </div>
                    </header>

                    <div className="space-y-8 px-5 py-6 sm:px-7 sm:py-8">
                        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            {metrics.map((metric) => (
                                <MetricCard key={metric.label} metric={metric} />
                            ))}
                        </section>

                        <RevenueChart range={range} onRangeChange={setRange} />

                        <DeliveryBoard filters={filters} onFiltersChange={setFilters} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardDemo
