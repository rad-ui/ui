import React, { useContext } from 'react';

import TooltipContext from '../context/TooltipContext';
import ButtonPrimitive from '~/core/primitives/Button';
import { useMergeRefs } from '@floating-ui/react';

export type TooltipTriggerElement = React.ElementRef<typeof ButtonPrimitive>;

export type TooltipTriggerProps = React.ComponentPropsWithoutRef<typeof ButtonPrimitive> & {
    asChild?: boolean;
    children: React.ReactNode;
};

const TooltipTrigger = React.forwardRef<TooltipTriggerElement, TooltipTriggerProps>(
    ({ children, asChild, ...props }, ref) => {
        const tooltipContext = useContext(TooltipContext);

        if (!tooltipContext) {
            throw new Error('TooltipTrigger must be used within a TooltipRoot component');
        }

        const { isOpen, interactions, context } = tooltipContext;

        const { getReferenceProps } = interactions;

        const childrenRef = (children as any).ref;

        const mergedRef = useMergeRefs([context.refs.setReference, ref, childrenRef]);

        return (
            <ButtonPrimitive
                asChild={asChild}
                ref={mergedRef}
                data-state={isOpen ? 'open' : 'closed'}
                {...getReferenceProps(props)}
            >
                {children}
            </ButtonPrimitive>
        );
    }
);

TooltipTrigger.displayName = 'TooltipTrigger';

export default TooltipTrigger;
