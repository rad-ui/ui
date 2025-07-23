import React from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

export type MenuPrimitiveItemProps = {
    children: React.ReactNode
    className?: string
}

const MenuPrimitiveItem = ({ children, className }: MenuPrimitiveItemProps) => {
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
