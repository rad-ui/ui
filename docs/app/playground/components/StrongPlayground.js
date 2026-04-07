'use client'

import Strong from "@radui/ui/Strong"
import Text from "@radui/ui/Text"
import ColorLooper from "../helpers/ColorLooper"

const StrongPlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Strong"
            docsLink="/docs/components/strong"
            description="Semantic emphasis for meaningfully important words inside regular copy."
        >
            <Text className="text-gray-900">
                The important part is not that the playground exists, but that it remains <Strong>accurate</Strong> as the component APIs evolve.
            </Text>
        </ColorLooper>
    </div>
)

export default StrongPlayground
