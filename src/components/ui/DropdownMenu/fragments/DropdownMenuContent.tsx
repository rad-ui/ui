import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

export type DropdownMenuContentProps = {
  children: React.ReactNode;
  className?: string;
} & MenuPrimitiveProps.Content;

const DropdownMenuContent = ({ children, className }:DropdownMenuContentProps) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuContent should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Content className={clsx(`${rootClass}-content`, className)}>
            {children}
        </MenuPrimitive.Content>
    );
};

export default DropdownMenuContent;
