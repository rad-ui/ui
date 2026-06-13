"use client"
import Tooltip from "@radui/ui/Tooltip"

type TooltipWrapperProps = Omit<React.ComponentProps<typeof Tooltip.Root>, "children"> & {
    children: React.ReactNode;
    label?: React.ReactNode;
};

const TooltipWrapper = ({ children, label = '', placement = 'bottom', ...props }: TooltipWrapperProps) => {
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
