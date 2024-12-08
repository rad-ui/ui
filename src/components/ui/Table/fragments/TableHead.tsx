import React from 'react';
import { clsx } from 'clsx';

const TableHead = ({ children, className = 'header', ...props }:any) => {
    return <thead className={clsx(className)} {...props} >
        {children}
    </thead>;
};

export default TableHead;
