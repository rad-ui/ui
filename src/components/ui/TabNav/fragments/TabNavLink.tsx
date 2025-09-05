import React, { useContext, useRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';
import TabNavContext from '../context/TabNav.context';

export interface TabNavLinkProps extends ComponentPropsWithoutRef<'a'> {
    disabled?: boolean;
    asChild?: boolean;
    value?: string;
}

type TabNavLinkElement = ElementRef<'a'>;

const TabNavLink = React.forwardRef<TabNavLinkElement, TabNavLinkProps>(
    ({ value, className = '', href = '#', children, disabled, asChild, ...props }, ref) => {
        const { rootClass, tabValue, handleTabChange } = useContext(TabNavContext);
        if (asChild) disabled = false;

        const localRef = useRef<TabNavLinkElement | null>(null);
        const mergedRef = (node: TabNavLinkElement | null) => {
            localRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<TabNavLinkElement | null>).current = node;
        };

        const isActive = value === tabValue;

        const handleFocus = (tabValue: string) => {
            if (disabled) return; // Don't handle focus events when disabled

            if (localRef.current) {
                localRef.current.focus();
            }
            handleTabChange(tabValue);
        };

        return (
            <RovingFocusGroup.Item onFocus={() => value && !disabled && handleFocus(value)}>
                <Primitive.a
                    ref={mergedRef}
                    className={clsx(`${rootClass}-link`, className)}
                    asChild={asChild}
                    {...props}
                    aria-disabled={disabled}
                    aria-selected={isActive}
                    disabled={disabled}
                    {...(disabled ? {} : { href })}
                >
                    {children}
                </Primitive.a>
            </RovingFocusGroup.Item>
        );
    }
);

TabNavLink.displayName = 'TabNavLink';

export default TabNavLink;
