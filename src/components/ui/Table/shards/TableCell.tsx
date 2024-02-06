import React from 'react';

const TableCell = ({children, className='cell'}:any) => {
    return <td className={className} >
        {children}
    </td>;
};

export default TableCell;
