'use client';
import React, { useContext, useRef } from 'react';
import clsx from 'clsx';
import { ToastProviderContext } from '../contexts/ToastContext';

export type ToastViewportProps = {
    children: React.ReactNode;
    className?: string;
};

const ToastViewport: React.FC<ToastViewportProps> = ({ children, className }) => {
    const {
        rootClass,
        position,
        expand,
        isHovered,
        setIsHovered,
        heights,
        gap,
        visibleToasts,
    } = useContext(ToastProviderContext);

    const listRef = useRef<HTMLOListElement>(null);
    const isExpanded = expand || isHovered;

    // Front toast height — match ToastRoot fallback so viewport height doesn’t jump when the new front isn’t measured yet
    const measuredFront = heights.get(visibleToasts[0]?.id) ?? 0;
    const formerFront = visibleToasts[1] ? (heights.get(visibleToasts[1].id) ?? 0) : 0;
    const frontHeight = measuredFront > 0 ? measuredFront : formerFront;

    // Viewport height = hover target that covers the whole stack
    const viewportHeight = isExpanded
        ? visibleToasts.reduce((sum, t) => sum + (heights.get(t.id) ?? 0), 0)
          + Math.max(0, visibleToasts.length - 1) * gap
        : frontHeight + gap * Math.max(0, visibleToasts.length - 1);

    return (
        <ol
            ref={listRef}
            role="region"
            aria-label="Notifications"
            tabIndex={-1}
            data-position={position}
            data-expanded={isExpanded ? '' : undefined}
            className={clsx(rootClass && `${rootClass}-viewport`, className)}
            style={{ '--viewport-height': `${viewportHeight}px` } as React.CSSProperties}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocusCapture={() => setIsHovered(true)}
            onBlurCapture={(e) => {
                if (!listRef.current?.contains(e.relatedTarget as Node)) {
                    setIsHovered(false);
                }
            }}
        >
            {children}
        </ol>
    );
};

ToastViewport.displayName = 'ToastViewport';
export default ToastViewport;
