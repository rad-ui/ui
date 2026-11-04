import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

export type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>;

const DropdownMenuCheckboxItem = forwardRef<HTMLButtonElement, DropdownMenuCheckboxItemProps>(({ className, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.CheckboxItem ref={ref} className={clsx(rootClass && `${rootClass}-item`, rootClass && `${rootClass}-checkbox-item`, className) || undefined} data-slot="dropdown-menu-checkbox-item" {...props} />;
});

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

export default DropdownMenuCheckboxItem;
