import React, { useContext, forwardRef } from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import ButtonPrimitive from '../../Button';

export type MenuPrimitiveTriggerProps = {
    children: React.ReactNode
    className?: string
    asChild?: boolean
}

const MenuPrimitiveTrigger = forwardRef<HTMLButtonElement, MenuPrimitiveTriggerProps>(
    ({ children, className, asChild, ...props }, propRef) => {
        const context = useContext(MenuPrimitiveRootContext);
        const { ref, index } = Floater.useListItem();
        const mergedRef = Floater.useMergeRefs([
            context?.refs.setReference,
            ref,
            propRef,
        ]);

        if (!context) return null;
        const { activeIndex, getReferenceProps, isNested } = context;

        return (
            <ButtonPrimitive
                className={className}
                tabIndex={!isNested ? undefined : activeIndex === index ? 0 : -1}
                ref={mergedRef}
                {...getReferenceProps()}
                asChild={asChild}
                {...props}
            >
                {children}
            </ButtonPrimitive>
        );
    }
);

MenuPrimitiveTrigger.displayName = 'MenuPrimitiveTrigger';
export default MenuPrimitiveTrigger;
