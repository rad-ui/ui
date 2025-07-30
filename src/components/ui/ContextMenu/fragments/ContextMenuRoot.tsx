import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import ContextMenuContext from '../contexts/ContextMenuContext';
import { useControllableState } from '~/core/hooks/useControllableState';

export type ContextMenuRootProps = {
  children: React.ReactNode;
  customRootClass?: string;
  className?: string;
} & MenuPrimitiveProps.Root;

const COMPONENT_NAME = 'ContextMenu';

const ContextMenuRoot = ({ children, customRootClass, className, open, defaultOpen = false, onOpenChange, ...props }:ContextMenuRootProps) => {
    const [isOpen, setIsOpen] = useControllableState(
        open,
        defaultOpen,
        onOpenChange
    );
    const [coords, setCoords] = React.useState({ x: 0, y: 0 });
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <ContextMenuContext.Provider value={{ rootClass, setCoords, setIsOpen }} >
            <MenuPrimitive.Root className={clsx(`${rootClass}-root`, className)} mainAxisOffset={-coords.y} crossAxisOffset={coords.x} open={isOpen} onOpenChange={setIsOpen} {...props}>
                {children}
            </MenuPrimitive.Root>
        </ContextMenuContext.Provider>
    );
};

export default ContextMenuRoot;
