import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';

export type MenubarCheckboxItemProps = ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>;

const MenubarCheckboxItem = forwardRef<HTMLButtonElement, MenubarCheckboxItemProps>(({ className, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.CheckboxItem ref={ref} className={clsx(rootClass && `${rootClass}-item`, rootClass && `${rootClass}-checkbox-item`, className) || undefined} data-slot="menubar-checkbox-item" {...props} />;
});

MenubarCheckboxItem.displayName = 'MenubarCheckboxItem';

export default MenubarCheckboxItem;
