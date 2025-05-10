'use client';

import React, { useState } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { customClassSwitcher } from '~/core';
import { SwitchContext } from '../context/SwitchContext';

const COMPONENT_NAME = 'Switch';

type SwitchRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
};

const SwitchRoot = ({ children, customRootClass }: SwitchRootProps) => {
    const [checked, setChecked] = useState(false);
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return (
        <SwitchContext.Provider value={{ checked, setChecked, rootClass }}>
            <Primitive.button onClick={() => setChecked(!checked)} className={rootClass} data-state={checked ? 'checked' : 'unchecked'}>{children}</Primitive.button>
        </SwitchContext.Provider>
    );
};

export default SwitchRoot;
