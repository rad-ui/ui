import { Placement } from '@floating-ui/react';
import React from 'react';
import Popper from '~/components/tools/Popper/Popper';

const COMPONENT_NAME = 'Tooltip';

type TooltipProps = {
    children: React.ReactNode;
    label?: string;
    placement?:Placement;
    [key: string]: any;
};

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
