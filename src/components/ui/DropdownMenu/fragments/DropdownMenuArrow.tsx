import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

export type DropdownMenuArrowProps = ComponentPropsWithoutRef<typeof MenuPrimitive.Arrow>;

/** An arrow pointing from the menu to its trigger. Render it inside Content. */
const DropdownMenuArrow = forwardRef<SVGSVGElement, DropdownMenuArrowProps>(({ className, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.Arrow ref={ref} className={clsx(rootClass && `${rootClass}-arrow`, className) || undefined} data-slot="dropdown-menu-arrow" {...props} />;
});

DropdownMenuArrow.displayName = 'DropdownMenuArrow';

export default DropdownMenuArrow;
