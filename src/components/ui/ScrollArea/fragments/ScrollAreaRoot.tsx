'use client';

import React, { useCallback, useEffect, useRef, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { ScrollAreaContext, type ScrollAreaScrollbarType } from '../context/ScrollAreaContext';
import { useScrollbarVisibility } from '../hooks/useScrollbarVisibility';
import { useDocumentOverlayOpenState } from '~/core/hooks/useDocumentOverlayOpenState';
import { getTrackLength, getHorizontalScrollRange, clampScrollLeft } from '../utils/track';

const COMPONENT_NAME = 'ScrollArea';
const MIN_THUMB_SIZE = 24;

type ScrollAreaRootElement = ElementRef<'div'>;
export type ScrollAreaRootProps = ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    /** Controls scrollbar and thumb visibility: always, on scroll (1s fade), on hover + scroll, or when overflowing (auto). */
    type?: ScrollAreaScrollbarType;
};

const ScrollAreaRoot = forwardRef<ScrollAreaRootElement, ScrollAreaRootProps>(({
    children,
    className = '',
    customRootClass = '',
    type = 'hover',
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const internalRootRef = useRef<HTMLDivElement>(null);
    const scrollYThumbRef = useRef<HTMLDivElement>(null);
    const scrollXThumbRef = useRef<HTMLDivElement>(null);
    const scrollAreaViewportRef = useRef<HTMLDivElement>(null);
    const scrollbarYRef = useRef<HTMLDivElement>(null);
    const scrollbarXRef = useRef<HTMLDivElement>(null);
    const scrollAnimationFrameRef = useRef<number | null>(null);
    const scrollbarCountsRef = useRef({ x: 0, y: 0 });
    const [scrollbarsMounted, setScrollbarsMounted] = React.useState({ x: false, y: false });

    const [overflow, setOverflow] = React.useState({ x: false, y: false });
    const { scrollbarVisible, setInteracting } = useScrollbarVisibility(type, scrollAreaViewportRef, internalRootRef);
    const overlaySuppressesScrollbar = useDocumentOverlayOpenState();

    const mergedRootRef = (node: HTMLDivElement | null) => {
        (internalRootRef as any).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as any).current = node;
    };

    useEffect(() => {
        initializeThumbSizes();
    }, [scrollYThumbRef, scrollXThumbRef, scrollAreaViewportRef]);

    // Listen for content and viewport changes
    useEffect(() => {
        const viewport = scrollAreaViewportRef.current;
        if (!viewport) return;

        // Recalculate thumb sizes when content or viewport changes
        const handleResize = () => {
            initializeThumbSizes();
            handleScroll();
        };

        const resizeObserver = new ResizeObserver(() => handleResize());
        const syncResizeObservers = () => {
            resizeObserver.disconnect();
            resizeObserver.observe(viewport);
            Array.from(viewport.children).forEach(child => {
                if (child instanceof Element) {
                    resizeObserver.observe(child);
                }
            });
        };

        syncResizeObservers();

        const mutationObserver = new MutationObserver((mutations) => {
            const directChildSwap = mutations.some(
                (mutation) =>
                    mutation.type === 'childList'
                    && mutation.target === viewport
                    && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
            );

            if (directChildSwap) {
                viewport.scrollTop = 0;
                viewport.scrollLeft = 0;
                syncResizeObservers();
            }

            handleResize();

            if (directChildSwap) {
                handleScroll();
            }
        });

        mutationObserver.observe(viewport, {
            childList: true,
            subtree: false
        });

        window.addEventListener('resize', handleResize);

        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const initializeThumbSizes = () => {
        if (!scrollAreaViewportRef.current) return;
        const viewport = scrollAreaViewportRef.current;

        // Vertical
        const viewportHeight = viewport.clientHeight;
        const contentHeight = viewport.scrollHeight;
        const hasV = contentHeight > viewportHeight;
        if (scrollYThumbRef.current) {
            const trackHeight = getTrackLength(scrollbarYRef.current, 'vertical', viewportHeight);
            if (viewportHeight <= 0) {
                scrollYThumbRef.current.style.height = '0px';
            } else if (!hasV) {
                scrollYThumbRef.current.style.height = `${trackHeight}px`;
            } else {
                const thumbHeight = Math.min(trackHeight, Math.max(trackHeight * (viewportHeight / contentHeight), MIN_THUMB_SIZE));
                scrollYThumbRef.current.style.height = `${thumbHeight}px`;
            }
        }

        // Horizontal
        const viewportWidth = viewport.clientWidth;
        const contentWidth = viewport.scrollWidth;
        const hasH = contentWidth > viewportWidth;
        if (scrollXThumbRef.current) {
            const trackWidth = getTrackLength(scrollbarXRef.current, 'horizontal', viewportWidth);
            if (viewportWidth <= 0) {
                scrollXThumbRef.current.style.width = '0px';
            } else if (!hasH) {
                scrollXThumbRef.current.style.width = `${trackWidth}px`;
            } else {
                const thumbWidth = Math.min(trackWidth, Math.max(trackWidth * (viewportWidth / contentWidth), MIN_THUMB_SIZE));
                scrollXThumbRef.current.style.width = `${thumbWidth}px`;
            }
        }

        setOverflow((previous) => (previous.x === hasH && previous.y === hasV ? previous : { x: hasH, y: hasV }));
    };

    const handleScroll = () => {
        if (!scrollAreaViewportRef.current) return;
        const viewport = scrollAreaViewportRef.current;

        // Vertical
        if (scrollYThumbRef.current) {
            const viewportHeight = viewport.clientHeight;
            const contentHeight = viewport.scrollHeight;
            const scrollTop = viewport.scrollTop;
            const thumbHeight = scrollYThumbRef.current.clientHeight;
            const trackHeight = getTrackLength(scrollbarYRef.current, 'vertical', viewportHeight);

            if (viewportHeight <= 0 || contentHeight <= viewportHeight) {
                scrollYThumbRef.current.style.top = '0px';
            } else {
                const ratio = Math.min(1, Math.max(0, scrollTop / (contentHeight - viewportHeight)));
                const thumbPosition = ratio * Math.max(0, trackHeight - thumbHeight);
                scrollYThumbRef.current.style.top = `${thumbPosition}px`;
            }
        }

        // Horizontal
        if (scrollXThumbRef.current) {
            const viewportWidth = viewport.clientWidth;
            const contentWidth = viewport.scrollWidth;
            const scrollLeft = viewport.scrollLeft;
            const thumbWidth = scrollXThumbRef.current.clientWidth;
            const trackWidth = getTrackLength(scrollbarXRef.current, 'horizontal', viewportWidth);

            const { rtl } = getHorizontalScrollRange(viewport);
            const travel = Math.max(0, trackWidth - thumbWidth);
            if (viewportWidth <= 0 || contentWidth <= viewportWidth) {
                // At the inline start: the left end in LTR, the right end in RTL.
                scrollXThumbRef.current.style.left = `${rtl ? travel : 0}px`;
            } else {
                // Progress from the inline start; RTL scrollLeft runs 0 → negative.
                const progress = Math.abs(scrollLeft) / (contentWidth - viewportWidth);
                const ratio = Math.min(1, Math.max(0, progress));
                const thumbPosition = rtl ? travel - (ratio * travel) : ratio * travel;
                scrollXThumbRef.current.style.left = `${thumbPosition}px`;
            }
        }
    };

    const syncThumbs = () => {
        initializeThumbSizes();
        handleScroll();
    };

    const cancelScrollAnimation = () => {
        if (scrollAnimationFrameRef.current !== null) {
            cancelAnimationFrame(scrollAnimationFrameRef.current);
            scrollAnimationFrameRef.current = null;
        }
    };

    useEffect(() => cancelScrollAnimation, []);

    const fastScrollTo = (target: { top?: number; left?: number }) => {
        if (!scrollAreaViewportRef.current) return;
        const viewport = scrollAreaViewportRef.current;

        // A new page step supersedes any in-flight animation; letting both run makes them fight.
        cancelScrollAnimation();

        const maxTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
        const targetTop = target.top !== undefined ? Math.min(maxTop, Math.max(0, target.top)) : undefined;
        const targetLeft = target.left !== undefined ? clampScrollLeft(viewport, target.left) : undefined;

        const prefersReducedMotion = typeof window !== 'undefined'
            && typeof window.matchMedia === 'function'
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            if (targetTop !== undefined) viewport.scrollTop = targetTop;
            if (targetLeft !== undefined) viewport.scrollLeft = targetLeft;
            return;
        }

        const startTop = viewport.scrollTop;
        const startLeft = viewport.scrollLeft;
        const diffTop = targetTop !== undefined ? targetTop - startTop : 0;
        const diffLeft = targetLeft !== undefined ? targetLeft - startLeft : 0;
        const duration = 150;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(Math.max(elapsed / duration, 0), 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            if (targetTop !== undefined) {
                viewport.scrollTop = startTop + diffTop * ease;
            }
            if (targetLeft !== undefined) {
                viewport.scrollLeft = startLeft + diffLeft * ease;
            }

            if (progress < 1) {
                scrollAnimationFrameRef.current = requestAnimationFrame(animate);
            } else {
                scrollAnimationFrameRef.current = null;
            }
        };

        scrollAnimationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleScrollbarClick = (e: { clientX?: number; clientY?: number; orientation: 'vertical' | 'horizontal' }) => {
        if (!scrollAreaViewportRef.current) return;
        const viewport = scrollAreaViewportRef.current;

        // Clicking the track pages the viewport by one visible "screen" toward the pointer.
        if (e.orientation === 'vertical' && e.clientY !== undefined) {
            const thumb = scrollYThumbRef.current;
            if (!thumb) return;
            if (viewport.clientHeight <= 0 || viewport.scrollHeight <= viewport.clientHeight) return;
            const rect = thumb.getBoundingClientRect();
            if (e.clientY < rect.top) {
                fastScrollTo({ top: viewport.scrollTop - viewport.clientHeight });
            } else if (e.clientY > rect.bottom) {
                fastScrollTo({ top: viewport.scrollTop + viewport.clientHeight });
            }
        } else if (e.orientation === 'horizontal' && e.clientX !== undefined) {
            const thumb = scrollXThumbRef.current;
            if (!thumb) return;
            if (viewport.clientWidth <= 0 || viewport.scrollWidth <= viewport.clientWidth) return;
            const rect = thumb.getBoundingClientRect();
            if (e.clientX < rect.left) {
                fastScrollTo({ left: viewport.scrollLeft - viewport.clientWidth });
            } else if (e.clientX > rect.right) {
                fastScrollTo({ left: viewport.scrollLeft + viewport.clientWidth });
            }
        }
    };

    const registerScrollbar = useCallback((orientation: 'vertical' | 'horizontal') => {
        const axis = orientation === 'vertical' ? 'y' : 'x';
        scrollbarCountsRef.current[axis] += 1;
        setScrollbarsMounted((previous) => (previous[axis] ? previous : { ...previous, [axis]: true }));
        return () => {
            scrollbarCountsRef.current[axis] = Math.max(0, scrollbarCountsRef.current[axis] - 1);
            if (scrollbarCountsRef.current[axis] === 0) {
                setScrollbarsMounted((previous) => (previous[axis] ? { ...previous, [axis]: false } : previous));
            }
        };
    }, []);

    // Scrollbars/thumbs can mount after the root (or change visibility); re-measure when they do.
    useEffect(() => {
        syncThumbs();
    }, [scrollbarsMounted.x, scrollbarsMounted.y, overflow.x, overflow.y, type]);

    return (
        <ScrollAreaContext.Provider
            value={{
                rootClass,
                scrollYThumbRef,
                scrollXThumbRef,
                scrollAreaViewportRef,
                handleScroll,
                handleScrollbarClick,
                type,
                scrollbarVisible,
                overflow,
                overlaySuppressesScrollbar,
                rootRef: internalRootRef,
                scrollbarYRef,
                scrollbarXRef,
                registerScrollbar,
                syncThumbs,
                scrollbarsMounted,
                setInteracting
            }}>
            <div
                ref={mergedRootRef}
                className={clsx(rootClass, className)}
                data-scrollbar-type={type}
                data-scrollbar-x={String(overflow.x || type === 'always')}
                data-scrollbar-y={String(overflow.y || type === 'always')}
                {...props}
            >
                {children}
            </div>
        </ScrollAreaContext.Provider>
    );
});

ScrollAreaRoot.displayName = COMPONENT_NAME;

export default ScrollAreaRoot;
