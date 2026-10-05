import Link from "next/link"
import { createElement, type ReactNode } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { refractor } from "refractor"
import tsx from "refractor/lang/tsx"

import FullHeightScroll from "@/components/layout/ScrollContainers/FullHeightScroll"

import baseSeoMetadata from "./baseSeo"
import ComponentGallery from "./landingComponents/ComponentGallery"
import HeadlessDemo from "./landingComponents/HeadlessDemo"
import InstallCommand from "./landingComponents/InstallCommand"
import KeyboardDemo from "./landingComponents/KeyboardDemo"
import QuickStart, { type QuickStartStep } from "./landingComponents/QuickStart"
import Reveal from "./landingComponents/Reveal"
import ThemePlayground from "./landingComponents/ThemePlayground"

export const metadata = baseSeoMetadata

refractor.register(tsx)

type HastElement = {
    type: "element"
    tagName: string
    properties: { className?: string[] }
    children: HastChild[]
}
type HastText = { type: "text"; value: string }
type HastChild = HastElement | HastText

function renderNode(node: HastChild, index: number): ReactNode {
    if (node.type === "text") return node.value
    return createElement(
        node.tagName,
        { className: (node.properties.className ?? []).join(" "), key: index },
        node.children.map((child, childIndex) => renderNode(child, childIndex)),
    )
}

function highlight(source: string, lang: "tsx" | "none" = "tsx"): ReactNode {
    if (lang === "none") return source
    try {
        return refractor.highlight(source, lang).children.map((child, index) => renderNode(child as HastChild, index))
    } catch {
        return source
    }
}

const STEPS: Omit<QuickStartStep, "highlighted">[] = [
    {
        id: "compose",
        label: "Compose",
        file: "components/EditProfile.tsx",
        code: `import Button from "@radui/ui/Button"
import Dialog from "@radui/ui/Dialog"

export function EditProfile() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Edit profile</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Close asChild>
            <Button>Done</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}`,
    },
    {
        id: "theme",
        label: "Theme",
        file: "app/layout.tsx",
        code: `// Optional: skip both lines to stay fully headless
import "@radui/ui/themes/default.css"
import Theme from "@radui/ui/Theme"

export default function RootLayout({ children }) {
  return (
    <Theme classNamespace="rad-ui" accentColor="blue">
      {children}
    </Theme>
  )
}`,
    },
]

const FACTS = [
    { title: "One import per component", body: "Pull in Dialog without paying for Table." },
    { title: "Server-rendering safe", body: "Deterministic markup and data attributes for hydration." },
    { title: "Typed end to end", body: "Every part and prop ships with TypeScript types." },
    { title: "React 18 and 19", body: "Works with Next.js, Remix, Vite and friends." },
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

const primaryLink =
    "inline-flex items-center gap-2 rounded-lg bg-gray-1000 px-4 py-2.5 text-[0.9375rem] font-medium text-gray-50 transition-colors hover:bg-gray-900"
const secondaryLink =
    "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[0.9375rem] font-medium text-gray-1000 ring-1 ring-gray-500 transition-colors ring-inset hover:bg-gray-100 hover:ring-gray-700"

function SectionIntro({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
    return (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <div>
                <p className="text-sm font-medium text-gray-950">{kicker}</p>
                <h2 className="mt-3 text-[1.875rem] font-semibold leading-[1.1] tracking-[-0.03em] text-gray-1000 text-balance sm:text-[2.5rem]">
                    {title}
                </h2>
            </div>
            <p className="max-w-[54ch] text-base leading-7 text-gray-950 lg:pb-1">{children}</p>
        </div>
    )
}

export default function Home() {
    const steps: QuickStartStep[] = STEPS.map((step) => ({
        ...step,
        highlighted: highlight(step.code),
    }))

    return (
        <FullHeightScroll fullWidth>
            <div className="landing-page overflow-x-clip bg-gray-50 text-gray-1000">
                {/* ── Hero ─────────────────────────────────────────── */}
                <section className="relative">
                    <div
                        aria-hidden
                        className="landing-grid pointer-events-none absolute inset-0 text-gray-1000 opacity-[0.05]"
                    />
                    <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-4 pb-20 pt-12 sm:px-8 sm:pt-16 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:gap-14 lg:px-10 lg:pb-28 lg:pt-20">
                        <div className="landing-fade-up min-w-0">
                            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-950">
                                <span className="font-medium text-gray-1000">Rad UI</span>
                                <span aria-hidden>·</span>
                                <span>Open source React components</span>
                            </p>
                            <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.045em] text-gray-1000 text-balance sm:text-[3.5rem] lg:text-[4rem]">
                                Accessible by default. Styled your way.
                            </h1>
                            <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-8 text-gray-950 text-pretty">
                                60+ React components with keyboard support, focus management and ARIA built in. Use the
                                Clarity theme, retheme it with tokens, or drop it and style every state yourself.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <Link href="/docs/first-steps/installation" className={primaryLink}>
                                    Get started
                                    <ArrowRight className="h-4 w-4" aria-hidden />
                                </Link>
                                <Link href="/playground" className={secondaryLink}>
                                    Browse components
                                </Link>
                                <Link
                                    href="https://github.com/rad-ui/ui"
                                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium text-gray-950 transition-colors hover:text-gray-1000"
                                >
                                    <GithubIcon className="h-4 w-4" />
                                    GitHub
                                </Link>
                            </div>

                            <InstallCommand command="pnpm add @radui/ui" tone="canvas" className="mt-8 max-w-sm" />
                        </div>

                        <div className="min-w-0" style={{ animation: "rad-fade-in 0.8s 0.15s both" }}>
                            <ThemePlayground />
                            <p className="mt-4 text-center text-sm text-gray-950">
                                Change the accent, radius or appearance. Every control here is a Rad UI component.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Headless ─────────────────────────────────────── */}
                <section className="bg-gray-100">
                    <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 lg:px-10 lg:py-28">
                        <Reveal>
                            <SectionIntro kicker="Headless at the core" title="Keep the behavior. Swap the look.">
                                Rad UI owns roles, ARIA, focus and keyboard handling. Styling is opt-in: the Clarity
                                theme hooks into generated classes, and every state is a stable data-* attribute you can
                                target from any CSS.
                            </SectionIntro>
                            <div className="mt-10 lg:mt-12">
                                <HeadlessDemo />
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── Accessibility ────────────────────────────────── */}
                <section>
                    <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 lg:px-10 lg:py-28">
                        <Reveal>
                            <SectionIntro kicker="Accessibility" title="Keyboard and screen readers, handled.">
                                Composite widgets follow WAI-ARIA patterns: one tab stop per group, arrow keys inside
                                it, Home and End to jump. Roles and states stay in sync as you move.
                            </SectionIntro>
                            <div className="mt-10 lg:mt-12">
                                <KeyboardDemo />
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── Gallery ──────────────────────────────────────── */}
                <section className="bg-gray-100">
                    <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 lg:px-10 lg:py-28">
                        <Reveal>
                            <SectionIntro kicker="Components" title="The hard ones, already done.">
                                Focus trapping, outside-click dismissal, collision-aware positioning and live-region
                                announcements ship with the component. Open a few.
                            </SectionIntro>
                            <div className="mt-10 lg:mt-12">
                                <ComponentGallery />
                            </div>
                            <div className="mt-8 flex justify-center">
                                <Link href="/playground" className={secondaryLink}>
                                    See all 60+ components
                                    <ArrowRight className="h-4 w-4" aria-hidden />
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── Quick start ──────────────────────────────────── */}
                <section>
                    <div className="mx-auto grid max-w-[1240px] gap-12 px-4 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-10 lg:py-28">
                        <Reveal className="min-w-0">
                            <p className="text-sm font-medium text-gray-950">Quick start</p>
                            <h2 className="mt-3 text-[1.875rem] font-semibold leading-[1.1] tracking-[-0.03em] text-gray-1000 text-balance sm:text-[2.5rem]">
                                Install, import, compose.
                            </h2>
                            <InstallCommand command="pnpm add @radui/ui" tone="canvas" className="mt-8 max-w-sm" />
                            <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                {FACTS.map((fact) => (
                                    <div key={fact.title}>
                                        <dt className="text-[0.9375rem] font-medium text-gray-1000">{fact.title}</dt>
                                        <dd className="mt-1 text-[0.9375rem] leading-6 text-gray-950">{fact.body}</dd>
                                    </div>
                                ))}
                            </dl>
                        </Reveal>
                        <Reveal delay={80} className="min-w-0">
                            <QuickStart steps={steps} />
                        </Reveal>
                    </div>
                </section>

                {/* ── Closing ──────────────────────────────────────── */}
                <section className="relative">
                    <div
                        aria-hidden
                        className="landing-grid pointer-events-none absolute inset-0 rotate-180 text-gray-1000 opacity-[0.05]"
                    />
                    <div className="relative mx-auto max-w-[1240px] px-4 pb-10 pt-20 sm:px-8 lg:px-10 lg:pt-28">
                        <Reveal className="mx-auto max-w-2xl text-center">
                            <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-gray-1000 text-balance sm:text-[3rem]">
                                Ship the behavior. Keep your design.
                            </h2>
                            <p className="mx-auto mt-5 max-w-[46ch] text-[1.0625rem] leading-8 text-gray-950">
                                Start with one component and grow into a design system, without a theme to fight along
                                the way.
                            </p>
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                <Link href="/docs/first-steps/installation" className={primaryLink}>
                                    Read the docs
                                    <ArrowRight className="h-4 w-4" aria-hidden />
                                </Link>
                                <Link href="/showcase/music-app" className={secondaryLink}>
                                    See it in real apps
                                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                                </Link>
                            </div>
                        </Reveal>

                        <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-gray-400 pt-6 text-sm text-gray-950">
                            <span>Rad UI · MIT licensed</span>
                            <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
                                <Link
                                    href="/docs/first-steps/introduction"
                                    className="transition-colors hover:text-gray-1000"
                                >
                                    Introduction
                                </Link>
                                <Link href="/playground" className="transition-colors hover:text-gray-1000">
                                    Playground
                                </Link>
                                <Link href="/showcase/music-app" className="transition-colors hover:text-gray-1000">
                                    Showcase
                                </Link>
                                <Link href="/colors" className="transition-colors hover:text-gray-1000">
                                    Colors
                                </Link>
                                <Link href="/sponsors" className="transition-colors hover:text-gray-1000">
                                    Sponsors
                                </Link>
                                <Link
                                    href="https://github.com/rad-ui/ui"
                                    className="transition-colors hover:text-gray-1000"
                                >
                                    GitHub
                                </Link>
                            </nav>
                        </footer>
                    </div>
                </section>
            </div>
        </FullHeightScroll>
    )
}
