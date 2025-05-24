'use client';

import React, { useContext } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';

const ScrollAreaScrollbar = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    const { rootClass } = useContext(ScrollAreaContext);
    return <div className={clsx(rootClass + '-scrollbar', className)} {...props} >{children}</div>;
};

export default ScrollAreaScrollbar;
