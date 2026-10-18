'use client'
import Link from 'next/link'

import { products, type Product } from './products'

// UI | FX switch beside the logo. Plain links rather than a menu: two
// destinations, always visible, and open-in-new-tab keeps working.
const ProductSwitcher = ({ current }: { current: Product }) => {
    return <nav aria-label="Rad UI products">
        <ul className="flex items-center gap-0.5 rounded-md border border-gray-400 bg-gray-100 p-0.5 text-[0.75rem] font-semibold">
            {products.map((product) => {
                const isCurrent = product.id === current.id
                return <li key={product.id}>
                    <Link
                        href={product.home}
                        aria-current={isCurrent ? 'true' : undefined}
                        aria-label={product.title}
                        data-state={isCurrent ? 'active' : 'inactive'}
                        className="block rounded-[5px] px-2 py-0.5 font-mono tracking-wide text-gray-950 transition-colors hover:text-gray-1000 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-1000 data-[state=active]:shadow-sm"
                    >
                        {product.label}
                    </Link>
                </li>
            })}
        </ul>
    </nav>
}

export default ProductSwitcher
