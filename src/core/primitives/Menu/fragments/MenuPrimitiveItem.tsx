import React, { forwardRef } from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import Primitive from '~/core/primitives/Primitive';

export type MenuPrimitiveItemProps = {
    children: React.ReactNode
    className?: string
    label?: string
    disabled?: boolean
    asChild?: boolean
}

const MenuPrimitiveItem = forwardRef<HTMLButtonElement, MenuPrimitiveItemProps>(
    ({ children, className, label, disabled, asChild = false, ...props }, propRef) => {
        const context = React.useContext(MenuPrimitiveRootContext);
        const checkLabel = disabled ? null : label;
        const { ref, index } = Floater.useListItem({ 
            label: checkLabel
         });
        const tree = Floater.useFloatingTree();
        const mergedRef = React.useCallback(
            (node: HTMLButtonElement | null) => {
                if (typeof ref === 'function') {
                    ref(node);
                } else if (ref) {
                    (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
                        node;
                }
                if (typeof propRef === 'function') {
                    propRef(node);
                } else if (propRef) {
                    (propRef as React.MutableRefObject<HTMLButtonElement | null>).current =
                        node;
                }
            },
            [ref, propRef]
        );

        if (!context) return null;
        const { activeIndex, getItemProps } = context;
        const isActive = activeIndex === index;

        return (
            <Primitive.button
                ref={mergedRef}
                tabIndex={isActive ? 0 : -1}
                className={className}
                {...getItemProps({
                    onClick(event: React.MouseEvent<HTMLButtonElement>) {
                        tree?.events.emit('click');
                    },
                })}
                asChild={asChild}
                {...props}
            >
                {children}
            </Primitive.button>
        );
    }
);

MenuPrimitiveItem.displayName = 'MenuPrimitiveItem';
export default MenuPrimitiveItem;
