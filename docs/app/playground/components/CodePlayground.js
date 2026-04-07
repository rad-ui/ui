'use client'

import ColorLooper from "../helpers/ColorLooper"
import Code from "@radui/ui/Code"
import Text from "@radui/ui/Text"

const Playground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Code"
            docsLink="/docs/components/code"
            description="Inline code snippets with current variants and sizing."
            loop={false}
        >
            <div className='space-y-3'>
                <Text className="text-gray-900">
                    Render your app shell before calling <Code>startTransition()</Code> so the interface stays responsive.
                </Text>
                <div className='flex flex-wrap items-center gap-2'>
                    <Code>npm run build</Code>
                    <Code variant="outline">pnpm lint</Code>
                    <Code size="large">useDeferredValue(query)</Code>
                </div>
            </div>
        </ColorLooper>
    </div>
)

export default Playground
