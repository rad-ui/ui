'use client';

import React, { forwardRef, useMemo, useState } from 'react';
import clsx from 'clsx';
import PopoverPrimitive from '~/core/primitives/Popover';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { PopoverContext } from '../context/PopoverContext';

const COMPONENT_NAME = 'Popover';

export type PopoverRootElement = React.ElementRef<typeof PopoverPrimitive.Root>;
export type PopoverRootProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> & {
    customRootClass?: string;
    className?: string;
};

const PopoverRoot = forwardRef<PopoverRootElement, PopoverRootProps>(({
    children,
    customRootClass = '',
    className = '',
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const [titleId, setTitleId] = useState<string | undefined>(undefined);
    const [descriptionId, setDescriptionId] = useState<string | undefined>(undefined);
    const contextValue = useMemo(() => ({
        rootClass,
        titleId,
        descriptionId,
        setTitleId,
        setDescriptionId
    }), [rootClass, titleId, descriptionId]);

    return (
        <PopoverContext.Provider value={contextValue}>
            <PopoverPrimitive.Root
                ref={ref}
                className={clsx(rootClass, className)}
                data-slot="popover-root"
                {...props}
            >
                {children}
            </PopoverPrimitive.Root>
        </PopoverContext.Provider>
    );
});

PopoverRoot.displayName = COMPONENT_NAME;

export default PopoverRoot;
