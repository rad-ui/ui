import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';

export type MenubarPortalElement = ElementRef<typeof MenuPrimitive.Portal>;
export type MenubarPortalProps = {
  children: React.ReactNode;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Portal>;

const MenubarPortal = forwardRef<MenubarPortalElement, MenubarPortalProps>(({ children, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    if (!context) {
        console.warn('MenubarPortal should be used in the MenubarRoot');
        return null;
    }
    return (
        <MenuPrimitive.Portal ref={ref} {...props}>
            {children}
        </MenuPrimitive.Portal>
    );
});

MenubarPortal.displayName = 'MenubarPortal';

export default MenubarPortal;
