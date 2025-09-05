'use client';
import React, { useContext } from 'react';
import { clsx } from 'clsx';
import TabsRootContext from '../context/TabsRootContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'TabList';

export type TabListProps = React.ComponentPropsWithoutRef<'div'> & {
    asChild?: boolean;
};

const TabList = React.forwardRef<React.ElementRef<'div'>, TabListProps>(
    ({ className = '', children, asChild = false, ...props }, forwardedRef) => {
        const context = useContext(TabsRootContext);
        if (!context) throw new Error('TabList must be used within a TabRoot');

        const { rootClass, orientation } = context;

        return (
            <RovingFocusGroup.Group>
                <Primitive.div
                    ref={forwardedRef}
                    role="tablist"
                    aria-orientation={orientation}
                    aria-label="todo"
                    className={clsx(`${rootClass}-list`, className)}
                    asChild={asChild}
                    {...props}
                >
                    {children}
                </Primitive.div>
            </RovingFocusGroup.Group>
        );
    }
);

TabList.displayName = COMPONENT_NAME;

export default TabList;
