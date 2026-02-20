import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';
import clsx from 'clsx';

export type MenubarSubElement = ElementRef<typeof MenuPrimitive.Sub>;
export type MenubarSubProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Sub>;

const MenubarSub = forwardRef<MenubarSubElement, MenubarSubProps>(({ children, className, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    if (!context) {
        console.warn('MenubarSub should be used in the MenubarRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Sub ref={ref} className={clsx(`${rootClass}-sub`, className)} {...props}>
            {children}
        </MenuPrimitive.Sub>
    );
});

MenubarSub.displayName = 'MenubarSub';

export default MenubarSub;
