'use client';

import React, { useState } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { customClassSwitcher } from '~/core';
import { SwitchContext } from '../context/SwitchContext';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'Switch';

export type SwitchRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    color?: string;
    variant?: string;
    size?: string;
};

const SwitchRoot = ({ children, customRootClass, color = '', variant, size }: SwitchRootProps) => {
    const [checked, setChecked] = useState(false);
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('switch', { variant, size });
    const accentAttributes = useCreateDataAccentColorAttribute(color);
    const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

    return (
        <SwitchContext.Provider value={{ checked, setChecked, rootClass }}>
            <Primitive.button onClick={() => setChecked(!checked)} className={rootClass} data-state={checked ? 'checked' : 'unchecked'} {...composedAttributes()}>{children}</Primitive.button>
        </SwitchContext.Provider>
    );
};

export default SwitchRoot;
