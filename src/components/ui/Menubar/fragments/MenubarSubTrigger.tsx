import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';
import clsx from 'clsx';

export type MenubarSubTriggerElement = ElementRef<typeof MenuPrimitive.Trigger>;
export type MenubarSubTriggerProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>;

const MenubarSubTrigger = forwardRef<MenubarSubTriggerElement, MenubarSubTriggerProps>(({ children, className, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    if (!context) {
        console.log('MenubarSubTrigger should be used in the MenubarRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Trigger ref={ref} className={clsx(`${rootClass}-sub-trigger`, className)} {...props}>
            {children}
        </MenuPrimitive.Trigger>
    );
});

MenubarSubTrigger.displayName = 'MenubarSubTrigger';

export default MenubarSubTrigger;
