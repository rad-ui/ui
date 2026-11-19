import Link from 'next/link'

import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'
import generateSeoMetadata from '@/utils/seo/generateSeoMetadata'

import ThemeGenerator from './ThemeGenerator'

const TITLE = 'React Theme Generator: Accessible Color Palettes - Rad UI'
const DESCRIPTION =
    'Turn one brand colour into an accessible 12-step palette with a matching gray, light and dark. Every text step meets WCAG AA. Preview it on real React components and copy the CSS variables.'

export const metadata = generateSeoMetadata({
    title: TITLE,
    description: DESCRIPTION,
    keywords: [
        'react theme generator',
        'theme generator',
        'accessible color palette generator',
        'color palette generator',
        'WCAG color contrast palette',
        'dark mode color palette',
        'radix colors theme generator',
        '12 step color scale',
        'CSS variables theme',
        'Tailwind v4 theme',
        'design tokens generator',
    ],
    canonicalUrl: 'https://www.rad-ui.com/theme-generator',
    tags: ['Theme generator', 'Colors', 'Accessibility', 'Design tokens'],
    kicker: 'Theme generator',
})

const FAQ = [
    {
        q: 'How is the palette built?',
        a: 'The brand colour is converted to OKLCH. Each of the 12 steps gets a target lightness for light and dark mode and a share of the brand’s chroma, so tints stay calm and the solid steps stay vivid. Step 800 is your brand exactly. Colours outside sRGB lose chroma, not lightness or hue, until they fit.',
    },
    {
        q: 'What does “accessible” mean here?',
        a: 'Text steps 950 and 1000 are pushed darker (light mode) or lighter (dark mode) until they reach at least 4.5:1, the WCAG AA minimum for body text, against every background step they are used on: 50 to 200 for secondary text and 50 to 400 for primary text and button labels. Contrast is measured on the final hex values, the same ones you copy.',
    },
    {
        q: 'Is it like Radix Colors?',
        a: 'The idea is the same: 12 steps with a job each, from app background to high-contrast text. Radix Colors ships a fixed set of hand-tuned scales. This generator makes a scale from any brand colour and checks its contrast as it goes, in Rad UI’s token names (--rad-ui-color-accent-50 to -1000).',
    },
    {
        q: 'Do I need Tailwind?',
        a: 'No. The export is plain CSS custom properties. If you use Tailwind v4, the second tab adds accent-* utilities next to the gray-* ones the Rad UI preset already provides.',
    },
    {
        q: 'Does it change behaviour or accessibility of components?',
        a: 'No. Rad UI components keep their roles, keyboard support and focus handling; the theme only swaps colour and radius tokens.',
    },
]

export default function ThemeGeneratorPage() {
    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
    }
    return (
        <FullHeightScroll fullWidth>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <div className="bg-gray-50 text-gray-1000">
                <div className="mx-auto max-w-[1360px] px-4 pb-20 pt-10 sm:px-8 lg:px-10 lg:pt-14">
                    <header className="max-w-[60rem]">
                        <p className="text-sm font-medium text-gray-950">Theme generator</p>
                        <h1 className="mt-3 text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-balance sm:text-[2.75rem]">
                            One brand colour in. An accessible React theme out.
                        </h1>
                        <p className="mt-4 max-w-[62ch] text-base leading-7 text-gray-950">
                            Pick a colour and get a 12-step accent scale with a matching gray, for light and dark mode.
                            Every text step is checked against WCAG AA. Try it on real Rad UI components, then copy the
                            CSS variables or share the link.
                        </p>
                    </header>

                    <div className="mt-10">
                        <ThemeGenerator />
                    </div>

                    <section aria-labelledby="theme-generator-faq" className="mt-20 grid grid-cols-[minmax(0,1fr)] gap-8 border-t border-gray-400 pt-10 lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[20rem_minmax(0,1fr)]">
                        <div>
                            <h2 id="theme-generator-faq" className="text-xl font-semibold">How it works</h2>
                            <p className="mt-2 text-sm leading-6 text-gray-950">
                                New to the token names? Read the{' '}
                                <Link href="/docs/guides/design-token-contract" className="font-medium text-gray-1000 underline underline-offset-4">
                                    design token contract
                                </Link>{' '}
                                or browse the built-in{' '}
                                <Link href="/colors" className="font-medium text-gray-1000 underline underline-offset-4">
                                    colour families
                                </Link>
                                .
                            </p>
                        </div>
                        <dl className="grid gap-6">
                            {FAQ.map((item) => (
                                <div key={item.q}>
                                    <dt className="text-[0.9375rem] font-semibold">{item.q}</dt>
                                    <dd className="mt-1.5 max-w-[70ch] text-[0.9375rem] leading-7 text-gray-950">{item.a}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                </div>
            </div>
        </FullHeightScroll>
    )
}
