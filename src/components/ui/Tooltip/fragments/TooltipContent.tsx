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
    ({ children, showArrow = true, container, ...props }, ref) => {
        const tooltipContext = useContext(TooltipContext);
        const themeContext = useContext(ThemeContext);

        if (!tooltipContext) {
            throw new Error('TooltipContent must be used within a TooltipRoot component');
        }

        const { isOpen, data, interactions, context } = tooltipContext;
        const arrowRef = tooltipContext.arrowRef;

        const mergedRef = useMergeRefs([context.refs.setFloating, ref]);

        if (!isOpen) return null;

        const { getFloatingProps } = interactions;

        const portalRoot = container
            || themeContext?.portalRootRef.current
            || document.querySelector('[data-rad-ui-portal-root]') as HTMLElement | null
            || themeContext?.containerRef.current
            || document.querySelector('#rad-ui-theme-container') as HTMLElement | null
            || undefined;

        return (
            <FloatingPortal root={portalRoot}>
                <Primitive.div
                    className="rad-ui-tooltip-floating-element"
                    ref={mergedRef}
                    data-state={isOpen ? 'open' : 'closed'}
                    style={{ ...data.floatingStyles }}
                    {...getFloatingProps(props)}
                >
                    <div className="rad-ui-tooltip-content-inner">
                        {showArrow && <FloatingArrow className={clsx('rad-ui-arrow')} ref={arrowRef} context={context} />}
                        {children}
                    </div>
                </Primitive.div>
            </FloatingPortal>

        );
    }
);

TooltipContent.displayName = 'TooltipContent';

export default TooltipContent;
