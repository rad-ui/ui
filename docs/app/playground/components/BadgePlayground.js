'use client'

import ColorLooper from "../helpers/ColorLooper"
import Badge from "@radui/ui/Badge"

const variants = ["solid", "soft", "surface", "outline", "ghost"]
const colors = ["gray", "blue", "green", "red", "plum", "gold"]
const sizes = ["small", "medium", "large", "x-large"]

const Playground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Badge"
            docsLink="/docs/components/badge"
            description="Variants, sizes, and semantic labels with current badge props."
        >
            <div className="grid gap-5">
                {variants.map((variant) => (
                    <div key={variant} className="grid gap-3 border-t border-gray-200 pt-3 lg:grid-cols-[7rem_1fr] lg:items-center">
                        <span className="text-xs font-semibold uppercase text-gray-600">{variant}</span>
                        <div className="flex flex-wrap items-center gap-2">
                            {colors.map((color) => <Badge key={color} variant={variant} color={color}>{color}</Badge>)}
                        </div>
                    </div>
                ))}
                <div className="flex flex-wrap items-center gap-2 border-t border-gray-200 pt-3">
                    {sizes.map((size) => <Badge key={size} size={size}>{size}</Badge>)}
                </div>
            </div>
        </ColorLooper>
    </div>
)

export default Playground
