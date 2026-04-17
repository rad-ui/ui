'use client'

import Progress from "@radui/ui/Progress"
import Text from "@radui/ui/Text"
import ColorLooper from "../helpers/ColorLooper"

const ProgressPlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Progress"
            docsLink="/docs/components/progress"
            description="Completion states for uploads, onboarding steps, and background work."
        >
            <div className='space-y-4'>
                <div className='space-y-2'>
                    <Text className="text-sm text-gray-700">Documentation migration</Text>
                    <Progress.Root value={72} minValue={0} maxValue={100}>
                        <Progress.Indicator />
                    </Progress.Root>
                </div>
                <div className='space-y-2'>
                    <Text className="text-sm text-gray-700">Playground refresh</Text>
                    <Progress.Root value={100} minValue={0} maxValue={100}>
                        <Progress.Indicator />
                    </Progress.Root>
                </div>
            </div>
        </ColorLooper>
    </div>
)

export default ProgressPlayground
