import React, { useContext } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import { useMergeRefs } from '@floating-ui/react';
import PopoverContext from '../context/PopoverContext';

export type PopoverTriggerElement = React.ElementRef<typeof ButtonPrimitive>;

export interface PopoverTriggerProps extends React.ComponentPropsWithoutRef<typeof ButtonPrimitive> {
    asChild?: boolean;
    children: React.ReactNode;
}

const PopoverTrigger = React.forwardRef<PopoverTriggerElement, PopoverTriggerProps>(({ asChild, children, ...props }, ref) => {
    const popover = useContext(PopoverContext);
    if (!popover) {
        throw new Error('PopoverTrigger must be used within a PopoverRoot component');
    }
    const { open, interactions, context } = popover;
    const { getReferenceProps } = interactions;
    const childrenRef = (children as any).ref;
    const mergedRef = useMergeRefs([context.refs.setReference, ref, childrenRef]);
    return (
        <ButtonPrimitive
            asChild={asChild}
            ref={mergedRef}
            data-state={open ? 'open' : 'closed'}
            {...getReferenceProps(props)}
        >
            {children}
        </ButtonPrimitive>
    );
});

PopoverTrigger.displayName = 'PopoverTrigger';

export default PopoverTrigger;
