import React from 'react';
import DataListContext from '../contexts/DataListContex';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'DataList';

const DataListRoot = ({ children, className = '', customRootClass = '', ...props }: { children: React.ReactNode, className?: string, customRootClass?: string }) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <DataListContext.Provider
        value={{
            rootClass
        }}>
        <div className={clsx(rootClass, className)} {...props}>{children}</div>
    </DataListContext.Provider>;
};

export default DataListRoot;
