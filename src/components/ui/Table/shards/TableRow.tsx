import React from 'react';

const TableRow = ({children, className='row'}:any) => {
    return <tr className={className} >
        {children}
    </tr>;
};

export default TableRow;
