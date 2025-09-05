import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

type DropdownMenuSubTriggerElement = React.ElementRef<typeof MenuPrimitive.Trigger>;
export type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>;

const DropdownMenuSubTrigger = React.forwardRef<DropdownMenuSubTriggerElement, DropdownMenuSubTriggerProps>(({ children, className, ...props }, forwardedRef) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuSubTrigger should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Trigger ref={forwardedRef} className={clsx(`${rootClass}-sub-trigger`, className)} {...props}>
            {children}
        </MenuPrimitive.Trigger>
    );
});

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

export default DropdownMenuSubTrigger;
