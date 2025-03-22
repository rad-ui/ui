'use client';
import React from 'react';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'TableCell';

const TableCell = ({ children, className = 'cell', ...props }:any) => {
    return <td className={clsx(className)} {...props} >
        {children}
    </td>;
};

TableCell.displayName = COMPONENT_NAME;

export default TableCell;
