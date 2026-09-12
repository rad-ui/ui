'use client';

import React, { forwardRef, useContext } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import { PopoverPrimitiveContext } from '../context/PopoverPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type PopoverPrimitiveTriggerProps = React.ComponentPropsWithoutRef<typeof ButtonPrimitive> & {
    asChild?: boolean;
    disabled?: boolean;
};

const PopoverPrimitiveTrigger = forwardRef<HTMLButtonElement, PopoverPrimitiveTriggerProps>(({
    children,
    asChild = false,
    disabled = false,
    onClick,
    ...props
}, ref) => {
    const { isOpen, contentId, getReferenceProps, setTriggerNode } = useContext(PopoverPrimitiveContext);

    const mergedRef = Floater.useMergeRefs([
        ref,
        (node: HTMLElement | null) => {
            setTriggerNode(node);
        }
    ]);

    return (
        <ButtonPrimitive
            ref={mergedRef}
            asChild={asChild}
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={contentId || undefined}
            data-state={isOpen ? 'open' : 'closed'}
            data-disabled={disabled ? '' : undefined}
            {...getReferenceProps({
                ...props,
                disabled,
                onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
                    onClick?.(event);
                }
            })}
        >
            {children}
        </ButtonPrimitive>
    );
});

PopoverPrimitiveTrigger.displayName = 'PopoverPrimitiveTrigger';

export default PopoverPrimitiveTrigger;
