import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';


const DropdownMenuSub = ({children, className}) => {
    const {rootClass} = React.useContext(DropdownMenuContext);
    return(
        <MenuPrimitive.Sub className={clsx(`${rootClass}-sub`, className)}>
            {children}
        </MenuPrimitive.Sub>
    )
}

export default DropdownMenuSub