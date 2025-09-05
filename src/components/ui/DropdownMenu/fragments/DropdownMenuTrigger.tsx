import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

type DropdownMenuTriggerElement = React.ElementRef<typeof MenuPrimitive.Trigger>;
export type DropdownMenuTriggerProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>;

const DropdownMenuTrigger = React.forwardRef<DropdownMenuTriggerElement, DropdownMenuTriggerProps>(({ children, className, ...props }, forwardedRef) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuTrigger should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Trigger ref={forwardedRef} className={clsx(`${rootClass}-trigger`, className)} {...props}>
            {children}
        </MenuPrimitive.Trigger>
    );
});

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

export default DropdownMenuTrigger;
