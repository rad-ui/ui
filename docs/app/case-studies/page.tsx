import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"
import Link from "next/link"

import CodeWithCopy from "@/components/CodeWithCopy"
import FullHeightScroll from "@/components/layout/ScrollContainers/FullHeightScroll"
import generateSeoMetadata from "@/utils/seo/generateSeoMetadata"
import { caseStudies, linkSnippet } from "./studies"

export const metadata = generateSeoMetadata({
    title: "Built with Rad UI: products and case studies",
    description:
        "Real products built on Rad UI's headless, accessible React components: a SaaS for Instagram Reels, an e-commerce store with a 3D drone sim, a gardening app, a learning platform and a game studio. What they use and what broke.",
    canonicalUrl: "https://www.rad-ui.com/case-studies",
    kicker: "Built with Rad UI",
})

const totalComponents = new Set(caseStudies.flatMap((study) => study.components)).size
const totalIssues = caseStudies.reduce((sum, study) => sum + study.issues.length, 0)

/** A screenshot in a light browser frame, so every card reads as "a real product". */
function BrowserFrame({ src, alt, host }: { src: string; alt: string; host: string }) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-400 bg-gray-50 shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--rad-ui-color-gray-1000)_45%,transparent)]">
            <div className="flex items-center gap-2 border-b border-gray-300 bg-gray-100 px-3 py-2">
                <span aria-hidden className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                </span>
                <span className="mx-auto truncate rounded-md bg-gray-50 px-3 py-0.5 font-mono text-[11px] text-gray-950">{host}</span>
            </div>
            { }
            <img src={src} alt={alt} width={1200} height={750} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
        </div>
    )
}

export default function CaseStudiesPage() {
    const [lead, ...rest] = caseStudies
    return (
        <FullHeightScroll>
            <div className="relative px-4 py-10 sm:px-6 lg:p-12">
                <div className="mx-auto max-w-6xl space-y-14">
                    <header className="space-y-5 text-center">
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gray-950">Built with Rad UI</p>
                        <Heading as="h1" className="text-4xl font-bold tracking-tight text-gray-1000 sm:text-5xl">
                            Real products, shipped on Rad UI
                        </Heading>
                        <Text className="mx-auto max-w-2xl text-lg text-gray-950">
                            {caseStudies.length} products in production: a SaaS, a store with a 3D sim, a gardening app, a learning
                            platform and a game studio. Each case study covers which components it uses and what broke along the way.
                        </Text>
                        <dl className="mx-auto mt-2 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-3">
                            {[
                                [String(caseStudies.length), "products live"],
                                [String(totalComponents), "components in use"],
                                [String(totalIssues), "issues filed back"],
                            ].map(([value, label]) => (
                                <div key={label} className="text-center">
                                    <dt className="sr-only">{label}</dt>
                                    <dd className="text-3xl font-bold text-gray-1000">{value}</dd>
                                    <dd className="text-xs uppercase tracking-widest text-gray-950">{label}</dd>
                                </div>
                            ))}
                        </dl>
                        <ul aria-label="Products" className="mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-4">
                            {caseStudies.map((study) => (
                                <li key={study.slug}>
                                    <a href={`#${study.slug}`} className="flex items-center gap-2 text-sm font-semibold text-gray-1000 opacity-80 transition-opacity hover:opacity-100">
                                        { }
                                        <img src={study.logo} alt="" className="h-7 w-auto" />
                                        {study.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </header>

                    {lead ? (
                        <article id={lead.slug} className="grid scroll-mt-10 items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
                            <Link href={`/case-studies/${lead.slug}`} aria-label={`${lead.name} case study`}>
                                <BrowserFrame src={lead.shot} alt={`${lead.name} home page`} host={new URL(lead.href).host} />
                            </Link>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    { }
                                    <img src={lead.logo} alt="" className="h-10 w-auto" />
                                    <div>
                                        <Heading as="h2" className="text-2xl font-semibold text-gray-1000">{lead.name}</Heading>
                                        <p className="text-xs uppercase tracking-widest text-gray-950">{lead.kind}</p>
                                    </div>
                                </div>
                                <Text className="text-gray-950">{lead.summary}</Text>
                                <ul className="flex flex-wrap gap-1.5" aria-label="Components used">
                                    {lead.components.slice(0, 10).map((c) => (
                                        <li key={c} className="rounded-md border border-gray-300 bg-gray-50 px-2 py-0.5 font-mono text-[11px] text-gray-1000">{c}</li>
                                    ))}
                                    {lead.components.length > 10 ? <li className="px-1 py-0.5 text-[11px] text-gray-950">+{lead.components.length - 10} more</li> : null}
                                </ul>
                                <div className="flex flex-wrap gap-4 pt-1 text-sm font-semibold">
                                    <Link href={`/case-studies/${lead.slug}`} className="text-gray-1000 underline underline-offset-4">Read the case study</Link>
                                    <a href={lead.href} className="text-gray-950 underline-offset-4 hover:underline">Visit {new URL(lead.href).host} ↗</a>
                                </div>
                            </div>
                        </article>
                    ) : null}

                    <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2">
                        {rest.map((study) => (
                            <li key={study.slug} id={study.slug} className="scroll-mt-10">
                                <article className="flex h-full flex-col gap-4">
                                    <Link href={`/case-studies/${study.slug}`} aria-label={`${study.name} case study`}>
                                        <BrowserFrame src={study.shot} alt={`${study.name} home page`} host={new URL(study.href).host} />
                                    </Link>
                                    <div className="flex items-center gap-3">
                                        { }
                                        <img src={study.logo} alt="" className="h-8 w-auto" />
                                        <div>
                                            <Heading as="h2" className="text-xl font-semibold text-gray-1000">{study.name}</Heading>
                                            <p className="text-[11px] uppercase tracking-widest text-gray-950">{study.kind}</p>
                                        </div>
                                    </div>
                                    <Text className="text-gray-950">{study.summary}</Text>
                                    <p className="font-mono text-[11px] text-gray-950">
                                        {study.components.length} components
                                        {study.issues.length ? ` · ${study.issues.length} issue${study.issues.length === 1 ? "" : "s"} filed` : ""}
                                    </p>
                                    <div className="mt-auto flex flex-wrap gap-4 text-sm font-semibold">
                                        <Link href={`/case-studies/${study.slug}`} className="text-gray-1000 underline underline-offset-4">Read the case study</Link>
                                        <a href={study.href} className="text-gray-950 underline-offset-4 hover:underline">Visit {new URL(study.href).host} ↗</a>
                                    </div>
                                </article>
                            </li>
                        ))}
                    </ul>

                    <section className="space-y-3 rounded-2xl border border-gray-400 bg-gray-50 p-6 sm:p-8">
                        <Heading as="h2" className="text-2xl font-semibold text-gray-1000">
                            Built something with Rad UI?
                        </Heading>
                        <Text className="text-gray-950">
                            Add a plain link to your footer, styled however you like. Set <code>ref</code> to your product&apos;s name so
                            we can see where visitors come from. Then{" "}
                            <a href="https://github.com/rad-ui/ui/issues/new" className="underline underline-offset-4">
                                open an issue
                            </a>{" "}
                            telling us what you built, and we&apos;ll write it up with you.
                        </Text>
                        <CodeWithCopy code={linkSnippet} />
                    </section>
                </div>
            </div>
        </FullHeightScroll>
    )
}
