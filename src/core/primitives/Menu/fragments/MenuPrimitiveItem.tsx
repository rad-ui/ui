import React, { forwardRef } from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

export type MenuPrimitiveItemProps = {
    children: React.ReactNode
    className?: string
    label?: string
}

const MenuPrimitiveItem = forwardRef<HTMLButtonElement, MenuPrimitiveItemProps>(({ children, className, label, ...props }, propRef) => {
    const context = React.useContext(MenuPrimitiveRootContext);
    if (!context) return null;
    const { activeIndex, getItemProps } = context;
    const { ref, index } = Floater.useListItem({
        label
    });
    const tree = Floater.useFloatingTree();
    const isActive = activeIndex === index;

    return (
        <button
            ref={Floater.useMergeRefs([ref, propRef])} tabIndex={isActive ? 0 : -1}
            className={className}
            {...getItemProps({
                onClick(event: React.MouseEvent<HTMLButtonElement>) {
                    tree?.events.emit('click');
                }
            })}
            {...props}
        >
            {children}
        </button>
    );
});

MenuPrimitiveItem.displayName = 'MenuPrimitiveItem';
export default MenuPrimitiveItem;
