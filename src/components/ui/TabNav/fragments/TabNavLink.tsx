import React, { useContext } from 'react';
import { clsx } from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';
import TabNavContext from '../context/TabNav.context';

export type TabNavLinkProps = {
    children: React.ReactNode,
    className?: string,
    href?: string,
    disabled?: boolean,

}

const TabNavLink = ({ className = '', href = '#', children, disabled }: TabNavLinkProps) => {
    const { rootClass } = useContext(TabNavContext);

    return (
        <RovingFocusGroup.Item>
            <Primitive.a
                className={clsx(`${rootClass}-link`, className)}
                data-disabled={disabled}
                {...disabled ? {} : { href }}
            >
                {children}
            </Primitive.a>
        </RovingFocusGroup.Item>
    );
};

export default TabNavLink;
