import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';

export type MenubarItemIndicatorProps = ComponentPropsWithoutRef<typeof MenuPrimitive.ItemIndicator>;

const MenubarItemIndicator = forwardRef<HTMLSpanElement, MenubarItemIndicatorProps>(({ className, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.ItemIndicator ref={ref} className={clsx(rootClass && `${rootClass}-item-indicator`, className) || undefined} data-slot="menubar-item-indicator" {...props} />;
});

MenubarItemIndicator.displayName = 'MenubarItemIndicator';

export default MenubarItemIndicator;
