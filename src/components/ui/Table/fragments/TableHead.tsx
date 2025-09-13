'use client';
import React from 'react';
import clsx from 'clsx';

const COMPONENT_NAME = 'TableHead';

const TableHead = ({ children, className = 'header', ...props }:any) => {
    return <thead className={clsx(className)} {...props} >
        {children}
    </thead>;
};

TableHead.displayName = COMPONENT_NAME;

export default TableHead;
