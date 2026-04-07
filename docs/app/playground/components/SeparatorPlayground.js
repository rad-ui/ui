'use client'

import ColorLooper from "../helpers/ColorLooper"
import Heading from "@radui/ui/Heading"
import Separator from "@radui/ui/Separator"
import Text from "@radui/ui/Text"
import Em from "@radui/ui/Em"

const Playground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            loop={false}
            title="Separator"
            docsLink="/docs/components/separator"
            description="Horizontal and vertical separators inside a denser card layout."
        >
            <div className='space-y-4 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 shadow-sm'>
                <Heading className="text-gray-1000 flex flex-wrap items-center gap-3" as="h3">
                    <span>Release Notes</span>
                    <Separator orientation="vertical" decorative />
                    <Em className="text-gray-900 font-light">Playground refresh</Em>
                </Heading>
                <Separator decorative />
                <Text className="text-gray-900">
                    Replaced deprecated demo patterns, wired up valid docs links, and reduced the accent loop to readable samples.
                </Text>
                <Separator decorative />
                <div className='flex flex-wrap items-center gap-3'>
                    <Text className="text-gray-1000">Status: shipped</Text>
                    <Separator orientation="vertical" decorative />
                    <Text>Coverage: core typography and primitives</Text>
                    <Separator orientation="vertical" decorative />
                    <Text><Em>Updated today</Em></Text>
                </div>
            </div>
        </ColorLooper>
    </div>
)

export default Playground
