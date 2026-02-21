import React from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import { useMergeRefs } from '@floating-ui/react';
import { usePopoverContext } from '../context/PopoverContext';

export type PopoverTriggerElement = React.ElementRef<typeof ButtonPrimitive>;

export interface PopoverTriggerProps extends React.ComponentPropsWithoutRef<typeof ButtonPrimitive> {
    asChild?: boolean;
    children: React.ReactNode;
}

const PopoverTrigger = React.forwardRef<PopoverTriggerElement, PopoverTriggerProps>(({ asChild, children, ...props }, ref) => {
    const popover = usePopoverContext();
    const { open, interactions, context } = popover;
    const { getReferenceProps } = interactions;
    const mergedRef = useMergeRefs([context.refs.setReference, ref]);
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
