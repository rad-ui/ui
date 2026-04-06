import Link from "next/link"
import {
  ArrowRight,
  Blocks,
  Check,
  Code2,
  Component,
  Palette,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Zap,
} from "lucide-react"

import FloatingSurface from "@/components/hero/FloatingSurface"
import FullHeightScroll from "@/components/layout/ScrollContainers/FullHeightScroll"
import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"

import baseSeoMetadata from "./baseSeo"
import AddToCartDemo from "./landingComponents/AddToCartDemo"
import MusicAppPlayerDemo from "./landingComponents/MusicAppPlayerDemo"
import ToolbarDemo from "./landingComponents/ToolbarDemo"
import TrafficAnalyticsDemo from "./landingComponents/TrafficAnalyticsDemo"
import YourTeamDemo from "./landingComponents/YourTeamDemo"

export const metadata = baseSeoMetadata

const proofPoints = [
  "Headless, unstyled foundations that fit your system",
  "Accessible interactions without the usual boilerplate",
  "React and Next.js friendly from the first import",
]

const featureCards = [
  {
    icon: <Blocks className="h-6 w-6" />,
    title: "Composable primitives",
    description:
      "Ship interfaces as systems, not one-off screens. Rad UI gives you parts that layer cleanly, scale predictably, and stay easy to extend.",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Your brand, not ours",
    description:
      "No opinionated skin to fight. Bring your tokens, your typography, your motion, and your product language without tearing components apart.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Accessibility built in",
    description:
      "Keyboard support, semantics, and interaction details are treated as the baseline so teams can move fast without shipping fragile UI.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Built for momentum",
    description:
      "Use ready-to-wire building blocks to get to product decisions faster instead of burning cycles on repetitive component plumbing.",
  },
]

const valueRows = [
  {
    title: "Design-system ready",
    description:
      "Adopt one component or shape an entire product surface. Rad UI is structured for teams that need consistency without rigidity.",
  },
  {
    title: "Code you can actually live with",
    description:
      "APIs stay close to how React teams already think, which means less wrapper code, fewer hacks, and easier maintenance as you scale.",
  },
  {
    title: "Docs, playground, and source all in reach",
    description:
      "The fastest path to trust is seeing the parts, trying them, and reading the implementation. The homepage now pushes all three clearly.",
  },
]

const statCards = [
  { value: "Fast", label: "from install to first real component" },
  { value: "Flexible", label: "enough for custom product language" },
  { value: "Accessible", label: "by default, not as cleanup work" },
  { value: "Open", label: "source, docs, and community collaboration" },
]

function GitHubIcon({
  className = "",
}: {
  className?: string
}) {
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
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-green-900 px-5 py-3 text-sm font-medium text-green-50 transition hover:-translate-y-0.5 hover:bg-green-1000"
    >
      {children}
    </Link>
  )
}

function SecondaryLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-gray-400 bg-gray-100 px-5 py-3 text-sm font-medium text-gray-1000 backdrop-blur transition hover:-translate-y-0.5 hover:border-gray-500 hover:bg-gray-200"
    >
      {children}
    </Link>
  )
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-green-400/60 bg-green-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-green-950">
      <Sparkles className="h-3.5 w-3.5" />
      <span>{children}</span>
    </div>
  )
}

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-[28px] border border-gray-300 bg-gray-50/80 shadow-xl backdrop-blur ${className}`}
    >
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <FullHeightScroll>
      <div className="relative pb-20">
        <section className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen bg-gradient-to-br from-gray-50 via-gray-100 to-green-100">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,theme(colors.green.400/25),transparent_42%),radial-gradient(circle_at_20%_25%,theme(colors.sky.300/20),transparent_28%)]" />
          <div className="pointer-events-none absolute left-[-8%] top-28 h-72 w-72 rounded-full bg-green-400/20 blur-3xl" />
          <div className="pointer-events-none absolute right-[-4%] top-16 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />

          <div className="relative overflow-hidden">
            <div className="mx-auto max-w-[1560px] px-8 pb-24 pt-10 sm:px-10 lg:px-16 lg:pb-32">
              <div className="grid gap-12 lg:grid-cols-[minmax(580px,720px)_minmax(520px,700px)] lg:items-center lg:justify-between lg:gap-16">
                <div className="max-w-[720px]">
                  <SectionEyebrow>Modern React UI, minus the drag</SectionEyebrow>
                  <Heading className="mt-6 text-5xl leading-[0.95] text-gray-1000 sm:text-6xl lg:text-7xl">
                    Build product UI that feels{" "}
                    <span className="bg-gradient-to-r from-green-900 via-green-700 to-sky-700 bg-clip-text text-transparent">
                      deliberate, fast, and expensive
                    </span>
                  </Heading>
                  <Text className="mt-6 max-w-xl text-lg leading-8 text-gray-900 sm:text-xl">
                    Rad UI gives teams accessible, unstyled React primitives that plug
                    straight into real design systems. Less boilerplate. Less compromise.
                    More time shipping interfaces people actually remember.
                  </Text>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <PrimaryLink href="/docs/first-steps/installation">
                      Start building
                      <ArrowRight className="h-4 w-4" />
                    </PrimaryLink>
                    <SecondaryLink href="/playground">
                      <Play className="h-4 w-4" />
                      Open playground
                    </SecondaryLink>
                    <SecondaryLink href="https://github.com/rad-ui/ui">
                      <GitHubIcon className="h-4 w-4" />
                      View source
                    </SecondaryLink>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {proofPoints.map((item) => (
                      <div
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50/90 px-3 py-2 text-sm text-gray-950"
                      >
                        <Check className="h-4 w-4 text-green-900" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mx-auto min-h-[760px] w-full max-w-[700px] lg:min-h-[820px]">
                    <FloatingSurface
                    className="absolute right-[5%] top-[8%] w-[50%] p-3 z-[2] w-fit"
                    initial={{ x: -2, y: 4, rotate: 8 }}
                    animate={{ x: -4, y: 6, rotate: 20 }}
                    transition={{ duration: 24, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  >
                    <MusicAppPlayerDemo />
                  </FloatingSurface>
                  <FloatingSurface
                    className="absolute left-[-12%] top-[18%] w-[30%] p-3 z-[1] opacity-26"
                    initial={{ x: -6, y: 4, rotate: 4 }}
                    animate={{ x: 6, y: -4, rotate: -2 }}
                    transition={{ duration: 26, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  >
                    <AddToCartDemo />
                  </FloatingSurface>
                   <FloatingSurface
                    className="absolute right-[-40%] top-[-6%] w-[54%] p-3 z-[4]"
                    initial={{ x: 4, y: 8, rotate: 40 }}
                    animate={{ x: -6, y: -6, rotate: -3 }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  >
                    <TrafficAnalyticsDemo />
                  </FloatingSurface>
                
                  <FloatingSurface
                    className="absolute left-[6%] top-[54%] w-[30%] p-3 z-[5] w-fit"
                    initial={{ x: 6, y: 6, rotate: -10 }}
                    animate={{ x: 6, y: -8, rotate: 4 }}
                    transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  >
                    <YourTeamDemo />
                  </FloatingSurface>
                 
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto grid max-w-[1560px] gap-4 border-t border-gray-300 px-8 py-6 sm:px-10 lg:grid-cols-4 lg:px-16 lg:py-8">
            {statCards.map((stat) => (
              <div key={stat.label} className="rounded-[28px] border border-gray-300 bg-gray-50/85 p-5 backdrop-blur">
                <div className="text-2xl font-semibold tracking-tight text-gray-1000">
                  {stat.value}
                </div>
                <Text className="mt-1 text-sm text-gray-900">{stat.label}</Text>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto mt-20 max-w-[1360px]">
          <div className="grid gap-8 lg:grid-cols-[460px_minmax(0,1fr)]">
            <div className="max-w-md">
              <SectionEyebrow>Why teams switch</SectionEyebrow>
              <Heading as="h2" className="mt-5 text-4xl text-gray-1000 sm:text-5xl">
                The library should remove friction, not become the new one.
              </Heading>
              <Text className="mt-5 text-lg leading-8 text-gray-900">
                Rad UI is for teams that care about polish but refuse to get trapped
                inside someone else&apos;s design taste. Keep control of your product
                surface while skipping the boring parts of UI engineering.
              </Text>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {featureCards.map((card) => (
                <Surface key={card.title} className="h-full p-6">
                  <div className="inline-flex rounded-2xl bg-green-100 p-3 text-green-950">
                    {card.icon}
                  </div>
                  <Heading as="h3" className="mt-6 text-2xl text-gray-1000">
                    {card.title}
                  </Heading>
                  <Text className="mt-3 leading-7 text-gray-900">
                    {card.description}
                  </Text>
                </Surface>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto mt-20 max-w-[1360px]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
            <Surface className="overflow-hidden border-gray-200 bg-gradient-to-br from-gray-50 via-green-50 to-gray-100">
              <div className="grid gap-10 p-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:p-10">
                <div>
                  <SectionEyebrow>Installation that sells itself</SectionEyebrow>
                  <Heading as="h2" className="mt-5 text-4xl text-gray-1000">
                    It should take longer to choose a color palette than to adopt the library.
                  </Heading>
                  <Text className="mt-5 max-w-2xl text-lg leading-8 text-gray-900">
                    Start with the primitives you need, wire them to your system, and
                    scale up from there. No giant rewrite. No forced theme layer. No
                    waiting until “later” to make it accessible.
                  </Text>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <PrimaryLink href="/docs/first-steps/introduction">
                      Read the docs
                      <ArrowRight className="h-4 w-4" />
                    </PrimaryLink>
                    <SecondaryLink href="/colors">
                      <Palette className="h-4 w-4" />
                      Explore colors
                    </SecondaryLink>
                  </div>
                </div>

                <div className="rounded-[24px] border border-gray-300 bg-gray-1000 p-5 text-gray-50 shadow-xl">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <TerminalSquare className="h-4 w-4" />
                    <span>Install and go</span>
                  </div>
                  <pre className="mt-4 overflow-x-auto text-sm leading-7 text-green-200">
                    <code>{`pnpm add @radui/ui

import { Button, Dialog, Tabs } from "@radui/ui"

export function ProductActions() {
  return <Button variant="solid">Ship it</Button>
}`}</code>
                  </pre>
                  <div className="mt-5 rounded-2xl border border-gray-700 bg-gray-950/60 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-50">
                      <Rocket className="h-4 w-4 text-green-300" />
                      Ready for production-minded teams
                    </div>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      Bring your own styling, compose only what you need, and keep
                      shipping with control instead of workarounds.
                    </p>
                  </div>
                </div>
              </div>
            </Surface>

            <div className="grid gap-4">
              {valueRows.map((row, index) => (
                <Surface key={row.title} className="p-6">
                  <div className="text-sm font-medium uppercase tracking-[0.2em] text-green-900">
                    0{index + 1}
                  </div>
                  <Heading as="h3" className="mt-3 text-2xl text-gray-1000">
                    {row.title}
                  </Heading>
                  <Text className="mt-3 leading-7 text-gray-900">
                    {row.description}
                  </Text>
                </Surface>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto mt-20 max-w-[1360px]">
          <Surface className="overflow-hidden border-gray-300 bg-gradient-to-br from-gray-50 via-gray-100 to-sky-200 text-gray-1000">
            <div className="grid gap-8 p-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-10">
              <div>
                <SectionEyebrow>Open-source, actually useful</SectionEyebrow>
                <Heading as="h2" className="mt-5 text-4xl text-gray-1000 sm:text-5xl">
                  Try the docs, break it in the playground, inspect the source, then decide.
                </Heading>
                <Text className="mt-5 max-w-2xl text-lg leading-8 text-gray-900">
                  Good UI libraries do not need mystery. Rad UI is easiest to trust when
                  you can test the experience yourself and see how the implementation is put together.
                </Text>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/playground"
                    className="inline-flex items-center gap-2 rounded-full bg-green-900 px-5 py-3 text-sm font-medium text-green-50 transition hover:-translate-y-0.5 hover:bg-green-1000"
                  >
                    Open interactive playground
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://discord.gg/nMaQfeEPNp"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-1000 px-5 py-3 text-sm font-medium text-gray-50 transition hover:-translate-y-0.5 hover:border-gray-800 hover:bg-gray-950"
                  >
                    Join Discord
                  </Link>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-3xl border border-gray-400 bg-gray-50/70 p-5 backdrop-blur">
                  <div className="flex items-center gap-3 text-gray-1000">
                    <Code2 className="h-5 w-5 text-green-1000" />
                    <span className="text-base font-medium">Readable APIs</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-900">
                    Composable component building blocks with less wrapper noise.
                  </p>
                </div>
                <div className="rounded-3xl border border-gray-400 bg-gray-50/70 p-5 backdrop-blur">
                  <div className="flex items-center gap-3 text-gray-1000">
                    <Component className="h-5 w-5 text-green-1000" />
                    <span className="text-base font-medium">Real component depth</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-900">
                    Enough range to build systems, not just isolated demo shots.
                  </p>
                </div>
                <div className="rounded-3xl border border-gray-400 bg-gray-50/70 p-5 backdrop-blur">
                  <div className="flex items-center gap-3 text-gray-1000">
                    <GitHubIcon className="h-5 w-5 text-green-1000" />
                    <span className="text-base font-medium">Open collaboration</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-900">
                    Source and community are one click away for contributors and adopters.
                  </p>
                </div>
              </div>
            </div>
          </Surface>
        </section>
      </div>
    </FullHeightScroll>
  )
}
