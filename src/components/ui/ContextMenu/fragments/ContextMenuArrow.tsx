import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';

export type ContextMenuArrowProps = ComponentPropsWithoutRef<typeof MenuPrimitive.Arrow>;

/** An arrow pointing from the menu to its trigger. Render it inside Content. */
const ContextMenuArrow = forwardRef<SVGSVGElement, ContextMenuArrowProps>(({ className, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.Arrow ref={ref} className={clsx(rootClass && `${rootClass}-arrow`, className) || undefined} data-slot="context-menu-arrow" {...props} />;
});

ContextMenuArrow.displayName = 'ContextMenuArrow';

export default ContextMenuArrow;
