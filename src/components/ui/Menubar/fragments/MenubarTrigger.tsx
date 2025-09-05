import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';
import clsx from 'clsx';
import Floater from '~/core/primitives/Floater';
import MenubarMenuContext from '../contexts/MenubarMenuContext';

export type MenubarTriggerElement = ElementRef<typeof MenuPrimitive.Trigger>;
export type MenubarTriggerProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>;

const MenubarTrigger = forwardRef<MenubarTriggerElement, MenubarTriggerProps>(({ children, className, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    const menuContext = React.useContext(MenubarMenuContext);

    if (!context) {
        console.log('MenubarTrigger should be used in the MenubarRoot');
        return null;
    }
    const { rootClass } = context;

    if (!menuContext) {
        console.log('MenubarTrigger should be used in the MenubarMenu');
        return null;
    }
    const { isOpen } = menuContext;

    return (
        <Floater.CompositeItem
            render={() => (
                <MenuPrimitive.Trigger
                    ref={ref}
                    className={clsx(`${rootClass}-trigger`, className)}
                    data-active={isOpen}
                    {...props}
                >
                    {children}
                </MenuPrimitive.Trigger>
            )}
        />

    );
});

MenubarTrigger.displayName = 'MenubarTrigger';

export default MenubarTrigger;
