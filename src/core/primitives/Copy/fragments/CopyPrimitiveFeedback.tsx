import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import CopyPrimitiveContext from '../contexts/CopyPrimitiveContext';

const CopyPrimitiveFeedback = ({ children, isCopiedText = 'Copied!', ...props }: any) => {
    const { isCopied } = useContext(CopyPrimitiveContext);

    if (!isCopied) {
        return null;
    }

    return <Primitive.span {...props}>{isCopiedText}</Primitive.span>;
};

export default CopyPrimitiveFeedback;
