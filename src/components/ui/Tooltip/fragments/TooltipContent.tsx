import React, { useContext, forwardRef } from 'react';
import clsx from 'clsx';

import TooltipContext from '../context/TooltipContext';
import { useMergeRefs, FloatingPortal, FloatingArrow } from '@floating-ui/react';
import Primitive from '~/core/primitives/Primitive';

const TooltipContent = forwardRef(({ children, showArrow = true, ...props }: { children: React.ReactNode, showArrow?: boolean } & JSX.IntrinsicElements['div'], propRef: React.Ref<HTMLDivElement>) => {
    const tooltipContext = useContext(TooltipContext);

    if (!tooltipContext) {
        throw new Error('TooltipContent must be used within a TooltipRoot component');
    }

    const { isOpen, data, interactions, context } = tooltipContext;
    const arrowRef = tooltipContext.arrowRef;

    const ref = useMergeRefs([context.refs.setFloating, propRef]);

    if (!isOpen) return null;

    const { getFloatingProps } = interactions;

    return (
        <FloatingPortal>
            <Primitive.div className="rad-ui-tooltip-floating-element" ref={ref} style={{ ...data.floatingStyles }} {...getFloatingProps(props)}>
                {showArrow && <FloatingArrow className={clsx('rad-ui-arrow rad-ui-arrow')} ref={arrowRef} context={context} />}
                {children}
            </Primitive.div>
        </FloatingPortal>

    );
});

TooltipContent.displayName = 'TooltipContent';

export default TooltipContent;
