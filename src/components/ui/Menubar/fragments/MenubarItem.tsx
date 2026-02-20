import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';
import clsx from 'clsx';

export type MenubarItemElement = ElementRef<typeof MenuPrimitive.Item>;
export type MenubarItemProps = {
  children: React.ReactNode;
  className?: string;
  label?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Item>;

const MenubarItem = forwardRef<MenubarItemElement, MenubarItemProps>(({ children, className, label, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    if (!context) {
        console.warn('MenubarItem should be used in the MenubarRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Item ref={ref} className={clsx(`${rootClass}-item`, className)} label={label} {...props}>
            {children}
        </MenuPrimitive.Item>
    );
});

MenubarItem.displayName = 'MenubarItem';

export default MenubarItem;
