import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import CopyPrimitiveContext from '../contexts/CopyPrimitiveContext';

const CopyPrimitiveFeedback = ({ children, className = '', ...props }: any) => {
    const { isCopied, rootClass } = useContext(CopyPrimitiveContext);

    if (!isCopied) {
        return null;
    }

    return <Primitive.span className={`${rootClass}-feedback ${className}`} {...props}>{children}</Primitive.span>;
};

export default CopyPrimitiveFeedback;
