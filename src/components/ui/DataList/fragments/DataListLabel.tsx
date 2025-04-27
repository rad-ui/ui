import React, { useContext } from 'react';
import DataListContext from '../contexts/DataListContex';
import { clsx } from 'clsx';

const DataListLabel = ({ children, className = '', ...props }: { children: React.ReactNode, className?: string }) => {
    const { rootClass } = useContext(DataListContext);
    return <dt className={clsx(`${rootClass}-label`, className)} {...props}>{children}</dt>;
};

export default DataListLabel;
