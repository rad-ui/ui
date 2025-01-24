import React from 'react';
import Popper, { PopperProps } from '~/components/tools/Popper/Popper';

const COMPONENT_NAME = 'Tooltip';

type TooltipProps = {
  children: React.ReactNode;
  label?: string;
  placement?: PopperProps['placement'];
  showArrow?: boolean;
  className?: string;
  asChild?: boolean;
};

const Tooltip = ({ children, label = '', showArrow = true, placement = 'top', className = '', asChild, ...props }: TooltipProps) => {
    return (
        <Popper.Root
            popperName={COMPONENT_NAME}
            placement={placement}
            showArrow={showArrow}
            asChild={asChild}
            {...props}
        >
            <Popper.Trigger asChild={true} className={className}>
                {children}
                <Popper.Content >
                    {label}
                </Popper.Content>
            </Popper.Trigger>
        </Popper.Root>
    );
};

export default Tooltip;

export type { TooltipProps };
