import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';
import clsx from 'clsx';

export type ContextMenuSubTriggerElement = ElementRef<typeof MenuPrimitive.Trigger>;
export type ContextMenuSubTriggerProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>;

const ContextMenuSubTrigger = forwardRef<ContextMenuSubTriggerElement, ContextMenuSubTriggerProps>(({ children, className, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    if (!context) {
        console.warn('ContextMenuSubTrigger should be used in the ContextMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Trigger ref={ref} className={clsx(`${rootClass}-sub-trigger`, className)} {...props}>
            {children}
        </MenuPrimitive.Trigger>
    );
});

ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

export default ContextMenuSubTrigger;
