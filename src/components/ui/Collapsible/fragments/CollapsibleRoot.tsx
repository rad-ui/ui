import clsx from 'clsx';
import React from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { CollapsibleContext } from '../contexts/CollapsibleContext';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

const COMPONENT_NAME = 'Collapsible';

type CollapsibleRootElement = React.ElementRef<typeof CollapsiblePrimitive.Root>;
export type CollapsibleRootProps = React.ComponentPropsWithoutRef<
    typeof CollapsiblePrimitive.Root
> & {
    customRootClass?: string;
};

const CollapsibleRoot = React.forwardRef<
    CollapsibleRootElement,
    CollapsibleRootProps
>(({ children, className = '', transitionDuration = 0, disabled, customRootClass, ...props }, forwardedRef) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    return (
        <CollapsibleContext.Provider value={{ rootClass }}>
            <CollapsiblePrimitive.Root
                ref={forwardedRef}
                className={clsx(rootClass, className)}
                transitionDuration={transitionDuration}
                disabled={disabled}
                {...props}
            >
                {children}
            </CollapsiblePrimitive.Root>
        </CollapsibleContext.Provider>
    );
});

CollapsibleRoot.displayName = 'CollapsibleRoot';

export default CollapsibleRoot;
