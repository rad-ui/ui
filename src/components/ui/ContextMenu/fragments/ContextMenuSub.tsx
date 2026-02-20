import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';
import clsx from 'clsx';

export type ContextMenuSubElement = ElementRef<typeof MenuPrimitive.Sub>;
export type ContextMenuSubProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Sub>;

const ContextMenuSub = forwardRef<ContextMenuSubElement, ContextMenuSubProps>(({ children, className, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    if (!context) {
        console.warn('ContextMenuSub should be used in the ContextMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Sub ref={ref} className={clsx(`${rootClass}-sub`, className)} {...props}>
            {children}
        </MenuPrimitive.Sub>
    );
});

ContextMenuSub.displayName = 'ContextMenuSub';

export default ContextMenuSub;
