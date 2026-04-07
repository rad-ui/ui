'use client'

import Tooltip from "@radui/ui/Tooltip"
import ColorLooper from "../helpers/ColorLooper"

const TooltipPlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Tooltip"
            docsLink="/docs/components/tooltip"
            description="Compact hover and focus hint for labels, shortcuts, and secondary detail."
        >
            <div className='flex items-center gap-4'>
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        Hover target
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        Add to library
                    </Tooltip.Content>
                </Tooltip.Root>
            </div>
        </ColorLooper>
    </div>
)

export default TooltipPlayground
