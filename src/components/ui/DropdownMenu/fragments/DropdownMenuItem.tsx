import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

export type DropdownMenuItemProps = {
  children: React.ReactNode;
  className?: string;
  label?: string;
} & MenuPrimitiveProps.Item;

const DropdownMenuItem = ({ children, className, label }:DropdownMenuItemProps) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuItem should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Item className={clsx(`${rootClass}-item`, className)} label={label}>
            {children}
        </MenuPrimitive.Item>
    );
};

export default DropdownMenuItem;
