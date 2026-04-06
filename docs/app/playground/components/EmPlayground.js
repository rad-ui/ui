'use client'

import ColorLooper from "../helpers/ColorLooper"
import Text from "@radui/ui/Text"
import Em from "@radui/ui/Em"

const Playground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            loop={false}
            title="Em"
            docsLink="/docs/components/em"
            description="Inline emphasis stays lightweight and composable inside text content."
        >
            <div className='flex space-x-2'>
                <Text className="text-gray-1000">
                    Keep the baseline copy calm, then use <Em>emphasis only where the reader actually needs direction</Em>.
                </Text>
            </div>
        </ColorLooper>
    </div>
)

export default Playground
