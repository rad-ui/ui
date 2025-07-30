import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';
import clsx from 'clsx';
import Floater from '~/core/primitives/Floater';

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
    
    return (
        <MenuPrimitive.Trigger className={clsx(`${rootClass}-trigger`, className)}>
            {children}
        </MenuPrimitive.Trigger>
    );
};

export default MenubarTrigger;
