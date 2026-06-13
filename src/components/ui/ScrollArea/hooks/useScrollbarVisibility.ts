'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

export type ScrollAreaScrollbarType = 'auto' | 'always' | 'scroll' | 'hover';

const SCROLLBAR_HIDE_DELAY_MS = 1000;

export function useScrollbarVisibility(
    type: ScrollAreaScrollbarType,
    viewportRef: RefObject<HTMLDivElement | null | undefined>,
    rootRef: RefObject<HTMLDivElement | null | undefined>
) {
    const [scrollbarVisible, setScrollbarVisible] = useState(type === 'always');
    const isHoveringRef = useRef(false);
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearHideTimeout = useCallback(() => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
    }, []);

    const scheduleHide = useCallback(() => {
        clearHideTimeout();
        hideTimeoutRef.current = setTimeout(() => {
            if (!isHoveringRef.current) {
                setScrollbarVisible(false);
            }
        }, SCROLLBAR_HIDE_DELAY_MS);
    }, [clearHideTimeout]);

    const showFromScroll = useCallback(() => {
        if (type !== 'scroll' && type !== 'hover') return;

        setScrollbarVisible(true);

        if (type === 'scroll') {
            scheduleHide();
            return;
        }

        if (!isHoveringRef.current) {
            scheduleHide();
        } else {
            clearHideTimeout();
        }
    }, [type, scheduleHide, clearHideTimeout]);

    useEffect(() => {
        setScrollbarVisible(type === 'always');
        clearHideTimeout();
        isHoveringRef.current = false;
    }, [type, clearHideTimeout]);

    useEffect(() => {
        if (type === 'always' || type === 'auto') return;

        const viewport = viewportRef?.current;
        if (!viewport) return;

        const handleViewportScroll = () => showFromScroll();
        viewport.addEventListener('scroll', handleViewportScroll, { passive: true });

        return () => {
            viewport.removeEventListener('scroll', handleViewportScroll);
            clearHideTimeout();
        };
    }, [type, viewportRef, showFromScroll, clearHideTimeout]);

    useEffect(() => {
        if (type !== 'hover') return;

        const root = rootRef?.current;
        if (!root) return;

        const handleMouseEnter = () => {
            isHoveringRef.current = true;
            clearHideTimeout();
            setScrollbarVisible(true);
        };

        const handleMouseLeave = () => {
            isHoveringRef.current = false;
            scheduleHide();
        };

        root.addEventListener('mouseenter', handleMouseEnter);
        root.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            root.removeEventListener('mouseenter', handleMouseEnter);
            root.removeEventListener('mouseleave', handleMouseLeave);
            clearHideTimeout();
        };
    }, [type, rootRef, scheduleHide, clearHideTimeout]);

    useEffect(() => () => clearHideTimeout(), [clearHideTimeout]);

    return scrollbarVisible;
}
