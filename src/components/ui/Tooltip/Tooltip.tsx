import React from 'react';
import Popper, { PopperProps } from '~/components/tools/Popper/Popper';

const COMPONENT_NAME = 'Tooltip';

type TooltipProps = {
  children: React.ReactNode;
  label?: string;
  placement?: PopperProps['placement'];
  showArrow?: boolean;
  className?: string;
};

const Tooltip = ({ children, label = '', showArrow = true, placement = 'top', className = '', ...props }: TooltipProps) => {
    return (
        <Popper.Root
            popperName={COMPONENT_NAME}
            placement={placement}
            showArrow={showArrow}
            {...props}
        >
            <Popper.Trigger className={className}>
                {children}
            </Popper.Trigger>
            <Popper.Content >
                {label}
            </Popper.Content>
        </Popper.Root>
    );
};

export default Tooltip;

export type { TooltipProps };
