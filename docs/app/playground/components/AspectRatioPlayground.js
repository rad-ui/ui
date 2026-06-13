'use client'

import AspectRatio from "@radui/ui/AspectRatio"
import ColorLooper from "../helpers/ColorLooper"

const AspectRatioPlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="AspectRatio"
            docsLink="/docs/components/aspect-ratio"
            description="Media containers that preserve layout before content finishes loading."
        >
            <div className='grid gap-4 md:grid-cols-2'>
                <AspectRatio ratio="16/9" className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-200">
                    <img
                        src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        alt="Mountain landscape"
                        className="h-full w-full object-cover"
                    />
                </AspectRatio>
                <AspectRatio ratio="1/1" className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-900 p-6">
                    <div className="flex h-full items-end justify-between rounded-xl border border-gray-700 bg-gray-950 p-4 text-gray-50">
                        <span className="text-sm uppercase tracking-[0.2em] text-gray-400">1:1</span>
                        <span className="text-2xl font-semibold">Artwork</span>
                    </div>
                </AspectRatio>
            </div>
        </ColorLooper>
    </div>
)

export default AspectRatioPlayground
