import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import ContextMenuContext from '../contexts/ContextMenuContext';
import { useControllableState } from '~/core/hooks/useControllableState';
import { callOpenChange, createOpenChangeDetails, type OpenChangeDetails } from '~/core/utils/openChangeDetails';

const noop = () => {};

export type ContextMenuRootElement = ElementRef<typeof MenuPrimitive.Root>;
export type ContextMenuRootProps = {
  children: React.ReactNode;
  customRootClass?: string;
  className?: string;
  variant?: string;
  size?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Root>;

const COMPONENT_NAME = 'ContextMenu';

const ContextMenuRoot = forwardRef<ContextMenuRootElement, ContextMenuRootProps>(({ children, customRootClass, className, open, defaultOpen = false, onOpenChange, variant, size, ...props }, ref) => {
    const [isOpen, setOpenState] = useControllableState(open, defaultOpen, noop);
    // The menu primitive reports changes with details; right-click opens are reported here.
    const handleOpenChange = React.useCallback((next: boolean, details: OpenChangeDetails) => {
        callOpenChange(onOpenChange, next, details);
        if (!details.isCanceled) setOpenState(next);
    }, [onOpenChange, setOpenState]);
    const setIsOpen = React.useCallback((next: boolean) => {
        handleOpenChange(next, createOpenChangeDetails(next ? 'trigger-press' : 'none'));
    }, [handleOpenChange]);
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    return (
        <ContextMenuContext.Provider value={{ rootClass, setIsOpen, variant, size }} >
            <MenuPrimitive.Root ref={ref} className={clsx(rootClass && `${rootClass}-root`, className)} open={isOpen} onOpenChange={handleOpenChange} {...props}>
                {children}
            </MenuPrimitive.Root>
        </ContextMenuContext.Provider>
    );
});

ContextMenuRoot.displayName = COMPONENT_NAME;

export default ContextMenuRoot;
