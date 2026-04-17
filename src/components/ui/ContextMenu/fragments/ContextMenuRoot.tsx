import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import ContextMenuContext from '../contexts/ContextMenuContext';
import { useControllableState } from '~/core/hooks/useControllableState';

export type ContextMenuRootElement = ElementRef<typeof MenuPrimitive.Root>;
export type ContextMenuRootProps = {
  children: React.ReactNode;
  customRootClass?: string;
  className?: string;
  variant?: 'default' | 'soft' | 'outline';
  size?: 'small' | 'medium' | 'large';
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Root>;

const COMPONENT_NAME = 'ContextMenu';

const ContextMenuRoot = forwardRef<ContextMenuRootElement, ContextMenuRootProps>(({ children, customRootClass, className, open, defaultOpen = false, onOpenChange, variant, size, ...props }, ref) => {
    const [isOpen, setIsOpen] = useControllableState(
        open,
        defaultOpen,
        onOpenChange
    );
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    return (
        <ContextMenuContext.Provider value={{ rootClass, setIsOpen, variant, size }} >
            <MenuPrimitive.Root ref={ref} className={clsx(rootClass && `${rootClass}-root`, className)} open={isOpen} onOpenChange={setIsOpen} {...props}>
                {children}
            </MenuPrimitive.Root>
        </ContextMenuContext.Provider>
    );
});

ContextMenuRoot.displayName = COMPONENT_NAME;

export default ContextMenuRoot;
