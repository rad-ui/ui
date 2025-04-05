"use client"
import Tooltip from "@radui/ui/Tooltip"

const TooltipWrapper = ({ children, label='', placement='bottom', ...props }: { children: React.ReactNode, label: string, placement: string, props?: any }) => {
    return (
        <Tooltip.Root {...props} placement={placement}>
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