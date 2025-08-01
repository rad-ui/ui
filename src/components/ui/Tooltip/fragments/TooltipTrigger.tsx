import React, { useContext, forwardRef } from 'react';

import TooltipContext from '../context/TooltipContext';
import ButtonPrimitive from '~/core/primitives/Button';
import { useMergeRefs } from '@floating-ui/react';

const TooltipTrigger = forwardRef(({ children, asChild, ...props }: { children: React.ReactNode, asChild?: boolean } & JSX.IntrinsicElements['button'], propRef: React.Ref<HTMLButtonElement>) => {
    const tooltipContext = useContext(TooltipContext);

    if (!tooltipContext) {
        throw new Error('TooltipTrigger must be used within a TooltipRoot component');
    }

    const { isOpen, interactions, context } = tooltipContext;

    const { getReferenceProps } = interactions;

    const childrenRef = (children as any).ref;

    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    return (
        <ButtonPrimitive asChild={asChild} ref={ref} data-state={isOpen ? 'open' : 'closed'} {...getReferenceProps(props)} >
            {children}
        </ButtonPrimitive>
    );
});

TooltipTrigger.displayName = 'TooltipTrigger';

export default TooltipTrigger;
