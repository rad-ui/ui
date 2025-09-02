import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

export type DropdownMenuRootProps = {
  children: React.ReactNode;
  customRootClass?: string;
  className?: string;
} & MenuPrimitiveProps.Root;

const COMPONENT_NAME = 'DropdownMenu';

const DropdownMenuRoot = ({ children, customRootClass, className }:DropdownMenuRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <DropdownMenuContext.Provider value={{ rootClass }} >
            <MenuPrimitive.Root className={clsx(`${rootClass}-root`, className)}>
                {children}
            </MenuPrimitive.Root>
        </DropdownMenuContext.Provider>
    );
};

export default DropdownMenuRoot;
