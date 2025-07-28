import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';
import clsx from 'clsx';

export type ContextMenuContentProps = {
  children: React.ReactNode;
  className?: string;
} & MenuPrimitiveProps.Content;

const ContextMenuContent = ({ children, className, ...props }:ContextMenuContentProps) => {
    const context = React.useContext(ContextMenuContext);
    if (!context) {
        console.log('ContextMenuContent should be used in the ContextMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Content className={clsx(`${rootClass}-content`, className)} {...props}>
            {children}
        </MenuPrimitive.Content>
    );
};

export default ContextMenuContent;
