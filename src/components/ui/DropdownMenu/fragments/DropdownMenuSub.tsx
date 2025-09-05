import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

export type DropdownMenuSubElement = ElementRef<typeof MenuPrimitive.Sub>;
export type DropdownMenuSubProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Sub>;

const DropdownMenuSub = forwardRef<DropdownMenuSubElement, DropdownMenuSubProps>(({ children, className, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuSub should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Sub ref={ref} className={clsx(`${rootClass}-sub`, className)} {...props}>
            {children}
        </MenuPrimitive.Sub>
    );
});

DropdownMenuSub.displayName = 'DropdownMenuSub';

export default DropdownMenuSub;
