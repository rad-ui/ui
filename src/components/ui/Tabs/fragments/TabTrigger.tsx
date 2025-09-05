'use client';
import React, { useContext, useRef, useCallback } from 'react';
import { clsx } from 'clsx';

import TabsRootContext from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';

export type TabTriggerProps = React.ComponentPropsWithoutRef<'button'> & {
    value?: string;
    asChild?: boolean;
};

const TabTrigger = React.forwardRef<React.ElementRef<'button'>, TabTriggerProps>(
    ({ value, children, className = '', disabled, asChild = false, ...props }, forwardedRef) => {
        // use context
        const context = useContext(TabsRootContext);
        if (!context) throw new Error('TabTrigger must be used within a TabRoot');
        const { tabValue: activeValue, handleTabChange, rootClass, orientation, activationMode } = context;

        const ref = useRef<HTMLButtonElement | null>(null);
        const composedRef = useCallback((node: HTMLButtonElement | null) => {
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
            if (typeof forwardedRef === 'function') forwardedRef(node);
            else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }, [forwardedRef]);

        const isActive = value === activeValue;

        const handleFocus = (tabValue: string) => {
            if (disabled) return; // Don't handle focus events when disabled

            if (ref.current) {
                ref.current?.focus();
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
            <RovingFocusGroup.Item onFocus={() => value && !disabled && handleFocus(value)}>
                <Primitive.button
                    ref={composedRef}
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
                    asChild={asChild}
                    {...dataAttributes}
                    {...props}
                >
                    {children}
                </Primitive.button>
            </RovingFocusGroup.Item>
        );
    }
);

TabTrigger.displayName = 'TabTrigger';

export default TabTrigger;
