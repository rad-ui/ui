import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import DataListContext from '../contexts/DataListContext';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { createDataAttributes, composeAttributes } from '~/core/hooks/createDataAttribute';
import clsx from 'clsx';

const COMPONENT_NAME = 'DataList';

type DataListRootElement = ElementRef<'div'>;
export interface DataListRootProps extends ComponentPropsWithoutRef<'div'> {
    customRootClass?: string;
    size?: string;
}

const DataListRoot = forwardRef<DataListRootElement, DataListRootProps>(({ children, className = '', customRootClass = '', size = '', ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const dataAttributes = createDataAttributes('datalist', { size });
    return <DataListContext.Provider
        value={{
            rootClass
        }}>
        <div ref={ref} className={clsx(rootClass, className)} {...dataAttributes} {...props}>{children}</div>
    </DataListContext.Provider>;
});

DataListRoot.displayName = 'DataListRoot';

export default DataListRoot;
