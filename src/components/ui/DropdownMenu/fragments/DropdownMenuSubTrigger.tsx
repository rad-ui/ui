import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

const DropdownMenuSubTrigger = ({children, className}) => {
    const {rootClass} = React.useContext(DropdownMenuContext);
    return(
        <MenuPrimitive.Trigger className={clsx(`${rootClass}-sub-trigger`, className)}>
            {children}
        </MenuPrimitive.Trigger>
    )
}

export default DropdownMenuSubTrigger