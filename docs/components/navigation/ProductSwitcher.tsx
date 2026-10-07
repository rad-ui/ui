'use client'
import Link from 'next/link'

import { docsProducts, type DocsProduct } from './products'

// Segmented links rather than a menu: two destinations, both always visible,
// and plain links keep middle-click / open-in-new-tab working.
const ProductSwitcher = ({ current, onNavigate }: { current: DocsProduct, onNavigate?: () => void }) => {
    return <nav aria-label="Documentation product" className="mb-6 px-1">
        <ul className="grid grid-cols-2 gap-1 rounded-lg border border-gray-400 bg-gray-100 p-1">
            {docsProducts.map((product) => {
                const isCurrent = product.id === current.id
                return <li key={product.id}>
                    <Link
                        href={product.home}
                        onClick={onNavigate}
                        aria-current={isCurrent ? 'true' : undefined}
                        data-state={isCurrent ? 'active' : 'inactive'}
                        className="flex flex-col rounded-md px-3 py-1.5 text-gray-950 transition-colors hover:text-gray-1000 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-1000 data-[state=active]:shadow-sm"
                    >
                        <span className="text-[0.84rem] font-semibold">{product.title}</span>
                        <span className="text-[0.7rem] text-gray-950">{product.description}</span>
                    </Link>
                </li>
            })}
        </ul>
    </nav>
}

export default ProductSwitcher
