import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import FullHeightScroll from "@/components/layout/ScrollContainers/FullHeightScroll"
import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"

import baseSeoMetadata from "./baseSeo"
import AnatomyDemo from "./landingComponents/AnatomyDemo"
import BehaviorDemo from "./landingComponents/BehaviorDemo"
import ComponentTicker from "./landingComponents/ComponentTicker"
import HeroTerminal from "./landingComponents/HeroTerminal"
import InstallCommand from "./landingComponents/InstallCommand"
import Reveal from "./landingComponents/Reveal"
import TokenStudio from "./landingComponents/TokenStudio"
import showcaseDemos from "./showcase/showcaseDemos"

export const metadata = baseSeoMetadata

const SPEC = [
    { key: "primitives", value: "59 published entry points" },
    { key: "styling", value: "nothing attached — you style it" },
    { key: "accessibility", value: "keyboard, focus and ARIA included" },
    { key: "license", value: "MIT — fork it" },
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

                    <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-6 py-16 sm:px-8 lg:min-h-[calc(100svh-3.25rem)] lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-16 lg:px-10 lg:py-20">
                        <div>
                            <p className="landing-fade-up flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.24em] text-gray-950">
                                <span className="inline-flex items-center gap-2 text-green-1000">
                                    <span
                                        aria-hidden
                                        className="h-1.5 w-1.5 rounded-full bg-green-1000"
                                    />
                                    Rad UI
                                </span>
                                <span aria-hidden className="h-3 w-px bg-gray-500" />
                                <span>React 19</span>
                                <span aria-hidden className="h-3 w-px bg-gray-500" />
                                <span>TypeScript</span>
                                <span aria-hidden className="h-3 w-px bg-gray-500" />
                                <span>MIT</span>
                            </p>

                            <Heading className="landing-display landing-fade-up landing-fade-up-delay-1 mt-6 text-gray-1000">
                                The behavior layer
                                <br />
                                <span className="text-gray-950">
                                    for your design system.
                                </span>
                            </Heading>

                            <Text className="landing-lede landing-fade-up landing-fade-up-delay-2 mt-6 max-w-[46ch] text-gray-950">
                                Fifty-nine accessible, unstyled React primitives.
                                Keyboard handling, focus management and ARIA ship
                                with the component. You keep the pixels.
                            </Text>

                            <div className="landing-fade-up landing-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-3">
                                <PrimaryLink href="/docs/first-steps/installation">
                                    Start building
                                    <ArrowRight className="h-4 w-4" aria-hidden />
                                </PrimaryLink>
                                <SecondaryLink href="https://github.com/rad-ui/ui">
                                    <GithubIcon className="h-4 w-4" />
                                    GitHub
                                </SecondaryLink>
                            </div>

                            <InstallCommand
                                command="pnpm add @radui/ui"
                                label="install"
                                tone="canvas"
                                className="landing-fade-up landing-fade-up-delay-4 mt-6 max-w-md"
                            />
                        </div>

                        <div className="landing-fade-up landing-fade-up-delay-3">
                            <HeroTerminal />

                            <dl className="mt-6 border-t border-gray-400">
                                {SPEC.map((row) => (
                                    <div
                                        key={row.key}
                                        className="flex items-baseline justify-between gap-6 border-b border-gray-400 py-2.5"
                                    >
                                        <dt className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-gray-950">
                                            {row.key}
                                        </dt>
                                        <dd className="text-right text-[0.82rem] text-gray-1000">
                                            {row.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </section>

                <ComponentTicker />

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

                {/* ── Surface ─────────────────────────────────────── */}
                <section className="border-b border-gray-400 bg-gray-100">
                    <div className="mx-auto max-w-[1240px] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
                        <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
                            <div>
                                <SectionLabel index="04" name="surface" />
                                <Heading
                                    as="h2"
                                    className="landing-title mt-5 text-gray-1000"
                                >
                                    Six real products. One component set.
                                </Heading>
                                <Text className="landing-body mt-4 text-gray-950">
                                    Multi-surface demos — streaming, settings,
                                    commerce, messaging, inbox, analytics — each
                                    built from the same primitives you install.
                                </Text>
                                <SecondaryLink
                                    href="/showcase/music-app"
                                    className="mt-6"
                                >
                                    Open the showcase
                                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                                </SecondaryLink>
                            </div>

                            <ul className="border-t border-gray-400">
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
                            <SectionLabel index="05" name="go" />
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