import Link from 'next/link'

import './fx-docs.css'

import { fxCatalog } from '@/app/fx/fxCatalog'
import { fxCategoryTitle, fxComponents } from '@/app/fx/fxNavigationSections'

// Live gallery of every FX: each card runs the component's main demo. Looping
// effects pause themselves offscreen, so a long grid stays cheap.
const FxGallery = () => (
    <ul className="not-prose grid grid-cols-1 gap-4 md:grid-cols-2" data-docs-toc-ignore="">
        {fxComponents.map((item) => {
            const demo = fxCatalog[item.name]?.demos[0]
            if (!demo) return null
            return <li key={item.name} className="group relative overflow-hidden rounded-xl border border-gray-400 bg-gray-50 transition-colors hover:border-gray-600">
                <div className="fx-stage pointer-events-none flex h-56 items-center justify-center [&>*]:max-w-full" data-variant={item.categories?.[1] === 'backgrounds' ? 'card-bare' : 'card'} aria-hidden="true" inert>
                    <demo.Demo />
                </div>
                <div className="p-4">
                    <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-green-1000">{fxCategoryTitle(item.categories?.[1] ?? '')}</p>
                    <h3 className="mt-1 text-base font-semibold text-gray-1000">
                        {/* The whole card is clickable through this link's ::after. */}
                        <Link href={`/fx/${item.name}`} className="after:absolute after:inset-0 focus-visible:underline">{item.title}</Link>
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-950">{item.description}</p>
                </div>
            </li>
        })}
    </ul>
)

export default FxGallery
