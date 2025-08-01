import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';
import clsx from 'clsx';

export type MenubarSubProps = {
  children: React.ReactNode;
  className?: string;
} & MenuPrimitiveProps.Sub;

const MenubarSub = ({ children, className, ...props }:MenubarSubProps) => {
    const context = React.useContext(MenubarContext);
    if (!context) {
        console.log('MenubarSub should be used in the MenubarRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Sub className={clsx(`${rootClass}-sub`, className)} {...props}>
            {children}
        </MenuPrimitive.Sub>
    );
};

export default MenubarSub;
