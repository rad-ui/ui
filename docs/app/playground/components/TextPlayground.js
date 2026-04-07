'use client'

import ColorLooper from "../helpers/ColorLooper"
import Text from "@radui/ui/Text"

const Playground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            loop={false}
            title="Text"
            docsLink="/docs/components/text"
            description="Plain text remains the default body primitive for paragraphs and support copy."
        >
            <div className='space-y-3'>
                <Text className="text-gray-1000">
                    Start with readable defaults, then layer visual treatment on top. The playground should explain the components while it demonstrates them.
                </Text>
                <Text as="div" className="text-gray-800">
                    This example also covers the supported <code>as</code> override without dropping into an unsupported element.
                </Text>
            </div>
        </ColorLooper>
    </div>
)

export default Playground
