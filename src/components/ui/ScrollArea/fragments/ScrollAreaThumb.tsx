'use client';

import React, { useContext } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';

const ScrollAreaThumb = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    const { rootClass, scrollXThumbRef } = useContext(ScrollAreaContext);
    return <div ref={scrollXThumbRef} className={clsx(rootClass + '-thumb', className)} {...props} >{children}</div>;
};

export default ScrollAreaThumb;
