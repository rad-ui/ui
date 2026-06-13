import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import Separator from '../../Separator/Separator';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

export type DropdownMenuSeparatorElement = ElementRef<typeof Separator>;
export type DropdownMenuSeparatorProps = {
    className?: string
} & ComponentPropsWithoutRef<typeof Separator>;

const DropdownMenuSeparator = forwardRef<DropdownMenuSeparatorElement, DropdownMenuSeparatorProps>(({ className, ...props }: DropdownMenuSeparatorProps, ref) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.warn('DropdownMenuSeparator should be used within DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <Separator ref={ref} customRootClass={rootClass} className={className} {...props}/>
    );
});

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export default DropdownMenuSeparator;
