import React, { useContext } from 'react';
import CalloutContext from '../contexts/CalloutContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
type CalloutIconProps = {
    children: React.ReactNode;
    className?: string;
}

function CalloutIcon({ children, className = '', ...props }:CalloutIconProps) {
    const { rootClass } = useContext(CalloutContext);

    return (
        <Primitive.span className={clsx(`${rootClass}-icon`, className)} {...props}>
            {children}
        </Primitive.span>
    );
}

export default CalloutIcon;
