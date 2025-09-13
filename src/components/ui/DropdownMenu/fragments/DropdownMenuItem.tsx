import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

export type DropdownMenuItemElement = ElementRef<typeof MenuPrimitive.Item>;
export type DropdownMenuItemProps = {
  children: React.ReactNode;
  className?: string;
  label?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Item>;

const DropdownMenuItem = forwardRef<DropdownMenuItemElement, DropdownMenuItemProps>(({ children, className, label, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuItem should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Item ref={ref} className={clsx(`${rootClass}-item`, className)} label={label} {...props}>
            {children}
        </MenuPrimitive.Item>
    );
});

DropdownMenuItem.displayName = 'DropdownMenuItem';

export default DropdownMenuItem;
