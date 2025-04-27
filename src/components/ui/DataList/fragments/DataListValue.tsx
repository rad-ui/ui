import React, { useContext } from 'react';
import DataListContext from '../contexts/DataListContex';
import { clsx } from 'clsx';

const DataListValue = ({ children, className = '', ...props }: { children: React.ReactNode, className?: string }) => {
    const { rootClass } = useContext(DataListContext);
    return <dd className={clsx(`${rootClass}-value`, className)} {...props}>{children}</dd>;
};

export default DataListValue;
