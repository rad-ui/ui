import React from 'react';
import clsx from 'clsx';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import Primitive from '~/core/primitives/Primitive';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { mergeRefs } from '~/core/utils/mergeRefs';
import { stateData } from '~/core/utils/stateAttributes';
import Floater from '~/core/primitives/Floater';
import { useStableAnchor } from '~/core/hooks/useFloatingAnchor';
import {
    Align, CollisionAvoidance, FloatingAnchor, PositionMethod, Side,
    anchorTracking, collisionMiddleware, placementAlign, placementSide, resolveAnchor, toPlacement
} from '~/core/utils/placement';

export type NavigationMenuViewportElement = React.ElementRef<'div'>;

export interface NavigationMenuViewportProps extends React.ComponentPropsWithoutRef<'div'> {
    asChild?: boolean;
    /**
     * Side of the open item's trigger to place the viewport on. Passing any positioning
     * prop (`side`, `align`, `sideOffset`, `alignOffset`, `anchor`, `collisionAvoidance`,
     * `positionMethod`, `sticky`) anchors the viewport to the trigger and keeps it in view;
     * without them it's laid out by CSS. Defaults to `'bottom'`.
     */
    side?: Side;
    /** Alignment against the trigger. Defaults to `'center'`. */
    align?: Align;
    /** Distance from the trigger in px. Defaults to 0. */
    sideOffset?: number;
    /** Shift along the trigger in px. Defaults to 0. */
    alignOffset?: number;
    /** Position against this element, virtual element, ref or function instead of the open trigger. */
    anchor?: FloatingAnchor;
    /** Per-axis collision handling (flip, shift or none). Defaults to flip the side and shift the alignment. */
    collisionAvoidance?: CollisionAvoidance;
    /** Space in px to keep from the edges of the boundary. Defaults to 5. */
    collisionPadding?: number;
    /** Element(s) to stay inside instead of the viewport's clipping ancestors. */
    collisionBoundary?: Element | Element[];
    /** CSS position of the viewport. Defaults to `'absolute'`. */
    positionMethod?: PositionMethod;
    /** Keep the viewport in view after its trigger scrolls out of the boundary. */
    sticky?: boolean;
    /** Don't re-position when the trigger's layout shifts; scroll and resize still update it. */
    disableAnchorTracking?: boolean;
}

type Size = { width: number; height: number };

/**
 * One shared container for every content panel. Render it once inside `NavigationMenu.Root`
 * (after the items) and open panels show inside it instead of under their own trigger.
 * It sets `--rad-navigation-menu-viewport-width` and `--rad-navigation-menu-viewport-height`
 * (and the Radix-named equivalents) to the open panel's size, so CSS can animate between panels.
 */
const NavigationMenuViewport = React.forwardRef<NavigationMenuViewportElement, NavigationMenuViewportProps>(
    ({
        className, style, asChild = false,
        side, align, sideOffset, alignOffset, anchor, collisionAvoidance, collisionPadding = 5,
        collisionBoundary, positionMethod, sticky = false, disableAnchorTracking,
        ...props
    }, ref) => {
        const { rootClass, isOpen, setViewport, activeContent, triggersRef } = React.useContext(NavigationMenuRootContext);
        const [size, setSize] = React.useState<Size | null>(null);
        const open = Boolean(isOpen);

        useLayoutEffect(() => {
            if (!activeContent) return;
            const measure = () => {
                const next = { width: activeContent.offsetWidth, height: activeContent.offsetHeight };
                setSize((current) => (current && current.width === next.width && current.height === next.height ? current : next));
            };
            measure();
            if (typeof ResizeObserver === 'undefined') return;
            const observer = new ResizeObserver(measure);
            observer.observe(activeContent);
            return () => observer.disconnect();
        }, [activeContent]);

        // Opt-in floating placement against the open item's trigger.
        const positioned = side !== undefined || align !== undefined || sideOffset !== undefined ||
            alignOffset !== undefined || anchor !== undefined || collisionAvoidance !== undefined ||
            positionMethod !== undefined || sticky;
        const resolvedAlign = align ?? 'center';
        const { refs, floatingStyles, placement } = Floater.useFloating({
            open: open && positioned,
            placement: toPlacement(side ?? 'bottom', resolvedAlign),
            strategy: positionMethod ?? 'absolute',
            middleware: positioned
                ? [
                    Floater.offset({ mainAxis: sideOffset ?? 0, crossAxis: alignOffset ?? 0 }),
                    ...collisionMiddleware({
                        collisionAvoidance,
                        padding: collisionPadding,
                        boundary: collisionBoundary,
                        sticky,
                        aligned: resolvedAlign !== 'center'
                    })
                ]
                : [],
            whileElementsMounted: positioned ? anchorTracking(disableAnchorTracking) : undefined
        });
        const stableAnchor = useStableAnchor(anchor);
        useLayoutEffect(() => {
            if (!positioned) return;
            const trigger = activeContent?.id
                ? Array.from(triggersRef?.current ?? []).find((node) => node.getAttribute('aria-controls') === activeContent.id)
                : undefined;
            refs.setPositionReference(resolveAnchor(stableAnchor) ?? trigger ?? null);
        }, [positioned, activeContent, stableAnchor, open, refs, triggersRef]);

        const setFloating = refs.setFloating;
        const mergedRef = React.useMemo(
            () => mergeRefs(setViewport, ref, positioned ? setFloating : undefined),
            [setViewport, ref, positioned, setFloating]
        );

        const sizeVariables = size
            ? ({
                '--rad-navigation-menu-viewport-width': `${size.width}px`,
                '--rad-navigation-menu-viewport-height': `${size.height}px`,
                '--radix-navigation-menu-viewport-width': `${size.width}px`,
                '--radix-navigation-menu-viewport-height': `${size.height}px`
            } as React.CSSProperties)
            : undefined;

        return (
            <Primitive.div
                ref={mergedRef}
                className={clsx(rootClass && `${rootClass}-viewport`, className)}
                {...stateData(open ? 'open' : 'closed')}
                data-slot="navigation-menu-viewport"
                hidden={!open || undefined}
                asChild={asChild}
                data-side={positioned ? placementSide(placement) : undefined}
                data-align={positioned ? placementAlign(placement) : undefined}
                style={positioned ? { ...floatingStyles, ...sizeVariables, ...style } : { ...sizeVariables, ...style }}
                {...props}
            />
        );
    }
);

NavigationMenuViewport.displayName = 'NavigationMenuViewport';

export default NavigationMenuViewport;
