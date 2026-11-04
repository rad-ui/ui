import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';

export type MenubarGroupProps = ComponentPropsWithoutRef<typeof MenuPrimitive.Group>;

const MenubarGroup = forwardRef<HTMLDivElement, MenubarGroupProps>(({ className, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.Group ref={ref} className={clsx(rootClass && `${rootClass}-group`, className) || undefined} data-slot="menubar-group" {...props} />;
});

MenubarGroup.displayName = 'MenubarGroup';

export default MenubarGroup;
