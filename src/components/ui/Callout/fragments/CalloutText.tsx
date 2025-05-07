import React, { useContext } from 'react';
import CalloutContext from '../contexts/CalloutContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

type CalloutTextProps = {
    children: React.ReactNode;
    className?: string;
}

function CalloutText({ children, className, ...props }:CalloutTextProps) {
    const { rootClass } = useContext(CalloutContext);

    return (
        <Primitive.p className={clsx(`${rootClass}-text`, className)} {...props}>
            {children}
        </Primitive.p>
    );
}

export default CalloutText;
