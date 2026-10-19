import { notFound } from 'next/navigation'

import FxComponentPage from '@/components/fx/FxComponentPage'
import generateSeoMetadata from '@/utils/seo/generateSeoMetadata'
import { fxComponents } from '../fxNavigationSections'

// One prerendered page per registry component; unknown slugs 404.
export const dynamicParams = false

export function generateStaticParams() {
    return fxComponents.map((item) => ({ slug: item.name }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const item = fxComponents.find((entry) => entry.name === slug)
    if (!item) return {}
    return generateSeoMetadata({
        title: `${item.title} - Rad UI FX`,
        description: `${item.description} Accessible by default, installable with the shadcn CLI.`,
        keywords: [item.title, `React ${item.title}`, 'accessible animation', 'Rad UI FX', 'shadcn registry', 'reduced motion'],
        canonicalUrl: `https://www.rad-ui.com/fx/${item.name}`
    })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    if (!fxComponents.some((entry) => entry.name === slug)) notFound()
    return <FxComponentPage name={slug} />
}
