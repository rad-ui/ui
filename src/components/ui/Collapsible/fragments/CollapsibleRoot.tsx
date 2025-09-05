import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import { customClassSwitcher } from '~/core';
import { CollapsibleContext } from '../contexts/CollapsibleContext';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

const COMPONENT_NAME = 'Collapsible';

export type CollapsibleRootElement = ElementRef<typeof CollapsiblePrimitive.Root>;
export type CollapsibleRootProps = ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> & {
    customRootClass?: string;
};

const CollapsibleRoot = React.forwardRef<CollapsibleRootElement, CollapsibleRootProps>(({
    children,
    className = '',
    transitionDuration = 0,
    customRootClass,
    ...props
}, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <CollapsibleContext.Provider value={{ rootClass }}>
        <CollapsiblePrimitive.Root
            ref={ref}
            className={clsx(rootClass, className)}
            transitionDuration={transitionDuration}
            {...props}
        >
            {children}
        </CollapsiblePrimitive.Root>
    </CollapsibleContext.Provider>;
});

CollapsibleRoot.displayName = COMPONENT_NAME;

export default CollapsibleRoot;
