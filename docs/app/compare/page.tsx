import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'
import generateSeoMetadata from '@/utils/seo/generateSeoMetadata'

import { CHECKED_ON, comparisons } from './data'

export const metadata = generateSeoMetadata({
    title: 'Rad UI vs Radix UI, Headless UI, React Aria, Ark UI and shadcn/ui',
    description:
        'Honest comparisons of Rad UI with other headless React component libraries: coverage tables from each library’s docs, accessibility, styling, install model, API and when to pick the other one.',
    keywords: [
        'headless react component library comparison',
        'radix ui alternative',
        'shadcn alternative',
        'headless ui alternative',
        'react aria alternative',
        'ark ui alternative',
        'best headless ui library react',
    ],
    canonicalUrl: 'https://www.rad-ui.com/compare',
    tags: ['Comparison', 'Headless UI', 'React'],
    kicker: 'Compare',
})

export default function CompareIndex() {
    return (
        <FullHeightScroll fullWidth>
            <div className="bg-gray-50 text-gray-1000">
                <div className="mx-auto max-w-[1100px] px-4 pb-20 pt-10 sm:px-8 lg:pt-14">
                    <header className="max-w-[60rem]">
                        <p className="text-sm font-medium text-gray-950">Compare</p>
                        <h1 className="mt-3 text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-balance sm:text-[2.75rem]">
                            Rad UI and the other headless React libraries
                        </h1>
                        <p className="mt-4 max-w-[64ch] text-base leading-7 text-gray-950">
                            Every library here is good at something. These pages say what, with coverage tables built from
                            each library’s own docs and links to check them. Where Rad UI is not the right pick, they say so.
                        </p>
                        <p className="mt-2 text-sm text-gray-950">Last checked {CHECKED_ON}.</p>
                    </header>

                    <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                        {comparisons.map((item) => (
                            <li key={item.slug}>
                                <Link
                                    href={`/compare/${item.slug}`}
                                    className="group flex h-full flex-col rounded-xl border border-gray-400 bg-gray-100 p-5 transition-colors hover:border-gray-700"
                                >
                                    <span className="text-lg font-semibold">Rad UI vs {item.name}</span>
                                    <span className="mt-2 flex-1 text-[0.9375rem] leading-6 text-gray-950">{item.summary}</span>
                                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                                        Read the comparison
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-10 max-w-[64ch] text-[0.9375rem] leading-7 text-gray-950">
                        Spotted something out of date or unfair?{' '}
                        <a
                            href="https://github.com/rad-ui/ui/issues/new"
                            className="font-medium text-gray-1000 underline underline-offset-4"
                        >
                            Open an issue
                        </a>{' '}
                        and we will fix it.
                    </p>
                </div>
            </div>
        </FullHeightScroll>
    )
}
