import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

const COMPONENT_NAME = 'DropdownMenu';


const DropdownMenuRoot = ({children, customRootClass, className}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return(
        <DropdownMenuContext.Provider value={{rootClass}} >
        <MenuPrimitive.Root className={clsx(`${rootClass}-root`, className)}>
            {children}
        </MenuPrimitive.Root>
        </DropdownMenuContext.Provider>
    )
}

export default DropdownMenuRoot