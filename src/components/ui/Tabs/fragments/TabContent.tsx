'use client';
import React, { useContext } from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import TabsRootContext, { makeContentId, makeTriggerId } from '../context/TabsRootContext';
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
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
        const context = useContext(TabsRootContext);
        if (!context) throw new Error('TabContent must be used within a TabRoot');
        const { tabValue: activeValue, orientation, baseId, customTriggerIds } = context;

        const isActive = value !== undefined && activeValue === value;
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
                id={value !== undefined ? makeContentId(baseId, value) : undefined}
                role="tabpanel"
                aria-labelledby={value !== undefined ? (customTriggerIds?.[value] ?? makeTriggerId(baseId, value)) : undefined}
                // Panels are focusable so keyboard users can Tab from the tablist into the content.
                tabIndex={isActive ? 0 : undefined}
                hidden={!isActive}
                aria-hidden={!isActive}
                data-slot="tabs-content"
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
