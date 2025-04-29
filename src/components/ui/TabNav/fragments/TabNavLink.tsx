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
    asChild?: boolean
}

const TabNavLink = ({ className = '', href = '#', children, disabled, asChild }: TabNavLinkProps) => {
    const { rootClass } = useContext(TabNavContext);
    if (asChild) disabled = false;

    return (
        <RovingFocusGroup.Item >
            <Primitive.a
                className={clsx(`${rootClass}-link`, className)}
                asChild={asChild}
                aria-disabled={disabled}
                // @ts-expect-error
                disabled={disabled}
                {...disabled ? {} : { href }}
            >
                {children}
            </Primitive.a>
        </RovingFocusGroup.Item>
    );
};

export default TabNavLink;
