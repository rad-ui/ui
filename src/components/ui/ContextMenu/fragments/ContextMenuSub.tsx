import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';
import clsx from 'clsx';

export type ContextMenuSubProps = {
  children: React.ReactNode;
  className?: string;
} & MenuPrimitiveProps.Sub;

const ContextMenuSub = ({ children, className, ...props }:ContextMenuSubProps) => {
    const context = React.useContext(ContextMenuContext);
    if (!context) {
        console.log('ContextMenuSub should be used in the ContextMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Sub className={clsx(`${rootClass}-sub`, className)} {...props}>
            {children}
        </MenuPrimitive.Sub>
    );
};

export default ContextMenuSub;
