'use client';
import React, { useContext } from 'react';
import { customClassSwitcher } from '~/core';
import TabsRootContext from '../context/TabsRootContext';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'TabContent';

type TabContentElement = React.ElementRef<'div'>;
export type TabContentProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    value?: string;
    asChild?: boolean;
    forceMount?: boolean;
};

const TabContent = React.forwardRef<TabContentElement, TabContentProps>(({ className = '', value, children, customRootClass, asChild = false, forceMount = false, ...props }, ref) => {
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
        <div
            ref={ref}
            className={clsx(rootClass, className)}
            {...props}
            role="tabpanel"
            aria-hidden={!isActive}
            hidden={forceMount && !isActive}
            {...dataAttributes}
        >
            {children}
        </div>
    );
});

TabContent.displayName = COMPONENT_NAME;

export default TabContent;
