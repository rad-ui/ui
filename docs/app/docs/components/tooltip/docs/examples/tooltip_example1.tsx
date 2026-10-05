"use client"

import Button from "@radui/ui/Button"
import Tooltip from "@radui/ui/Tooltip"

// The trigger must be focusable so keyboard users get the tooltip too:
// a Button (or Tooltip.Trigger's own default button) does that for free.
const TooltipExample1 = () => {
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <Button variant="soft">Hover or focus me</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
                Hello from the tooltip!
            </Tooltip.Content>
        </Tooltip.Root>
    )
}

export default TooltipExample1;
