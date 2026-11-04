'use client';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import TabsRootContext from '../context/TabsRootContext';
import Primitive from '~/core/primitives/Primitive';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';

const COMPONENT_NAME = 'TabIndicator';

export type TabIndicatorProps = React.ComponentPropsWithoutRef<'span'> & {
    asChild?: boolean;
};

type Position = { left: number; top: number; width: number; height: number; right: number; bottom: number };
type Direction = 'left' | 'right' | 'up' | 'down' | 'none';

const samePosition = (a: Position | null, b: Position) => !!a &&
    a.left === b.left && a.top === b.top && a.width === b.width && a.height === b.height;

/**
 * A visual marker for the active tab, rendered inside `Tabs.List`. It sets
 * `--active-tab-left`, `--active-tab-top`, `--active-tab-right`,
 * `--active-tab-bottom`, `--active-tab-width` and `--active-tab-height`
 * (relative to the list) so CSS can position and animate it.
 */
const TabIndicator = React.forwardRef<React.ElementRef<'span'>, TabIndicatorProps>(
    ({ className, style, asChild = false, ...props }, forwardedRef) => {
        const context = useContext(TabsRootContext);
        if (!context) throw new Error('TabIndicator must be used within a TabRoot');
        const { rootClass, tabValue, orientation, listRef, triggerElementsRef } = context;

        const [position, setPosition] = useState<Position | null>(null);
        const [direction, setDirection] = useState<Direction>('none');
        const positionRef = useRef<Position | null>(null);

        const measure = useCallback(() => {
            const list = listRef?.current;
            const trigger = triggerElementsRef?.current.get(tabValue);
            // The list ref can be briefly detached while it re-renders; keep the
            // last position until the next measurement.
            if (!list) return;
            if (!trigger) {
                positionRef.current = null;
                setPosition(null);
                return;
            }
            const listRect = list.getBoundingClientRect();
            const triggerRect = trigger.getBoundingClientRect();
            const left = triggerRect.left - listRect.left + list.scrollLeft - list.clientLeft;
            const top = triggerRect.top - listRect.top + list.scrollTop - list.clientTop;
            const next: Position = {
                left,
                top,
                width: triggerRect.width,
                height: triggerRect.height,
                right: list.scrollWidth - left - triggerRect.width,
                bottom: list.scrollHeight - top - triggerRect.height
            };
            const previous = positionRef.current;
            if (samePosition(previous, next)) return;
            if (previous) {
                if (orientation === 'vertical') {
                    setDirection(next.top > previous.top ? 'down' : next.top < previous.top ? 'up' : 'none');
                } else {
                    setDirection(next.left > previous.left ? 'right' : next.left < previous.left ? 'left' : 'none');
                }
            }
            positionRef.current = next;
            setPosition(next);
        }, [listRef, triggerElementsRef, tabValue, orientation]);

        // The list attaches its ref after its children's layout effects run, so
        // measure again in a passive effect once every ref is in place.
        useLayoutEffect(measure, [measure]);
        useEffect(measure, [measure]);

        useLayoutEffect(() => {
            const list = listRef?.current;
            const trigger = triggerElementsRef?.current.get(tabValue);
            if (typeof ResizeObserver === 'undefined' || !list) return;
            const observer = new ResizeObserver(() => measure());
            observer.observe(list);
            if (trigger) observer.observe(trigger);
            return () => observer.disconnect();
        }, [measure, listRef, triggerElementsRef, tabValue]);

        if (!position) return null;

        const cssVariables = {
            '--active-tab-left': `${position.left}px`,
            '--active-tab-top': `${position.top}px`,
            '--active-tab-right': `${position.right}px`,
            '--active-tab-bottom': `${position.bottom}px`,
            '--active-tab-width': `${position.width}px`,
            '--active-tab-height': `${position.height}px`
        } as React.CSSProperties;

        return (
            <Primitive.span
                ref={forwardedRef}
                role="presentation"
                className={clsx(rootClass && `${rootClass}-indicator`, className)}
                data-slot="tabs-indicator"
                data-orientation={orientation || 'horizontal'}
                data-activation-direction={direction}
                asChild={asChild}
                style={{ ...cssVariables, ...style }}
                {...props}
            />
        );
    }
);

TabIndicator.displayName = COMPONENT_NAME;

export default TabIndicator;
