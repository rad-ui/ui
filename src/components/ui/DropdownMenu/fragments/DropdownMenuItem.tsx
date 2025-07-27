import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

const DropdownMenuItem = ({children, className, label}) => {
    const {rootClass} = React.useContext(DropdownMenuContext);
    return(
        <MenuPrimitive.Item className={clsx(`${rootClass}-item`, className)} label={label}>
            {children}
        </MenuPrimitive.Item>
    )
}

export default DropdownMenuItem