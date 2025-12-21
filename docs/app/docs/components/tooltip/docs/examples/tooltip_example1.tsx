"use client"

import Tooltip from "@radui/ui/Tooltip"

const TooltipExample1 = () => {
    return (
        <Tooltip.Root>
            <Tooltip.Trigger>
                Hello Tooltip. Hover Me!
            </Tooltip.Trigger>
            <Tooltip.Content className="z-[9999] bg-black rounded shadow-lg">
                Hello from the tooltip!
            </Tooltip.Content>
        </Tooltip.Root>
    )
}

export default TooltipExample1;