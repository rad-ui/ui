import React, { useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import ButtonPrimitive from '../../Button';

export type MenuPrimitiveTriggerProps = {
    children: React.ReactNode
    className?: string
    asChild?: boolean
}

const MenuPrimitiveTrigger = ({ children, className, asChild, ...props }: MenuPrimitiveTriggerProps) => {
    const context = useContext(MenuPrimitiveRootContext);
    if (!context) return null;
    const { isOpen, setIsOpen, activeIndex, refs, floatingStyles, getReferenceProps, isNested } = context;
    const { ref, index } = Floater.useListItem();

    return (
        <ButtonPrimitive
            className={className}
            tabIndex={
                !isNested ? undefined : activeIndex === index ? 0 : -1
            }

            ref={Floater.useMergeRefs([refs.setReference, ref])}
            {...getReferenceProps()}
            asChild={asChild}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
};
export default MenuPrimitiveTrigger;
