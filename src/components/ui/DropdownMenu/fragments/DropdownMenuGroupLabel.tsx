import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

export type DropdownMenuGroupLabelProps = ComponentPropsWithoutRef<typeof MenuPrimitive.GroupLabel>;

const DropdownMenuGroupLabel = forwardRef<HTMLDivElement, DropdownMenuGroupLabelProps>(({ className, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.GroupLabel ref={ref} className={clsx(rootClass && `${rootClass}-label`, className) || undefined} data-slot="dropdown-menu-label" {...props} />;
});

DropdownMenuGroupLabel.displayName = 'DropdownMenuGroupLabel';

export default DropdownMenuGroupLabel;
