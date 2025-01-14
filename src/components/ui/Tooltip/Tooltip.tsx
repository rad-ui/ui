import React from 'react';
import Popper, { PopperProps } from '~/components/tools/Popper/Popper';

const COMPONENT_NAME = 'Tooltip';

type TooltipProps = {
  children: React.ReactNode;
  label?: string;
  placement?: PopperProps['placement'];
} & JSX.IntrinsicElements['span'];

const Tooltip = ({ children, label = '', placement = 'top', ...props }: TooltipProps) => {
    return (
        <Popper
            popperName={COMPONENT_NAME}
            pop={label}
            placement={placement}
            {...props}
        >
            {children}
        </Popper>
    );
};

export default Tooltip;
