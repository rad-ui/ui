import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';
import clsx from 'clsx';

export type ContextMenuItemElement = ElementRef<typeof MenuPrimitive.Item>;
export type ContextMenuItemProps = {
  children: React.ReactNode;
  className?: string;
  label?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Item>;

const ContextMenuItem = forwardRef<ContextMenuItemElement, ContextMenuItemProps>(({ children, className, label, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    if (!context) {
        console.warn('ContextMenuItem should be used in the ContextMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Item ref={ref} className={clsx(`${rootClass}-item`, className)} label={label} {...props}>
            {children}
        </MenuPrimitive.Item>
    );
});

ContextMenuItem.displayName = 'ContextMenuItem';

export default ContextMenuItem;
