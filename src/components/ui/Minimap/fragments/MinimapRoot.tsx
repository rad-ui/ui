'use client';
import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import Primitive from '~/core/primitives/Primitive';
import MinimapContext from '../context/MinimapContext';
import MinimapProviderContext from '../context/MinimapProviderContext';

const COMPONENT_NAME = 'Minimap';

const MinimapRoot = ({ children, className, customRootClass = '', ...props }: MinimapRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const { visibleItems } = React.useContext(MinimapProviderContext) || { visibleItems: [] };

    return <MinimapContext.Provider value={{ rootClass, rootRef }}>
        <Primitive.div ref={rootRef} className={clsx(rootClass, className)} {...props}>{children}</Primitive.div>
    </MinimapContext.Provider>;
};

export default MinimapRoot;
