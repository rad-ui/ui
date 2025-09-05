import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

type DropdownMenuItemElement = React.ElementRef<typeof MenuPrimitive.Item>;
export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item>;

const DropdownMenuItem = React.forwardRef<DropdownMenuItemElement, DropdownMenuItemProps>(({ children, className, ...props }, forwardedRef) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuItem should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Item ref={forwardedRef} className={clsx(`${rootClass}-item`, className)} {...props}>
            {children}
        </MenuPrimitive.Item>
    );
});

DropdownMenuItem.displayName = 'DropdownMenuItem';

export default DropdownMenuItem;
