import React, { useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

export type MenuPrimitiveTriggerProps = {
    children: React.ReactNode
    className?: string
}

const MenuPrimitiveTrigger = ({ children, className }: MenuPrimitiveTriggerProps) => {
    const context = useContext(MenuPrimitiveRootContext);
    if (!context) return null;
    const { isOpen, setIsOpen, activeIndex, refs, floatingStyles, getReferenceProps, isNested } = context;
    const { ref, index } = Floater.useListItem();

    return (
        <button
            className={className}
            onClick={() => setIsOpen(!isOpen)}
            tabIndex={
                !isNested ? undefined : activeIndex === index ? 0 : -1
            }

            ref={Floater.useMergeRefs([refs.setReference, ref])}
            {...getReferenceProps()}
        >
            {children}
        </button>
    );
};
export default MenuPrimitiveTrigger;
