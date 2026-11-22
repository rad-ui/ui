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
        "Real products built on Rad UI's headless, accessible React components: what each one is, which components it uses and what broke along the way.",
    canonicalUrl: "https://www.rad-ui.com/case-studies",
    kicker: "Built with Rad UI",
})

const totalComponents = new Set(caseStudies.flatMap((study) => study.components)).size
const totalIssues = caseStudies.reduce((sum, study) => sum + study.issues.length, 0)

export default function CaseStudiesPage() {
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
                            Products running in production on Rad UI. Each case study covers what the product is, which components it
                            uses and what broke along the way.
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

                    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {caseStudies.map((study) => (
                            <li key={study.slug} id={study.slug} className="scroll-mt-10">
                                <article className="flex h-full flex-col gap-3 rounded-2xl border border-gray-400 bg-gray-50 p-5">
                                    <div className="flex items-center gap-3">
                                        { }
                                        <img src={study.logo} alt="" className="h-9 w-auto" />
                                        <div>
                                            <h2 className="text-lg font-semibold leading-tight text-gray-1000">{study.name}</h2>
                                            <p className="text-[11px] uppercase tracking-widest text-gray-950">{study.kind}</p>
                                        </div>
                                    </div>
                                    <Text className="text-sm text-gray-950">{study.summary}</Text>
                                    <p className="font-mono text-[11px] text-gray-950">
                                        {study.components.length} components
                                        {study.issues.length ? ` · ${study.issues.length} issue${study.issues.length === 1 ? "" : "s"} filed` : ""}
                                    </p>
                                    <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-1 text-sm font-semibold">
                                        <Link href={`/case-studies/${study.slug}`} className="text-gray-1000 underline underline-offset-4">Read the case study</Link>
                                        <a href={study.href} className="text-gray-950 underline-offset-4 hover:underline">{new URL(study.href).host} ↗</a>
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
