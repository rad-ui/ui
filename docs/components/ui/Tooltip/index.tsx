"use client"
import Tooltip from "@radui/ui/Tooltip"

const TooltipWrapper = ({ children, label='', ...props }: { children: React.ReactNode, label: string, props: any }) => {
    return (
        <Tooltip.Root {...props}>
            <Tooltip.Trigger asChild>
                {children}
            </Tooltip.Trigger>
            <Tooltip.Content>
                {label}
            </Tooltip.Content>
        </Tooltip.Root>
    )
}

export default TooltipWrapper;