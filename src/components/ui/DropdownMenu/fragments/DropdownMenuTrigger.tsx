import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

export type DropdownMenuTriggerElement = ElementRef<typeof MenuPrimitive.Trigger>;
export type DropdownMenuTriggerProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>;

const DropdownMenuTrigger = forwardRef<DropdownMenuTriggerElement, DropdownMenuTriggerProps>(({ children, className, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.warn('DropdownMenuTrigger should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Trigger ref={ref} className={clsx(`${rootClass}-trigger`, className)} {...props}>
            {children}
        </MenuPrimitive.Trigger>
    );
});

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

export default DropdownMenuTrigger;
