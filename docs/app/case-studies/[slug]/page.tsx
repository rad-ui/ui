import Heading from "@radui/ui/Heading"
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

    return (
        <FullHeightScroll>
            <article className="relative lg:p-10">
                <div className="mx-auto max-w-3xl space-y-10">
                    <div className="space-y-3">
                        <Link href="/case-studies" className="text-sm text-gray-950 underline-offset-4 hover:underline">
                            ← All case studies
                        </Link>
                        <div className="flex items-center gap-4">
                            { }
                            <img src={study.logo} alt="" className="h-12 w-auto" />
                            <div>
                                <Heading as="h1" className="text-4xl font-bold text-gray-1000">
                                    {study.name}
                                </Heading>
                                <p className="text-xs uppercase tracking-widest text-gray-950">{study.kind} · built with Rad UI</p>
                            </div>
                        </div>
                        <Text className="text-lg text-gray-950">{study.summary}</Text>
                        <a
                            href={`${study.href}?ref=rad-ui`}
                            className="inline-block font-medium text-gray-1000 underline underline-offset-4"
                        >
                            Visit {study.name}
                        </a>
                    </div>


                    {study.sections.map((section) => (
                        <section key={section.question} className="space-y-3">
                            <Heading as="h2" className="text-2xl font-semibold text-gray-1000">
                                {section.question}
                            </Heading>
                            {section.answer.map((paragraph) => (
                                <Text key={paragraph} className="text-gray-950">
                                    {paragraph}
                                </Text>
                            ))}
                        </section>
                    ))}

                    <section className="space-y-3">
                        <Heading as="h2" className="text-2xl font-semibold text-gray-1000">
                            Components used
                        </Heading>
                        <ul className="flex flex-wrap gap-2">
                            {study.components.map((name) => (
                                <li key={name} className="rounded-md border border-gray-400 px-2 py-1 text-sm text-gray-1000">
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {study.issues.length ? (
                        <section className="space-y-3">
                            <Heading as="h2" className="text-2xl font-semibold text-gray-1000">
                                Issues it led to
                            </Heading>
                            <ul className="space-y-2">
                                {study.issues.map((issue) => (
                                    <li key={issue.number} className="text-gray-950">
                                        <a
                                            href={`https://github.com/rad-ui/ui/issues/${issue.number}`}
                                            className="font-medium text-gray-1000 underline underline-offset-4"
                                        >
                                            #{issue.number}
                                        </a>{" "}
                                        {issue.title}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ) : null}
                </div>
            </article>
        </FullHeightScroll>
    )
}
