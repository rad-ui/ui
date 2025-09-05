import React, { useContext, useRef } from 'react';
import { clsx } from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';
import TabNavContext from '../context/TabNav.context';

export type TabNavLinkProps = {
    children: React.ReactNode,
    className?: string,
    href?: string,
    disabled?: boolean,
    asChild?: boolean,
    value?: string
}

const TabNavLink = ({ value, className = '', href = '#', children, disabled, asChild }: TabNavLinkProps) => {
    const { rootClass, tabValue, handleTabChange } = useContext(TabNavContext);
    if (asChild) disabled = false;

    const ref = useRef<HTMLAnchorElement>(null);

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
                ref={ref}
                className={clsx(`${rootClass}-link`, className)}
                asChild={asChild}
                aria-disabled={disabled}
                aria-selected={isActive}
                disabled={disabled}
                {...disabled ? {} : { href }}
            >
                {children}
            </Primitive.a>
        </RovingFocusGroup.Item>
    );
};

export default TabNavLink;
