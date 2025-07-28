import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

export type DropdownMenuSubTriggerProps = {
  children: React.ReactNode;
  className?: string;
} & MenuPrimitiveProps.Trigger;

const DropdownMenuSubTrigger = ({ children, className }:DropdownMenuSubTriggerProps) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuSubTrigger should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Trigger className={clsx(`${rootClass}-sub-trigger`, className)}>
            {children}
        </MenuPrimitive.Trigger>
    );
};

export default DropdownMenuSubTrigger;
