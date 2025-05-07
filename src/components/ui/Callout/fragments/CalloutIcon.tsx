import React, { useContext } from 'react';
import CalloutContext from '../contexts/CalloutContext';
import clsx from 'clsx';
type CalloutIconProps = {
    children: React.ReactNode;
    className?: string;
}

function CalloutIcon({children, className='', ...props}:CalloutIconProps) {
    const {rootClass} = useContext(CalloutContext);

    return (
        <div className={clsx(`${rootClass}-icon`, className)} {...props}>
            {children}
        </div>
    );
}

export default CalloutIcon;