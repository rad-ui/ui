'use client';
import React, { useContext } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';

const ScrollAreaViewport = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    const { rootClass, scrollAreaViewportRef, handleScroll } = useContext(ScrollAreaContext);

    return <div ref={scrollAreaViewportRef} className={clsx(rootClass + '-viewport', className)} onScroll={handleScroll} {...props} >{children}</div>;
};

export default ScrollAreaViewport;
