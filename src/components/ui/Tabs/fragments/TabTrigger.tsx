'use client';
import React, { useContext, useRef, useImperativeHandle } from 'react';
import { clsx } from 'clsx';

import TabsRootContext from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

type TabTriggerElement = React.ElementRef<'button'> | null;
export type TabTriggerProps = React.ComponentPropsWithoutRef<'button'> & {
    value?: string;
    asChild?: boolean;
};

const TabTrigger = React.forwardRef<TabTriggerElement, TabTriggerProps>(
    ({
        value,
        children,
        className = '',
        disabled,
        asChild = false,
        onClick,
        ...props
    }, forwardedRef) => {
    // use context
    const context = useContext(TabsRootContext);
    if (!context) throw new Error('TabTrigger must be used within a TabRoot');
    const { tabValue: activeValue, handleTabChange, rootClass, orientation, activationMode } = context;

    const ref = useRef<HTMLButtonElement>(null);
    useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(forwardedRef, () => ref.current);

    const isActive = value === activeValue;

    const handleFocus = (tabValue: string) => {
        if (disabled) return; // Don't handle focus events when disabled

        if (ref.current) {
            ref.current.focus();
        }

        // Only change tab on focus if activation mode is automatic
        if (activationMode === 'automatic') {
            handleTabChange(tabValue);
        }
    };

    // Add explicit click handler
    const handleClick = (e: React.MouseEvent) => {
        if (disabled) return; // Don't handle click events when disabled

        if (value) {
            handleTabChange(value);
        }
    };

    const dataAttributes: Record<string, string> = {};
    dataAttributes['data-state'] = isActive ? 'active' : 'inactive';
    dataAttributes['data-orientation'] = orientation || 'horizontal';
    if (disabled) {
        dataAttributes['data-disabled'] = '';
    }

    return (
        <RovingFocusGroup.Item
            onFocus={() => value && !disabled && handleFocus(value)}
        >
            <button
                ref={ref}
                onClick={(e) => {
                    onClick?.(e);
                    handleClick(e);
                }}
                className={clsx(
                    `${rootClass}-trigger`,
                    isActive ? 'active' : '',
                    disabled ? 'disabled' : '',
                    className
                )}
                {...props}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-disabled={disabled}
                disabled={disabled}
                {...dataAttributes}
            >
                {children}
            </button>
        </RovingFocusGroup.Item>
    );
});

TabTrigger.displayName = 'TabTrigger';

export default TabTrigger;
