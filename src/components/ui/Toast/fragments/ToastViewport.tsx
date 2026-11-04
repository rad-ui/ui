'use client';
import React, { useContext, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { ToastProviderContext } from '../contexts/ToastContext';

export type ToastViewportProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

function toCssLength(value: number | string | undefined): string | undefined {
    if (value === undefined) return undefined;
    return typeof value === 'number' ? `${value}px` : value;
}

const DEFAULT_HOTKEY = ['altKey', 'KeyT'];
const MODIFIERS = { altKey: 'Alt', ctrlKey: 'Control', metaKey: 'Meta', shiftKey: 'Shift' } as const;

const ToastViewport: React.FC<ToastViewportProps> = ({ children, className, style }) => {
    const {
        rootClass,
        position,
        expand,
        isHovered,
        setIsHovered,
        heights,
        gap,
        visibleToasts,
        viewportClassName,
        viewportStyle,
        containerAriaLabel,
        hotkey = DEFAULT_HOTKEY,
        offset,
        mobileOffset,
        theme,
        dir,
        richColors,
        invert,
    } = useContext(ToastProviderContext);

    const listRef = useRef<HTMLElement>(null);
    const focusBeforeHotkeyRef = useRef<HTMLElement | null>(null);

    // Hotkey (default Alt+T): move focus to the toasts so keyboard users can reach their actions before they
    // time out. Focus inside the viewport also expands the stack and pauses the timers.
    useEffect(() => {
        if (!hotkey.length) return;
        const onKeyDown = (event: KeyboardEvent) => {
            const pressed = hotkey.every((key) => (key in MODIFIERS ? event[key as keyof typeof MODIFIERS] : event.code === key));
            if (!pressed || !listRef.current) return;
            event.preventDefault();
            const active = document.activeElement;
            if (!listRef.current.contains(active)) {
                focusBeforeHotkeyRef.current = active instanceof HTMLElement ? active : null;
            }
            listRef.current.focus();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [hotkey]);

    const hotkeyLabel = hotkey.map((key) => MODIFIERS[key as keyof typeof MODIFIERS] ?? key.replace(/^(Key|Digit)/, '')).join('+');
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

    // A <section> rather than <ol>: role="region" is not an allowed role on a
    // list element, and each toast is its own status live region.
    return (
        <section
            ref={listRef}
            role="region"
            aria-label={containerAriaLabel}
            aria-keyshortcuts={hotkeyLabel || undefined}
            tabIndex={-1}
            data-position={position}
            data-expanded={isExpanded ? '' : undefined}
            data-theme={theme}
            data-rich-colors={richColors ? '' : undefined}
            data-invert={invert ? '' : undefined}
            dir={dir}
            className={clsx(rootClass && `${rootClass}-viewport`, viewportClassName, className)}
            style={{
                ...viewportStyle,
                '--viewport-height': `${viewportHeight}px`,
                '--toast-frontmost-height': `${frontHeight}px`,
                '--toast-offset': toCssLength(offset),
                '--toast-mobile-offset': toCssLength(typeof mobileOffset === 'object' ? undefined : mobileOffset),
                '--toast-mobile-offset-top': toCssLength(typeof mobileOffset === 'object' ? mobileOffset.top : undefined),
                '--toast-mobile-offset-bottom': toCssLength(typeof mobileOffset === 'object' ? mobileOffset.bottom : undefined),
                '--toast-mobile-offset-left': toCssLength(typeof mobileOffset === 'object' ? mobileOffset.left : undefined),
                '--toast-mobile-offset-right': toCssLength(typeof mobileOffset === 'object' ? mobileOffset.right : undefined),
                ...style,
            } as React.CSSProperties}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocusCapture={() => setIsHovered(true)}
            onKeyDown={(event) => {
                // Escape on the viewport itself hands focus back to where the hotkey was pressed.
                if (event.key === 'Escape' && event.target === listRef.current && focusBeforeHotkeyRef.current) {
                    focusBeforeHotkeyRef.current.focus();
                    focusBeforeHotkeyRef.current = null;
                }
            }}
            onBlurCapture={(e) => {
                if (!listRef.current?.contains(e.relatedTarget as Node)) {
                    setIsHovered(false);
                }
            }}
        >
            {children}
        </section>
    );
};

ToastViewport.displayName = 'ToastViewport';
export default ToastViewport;
