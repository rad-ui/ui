'use client';
import React, { useContext } from 'react';
import { clsx } from 'clsx';
import TabsRootContext from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

const COMPONENT_NAME = 'TabList';

type TabListElement = React.ElementRef<'div'>;
export type TabListProps = React.ComponentPropsWithoutRef<'div'> & {
    children?: React.ReactNode;
    asChild?: boolean;
};

const TabList = React.forwardRef<TabListElement, TabListProps>(({ className = '', children, asChild = false, ...props }, ref) => {
    const context = useContext(TabsRootContext);
    if (!context) throw new Error('TabList must be used within a TabRoot');

    const { rootClass, orientation } = context;

    const { ['aria-label']: ariaLabel, ...restProps } = props;

    const childProps = {
        ref,
        className: clsx(`${rootClass}-list`, className),
        ...restProps,
        role: 'tablist',
        'aria-orientation': orientation,
        ...(ariaLabel ? { 'aria-label': ariaLabel } : {})
    } as const;

    const child =
        asChild && React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement<any>, {
                ...childProps,
                className: clsx((children as React.ReactElement<any>).props.className, childProps.className)
            })
            : <div {...childProps}>{children}</div>;

    return <RovingFocusGroup.Group>{child}</RovingFocusGroup.Group>;
});

TabList.displayName = COMPONENT_NAME;

export default TabList;
