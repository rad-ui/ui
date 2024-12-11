import React from 'react';
import { clsx } from 'clsx';

const TableRow = ({ children, className = 'row', ...props }:any) => {
    return <tr className={clsx(className)} {...props} >
        {children}
    </tr>;
};

export default TableRow;
