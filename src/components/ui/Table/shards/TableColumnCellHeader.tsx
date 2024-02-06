import React from 'react';

const TableColumnCellHeader = ({children, className='cell-header'}:any) => {
    return <th className={className} >
        {children}
    </th>;
};

export default TableColumnCellHeader;
