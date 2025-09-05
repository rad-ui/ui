import React, { useContext, forwardRef } from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import ButtonPrimitive from '../../Button';

export type MenuPrimitiveTriggerProps = {
    children: React.ReactNode
    className?: string
    asChild?: boolean
}

const MenuPrimitiveTrigger = forwardRef<HTMLButtonElement, MenuPrimitiveTriggerProps>(({ children, className, asChild, ...props }, propRef) => {
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

            ref={Floater.useMergeRefs([refs.setReference, ref, propRef])}
            {...getReferenceProps()}
            asChild={asChild}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
});

MenuPrimitiveTrigger.displayName = 'MenuPrimitiveTrigger';
export default MenuPrimitiveTrigger;
