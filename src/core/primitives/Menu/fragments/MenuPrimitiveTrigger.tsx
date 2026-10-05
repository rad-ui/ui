import React, { useContext, forwardRef } from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import ButtonPrimitive from '../../Button';

export type MenuPrimitiveTriggerProps = {
    children: React.ReactNode
    className?: string
    asChild?: boolean
} & Omit<React.ComponentPropsWithoutRef<'button'>, 'children' | 'className'>

const MenuPrimitiveTrigger = forwardRef<HTMLButtonElement, MenuPrimitiveTriggerProps>(
    ({ children, className, asChild, ...props }, propRef) => {
        const context = useContext(MenuPrimitiveRootContext);
        const { ref, index } = Floater.useListItem();
        const mergedRef = Floater.useMergeRefs([
            context?.refs.setReference,
            ref,
            propRef
        ]);

        if (!context) return null;
        const { activeIndex, getReferenceProps, isNested, isOpen } = context;

        return (
            <ButtonPrimitive
                ref={mergedRef}
                {...(getReferenceProps as (userProps?: Record<string, unknown>) => Record<string, unknown>)({
                    ...props,
                    className,
                    'data-state': isOpen ? 'open' : 'closed',
                    // useRole marks any trigger with a floating parent as a menuitem;
                    // only submenu triggers should be menuitems.
                    role: props.role ?? (isNested ? 'menuitem' : undefined),
                    tabIndex: !isNested ? props.tabIndex : activeIndex === index ? 0 : -1
                })}
                asChild={asChild}
            >
                {children}
            </ButtonPrimitive>
        );
    }
);

MenuPrimitiveTrigger.displayName = 'MenuPrimitiveTrigger';
export default MenuPrimitiveTrigger;
