import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';

export type ContextMenuItemIndicatorProps = ComponentPropsWithoutRef<typeof MenuPrimitive.ItemIndicator>;

const ContextMenuItemIndicator = forwardRef<HTMLSpanElement, ContextMenuItemIndicatorProps>(({ className, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.ItemIndicator ref={ref} className={clsx(rootClass && `${rootClass}-item-indicator`, className) || undefined} data-slot="context-menu-item-indicator" {...props} />;
});

ContextMenuItemIndicator.displayName = 'ContextMenuItemIndicator';

export default ContextMenuItemIndicator;
