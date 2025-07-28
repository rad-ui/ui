import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

export type DropdownMenuTriggerProps = {
  children: React.ReactNode;
  className?: string;
} & MenuPrimitiveProps.Trigger;

const DropdownMenuTrigger = ({ children, className }:DropdownMenuTriggerProps) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuTrigger should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Trigger className={clsx(`${rootClass}-trigger`, className)}>
            {children}
        </MenuPrimitive.Trigger>
    );
};

export default DropdownMenuTrigger;
