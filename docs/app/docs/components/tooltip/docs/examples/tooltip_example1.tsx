"use client"

import Card from "@radui/ui/Card"
import Tooltip from "@radui/ui/Tooltip"
import Text from "@radui/ui/Text"

const TooltipExample1 = () => {
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <Card className="bg-gray-50" style={{ display: "flex", gap: 20 }}>
                    <Text className="text-gray-950">Hello Tooltip. Hover Me!</Text>
                </Card>
            </Tooltip.Trigger>
            <Tooltip.Content>
                        Hello from the tooltip!
            </Tooltip.Content>
        </Tooltip.Root>
    )
}

export default TooltipExample1;