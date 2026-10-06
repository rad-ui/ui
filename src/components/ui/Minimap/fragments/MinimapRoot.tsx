'use client';
import React from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import Primitive from '~/core/primitives/Primitive';
import MinimapContext from '../context/MinimapContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import { composeRefs } from '~/core/utils/mergeProps';

const COMPONENT_NAME = 'Minimap';

export type MinimapRootProps = React.HTMLAttributes<HTMLDivElement> & {
    customRootClass?: string;
};

const MinimapRoot = React.forwardRef<HTMLDivElement, MinimapRootProps>(({ children, className, customRootClass = '', ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = React.useMemo(() => composeRefs(rootRef, ref), [ref]);
    const contextValue = React.useMemo(() => ({ rootClass, rootRef }), [rootClass]);

    return <MinimapContext.Provider value={contextValue}>
        <RovingFocusGroup.Root loop={true} orientation='both'>
            <RovingFocusGroup.Group>
                <Primitive.div ref={mergedRef} className={clsx(rootClass, className)} {...props}>{children}</Primitive.div>
            </RovingFocusGroup.Group>
        </RovingFocusGroup.Root>
    </MinimapContext.Provider>;
});

MinimapRoot.displayName = 'Minimap.Root';

export default MinimapRoot;
