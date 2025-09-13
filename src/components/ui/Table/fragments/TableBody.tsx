'use client';
import React from 'react';
import clsx from 'clsx';

const COMPONENT_NAME = 'TableBody';

const TableBody = ({ children, className = '', ...props }:any) => {
    return <tbody className={clsx(className)} {...props} >
        {children}
    </tbody>;
};

TableBody.displayName = COMPONENT_NAME;

export default TableBody;
