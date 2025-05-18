'use client';
import React, { useContext, useRef } from 'react';
import { clsx } from 'clsx';

import TabsRootContext from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

export type TabTriggerProps = {
    className?: string;
    value?: string;
    children?: React.ReactNode;
    disabled?: boolean;
}

const TabTrigger = ({ value, children, className = '', disabled, ...props }: TabTriggerProps) => {
    // use context
    const context = useContext(TabsRootContext);
    if (!context) throw new Error('TabTrigger must be used within a TabRoot');
    const { tabValue: activeValue, handleTabChange, rootClass } = context;

    const ref = useRef<HTMLButtonElement>(null);

    const isActive = value === activeValue;

    const handleFocus = (tabValue: string) => {
        if (disabled) return; // Don't handle focus events when disabled

        if (ref.current) {
            ref.current?.focus();
        }
        handleTabChange(tabValue);
    };

    // Add explicit click handler
    const handleClick = (e: React.MouseEvent) => {
        if (disabled) return; // Don't handle click events when disabled

        if (value) {
            handleTabChange(value);
        }
    };

    return (
        <RovingFocusGroup.Item
            onFocus={() => value && !disabled && handleFocus(value)}
        >
            <button
                ref={ref}
                onClick={handleClick}
                className={clsx(
                    `${rootClass}-trigger`,
                    isActive ? 'active' : '',
                    disabled ? 'disabled' : '',
                    className
                )}
                role="tab"
                aria-selected={isActive}
                aria-disabled={disabled}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        </RovingFocusGroup.Item>
    );
};

TabTrigger.displayName = 'TabTrigger';

export default TabTrigger;
