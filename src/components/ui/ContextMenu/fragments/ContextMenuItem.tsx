import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';
import clsx from 'clsx';

export type ContextMenuItemProps = {
  children: React.ReactNode;
  className?: string;
  label?: string;
} & MenuPrimitiveProps.Item;

const ContextMenuItem = ({ children, className, label, ...props }:ContextMenuItemProps) => {
    const context = React.useContext(ContextMenuContext);
    if (!context) {
        console.log('ContextMenuItem should be used in the ContextMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Item className={clsx(`${rootClass}-item`, className)} label={label} {...props}>
            {children}
        </MenuPrimitive.Item>
    );
};

export default ContextMenuItem;
