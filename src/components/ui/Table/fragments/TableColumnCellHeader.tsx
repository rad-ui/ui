'use client';
import React from 'react';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'TableColumnCellHeader';

const TableColumnCellHeader = ({ children, className = 'cell-header', ...props }:any) => {
    return <th className={clsx(className)} {...props}>
        {children}
    </th>;
};

TableColumnCellHeader.displayName = COMPONENT_NAME;

export default TableColumnCellHeader;
