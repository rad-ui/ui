'use client';
import React, { useRef } from 'react';
import clsx from 'clsx';
import type { ToastData, ToastPosition } from '../contexts/ToastContext';
import ToastItem from './ToastItem';

export type ToastViewportProps = {
    toasts: ToastData[];
    heights: Map<string, number>;
    isHovered: boolean;
    onHoverChange: (hovered: boolean) => void;
    onRemove: (id: string) => void;
    onHeightUpdate: (id: string, height: number) => void;
    rootClass: string;
    position: ToastPosition;
    expand: boolean;
    gap: number;
    maxToasts: number;
};

const ToastViewport: React.FC<ToastViewportProps> = ({
    toasts,
    heights,
    isHovered,
    onHoverChange,
    onRemove,
    onHeightUpdate,
    rootClass,
    position,
    expand,
    gap,
    maxToasts,
}) => {
    const listRef = useRef<HTMLOListElement>(null);
    const isExpanded = expand || isHovered;
    const visibleToasts = toasts.slice(0, maxToasts);

    // Height of the front (index 0) toast
    const frontHeight = heights.get(visibleToasts[0]?.id) ?? 0;

    // Viewport height drives the <ol> size so the hover area covers the whole stack
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
            className={clsx(rootClass && `${rootClass}-viewport`)}
            style={{ '--viewport-height': `${viewportHeight}px` } as React.CSSProperties}
            onMouseEnter={() => onHoverChange(true)}
            onMouseLeave={() => onHoverChange(false)}
            onFocusCapture={() => onHoverChange(true)}
            onBlurCapture={(e) => {
                if (!listRef.current?.contains(e.relatedTarget as Node)) {
                    onHoverChange(false);
                }
            }}
        >
            {visibleToasts.map((toast, index) => {
                // Expanded offset: sum of heights of all toasts in front + gaps
                let expandedOffsetY = 0;
                for (let i = 0; i < index; i++) {
                    expandedOffsetY += (heights.get(visibleToasts[i].id) ?? 0) + gap;
                }

                return (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        index={index}
                        isExpanded={isExpanded}
                        gap={gap}
                        expandedOffsetY={expandedOffsetY}
                        frontHeight={frontHeight}
                        rootClass={rootClass}
                        position={position}
                        onRemove={onRemove}
                        onHeightUpdate={onHeightUpdate}
                    />
                );
            })}
        </ol>
    );
};

ToastViewport.displayName = 'ToastViewport';
export default ToastViewport;
