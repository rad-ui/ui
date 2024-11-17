import React, { useState } from 'react';
import Primitive from '~/core/primitives/Primitive';

import CopyPrimitiveContext from '../contexts/CopyPrimitiveContext';

const CopyPrimitiveRoot = ({ children, ...props }: any) => {
    const [isCopied, setIsCopied] = useState(false);

    const values = {
        isCopied,
        setIsCopied
    };

    return (
        <CopyPrimitiveContext.Provider value={values}>
            <Primitive.button {...props}>{children}</Primitive.button>
        </CopyPrimitiveContext.Provider>
    );
};

export default CopyPrimitiveRoot;
