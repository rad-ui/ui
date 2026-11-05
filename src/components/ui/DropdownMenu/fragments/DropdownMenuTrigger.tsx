import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

export type DropdownMenuTriggerElement = ElementRef<typeof MenuPrimitive.Trigger>;
export type DropdownMenuTriggerProps = {
  children?: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>;

const DropdownMenuTrigger = forwardRef<DropdownMenuTriggerElement, DropdownMenuTriggerProps>(({ children, className, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    // A trigger with a handle can live anywhere; others need their Root.
    if (!context && !props.handle) {
        console.warn('DropdownMenuTrigger should be used in the DropdownMenuRoot');
        return null;
    }
    const rootClass = context?.rootClass ?? '';
    return (
        <MenuPrimitive.Trigger ref={ref} className={clsx(rootClass && `${rootClass}-trigger`, className)} {...props}>
            {children}
        </MenuPrimitive.Trigger>
    );
});

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

export default DropdownMenuTrigger;
