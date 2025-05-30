'use client';

import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

import { customClassSwitcher } from '~/core';
import { ScrollAreaContext } from '../context/ScrollAreaContext';

const COMPONENT_NAME = 'ScrollArea';

type ScrollAreaRootProps = {
    children: React.ReactNode;
    className?: string;
    customRootClass?: string;
};

const ScrollAreaRoot = ({ children, className = '', customRootClass = '', ...props }: ScrollAreaRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const scrollXThumbRef = useRef<HTMLDivElement>(null);
    const scrollAreaViewportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        initializeThumbHeight();
    }, [scrollXThumbRef, scrollAreaViewportRef]);

    // Listen for content and viewport changes
    useEffect(() => {
        const viewport = scrollAreaViewportRef.current;
        if (!viewport) return;

        // Recalculate thumb height when content or viewport changes
        const handleResize = () => {
            initializeThumbHeight();
        };

        // ResizeObserver for content changes
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                // Check if it's the viewport or its content that changed
                if (entry.target === viewport || viewport.contains(entry.target as Node)) {
                    handleResize();
                }
            }
        });

        // Observe the viewport for size changes
        resizeObserver.observe(viewport);

        // Observe all children for content changes
        const observeChildren = (element: Element) => {
            resizeObserver.observe(element);
            // Recursively observe child elements
            Array.from(element.children).forEach(child => {
                observeChildren(child);
            });
        };

        // Initial observation of all children
        Array.from(viewport.children).forEach(child => {
            observeChildren(child);
        });

        // MutationObserver to watch for new children being added
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        observeChildren(node as Element);
                    }
                });
            });
            handleResize(); // Recalculate when DOM changes
        });

        mutationObserver.observe(viewport, {
            childList: true,
            subtree: true
        });

        // Window resize listener for viewport changes
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const initializeThumbHeight = () => {
        // Container height
        const scrollAreaContainerHeight = scrollAreaViewportRef?.current?.clientHeight || 0;
        // Full height
        const scrollAreaHeight = scrollAreaViewportRef?.current?.scrollHeight || 0;

        const factor = scrollAreaHeight / scrollAreaContainerHeight;
        let finalHeight = (scrollAreaContainerHeight / factor);

        // cap the minimum height to 10px
        if (finalHeight < 24) {
            finalHeight = 24;
        }

        if (scrollXThumbRef.current) {
            scrollXThumbRef.current.style.height = `${finalHeight}px`;
        }
    };

    const handleScroll = () => {
        // The full height of all the content inside the scrollable element [Visible Area Height]
        const scrollAreaContainerHeight = scrollAreaViewportRef.current?.clientHeight || 0;

        // The full height of all the content inside the scrollable element [Total Content Height]
        const scrollAreaHeight = scrollAreaViewportRef.current?.scrollHeight || 0;

        // The current scroll position of the scrollable element [Scroll Position]
        const scrollTopPosition = scrollAreaViewportRef.current?.scrollTop || 0;

        // The height of the scroll thumb [Scroll Thumb Height]
        const scrollThumbHeight = scrollXThumbRef.current?.clientHeight || 0;

        const scrollThumbPosition = (scrollTopPosition / (scrollAreaHeight - scrollAreaContainerHeight)) * (scrollAreaContainerHeight - scrollThumbHeight);

        if (scrollXThumbRef.current) {
            scrollXThumbRef.current.style.top = `${scrollThumbPosition}px`;
        }
    };

    // Fast custom scroll animation
    const fastScrollTo = (targetScrollTop: number) => {
        if (!scrollAreaViewportRef.current) return;

        const startScrollTop = scrollAreaViewportRef.current.scrollTop;
        const scrollDistance = targetScrollTop - startScrollTop;
        const duration = 150; // Fast 150ms animation
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out for smoother feel
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentScrollTop = startScrollTop + (scrollDistance * easeProgress);

            if (scrollAreaViewportRef.current) {
                scrollAreaViewportRef.current.scrollTop = currentScrollTop;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    const scrollToPosition = (position: number) => {
        const scrollAreaContainerHeight = scrollAreaViewportRef?.current?.clientHeight || 0;

        // FUll height
        const scrollAreaHeight = scrollAreaViewportRef?.current?.scrollHeight || 0;

        const factor = scrollAreaHeight / scrollAreaContainerHeight;

        if (scrollXThumbRef.current) {
            const thumbPositionStart = scrollXThumbRef.current.getBoundingClientRect().top;
            const thumbPositionEnd = thumbPositionStart + scrollXThumbRef.current.clientHeight;
            const scrollThumbHeight = scrollXThumbRef.current?.clientHeight || 0;

            if (position > thumbPositionStart && position < thumbPositionEnd) {
                return;
            }

            if (position < thumbPositionStart) {
                // scroll to top - fast custom animation
                const targetScrollTop = scrollAreaViewportRef.current!.scrollTop - (scrollThumbHeight * factor);
                fastScrollTo(targetScrollTop);
            }

            if (position > thumbPositionEnd) {
                // scroll to bottom - fast custom animation
                const targetScrollTop = scrollAreaViewportRef.current!.scrollTop + (scrollThumbHeight * factor);
                fastScrollTo(targetScrollTop);
            }
        }
    };

    const handleScrollbarClick = (e: { clientY: any; }) => {
        const clientClickY = e.clientY;
        scrollToPosition(clientClickY);
    };

    return <ScrollAreaContext.Provider value={{ rootClass, scrollXThumbRef, scrollAreaViewportRef, handleScroll, handleScrollbarClick }}>
        <div className={clsx(rootClass, className)} {...props} >{children}</div>
    </ScrollAreaContext.Provider>;
};

export default ScrollAreaRoot;
