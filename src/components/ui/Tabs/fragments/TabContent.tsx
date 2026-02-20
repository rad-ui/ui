'use client';
import React, { useContext } from 'react';
import { customClassSwitcher } from '~/core';
import TabsRootContext from '../context/TabsRootContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'TabContent';

export type TabContentProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    value?: string;
    asChild?: boolean;
    forceMount?: boolean;
};

const TabContent = React.forwardRef<React.ElementRef<'div'>, TabContentProps>(
    ({ className = '', value, children, customRootClass, asChild = false, forceMount = false, ...props }, forwardedRef) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
        const context = useContext(TabsRootContext);
        if (!context) throw new Error('TabContent must be used within a TabRoot');
        const { tabValue: activeValue, orientation } = context;

        const isActive = activeValue === value;
        const shouldRender = forceMount || isActive;

        if (!shouldRender) {
            return null;
        }

        const dataAttributes: Record<string, string> = {};
        dataAttributes['data-state'] = isActive ? 'active' : 'inactive';
        dataAttributes['data-orientation'] = orientation || 'horizontal';

        return (
            <Primitive.div
                ref={forwardedRef}
                className={clsx(rootClass, className)}
                role="tabpanel"
                aria-hidden={!isActive}
                asChild={asChild}
                {...dataAttributes}
                {...props}
            >
                {children}
            </Primitive.div>
        );
    }
);

TabContent.displayName = COMPONENT_NAME;

export default TabContent;
