'use client';
import React from 'react';
import clsx from 'clsx';
import { customClassSwitcher } from '~/core';
import Primitive from '~/core/primitives/Primitive';
import MinimapContext from '../context/MinimapContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

const COMPONENT_NAME = 'Minimap';

type MinimapRootProps = React.HTMLAttributes<HTMLDivElement> & {
    customRootClass?: string;
};

const MinimapRoot = ({ children, className, customRootClass = '', ...props }: MinimapRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const rootRef = React.useRef<HTMLDivElement>(null);

    return <MinimapContext.Provider value={{ rootClass, rootRef }}>
        <RovingFocusGroup.Root loop={true} orientation='both'>
            <RovingFocusGroup.Group>
                <Primitive.div ref={rootRef} className={clsx(rootClass, className)} {...props}>{children}</Primitive.div>
            </RovingFocusGroup.Group>
        </RovingFocusGroup.Root>
    </MinimapContext.Provider>;
};

export default MinimapRoot;
