import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';

export type MenubarGroupLabelProps = ComponentPropsWithoutRef<typeof MenuPrimitive.GroupLabel>;

const MenubarGroupLabel = forwardRef<HTMLDivElement, MenubarGroupLabelProps>(({ className, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.GroupLabel ref={ref} className={clsx(rootClass && `${rootClass}-label`, className) || undefined} data-slot="menubar-label" {...props} />;
});

MenubarGroupLabel.displayName = 'MenubarGroupLabel';

export default MenubarGroupLabel;
