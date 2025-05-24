import React, { useContext } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';

const ScrollAreaViewport = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    const { rootClass } = useContext(ScrollAreaContext);
    return <div className={clsx(rootClass + '-viewport', className)} {...props} >{children}</div>;
};

export default ScrollAreaViewport;
