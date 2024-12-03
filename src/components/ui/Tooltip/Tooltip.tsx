import React from 'react';
import Popper from '~/components/tools/Popper/Popper';

const COMPONENT_NAME = 'Tooltip';

type TooltipProps = {
    children: React.ReactNode;
    label: string;
    placement?: 
        | 'top' 
        | 'bottom' 
        | 'left' 
        | 'right' 
        | 'top-start' 
        | 'top-end' 
        | 'bottom-start' 
        | 'bottom-end' 
        | 'left-start' 
        | 'left-end' 
        | 'right-start' 
        | 'right-end';
    [key: string]: any;
};

const Tooltip = ({ children, label="hello", placement = 'top', ...props }: TooltipProps) => {
    return (
        <div>
            <Popper
                popperName={COMPONENT_NAME}
                pop={label} 
                placement={placement} 
                {...props}
            >
                {children}
            </Popper>
        </div>
    );
};

export default Tooltip;
