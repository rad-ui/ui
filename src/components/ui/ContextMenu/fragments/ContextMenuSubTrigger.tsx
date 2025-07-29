import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';
import clsx from 'clsx';

export type ContextMenuSubTriggerProps = {
  children: React.ReactNode;
  className?: string;
} & MenuPrimitiveProps.Trigger;

const ContextMenuSubTrigger = ({ children, className, ...props }:ContextMenuSubTriggerProps) => {
    const context = React.useContext(ContextMenuContext);
    if (!context) {
        console.log('ContextMenuSubTrigger should be used in the ContextMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Trigger className={clsx(`${rootClass}-sub-trigger`, className)} {...props}>
            {children}
        </MenuPrimitive.Trigger>
    );
};

export default ContextMenuSubTrigger;
