import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

export type DropdownMenuItemIndicatorProps = ComponentPropsWithoutRef<typeof MenuPrimitive.ItemIndicator>;

const DropdownMenuItemIndicator = forwardRef<HTMLSpanElement, DropdownMenuItemIndicatorProps>(({ className, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.ItemIndicator ref={ref} className={clsx(rootClass && `${rootClass}-item-indicator`, className) || undefined} data-slot="dropdown-menu-item-indicator" {...props} />;
});

DropdownMenuItemIndicator.displayName = 'DropdownMenuItemIndicator';

export default DropdownMenuItemIndicator;
