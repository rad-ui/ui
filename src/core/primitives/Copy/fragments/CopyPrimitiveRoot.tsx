import React, { useState } from 'react';
import Primitive from '~/core/primitives/Primitive';

import { customClassSwitcher } from '~/core/customClassSwitcher';

import CopyPrimitiveContext from '../contexts/CopyPrimitiveContext';

const CopyPrimitiveRoot = ({ customRootClass = '', className = '', children, ...props }: any) => {
    const [isCopied, setIsCopied] = useState(false);
    const rootClass = customClassSwitcher(customRootClass, 'Copy');

    const values = {
        isCopied,
        setIsCopied,
        rootClass
    };

    return (
        <CopyPrimitiveContext.Provider value={values}>
            <Primitive.span className={`${rootClass} ${className}`} {...props}>{children}</Primitive.span>
        </CopyPrimitiveContext.Provider>
    );
};

export default CopyPrimitiveRoot;
