import React from 'react';
import { clsx } from 'clsx';

const TableColumnCellHeader = ({ children, className = 'cell-header', ...props }:any) => {
    return <th className={clsx(className)} {...props}>
        {children}
    </th>;
};

export default TableColumnCellHeader;
