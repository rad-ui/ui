'use client';
import React, { useContext, useEffect } from 'react';
import clsx from 'clsx';

import TabsRootContext, { makeContentId, makeTriggerId } from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import { RovingFocusGroupContext } from '~/core/utils/RovingFocusGroup/context/RovingFocusGroupContext';
import Primitive from '~/core/primitives/Primitive';

export type TabTriggerProps = React.ComponentPropsWithoutRef<'button'> & {
    value?: string;
    asChild?: boolean;
};

const TabTrigger = React.forwardRef<React.ElementRef<'button'>, TabTriggerProps>(
    ({ value, children, className = '', disabled, asChild = false, id, onClick, onFocus, ...props }, forwardedRef) => {
        const context = useContext(TabsRootContext);
        if (!context) throw new Error('TabTrigger must be used within a TabRoot');
        const { tabValue: activeValue, handleTabChange, rootClass, orientation, activationMode, baseId, registerTriggerId } = context;
        const { setFocusedItemId } = useContext(RovingFocusGroupContext);

        const isActive = value !== undefined && value === activeValue;
        const triggerId = id ?? (value !== undefined ? makeTriggerId(baseId, value) : undefined);
        const contentId = value !== undefined ? makeContentId(baseId, value) : undefined;

        // A consumer id replaces the generated one; tell the panel so its aria-labelledby follows.
        useEffect(() => {
            if (value === undefined || id === undefined || !registerTriggerId) return;
            registerTriggerId(value, id);
            return () => registerTriggerId(value, undefined);
        }, [value, id, registerTriggerId]);

        // The selected tab is the tablist's tab stop, so Tab returns focus to it rather than to the
        // first tab (which, with automatic activation, would silently change the selection).
        useEffect(() => {
            if (isActive && !disabled && triggerId) {
                setFocusedItemId(triggerId);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isActive, disabled, triggerId]);

        const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
            onFocus?.(event);
            if (event.defaultPrevented || disabled || value === undefined) return;
            if (activationMode !== 'manual') {
                handleTabChange(value);
            }
        };

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);
            if (event.defaultPrevented || disabled || value === undefined) return;
            handleTabChange(value);
        };

        const dataAttributes: Record<string, string> = {};
        dataAttributes['data-state'] = isActive ? 'active' : 'inactive';
        dataAttributes['data-orientation'] = orientation || 'horizontal';
        if (disabled) {
            dataAttributes['data-disabled'] = '';
        }

        return (
            <RovingFocusGroup.Item domId={triggerId}>
                <Primitive.button
                    ref={forwardedRef}
                    id={triggerId}
                    onClick={handleClick}
                    onFocus={handleFocus}
                    className={clsx(
                        rootClass && `${rootClass}-trigger`,
                        // Legacy state classes, kept for backwards compatibility. Prefer `data-state` / `data-disabled`.
                        isActive ? 'active' : '',
                        disabled ? 'disabled' : '',
                        className
                    )}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={isActive ? contentId : undefined}
                    aria-disabled={disabled}
                    disabled={disabled}
                    data-slot="tabs-trigger"
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
