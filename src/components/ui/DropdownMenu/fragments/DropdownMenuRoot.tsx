import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

type DropdownMenuRootElement = React.ElementRef<typeof MenuPrimitive.Root>;
export type DropdownMenuRootProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Root> & {
  customRootClass?: string;
};

const COMPONENT_NAME = 'DropdownMenu';

const DropdownMenuRoot = React.forwardRef<DropdownMenuRootElement, DropdownMenuRootProps>(({ children, customRootClass, className, ...props }, forwardedRef) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <DropdownMenuContext.Provider value={{ rootClass }} >
            <MenuPrimitive.Root ref={forwardedRef} className={clsx(`${rootClass}-root`, className)} {...props}>
                {children}
            </MenuPrimitive.Root>
        </DropdownMenuContext.Provider>
    );
});

DropdownMenuRoot.displayName = 'DropdownMenuRoot';

export default DropdownMenuRoot;
