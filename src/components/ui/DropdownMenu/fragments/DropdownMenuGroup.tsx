import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

export type DropdownMenuGroupProps = ComponentPropsWithoutRef<typeof MenuPrimitive.Group>;

const DropdownMenuGroup = forwardRef<HTMLDivElement, DropdownMenuGroupProps>(({ className, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.Group ref={ref} className={clsx(rootClass && `${rootClass}-group`, className) || undefined} data-slot="dropdown-menu-group" {...props} />;
});

DropdownMenuGroup.displayName = 'DropdownMenuGroup';

export default DropdownMenuGroup;
