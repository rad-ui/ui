import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';
import clsx from 'clsx';

export type ContextMenuContentElement = ElementRef<typeof MenuPrimitive.Content>;
export type ContextMenuContentProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Content>;

const ContextMenuContent = forwardRef<ContextMenuContentElement, ContextMenuContentProps>(({ children, className, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    if (!context) {
        console.log('ContextMenuContent should be used in the ContextMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Content ref={ref} className={clsx(`${rootClass}-content`, className)} {...props}>
            {children}
        </MenuPrimitive.Content>
    );
});

ContextMenuContent.displayName = 'ContextMenuContent';

export default ContextMenuContent;
