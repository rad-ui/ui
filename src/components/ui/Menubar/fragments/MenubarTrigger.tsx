import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';
import clsx from 'clsx';
import Floater from '~/core/primitives/Floater';
import MenubarMenuContext from '../contexts/MenubarMenuContext';

export type MenubarTriggerProps = {
  children: React.ReactNode;
  className?: string;
} & MenuPrimitiveProps.Trigger;

const MenubarTrigger = ({ children, className }:MenubarTriggerProps) => {
    const context = React.useContext(MenubarContext);
    if (!context) {
        console.log('MenubarTrigger should be used in the MenubarRoot');
        return null;
    }
    const { rootClass } = context;

    const menuContext = React.useContext(MenubarMenuContext);
    if (!menuContext) {
        console.log('MenubarTrigger should be used in the MenubarMenu');
        return null;
    }
    const { isOpen } = menuContext;

    return (
        <Floater.CompositeItem
            render={
                () => (
                    <MenuPrimitive.Trigger className={clsx(`${rootClass}-trigger`, className)} data-active={isOpen}>
                        {children}
                    </MenuPrimitive.Trigger>
                )
            }/>

    );
};

export default MenubarTrigger;
