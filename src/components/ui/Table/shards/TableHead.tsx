import React from 'react';

const TableHead = ({children, className='header'}:any) => {
    return <thead className={className} >
        {children}
    </thead>;
};

export default TableHead;
