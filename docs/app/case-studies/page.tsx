import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"
import Link from "next/link"

import CodeWithCopy from "@/components/CodeWithCopy"
import FullHeightScroll from "@/components/layout/ScrollContainers/FullHeightScroll"
import generateSeoMetadata from "@/utils/seo/generateSeoMetadata"
import { caseStudies, linkSnippet } from "./studies"

export const metadata = generateSeoMetadata({
    title: "Case studies",
    description:
        "Real products built on Rad UI's headless, accessible React components: what they use, what broke, and what changed because of it.",
    canonicalUrl: "https://www.rad-ui.com/case-studies",
    kicker: "Case studies · Built with Rad UI",
})

export default function CaseStudiesPage() {
    return (
        <FullHeightScroll>
            <div className="relative lg:p-10">
                <div className="mx-auto max-w-4xl space-y-10">
                    <div className="space-y-4 text-center">
                        <Heading as="h1" className="text-4xl font-bold text-gray-1000">
                            Case studies
                        </Heading>
                        <Text className="mx-auto max-w-2xl text-lg text-gray-950">
                            Products that ship Rad UI to real users. Each one covers what the product is, which
                            components it uses, and what broke along the way, with the issues it led to.
                        </Text>
                    </div>

                    <ul className="grid gap-4 sm:grid-cols-2">
                        {caseStudies.map((study) => (
                            <li key={study.slug}>
                                <Link
                                    href={`/case-studies/${study.slug}`}
                                    className="flex h-full flex-col gap-2 rounded-lg border border-gray-400 p-5 transition-colors hover:border-gray-600 hover:bg-gray-50"
                                >
                                    <span className="text-xl font-semibold text-gray-1000">{study.name}</span>
                                    <span className="text-gray-950">{study.summary}</span>
                                    <span className="mt-auto pt-2 text-sm text-gray-950">
                                        {study.components.length} components
                                        {study.issues.length
                                            ? ` · ${study.issues.length} issue${study.issues.length === 1 ? "" : "s"} filed`
                                            : ""}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <section className="space-y-3">
                        <Heading as="h2" className="text-2xl font-semibold text-gray-1000">
                            Built something with Rad UI?
                        </Heading>
                        <Text className="text-gray-950">
                            Add a plain link to your footer, styled however you like. Set <code>ref</code> to your
                            product&apos;s name so we can see where visitors come from. Then{" "}
                            <a
                                href="https://github.com/rad-ui/ui/issues/new"
                                className="underline underline-offset-4"
                            >
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
