import React, { useContext } from 'react';
import clsx from 'clsx';

import TooltipContext from '../context/TooltipContext';
import { useMergeRefs, FloatingPortal, FloatingArrow } from '@floating-ui/react';
import Primitive from '~/core/primitives/Primitive';
import ThemeContext from '~/components/ui/Theme/ThemeContext';

export type TooltipContentElement = React.ElementRef<typeof Primitive.div>;

export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    showArrow?: boolean;
    container?: HTMLElement | null;
    children: React.ReactNode;
};

const TooltipContent = React.forwardRef<TooltipContentElement, TooltipContentProps>(
    ({ children, showArrow = true, container, className, style, ...props }, ref) => {
        const tooltipContext = useContext(TooltipContext);
        const themeContext = useContext(ThemeContext);

        if (!tooltipContext) {
            throw new Error('TooltipContent must be used within a TooltipRoot component');
        }

        const { isOpen, data, interactions, context, rootClass } = tooltipContext;
        const arrowRef = tooltipContext.arrowRef;

        const mergedRef = useMergeRefs([context.refs.setFloating, ref]);

        if (!isOpen) return null;

        const { getFloatingProps } = interactions;

        const portalRoot = container
            ?? themeContext?.portalRootRef.current
            ?? themeContext?.containerRef.current
            ?? undefined;

        return (
            <FloatingPortal root={portalRoot}>
                <Primitive.div
                    ref={mergedRef}
                    data-slot="tooltip-content"
                    data-state={isOpen ? 'open' : 'closed'}
                    data-side={String(data.placement ?? '').split('-')[0] || undefined}
                    {...getFloatingProps(props)}
                    className={clsx(rootClass && `${rootClass}-floating-element`, className)}
                    style={{ ...style, ...data.floatingStyles }}
                >
                    <div className={clsx(rootClass && `${rootClass}-content-inner`)}>
                        {showArrow && <FloatingArrow className={clsx(rootClass && `${rootClass}-arrow`)} ref={arrowRef} context={context} data-slot="tooltip-arrow" />}
                        {children}
                    </div>
                </Primitive.div>
            </FloatingPortal>

        );
    }
);

TooltipContent.displayName = 'TooltipContent';

export default TooltipContent;
