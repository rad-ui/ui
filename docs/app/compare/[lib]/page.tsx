import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'
import generateSeoMetadata from '@/utils/seo/generateSeoMetadata'

import { CellValue, CodeSample, Prose, Section, TextLink } from '../ComparePieces'
import { CHECKED_ON, comparisons, getComparison } from '../data'

export const dynamicParams = false

export function generateStaticParams() {
    return comparisons.map((item) => ({ lib: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ lib: string }> }) {
    const { lib } = await params
    const item = getComparison(lib)
    if (!item) return {}
    return generateSeoMetadata({
        title: item.seoTitle,
        description: item.seoDescription,
        keywords: item.keywords,
        canonicalUrl: `https://www.rad-ui.com/compare/${item.slug}`,
        tags: ['Comparison', item.name, 'React'],
        kicker: 'Compare',
    })
}

export default async function ComparePage({ params }: { params: Promise<{ lib: string }> }) {
    const { lib } = await params
    const item = getComparison(lib)
    if (!item) notFound()
    const others = comparisons.filter((other) => other.slug !== item.slug)

    return (
        <FullHeightScroll fullWidth>
            <div className="bg-gray-50 text-gray-1000">
                <article className="mx-auto grid max-w-[1000px] grid-cols-[minmax(0,1fr)] gap-10 px-4 pb-20 pt-10 sm:px-8 lg:pt-14">
                    <header>
                        <Link href="/compare" className="inline-flex min-h-6 items-center gap-1.5 text-sm font-medium text-gray-950 hover:text-gray-1000">
                            <ArrowLeft className="h-4 w-4" aria-hidden />
                            All comparisons
                        </Link>
                        <h1 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-balance sm:text-[2.75rem]">
                            Rad UI vs {item.name}
                        </h1>
                        <div className="mt-4">
                            <Prose>
                                {item.intro.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </Prose>
                        </div>
                        <p className="mt-3 text-sm text-gray-950">
                            Last checked {CHECKED_ON} against the sources at the end of this page.
                        </p>
                    </header>

                    <Section id="at-a-glance" title="At a glance">
                        <div className="overflow-x-auto rounded-xl border border-gray-400">
                            <table className="w-full text-left text-[0.875rem] sm:text-[0.9375rem]">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-3 py-2.5 sm:w-[9rem] sm:px-4 font-medium text-gray-950">
                                            <span className="sr-only">Topic</span>
                                        </th>
                                        <th scope="col" className="px-3 py-2 sm:px-4.5 font-semibold">Rad UI</th>
                                        <th scope="col" className="px-3 py-2 sm:px-4.5 font-semibold">{item.name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.atAGlance.map((row) => (
                                        <tr key={row.label} className="border-t border-gray-400 align-top">
                                            <th scope="row" className="px-3 py-2 sm:px-4.5 font-medium text-gray-950">{row.label}</th>
                                            <td className="px-3 py-2 sm:px-4.5">{row.rad}</td>
                                            <td className="px-3 py-2 sm:px-4.5">{row.other}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    <Section id="coverage" title="Component coverage">
                        <Prose>
                            <p>
                                Built from each library’s public component list. “Yes” means a dedicated, documented
                                component; a name means the closest equivalent.
                            </p>
                        </Prose>
                        <div className="overflow-x-auto rounded-xl border border-gray-400">
                            <table className="w-full text-left text-[0.875rem] sm:text-[0.9375rem]">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-3 py-2 sm:px-4.5 font-semibold">Component</th>
                                        <th scope="col" className="px-3 py-2 sm:px-4.5 font-semibold">Rad UI</th>
                                        <th scope="col" className="px-3 py-2 sm:px-4.5 font-semibold">{item.name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.coverage.map((row) => (
                                        <tr key={row.component} className="border-t border-gray-400">
                                            <th scope="row" className="px-3 py-2 sm:px-4 font-medium">{row.component}</th>
                                            <td className="px-3 py-2 sm:px-4"><CellValue value={row.rad} /></td>
                                            <td className="px-3 py-2 sm:px-4"><CellValue value={row.other} unverified={row.unverified} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {item.coverageNote ? <p className="max-w-[72ch] text-sm leading-6 text-gray-950">{item.coverageNote}</p> : null}
                    </Section>

                    <Section id="accessibility" title="Accessibility">
                        <Prose>
                            {item.accessibility.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </Prose>
                    </Section>

                    <Section id="styling" title="Styling model">
                        <Prose>
                            {item.styling.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                            <p>
                                Want to see the Rad UI theme in your brand colours? Try the{' '}
                                <TextLink href="/theme-generator">theme generator</TextLink>.
                            </p>
                        </Prose>
                    </Section>

                    <Section id="install" title="Install and bundle model">
                        <div className="grid gap-3 sm:grid-cols-2">
                            <CodeSample title="Rad UI" code={item.install.rad} />
                            <CodeSample title={item.name} code={item.install.other} />
                        </div>
                        <Prose>
                            {item.install.notes.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                            <p>We do not quote bundle sizes here: they depend on which components you import and on your bundler. Measure your own build.</p>
                        </Prose>
                    </Section>

                    <Section id="api" title="API shape">
                        <Prose>
                            <p>{item.api.note}</p>
                        </Prose>
                        <div className="grid gap-3 lg:grid-cols-2">
                            <CodeSample title="Rad UI" code={item.api.rad} />
                            <CodeSample title={item.name} code={item.api.other} />
                        </div>
                    </Section>

                    <Section id="when-to-pick" title="Which one should you pick?">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="text-base font-semibold">Pick {item.name} when</h3>
                                <ul className="mt-2 grid list-disc gap-2 pl-5 text-[0.9375rem] leading-7 text-gray-950">
                                    {item.pickOther.map((line) => (
                                        <li key={line}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-base font-semibold">Pick Rad UI when</h3>
                                <ul className="mt-2 grid list-disc gap-2 pl-5 text-[0.9375rem] leading-7 text-gray-950">
                                    {item.pickRad.map((line) => (
                                        <li key={line}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <Prose>
                            <p>
                                Ready to try Rad UI? Start with the{' '}
                                <TextLink href="/docs/first-steps/installation">installation guide</TextLink> or open the{' '}
                                <TextLink href="/playground">playground</TextLink>.
                            </p>
                        </Prose>
                    </Section>

                    <Section id="sources" title="Sources">
                        <ul className="grid list-disc gap-1.5 pl-5 text-[0.9375rem] leading-7 text-gray-950">
                            {item.sources.map((source) => (
                                <li key={source.href}>
                                    <TextLink href={source.href}>{source.label}</TextLink>
                                </li>
                            ))}
                        </ul>
                        <p className="max-w-[72ch] text-sm leading-6 text-gray-950">
                            Libraries change. If something here is out of date,{' '}
                            <a href="https://github.com/rad-ui/ui/issues/new" className="font-medium text-gray-1000 underline underline-offset-4">
                                open an issue
                            </a>
                            .
                        </p>
                    </Section>

                    <nav aria-label="Other comparisons" className="border-t border-gray-400 pt-8">
                        <h2 className="text-base font-semibold">Other comparisons</h2>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {others.map((other) => (
                                <li key={other.slug}>
                                    <Link
                                        href={`/compare/${other.slug}`}
                                        className="inline-flex min-h-9 items-center rounded-lg border border-gray-400 px-3 text-sm font-medium hover:border-gray-700"
                                    >
                                        Rad UI vs {other.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </article>
            </div>
        </FullHeightScroll>
    )
}
