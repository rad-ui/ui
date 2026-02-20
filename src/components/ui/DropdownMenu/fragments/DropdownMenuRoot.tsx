import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

export type DropdownMenuRootElement = ElementRef<typeof MenuPrimitive.Root>;
export type DropdownMenuRootProps = {
  children: React.ReactNode;
  customRootClass?: string;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Root>;

const COMPONENT_NAME = 'DropdownMenu';

const DropdownMenuRoot = forwardRef<DropdownMenuRootElement, DropdownMenuRootProps>(({ children, customRootClass, className, ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <DropdownMenuContext.Provider value={{ rootClass }} >
            <MenuPrimitive.Root ref={ref} className={clsx(`${rootClass}-root`, className)} {...props}>
                {children}
            </MenuPrimitive.Root>
        </DropdownMenuContext.Provider>
    );
});

DropdownMenuRoot.displayName = COMPONENT_NAME;

export default DropdownMenuRoot;
