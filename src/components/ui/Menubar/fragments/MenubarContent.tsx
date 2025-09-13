import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';
import clsx from 'clsx';

export type MenubarContentElement = ElementRef<typeof MenuPrimitive.Content>;
export type MenubarContentProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Content>;

const MenubarContent = forwardRef<MenubarContentElement, MenubarContentProps>(({ children, className, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    if (!context) {
        console.log('MenubarContent should be used in the MenubarRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Content ref={ref} className={clsx(`${rootClass}-content`, className)} {...props}>
            {children}
        </MenuPrimitive.Content>
    );
});

MenubarContent.displayName = 'MenubarContent';

export default MenubarContent;
