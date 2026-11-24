import Text from "@radui/ui/Text"
import Link from "next/link"

import CodeWithCopy from "@/components/CodeWithCopy"
import FullHeightScroll from "@/components/layout/ScrollContainers/FullHeightScroll"
import generateSeoMetadata from "@/utils/seo/generateSeoMetadata"
import { caseStudies, linkSnippet } from "./studies"

export const metadata = generateSeoMetadata({
    title: "Case studies",
    description:
        "How the teams behind these products use Rad UI's headless, accessible React components to ship faster with accessibility built in.",
    canonicalUrl: "https://www.rad-ui.com/case-studies",
    kicker: "Built with Rad UI",
})

const cell = "flex min-h-40 items-center justify-center border-b border-r border-gray-400 p-8 sm:min-h-48"

export default function CaseStudiesPage() {
    return (
        <FullHeightScroll>
            <div className="relative px-4 py-14 sm:px-6 lg:py-20">
                <div className="mx-auto max-w-5xl space-y-12">
                    <header className="space-y-3 text-center">
                        <h1 className="text-3xl font-semibold tracking-tight text-gray-1000 sm:text-4xl">
                            Case studies
                        </h1>
                        <Text className="mx-auto max-w-md text-gray-950">
                            How the teams behind these products use Rad UI to ship faster, keep their own look, and get accessibility right.
                        </Text>
                    </header>

                    <ul className="grid grid-cols-1 border-l border-t border-gray-400 sm:grid-cols-2 lg:grid-cols-3">
                        {caseStudies.map((study) => (
                            <li key={study.slug} className="contents">
                                <Link
                                    href={`/case-studies/${study.slug}`}
                                    aria-label={`${study.name} case study`}
                                    className={`${cell} group transition-colors hover:bg-gray-50`}
                                >
                                    <span className="flex items-center gap-3 opacity-70 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0">
                                        { }
                                        <img src={study.logo} alt="" className="h-9 w-auto" />
                                        <span className="text-xl font-semibold tracking-tight text-gray-1000">{study.name}</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                        <li className="contents">
                            <a
                                href="https://github.com/rad-ui/ui/issues/new?title=Case%20study%3A%20"
                                className={`${cell} text-sm text-gray-950 transition-colors hover:bg-gray-50 hover:text-gray-1000`}
                            >
                                Your product here ↗
                            </a>
                        </li>
                    </ul>

                    <footer className="mx-auto max-w-lg space-y-4 pt-6 text-center">
                        <span aria-hidden="true" className="mx-auto block h-px w-8 bg-gray-400" />
                        <h2 className="text-lg font-semibold text-gray-1000">
                            Do you use Rad UI?
                        </h2>
                        <Text className="text-gray-950">
                            We&apos;d love to hear what you built.{" "}
                            <a
                                href="https://github.com/rad-ui/ui/issues/new?title=Case%20study%3A%20"
                                className="font-medium text-gray-1000 underline underline-offset-4"
                            >
                                Submit your case study ↗
                            </a>
                        </Text>
                        <div className="space-y-2 pt-2 text-left">
                            <p className="text-center text-sm text-gray-950">Want a badge in your footer? Set ref to your product&apos;s name.</p>
                            <CodeWithCopy code={linkSnippet} />
                        </div>
                    </footer>
                </div>
            </div>
        </FullHeightScroll>
    )
}
