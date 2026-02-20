import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';

export type ContextMenuPortalElement = ElementRef<typeof MenuPrimitive.Portal>;
export type ContextMenuPortalProps = {
  children: React.ReactNode;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Portal>;

const ContextMenuPortal = forwardRef<ContextMenuPortalElement, ContextMenuPortalProps>(({ children, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    if (!context) {
        console.warn('ContextMenuPortal should be used in the ContextMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Portal ref={ref} {...props}>
            {children}
        </MenuPrimitive.Portal>
    );
});

ContextMenuPortal.displayName = 'ContextMenuPortal';

export default ContextMenuPortal;
