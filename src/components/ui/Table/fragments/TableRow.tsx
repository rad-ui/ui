'use client';
import React from 'react';
import clsx from 'clsx';

const COMPONENT_NAME = 'TableRow';
const TableRow = ({ children, className = 'row', ...props }:any) => {
    return <tr className={clsx(className)} {...props} >
        {children}
    </tr>;
};

TableRow.displayName = COMPONENT_NAME;

export default TableRow;
