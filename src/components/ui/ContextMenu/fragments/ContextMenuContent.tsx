import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';
import { createDataAttributes } from '~/core/hooks/createDataAttribute';
import clsx from 'clsx';

export type ContextMenuContentElement = ElementRef<typeof MenuPrimitive.Content>;
export type ContextMenuContentProps = {
  children: React.ReactNode;
  className?: string;
  /** Visual style variant of the content panel */
  variant?: 'default' | 'soft' | 'outline';
  /** Size of the content panel */
  size?: 'small' | 'medium' | 'large';
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Content>;

const ContextMenuContent = forwardRef<ContextMenuContentElement, ContextMenuContentProps>(({ children, className, variant, size, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    if (!context) {
        console.warn('ContextMenuContent should be used in the ContextMenuRoot');
        return null;
    }
    const { rootClass } = context;
    const resolvedVariant = variant ?? context.variant;
    const resolvedSize = size ?? context.size;
    const dataAttributes = createDataAttributes('context-menu-content', { variant: resolvedVariant, size: resolvedSize });
    return (
        <MenuPrimitive.Content ref={ref} className={clsx(`${rootClass}-content`, className)} {...dataAttributes} {...props}>
            {children}
        </MenuPrimitive.Content>
    );
});

ContextMenuContent.displayName = 'ContextMenuContent';

export default ContextMenuContent;
