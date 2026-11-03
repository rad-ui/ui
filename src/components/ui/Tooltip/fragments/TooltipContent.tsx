import React, { useContext } from 'react';
import clsx from 'clsx';

import TooltipContext from '../context/TooltipContext';
import { useMergeRefs, FloatingPortal, FloatingArrow } from '@floating-ui/react';
import Primitive from '~/core/primitives/Primitive';
import { useTransitionStatus, getTransitionAttributes } from '~/core/hooks/useTransitionStatus';
import ThemeContext from '~/components/ui/Theme/ThemeContext';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { Align, placementAlign, placementSide, Side } from '~/core/utils/placement';

export type TooltipContentElement = React.ElementRef<typeof Primitive.div>;

export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    showArrow?: boolean;
    container?: HTMLElement | null;
    children: React.ReactNode;
    /** Preferred side of the trigger. It flips to the other side when there isn't room. Overrides the Root's `placement`. */
    side?: Side;
    /** Alignment against the trigger on the cross axis. */
    align?: Align;
    /** Distance from the trigger in px. Defaults to 5. */
    sideOffset?: number;
    /** Shift along the cross axis in px. Defaults to 0. */
    alignOffset?: number;
};

const TooltipContent = React.forwardRef<TooltipContentElement, TooltipContentProps>(
    ({ children, showArrow = true, container, className, style, side, align, sideOffset, alignOffset, ...props }, ref) => {
        const tooltipContext = useContext(TooltipContext);
        const themeContext = useContext(ThemeContext);

        if (!tooltipContext) {
            throw new Error('TooltipContent must be used within a TooltipRoot component');
        }

        const { isOpen, data, interactions, context, rootClass, isInstantPhase, setPositioning } = tooltipContext;
        useLayoutEffect(() => {
            setPositioning?.({ side, align, sideOffset, alignOffset });
        }, [setPositioning, side, align, sideOffset, alignOffset]);
        const arrowRef = tooltipContext.arrowRef;

        const mergedRef = useMergeRefs([context.refs.setFloating, ref]);
        const transition = useTransitionStatus(isOpen, () => context.refs.floating.current, tooltipContext.onOpenChangeComplete);

        if (!transition.mounted) return null;

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
                    {...getTransitionAttributes(transition.status)}
                    aria-hidden={!isOpen || undefined}
                    data-side={placementSide(data.placement)}
                    data-align={placementAlign(data.placement)}
                    data-instant={isInstantPhase ? '' : undefined}
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
