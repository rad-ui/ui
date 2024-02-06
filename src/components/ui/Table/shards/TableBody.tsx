import React from 'react';

const TableBody = ({children, className=''}:any) => {
    return <tbody className={className} >
        {children}
    </tbody>;
};

export default TableBody;
