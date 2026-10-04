import Link from "next/link"
import { createElement, type ReactNode } from "react"
import { ArrowRight, ArrowUpRight, Check } from "lucide-react"
import { refractor } from "refractor"
import jsx from "refractor/lang/jsx"

import FullHeightScroll from "@/components/layout/ScrollContainers/FullHeightScroll"
import Badge from "@radui/ui/Badge"
import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"

import baseSeoMetadata from "./baseSeo"
import AnatomyDemo from "./landingComponents/AnatomyDemo"
import BehaviorDemo from "./landingComponents/BehaviorDemo"
import HeroShowcase from "./landingComponents/HeroShowcase"
import InstallCommand from "./landingComponents/InstallCommand"
import Reveal from "./landingComponents/Reveal"
import TokenStudio from "./landingComponents/TokenStudio"
import showcaseDemos from "./showcase/showcaseDemos"

export const metadata = baseSeoMetadata

refractor.register(jsx)

const SPEC = [
    { key: "unstyled", value: "no mandatory stylesheet, no visual reset" },
    { key: "accessible", value: "keyboard, focus and ARIA wiring included" },
    { key: "composable", value: "published parts for every primitive" },
    { key: "theme-free", value: "stable data-* states for your CSS" },
]

const SECTIONS = [
    {
        index: "01",
        name: "anatomy",
        title: "Compose the parts. Keep the behavior.",
        lede: "Every primitive is a set of published parts — root, trigger, content, indicator. You assemble the parts your product needs and leave the rest out. The wiring between them never becomes your problem.",
    },
    {
        index: "02",
        name: "behavior",
        title: "The invisible work is already done.",
        lede: "Focus trapping, focus restore, roving tabindex, typeahead, portalling, scrim stacking, reduced motion. It is the part of an interface nobody demos and everybody has to build. It ships with the primitive.",
    },
    {
        index: "03",
        name: "ownership",
        title: "No theme to fight.",
        lede: "Rad UI ships behavior and a stable data-* contract, nothing else. Style it with your tokens, your framework, or a stylesheet you wrote by hand. Pick a brand and a radius below and watch the same components change.",
    },
]

const COMPARISON_POINTS = [
    "React 19-first docs and examples",
    "Stable data-* contracts for design-system styling",
    "Showcase apps that prove the same primitives across surfaces",
    "Theme helpers are optional, not a dependency you have to undo",
]

const HERO_PROOF = [
    "Dialog focus traps and restores",
    "Tabs and toolbar keyboarding",
    "Roving focus, typeahead and ARIA",
    "Data attributes for every state",
]

const SHOWCASE_PREVIEWS = [
    {
        key: "music",
        surface: "Music",
        title: "Library queue",
        rows: ["New releases", "Daily mix", "Focus room"],
        metric: "03:42",
    },
    {
        key: "prefs",
        surface: "Prefs",
        title: "Workspace controls",
        rows: ["Notifications", "Theme sync", "Access review"],
        metric: "92%",
    },
    {
        key: "commerce",
        surface: "Shop",
        title: "Checkout panel",
        rows: ["Finish", "Plan", "Delivery"],
        metric: "$128",
    },
    {
        key: "ops",
        surface: "Ops",
        title: "Delivery board",
        rows: ["Queued", "Building", "Released"],
        metric: "18",
    },
]

const SHOWCASE_STATS = [
    { label: "surfaces", value: "6" },
    { label: "demo cards", value: "24+" },
    { label: "shared primitives", value: "1 set" },
]

const HERO_CODE = `<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button>Edit profile</Button>
  </Dialog.Trigger>

  <Dialog.Content>
    <Dialog.Title>Profile</Dialog.Title>
    <TextField.Input />
  </Dialog.Content>
</Dialog.Root>`

type HastElement = {
    type: "element"
    tagName: string
    properties: { className?: string[] }
    children: HastChild[]
}

type HastText = { type: "text"; value: string }
type HastChild = HastElement | HastText

function renderHighlightedNode(node: HastChild, index: number): ReactNode {
    if (node.type === "text") return node.value

    return createElement(
        node.tagName,
        { className: (node.properties.className ?? []).join(" "), key: index },
        node.children.map((child, childIndex) => renderHighlightedNode(child, childIndex)),
    )
}

function highlightHeroCode(source: string) {
    try {
        return refractor
            .highlight(source, "jsx")
            .children.map((child, index) => renderHighlightedNode(child as HastChild, index))
    } catch {
        return source
    }
}

function GithubIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
            />
        </svg>
    )
}

function PrimaryLink({
    href,
    children,
    className = "",
}: {
    href: string
    children: React.ReactNode
    className?: string
}) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center gap-2 rounded-md bg-gray-1000 px-4 py-2.5 text-sm font-medium text-gray-50 transition-colors hover:bg-gray-900 ${className}`}
        >
            {children}
        </Link>
    )
}

function SecondaryLink({
    href,
    children,
    className = "",
}: {
    href: string
    children: React.ReactNode
    className?: string
}) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center gap-2 rounded-md border border-gray-500 px-4 py-2.5 text-sm font-medium text-gray-1000 transition-colors hover:border-gray-700 hover:bg-gray-100 ${className}`}
        >
            {children}
        </Link>
    )
}

function HeroCodeProof() {
    return (
        <div className="grid overflow-hidden rounded-lg border border-gray-500 bg-gray-100 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.86fr)]">
            <div className="border-b border-gray-400 bg-gray-50 p-4 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-950">
                        code
                    </span>
                    <span className="rounded-full border border-gray-400 px-2 py-0.5 font-mono text-[10px] text-gray-950">
                        no CSS import
                    </span>
                </div>
                <pre className="landing-hero-code-pre docs-syntax-pre mt-4 overflow-x-auto font-mono text-[0.76rem] leading-6">
                    <code className="docs-code-block language-jsx">
                        {highlightHeroCode(HERO_CODE)}
                    </code>
                </pre>
            </div>

            <div className="bg-gray-100 p-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-950">
                    result
                </span>
                <div className="mt-4 rounded-md border border-gray-500 bg-gray-50 p-4 shadow-[0_18px_40px_-30px_color-mix(in_oklab,var(--rad-ui-color-gray-1000)_65%,transparent)]">
                    <div className="flex items-center justify-between gap-3 border-b border-gray-400 pb-3">
                        <div>
                            <p className="text-sm font-semibold text-gray-1000">Profile</p>
                            <p className="text-[0.78rem] text-gray-950">
                                Focus stays inside until closed.
                            </p>
                        </div>
                        <span className="h-7 w-7 rounded-full border border-gray-500 bg-gray-100" />
                    </div>
                    <label className="mt-4 block">
                        <span className="text-[0.76rem] font-medium text-gray-950">
                            Display name
                        </span>
                        <span className="mt-1.5 block rounded-md border border-gray-500 bg-gray-100 px-3 py-2 text-sm text-gray-1000">
                            Ada Lovelace
                        </span>
                    </label>
                    <div className="mt-4 flex justify-end gap-2">
                        <span className="rounded-md border border-gray-500 px-3 py-1.5 text-[0.78rem] font-medium text-gray-1000">
                            Cancel
                        </span>
                        <span className="rounded-md bg-gray-1000 px-3 py-1.5 text-[0.78rem] font-medium text-gray-50">
                            Save
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

/** Mono section marker, e.g. `01 / anatomy`. */
function SectionLabel({ index, name }: { index: string; name: string }) {
    return (
        <p className="flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.24em] text-gray-950">
            <span className="text-green-1000">{index}</span>
            <span aria-hidden className="h-px w-6 bg-gray-500" />
            <span>{name}</span>
        </p>
    )
}

export default function Home() {
    return (
        <FullHeightScroll fullWidth>
            <div className="landing-page bg-gray-50 text-gray-1000">
                {/* ── Hero ─────────────────────────────────────────── */}
                <section className="relative overflow-hidden border-b border-gray-400">
                    <div
                        aria-hidden
                        className="landing-grid pointer-events-none absolute inset-0 text-gray-1000 opacity-[0.07]"
                    />
                    <div
                        aria-hidden
                        className="landing-glow pointer-events-none absolute -left-[18%] -top-[28%] h-[620px] w-[620px] rounded-full bg-green-600/20 blur-[110px]"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute right-[-14%] top-[26%] h-[440px] w-[440px] rounded-full bg-gray-1000/10 blur-[110px]"
                    />
                    <div
                        aria-hidden
                        className="landing-scan pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green-1000/45 to-transparent"
                    />

                    <div className="relative mx-auto max-w-[1240px] px-6 py-16 sm:px-8 lg:min-h-[calc(100svh-3.25rem)] lg:px-10 lg:py-20">
                        {/* Headline left, supporting copy right — a two-column
                            masthead rather than one tall ragged column. */}
                        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.42fr)_minmax(0,1fr)] lg:gap-16">
                            {/* `@container` lets the display type size off this
                                column rather than the viewport, so the two authored
                                lines below stay two lines at every width. */}
                            <div className="@container">
                                <div className="landing-fade-up flex flex-wrap items-center gap-2">
                                    <Badge variant="soft" color="green">
                                        Rad UI
                                    </Badge>
                                    <Badge variant="outline">React 19</Badge>
                                    <Badge variant="outline">TypeScript</Badge>
                                    <Badge variant="outline">MIT</Badge>
                                </div>

                                <Heading className="landing-display landing-fade-up landing-fade-up-delay-1 mt-6 text-gray-1000">
                                    The behavior layer
                                    <br />
                                    <span className="text-gray-950">
                                        for your design system.
                                    </span>
                                </Heading>

                                <InstallCommand
                                    command="pnpm add @radui/ui"
                                    label="install"
                                    tone="canvas"
                                    className="mt-8 max-w-md"
                                />
                            </div>

                            <div className="landing-fade-up landing-fade-up-delay-2">
                                <Text className="landing-lede max-w-[46ch] text-gray-950">
                                    Accessible, unstyled React primitives.
                                    Keyboard handling, focus management and ARIA ship
                                    with the component. You keep the pixels.
                                </Text>

                                <ul className="mt-5 grid gap-2 text-[0.84rem] leading-6 text-gray-950 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                    {HERO_PROOF.map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <Check
                                                className="mt-1 h-3.5 w-3.5 shrink-0 text-green-1000"
                                                aria-hidden
                                            />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8 flex flex-wrap items-center gap-3">
                                    <PrimaryLink href="/docs/first-steps/installation">
                                        Start building
                                        <ArrowRight className="h-4 w-4" aria-hidden />
                                    </PrimaryLink>
                                    <SecondaryLink href="https://github.com/rad-ui/ui">
                                        <GithubIcon className="h-4 w-4" />
                                        GitHub
                                    </SecondaryLink>
                                </div>

                                <Link
                                    href="/playground"
                                    className="mt-4 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-gray-1000 underline-offset-4 transition-colors hover:underline"
                                >
                                    Try it in the playground
                                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                                </Link>
                            </div>
                        </div>

                        {/* Every window below is a real Rad UI primitive. */}
                        <div className="landing-fade-up landing-fade-up-delay-3 mt-14 lg:mt-16">
                            <HeroShowcase />
                        </div>

                        <div className="landing-fade-up landing-fade-up-delay-4 mt-6">
                            <HeroCodeProof />
                        </div>

                        {/* Spec bar: four even columns closing the hero. */}
                        <dl className="landing-fade-up landing-fade-up-delay-4 mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
                            {SPEC.map((row) => (
                                <div
                                    key={row.key}
                                    className="border-t border-gray-400 pt-3"
                                >
                                    <dt className="text-[0.8rem] font-medium text-gray-1000">
                                        {row.key}
                                    </dt>
                                    <dd className="mt-1 text-[0.78rem] leading-relaxed text-gray-950">
                                        {row.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* ── Numbered sections ───────────────────────────── */}
                {SECTIONS.map((section, index) => {
                    const Demo = [AnatomyDemo, BehaviorDemo, TokenStudio][index]

                    return (
                        <section
                            key={section.index}
                            className={
                                index % 2 === 1 ? "border-b border-gray-400 bg-gray-100" : "border-b border-gray-400"
                            }
                        >
                            <div className="mx-auto max-w-[1240px] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
                                <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
                                    <div>
                                        <SectionLabel
                                            index={section.index}
                                            name={section.name}
                                        />
                                        <Heading
                                            as="h2"
                                            className="landing-title mt-5 text-gray-1000"
                                        >
                                            {section.title}
                                        </Heading>
                                        <Text className="landing-body mt-4 text-gray-950">
                                            {section.lede}
                                        </Text>
                                    </div>
                                    <Demo />
                                </Reveal>
                            </div>
                        </section>
                    )
                })}

                {/* ── Positioning ────────────────────────────────── */}
                <section className="border-b border-gray-400 bg-gray-50">
                    <div className="mx-auto max-w-[1240px] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
                        <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
                            <div>
                                <SectionLabel index="04" name="positioning" />
                                <Heading
                                    as="h2"
                                    className="landing-title mt-5 text-gray-1000"
                                >
                                    Familiar primitives. A sharper contract.
                                </Heading>
                                <Text className="landing-body mt-4 text-gray-950">
                                    Rad UI lives in the same headless tradition as
                                    Radix, but the docs, examples and styling
                                    surface are tuned around modern React apps and
                                    long-lived design systems.
                                </Text>
                            </div>

                            <div className="grid gap-px overflow-hidden rounded-lg border border-gray-500 bg-gray-500 sm:grid-cols-2">
                                {COMPARISON_POINTS.map((point) => (
                                    <div
                                        key={point}
                                        className="bg-gray-100 p-5 sm:p-6"
                                    >
                                        <Check
                                            className="h-4 w-4 text-green-1000"
                                            aria-hidden
                                        />
                                        <p className="mt-4 text-[0.95rem] font-medium leading-6 text-gray-1000">
                                            {point}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── Surface ─────────────────────────────────────── */}
                <section className="border-b border-gray-400 bg-gray-100">
                    <div className="mx-auto max-w-[1240px] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
                        <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
                            <div className="self-start lg:sticky lg:top-24">
                                <SectionLabel index="05" name="surface" />
                                <Heading
                                    as="h2"
                                    className="landing-title mt-5 text-gray-1000"
                                >
                                    Six polished demos. One component set.
                                </Heading>
                                <Text className="landing-body mt-4 text-gray-950">
                                    Fictional products, real interface pressure:
                                    streaming, settings, commerce, messaging, inbox
                                    and analytics screens built to show the same
                                    primitives holding up across very different
                                    surfaces.
                                </Text>
                                <SecondaryLink
                                    href="/showcase/music-app"
                                    className="mt-6"
                                >
                                    Explore the demos
                                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                                </SecondaryLink>

                                <dl className="mt-8 grid gap-px overflow-hidden rounded-lg border border-gray-500 bg-gray-500 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                                    {SHOWCASE_STATS.map((stat) => (
                                        <div key={stat.label} className="bg-gray-50 p-4">
                                            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-950">
                                                {stat.label}
                                            </dt>
                                            <dd className="mt-2 text-lg font-semibold text-gray-1000">
                                                {stat.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            <div>
                                <div className="landing-showcase-previews grid gap-3 sm:grid-cols-2">
                                    {SHOWCASE_PREVIEWS.map((preview) => (
                                        <div
                                            key={preview.key}
                                            className="landing-showcase-preview overflow-hidden rounded-lg border border-gray-500 bg-gray-50"
                                            data-preview={preview.key}
                                        >
                                            <div className="flex items-center justify-between gap-3 border-b border-gray-400 px-3 py-2">
                                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-950">
                                                    {preview.surface}
                                                </span>
                                                <span className="font-mono text-[0.76rem] tabular-nums text-gray-1000">
                                                    {preview.metric}
                                                </span>
                                            </div>
                                            <div className="p-3">
                                                <p className="text-sm font-semibold text-gray-1000">
                                                    {preview.title}
                                                </p>
                                                <div className="mt-3 space-y-2">
                                                    {preview.rows.map((row, rowIndex) => (
                                                        <div
                                                            key={row}
                                                            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-md border border-gray-400 bg-gray-100 px-2.5 py-2"
                                                        >
                                                            <span className="h-2 w-2 rounded-full bg-green-1000" />
                                                            <span className="truncate text-[0.78rem] text-gray-950">
                                                                {row}
                                                            </span>
                                                            <span
                                                                className="h-1.5 rounded-full bg-gray-500"
                                                                style={{ width: `${42 + rowIndex * 18}px` }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <ul className="mt-6 border-t border-gray-400">
                                    {showcaseDemos.map((demo, position) => (
                                        <li key={demo.href}>
                                            <Link
                                                href={demo.href}
                                                className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-4 gap-y-2 border-b border-gray-400 py-4 transition-colors hover:bg-gray-50 sm:gap-x-6"
                                            >
                                                <span className="pt-1 font-mono text-[0.72rem] text-gray-950">
                                                    {String(position + 1).padStart(2, "0")}
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block font-medium text-gray-1000">
                                                        {demo.title}
                                                    </span>
                                                    <span className="mt-1 block text-[0.85rem] leading-6 text-gray-950">
                                                        {demo.summary}
                                                    </span>
                                                    <span className="mt-2.5 flex flex-wrap gap-1.5">
                                                        {demo.components.map((name) => (
                                                            <span
                                                                key={name}
                                                                className="rounded-full border border-gray-400 px-2 py-0.5 font-mono text-[0.62rem] tracking-tight text-gray-950"
                                                            >
                                                                {name}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </span>
                                                <ArrowUpRight
                                                    className="mt-1 h-4 w-4 shrink-0 text-gray-950 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gray-1000"
                                                    aria-hidden
                                                />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── Closing ─────────────────────────────────────── */}
                <section className="relative overflow-hidden">
                    <div
                        aria-hidden
                        className="landing-grid pointer-events-none absolute inset-0 text-gray-1000 opacity-[0.05]"
                    />
                    <div className="relative mx-auto max-w-[1240px] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
                        <Reveal className="max-w-3xl">
                            <SectionLabel index="06" name="go" />
                            <Heading
                                as="h2"
                                className="landing-closing mt-5 text-gray-1000"
                            >
                                Ship the behavior.
                                <br />
                                <span className="text-gray-950">Keep the design.</span>
                            </Heading>
                            <Text className="landing-body mt-5 max-w-xl text-gray-950">
                                One package, composable imports, no theme to
                                remove. Start with a button, grow into a
                                system.
                            </Text>

                            <InstallCommand
                                command="pnpm add @radui/ui"
                                label="install"
                                className="mt-8 max-w-md"
                            />

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <PrimaryLink href="/docs/first-steps/installation">
                                    Read the docs
                                    <ArrowRight className="h-4 w-4" aria-hidden />
                                </PrimaryLink>
                                <SecondaryLink href="/colors">
                                    Explore the scale
                                </SecondaryLink>
                            </div>
                        </Reveal>

                        <div className="mt-14 border-t border-gray-400 pt-6">
                            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-gray-950">
                                <span>Rad UI · MIT licensed</span>
                                <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
                                    <Link href="/docs/first-steps/introduction" className="transition-colors hover:text-gray-1000">
                                        Introduction
                                    </Link>
                                    <Link href="/docs/first-steps/installation" className="transition-colors hover:text-gray-1000">
                                        Installation
                                    </Link>
                                    <Link href="/playground" className="transition-colors hover:text-gray-1000">
                                        Playground
                                    </Link>
                                    <Link href="/showcase/music-app" className="transition-colors hover:text-gray-1000">
                                        Showcase
                                    </Link>
                                    <Link href="/sponsors" className="transition-colors hover:text-gray-1000">
                                        Sponsors
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </FullHeightScroll>
    )
}
