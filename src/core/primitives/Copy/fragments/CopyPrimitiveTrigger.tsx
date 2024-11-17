import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import CopyPrimitiveContext from '../contexts/CopyPrimitiveContext';

// The triggering action (button) is logically part of the copying mechanism
const CopyTrigger = ({ children, className = '', copyContent = '', resetDelay = 2000, ...props }: any) => {
    const { setIsCopied, isCopied, rootClass } = useContext(CopyPrimitiveContext);

    const handleClick = () => {
        if (copyContent) {
            setIsCopied(true);
            navigator.clipboard.writeText(copyContent);
            setTimeout(() => {
                setIsCopied(false);
            }, resetDelay);
        }
    };

    if (!copyContent || isCopied) {
        return null;
    }

    return <Primitive.button className={`${rootClass}-trigger ${className}`} {...props} onClick={handleClick}>{children}</Primitive.button>;
};

export default CopyTrigger;
