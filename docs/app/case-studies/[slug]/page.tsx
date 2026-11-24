import Text from "@radui/ui/Text"
import Link from "next/link"
import { notFound } from "next/navigation"

import FullHeightScroll from "@/components/layout/ScrollContainers/FullHeightScroll"
import generateSeoMetadata from "@/utils/seo/generateSeoMetadata"
import { caseStudies } from "../studies"

// One prerendered page per case study; unknown slugs 404.
export const dynamicParams = false

export function generateStaticParams() {
    return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const study = caseStudies.find((entry) => entry.slug === slug)
    if (!study) return {}
    return generateSeoMetadata({
        title: `${study.name} - Rad UI case study`,
        description: `How ${study.name} uses Rad UI. ${study.summary}`,
        canonicalUrl: `https://www.rad-ui.com/case-studies/${study.slug}`,
        kicker: "Case study · Built with Rad UI",
    })
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const study = caseStudies.find((entry) => entry.slug === slug)
    if (!study) notFound()

    const index = caseStudies.indexOf(study)
    const next = caseStudies[(index + 1) % caseStudies.length]

    return (
        <FullHeightScroll>
            <article className="relative px-4 py-14 sm:px-6 lg:py-20">
                <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
                    <div className="min-w-0 space-y-10">
                        <header className="space-y-2">
                            <Link href="/case-studies" className="text-sm font-medium text-gray-950 underline-offset-4 hover:underline">
                                Case study
                            </Link>
                            <h1 className="text-3xl font-semibold tracking-tight text-gray-1000 sm:text-4xl">
                                {study.name}
                            </h1>
                        </header>

                        <p className="border-b border-gray-400 pb-10 text-xl leading-relaxed text-gray-950">{study.headline}</p>

                        {study.sections.map((section) => (
                            <section key={section.question} className="space-y-3">
                                <h2 className="text-base font-semibold text-gray-1000">
                                    {section.question}
                                </h2>
                                {section.answer.map((paragraph) => (
                                    <Text key={paragraph} className="leading-relaxed text-gray-950">
                                        {paragraph}
                                    </Text>
                                ))}
                            </section>
                        ))}

                    </div>

                    <aside className="space-y-6 text-sm lg:sticky lg:top-6 lg:self-start">
                        <div className="flex items-center gap-3">
                            { }
                            <img src={study.logo} alt="" className="h-8 w-auto" />
                            <p className="text-2xl font-semibold tracking-tight text-gray-1000">{study.name}</p>
                        </div>
                        <dl className="space-y-5">
                            <div className="space-y-1">
                                <dt className="font-semibold text-gray-1000">About</dt>
                                <dd className="leading-relaxed text-gray-950">{study.summary}</dd>
                                <dd>
                                    <a href={`${study.href}?ref=rad-ui`} className="text-gray-1000 underline-offset-4 hover:underline">
                                        {new URL(study.href).host.replace(/^www\./, "")} ↗
                                    </a>
                                </dd>
                            </div>
                            <div className="space-y-1">
                                <dt className="font-semibold text-gray-1000">Type</dt>
                                <dd className="text-gray-950">{study.kind}</dd>
                            </div>
                        </dl>
                        <span aria-hidden="true" className="block h-px w-8 bg-gray-400" />
                        <div className="space-y-1">
                            <p className="font-semibold text-gray-1000">Next case study</p>
                            <Link href={`/case-studies/${next.slug}`} className="text-gray-950 underline-offset-4 hover:text-gray-1000 hover:underline">
                                {next.name}
                            </Link>
                        </div>
                    </aside>
                </div>
            </article>
        </FullHeightScroll>
    )
}
