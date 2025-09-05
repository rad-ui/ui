import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

export type DropdownMenuSubTriggerElement = ElementRef<typeof MenuPrimitive.Trigger>;
export type DropdownMenuSubTriggerProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>;

const DropdownMenuSubTrigger = forwardRef<DropdownMenuSubTriggerElement, DropdownMenuSubTriggerProps>(({ children, className, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuSubTrigger should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Trigger ref={ref} className={clsx(`${rootClass}-sub-trigger`, className)} {...props}>
            {children}
        </MenuPrimitive.Trigger>
    );
});

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

export default DropdownMenuSubTrigger;
