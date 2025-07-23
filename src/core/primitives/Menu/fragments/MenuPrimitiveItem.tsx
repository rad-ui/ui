import React from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

const MenuPrimitiveItem = ({ children, className }:any) => {
    const context = React.useContext(MenuPrimitiveRootContext);
    const activeIndex = context?.activeIndex;
    const { ref, index } = Floater.useListItem();

    const isActive = activeIndex === index;

    return (
        <button
            ref={ref} tabIndex={isActive ? 0 : -1}
            className={className}
        >
            {children}
        </button>
    );
};
export default MenuPrimitiveItem;
