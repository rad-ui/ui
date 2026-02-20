import React, { useContext, useRef, forwardRef, useCallback } from 'react';
import clsx from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';
import TabNavContext from '../context/TabNav.context';

export type TabNavLinkProps = React.ComponentPropsWithoutRef<'a'> & {
    disabled?: boolean,
    asChild?: boolean,
    value?: string
}

const TabNavLink = forwardRef<React.ElementRef<'a'>, TabNavLinkProps>(({
    value, className = '', href = '#', children, disabled, asChild, ...props
}, forwardedRef) => {
    const { rootClass, tabValue, handleTabChange } = useContext(TabNavContext);
    if (asChild) disabled = false;

    const ref = useRef<HTMLAnchorElement | null>(null);
    const composedRef = useCallback((node: HTMLAnchorElement | null) => {
        (ref as React.MutableRefObject<HTMLAnchorElement | null>).current = node;
        if (typeof forwardedRef === 'function') {
            forwardedRef(node);
        } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLAnchorElement | null>).current = node;
        }
    }, [forwardedRef]);

    const isActive = value === tabValue;

    const handleFocus = (tabValue: string) => {
        if (disabled) return; // Don't handle focus events when disabled

        if (ref.current) {
            ref.current?.focus();
        }
        handleTabChange(tabValue);
    };

    return (
        <RovingFocusGroup.Item
            onFocus={() => value && !disabled && handleFocus(value)}>
            <Primitive.a
                ref={composedRef}
                className={clsx(`${rootClass}-link`, className)}
                asChild={asChild}
                aria-disabled={disabled}
                aria-selected={isActive}
                disabled={disabled}
                {...disabled ? {} : { href }}
                {...props}
            >
                {children}
            </Primitive.a>
        </RovingFocusGroup.Item>
    );
});

TabNavLink.displayName = 'TabNavLink';

export default TabNavLink;
