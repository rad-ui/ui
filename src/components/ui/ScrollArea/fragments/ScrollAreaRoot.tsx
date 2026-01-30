'use client';

import React, { useEffect, useRef, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

import { customClassSwitcher } from '~/core';
import { ScrollAreaContext } from '../context/ScrollAreaContext';

const COMPONENT_NAME = 'ScrollArea';

type ScrollAreaRootElement = ElementRef<'div'>;
type ScrollAreaRootProps = ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    type?: 'auto' | 'always' | 'scroll' | 'hover';
};

const ScrollAreaRoot = forwardRef<ScrollAreaRootElement, ScrollAreaRootProps>(({ 
    children, 
    className = '', 
    customRootClass = '', 
    type = 'hover',
    ...props 
}, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const internalRootRef = useRef<HTMLDivElement>(null);
    const scrollYThumbRef = useRef<HTMLDivElement>(null);
    const scrollXThumbRef = useRef<HTMLDivElement>(null);
    const scrollAreaViewportRef = useRef<HTMLDivElement>(null);

    const [overflow, setOverflow] = React.useState({ x: false, y: false });

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
        };

        const resizeObserver = new ResizeObserver(() => handleResize());
        resizeObserver.observe(viewport);
        Array.from(viewport.children).forEach(child => resizeObserver.observe(child));

        const mutationObserver = new MutationObserver(() => {
            handleResize();
        });

        mutationObserver.observe(viewport, {
            childList: true,
            subtree: true
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
            const factorY = contentHeight / viewportHeight;
            let thumbHeight = viewportHeight / factorY;
            thumbHeight = Math.max(thumbHeight, 24);
            scrollYThumbRef.current.style.height = `${thumbHeight}px`;
        }

        // Horizontal
        const viewportWidth = viewport.clientWidth;
        const contentWidth = viewport.scrollWidth;
        const hasH = contentWidth > viewportWidth;
        if (scrollXThumbRef.current) {
            const factorX = contentWidth / viewportWidth;
            let thumbWidth = viewportWidth / factorX;
            thumbWidth = Math.max(thumbWidth, 24);
            scrollXThumbRef.current.style.width = `${thumbWidth}px`;
        }

        setOverflow({ x: hasH, y: hasV });
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

            const thumbPosition = (scrollTop / (contentHeight - viewportHeight)) * (viewportHeight - thumbHeight);
            scrollYThumbRef.current.style.top = `${thumbPosition}px`;
        }

        // Horizontal
        if (scrollXThumbRef.current) {
            const viewportWidth = viewport.clientWidth;
            const contentWidth = viewport.scrollWidth;
            const scrollLeft = viewport.scrollLeft;
            const thumbWidth = scrollXThumbRef.current.clientWidth;

            const thumbPosition = (scrollLeft / (contentWidth - viewportWidth)) * (viewportWidth - thumbWidth);
            scrollXThumbRef.current.style.left = `${thumbPosition}px`;
        }
    };

    const fastScrollTo = (target: { top?: number; left?: number }) => {
        if (!scrollAreaViewportRef.current) return;
        const viewport = scrollAreaViewportRef.current;

        const startTop = viewport.scrollTop;
        const startLeft = viewport.scrollLeft;
        const diffTop = target.top !== undefined ? target.top - startTop : 0;
        const diffLeft = target.left !== undefined ? target.left - startLeft : 0;
        
        const duration = 150;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            if (target.top !== undefined) {
                viewport.scrollTop = startTop + diffTop * ease;
            }
            if (target.left !== undefined) {
                viewport.scrollLeft = startLeft + diffLeft * ease;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    const handleScrollbarClick = (e: { clientX?: number; clientY?: number; orientation: 'vertical' | 'horizontal' }) => {
        if (!scrollAreaViewportRef.current) return;
        const viewport = scrollAreaViewportRef.current;

        if (e.orientation === 'vertical' && e.clientY !== undefined) {
            const thumb = scrollYThumbRef.current;
            if (!thumb) return;
            const rect = thumb.getBoundingClientRect();
            const factor = viewport.scrollHeight / viewport.clientHeight;
            
            if (e.clientY < rect.top) {
                fastScrollTo({ top: viewport.scrollTop - thumb.clientHeight * factor });
            } else if (e.clientY > rect.bottom) {
                fastScrollTo({ top: viewport.scrollTop + thumb.clientHeight * factor });
            }
        } else if (e.orientation === 'horizontal' && e.clientX !== undefined) {
            const thumb = scrollXThumbRef.current;
            if (!thumb) return;
            const rect = thumb.getBoundingClientRect();
            const factor = viewport.scrollWidth / viewport.clientWidth;
            
            if (e.clientX < rect.left) {
                fastScrollTo({ left: viewport.scrollLeft - thumb.clientWidth * factor });
            } else if (e.clientX > rect.right) {
                fastScrollTo({ left: viewport.scrollLeft + thumb.clientWidth * factor });
            }
        }
    };

    return (
        <ScrollAreaContext.Provider value={{ 
            rootClass, 
            scrollYThumbRef, 
            scrollXThumbRef, 
            scrollAreaViewportRef, 
            handleScroll, 
            handleScrollbarClick, 
            type, 
            rootRef: internalRootRef 
        }}>
            <div 
                ref={mergedRootRef} 
                className={clsx(rootClass, className)} 
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
