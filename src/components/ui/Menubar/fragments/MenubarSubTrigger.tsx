import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';
import clsx from 'clsx';

export type MenubarSubTriggerProps = {
  children: React.ReactNode;
  className?: string;
} & MenuPrimitiveProps.Trigger;

const MenubarSubTrigger = ({ children, className }:MenubarSubTriggerProps) => {
    const context = React.useContext(MenubarContext);
    if (!context) {
        console.log('MenubarSubTrigger should be used in the MenubarRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Trigger className={clsx(`${rootClass}-sub-trigger`, className)}>
            {children}
        </MenuPrimitive.Trigger>
    );
};

export default MenubarSubTrigger;
