import React, { useContext } from 'react';
import DataListContext from '../contexts/DataListContex';
import { clsx } from 'clsx';

const DataListItem = ({ children, className = '', ...props }: { children: React.ReactNode, className?: string }) => {
    const { rootClass } = useContext(DataListContext);
    return <div className={clsx(`${rootClass}-item`, className)} {...props}>{children}</div>;
};

export default DataListItem;
