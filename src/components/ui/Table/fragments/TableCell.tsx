import React from 'react';
import { clsx } from 'clsx';

const TableCell = ({ children, className = 'cell', ...props }:any) => {
    return <td className={clsx(className)} {...props} >
        {children}
    </td>;
};

export default TableCell;
