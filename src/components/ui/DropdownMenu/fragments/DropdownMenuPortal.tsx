import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

const DropdownMenuPortal = ({children}) => {
    const {rootClass} = React.useContext(DropdownMenuContext);
    return(
        <MenuPrimitive.Portal>
            {children}
        </MenuPrimitive.Portal>
    )
}

export default DropdownMenuPortal