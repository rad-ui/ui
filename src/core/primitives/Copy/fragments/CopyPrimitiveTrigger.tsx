import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import CopyPrimitiveContext from '../contexts/CopyPrimitiveContext';

// The triggering action (button) is logically part of the copying mechanism
const CopyTrigger = ({ children, text = '', resetDelay = 2000, ...props }: any) => {
    const { setIsCopied, isCopied } = useContext(CopyPrimitiveContext);

    const handleClick = () => {
        if (text) {
            setIsCopied(true);
            navigator.clipboard.writeText(text);
            setTimeout(() => {
                setIsCopied(false);
            }, resetDelay);
        }
    };

    if (!text || isCopied) {
        return null;
    }

    return <Primitive.button {...props} onClick={handleClick}>{children}</Primitive.button>;
};

export default CopyTrigger;
