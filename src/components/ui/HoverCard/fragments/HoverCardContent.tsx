import React, { useContext, useEffect, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import HoverCardContext from '../contexts/HoverCardContext';
import Floater from '~/core/primitives/Floater';
import { createDataAttributes } from '~/core/hooks/createDataAttribute';
import { HoverCardPortalContext } from '../contexts/HoverCardPortalContext';
import { useTransitionStatus, getTransitionAttributes } from '~/core/hooks/useTransitionStatus';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { Align, CollisionAvoidance, FloatingAnchor, placementAlign, placementSide, PositionMethod, Side } from '~/core/utils/placement';
import { useStableAnchor } from '~/core/hooks/useFloatingAnchor';
import { stateData } from '~/core/utils/stateAttributes';

export type HoverCardContentElement = ElementRef<'div'>;
export type HoverCardContentProps = ComponentPropsWithoutRef<'div'> & {
    size?: string;
    forceMount?: boolean;
    /** Preferred side of the trigger. It flips to the other side when there isn't room. Defaults to `bottom`. */
    side?: Side;
    /** Alignment against the trigger on the cross axis. Defaults to `center`. */
    align?: Align;
    /** Distance from the trigger in px. Defaults to 10 (room for the arrow). */
    sideOffset?: number;
    /** Shift along the cross axis in px. Defaults to 0. */
    alignOffset?: number;
    /** Position against this element, virtual element, ref or function instead of the trigger. */
    anchor?: FloatingAnchor;
    /** CSS position of the card. Defaults to `'fixed'`. */
    positionMethod?: PositionMethod;
    /** How the card avoids overflowing its boundary (flip, shift or none, per axis). */
    collisionAvoidance?: CollisionAvoidance;
    /** Keep the card in view after the trigger scrolls out of the boundary. */
    sticky?: boolean;
    /** Minimum distance in px between the arrow and the card's edges. */
    arrowPadding?: number;
    /** Don't re-position when the trigger's layout shifts; scroll and resize still update it. */
    disableAnchorTracking?: boolean;
};

const HoverCardContent = forwardRef<HoverCardContentElement, HoverCardContentProps>(({ children, className, forceMount = false, size = '', side, align, sideOffset, alignOffset, anchor, positionMethod, collisionAvoidance, sticky, arrowPadding, disableAnchorTracking, style, ...props }, ref) => {
    const {
        isOpen,
        floatingRefs,
        floatingStyles,
        getFloatingProps,
        rootClass,
        closeWithDelay,
        openWithDelay,
        closeWithoutDelay,
        onOpenChangeComplete,
        setPositioning,
        resolvedPlacement
    } = useContext(HoverCardContext);

    const stableAnchor = useStableAnchor(anchor);
    useLayoutEffect(() => {
        setPositioning?.({ side, align, sideOffset, alignOffset, anchor: stableAnchor, positionMethod, collisionAvoidance, sticky, arrowPadding, disableAnchorTracking });
    }, [setPositioning, side, align, sideOffset, alignOffset, stableAnchor, positionMethod, collisionAvoidance, sticky, arrowPadding, disableAnchorTracking]);
    const { forceMount: portalForceMount } = useContext(HoverCardPortalContext);

    useEffect(() => {
        if (!isOpen) return;

        const handleScroll = () => closeWithoutDelay();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [closeWithoutDelay, isOpen]);

    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const mergedRef = Floater.useMergeRefs([floatingRefs.setFloating, contentRef, ref]);
    const dataAttributes = createDataAttributes('hover-card', { size });
    const transition = useTransitionStatus(isOpen, () => contentRef.current, onOpenChangeComplete);
    const ending = transition.status === 'ending';

    if (!transition.mounted && !forceMount && !portalForceMount) return null;

    return <div
        className={clsx(rootClass, className)}
        ref={mergedRef}
        {...stateData(isOpen ? 'open' : 'closed')}
        aria-hidden={!isOpen ? 'true' : undefined}
        {...getTransitionAttributes(transition.status)}
        data-side={placementSide(resolvedPlacement)}
        data-align={placementAlign(resolvedPlacement)}
        style={{
            // Your styles first: positioning must win, or the card loses its place.
            ...style,
            ...floatingStyles,
            // Stay visible while the exit animation runs.
            visibility: isOpen || ending ? undefined : 'hidden',
            pointerEvents: isOpen ? undefined : 'none'
        }}
        {...dataAttributes}
        {...getFloatingProps({
            'data-slot': 'hover-card-content',
            onPointerEnter: (event: React.SyntheticEvent) => openWithDelay(event.nativeEvent),
            onPointerLeave: (event: React.SyntheticEvent) => closeWithDelay(event.nativeEvent),
            onFocus: (event: React.SyntheticEvent) => openWithDelay(event.nativeEvent),
            onBlur: (event: React.SyntheticEvent) => closeWithDelay(event.nativeEvent),
            ...props
        })}>{children}</div>;
});

HoverCardContent.displayName = 'HoverCardContent';

export default HoverCardContent;
