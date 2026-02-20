import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

export type DropdownMenuPortalElement = ElementRef<typeof MenuPrimitive.Portal>;
export type DropdownMenuPortalProps = {
  children: React.ReactNode;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Portal>;

const DropdownMenuPortal = forwardRef<DropdownMenuPortalElement, DropdownMenuPortalProps>(({ children, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.warn('DropdownMenuPortal should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Portal ref={ref} {...props}>
            {children}
        </MenuPrimitive.Portal>
    );
});

DropdownMenuPortal.displayName = 'DropdownMenuPortal';

export default DropdownMenuPortal;
