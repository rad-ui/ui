'use client'

import ColorLooper from "../helpers/ColorLooper"
import Heading from "@radui/ui/Heading"

const Playground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            loop={false}
            title="Heading"
            docsLink="/docs/components/heading"
            description="Type scale preview using the current heading component and semantic tags."
        >
            <div className='space-y-2 mb-2'>
                <Heading className="text-gray-1000">Playground demos should read like product UI, not fixture data</Heading>
                <Heading className="text-gray-950" as="h2">Section hierarchy becomes obvious when scale and rhythm are consistent</Heading>
                <Heading className="text-gray-900" as="h3">Use lower levels for support copy and dense surfaces</Heading>
                <Heading className="text-gray-800" as="h4">Keep headings short enough to scan in a list</Heading>
                <Heading className="text-gray-700" as="h5">Reserve smaller headings for local grouping</Heading>
                <Heading className="text-gray-600" as="h6">They should still feel intentional</Heading>
            </div>
        </ColorLooper>
    </div>
)

export default Playground
