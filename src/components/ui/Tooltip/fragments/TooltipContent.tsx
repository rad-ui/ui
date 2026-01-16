import React, { useContext } from 'react';
import clsx from 'clsx';

import TooltipContext from '../context/TooltipContext';
import { useMergeRefs, FloatingPortal, FloatingArrow } from '@floating-ui/react';
import Primitive from '~/core/primitives/Primitive';

export type TooltipContentElement = React.ElementRef<typeof Primitive.div>;

export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    showArrow?: boolean;
    children: React.ReactNode;
};

const TooltipContent = React.forwardRef<TooltipContentElement, TooltipContentProps>(
    ({ children, showArrow = true, ...props }, ref) => {
        const tooltipContext = useContext(TooltipContext);

        if (!tooltipContext) {
            throw new Error('TooltipContent must be used within a TooltipRoot component');
        }

        const { isOpen, data, interactions, context } = tooltipContext;
        const arrowRef = tooltipContext.arrowRef;

        const mergedRef = useMergeRefs([context.refs.setFloating, ref]);

        if (!isOpen) return null;

        const { getFloatingProps } = interactions;

        return (
            <FloatingPortal>
                <Primitive.div
                    className="rad-ui-tooltip-floating-element"
                    ref={mergedRef}
                    data-state={isOpen ? 'open' : 'closed'}
                    style={{ ...data.floatingStyles }}
                    {...getFloatingProps(props)}
                >
                    <div className="rad-ui-tooltip-content-inner">
                        {showArrow && <FloatingArrow className={clsx('rad-ui-arrow rad-ui-arrow')} ref={arrowRef} context={context} />}
                        {children}
                    </div>
                </Primitive.div>
            </FloatingPortal>

        );
    }
);

TooltipContent.displayName = 'TooltipContent';

export default TooltipContent;
