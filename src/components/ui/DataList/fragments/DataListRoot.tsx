import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import DataListContext from '../contexts/DataListContex';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';

const COMPONENT_NAME = 'DataList';

type DataListRootElement = ElementRef<'div'>;
export interface DataListRootProps extends ComponentPropsWithoutRef<'div'> {
    customRootClass?: string;
    detach?: boolean;
}

const DataListRoot = forwardRef<DataListRootElement, DataListRootProps>(({ children, className = '', customRootClass = '', detach = false, ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME, detach);
    return <DataListContext.Provider
        value={{
            rootClass
        }}>
        <div ref={ref} className={clsx(rootClass, className)} {...props}>{children}</div>
    </DataListContext.Provider>;
});

DataListRoot.displayName = 'DataListRoot';

export default DataListRoot;
