import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

const DropdownMenuContent = ({children,className}) => {
    const {rootClass} = React.useContext(DropdownMenuContext);
    return(
        <MenuPrimitive.Content className={clsx(`${rootClass}-content`, className)}>
            {children}
        </MenuPrimitive.Content>
    )
}

export default DropdownMenuContent