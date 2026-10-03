'use client'

import { ArrowRight, LoaderCircle } from "lucide-react"
import ColorLooper from "../helpers/ColorLooper"
import Button from "@radui/ui/Button"

const variants = ["solid", "soft", "outline", "ghost", "destructive"]
const sizes = ["small", "medium", "large", "x-large"]

const Playground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Button"
            docsLink="/docs/components/button"
            description="Current button variants and sizes, including icon composition."
        >
            <div className="grid gap-5">
                {variants.map((variant) => (
                    <div key={variant} className="grid gap-3 border-t border-gray-200 pt-3 lg:grid-cols-[7rem_1fr] lg:items-center">
                        <span className="text-xs font-semibold uppercase text-gray-600">{variant}</span>
                        <div className="flex flex-wrap items-center gap-2">
                            {sizes.map((size) => <Button key={size} variant={variant} size={size}>{size}<ArrowRight size={16} /></Button>)}
                            <Button variant={variant} disabled>Disabled</Button>
                            <Button variant={variant} disabled><LoaderCircle size={16} /> Loading</Button>
                        </div>
                    </div>
                ))}
            </div>
        </ColorLooper>
    </div>
)

export default Playground
