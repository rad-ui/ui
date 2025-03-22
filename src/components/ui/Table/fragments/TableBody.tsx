'use client';
import React from 'react';
import { clsx } from 'clsx';

const TableBody = ({ children, className = '', ...props }:any) => {
    return <tbody className={clsx(className)} {...props} >
        {children}
    </tbody>;
};

export default TableBody;
