import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import DataListContext from '../contexts/DataListContext';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { createDataAttributes, composeAttributes } from '~/core/hooks/createDataAttribute';
import clsx from 'clsx';

const COMPONENT_NAME = 'DataList';

// Rendered as a <dl> so Label (<dt>) and Value (<dd>) are valid description-list
// content; HTML allows <div> wrappers (DataList.Item) directly inside <dl>.
// The public ref type stays HTMLElement-compatible so existing
// `useRef<HTMLDivElement>()` consumers keep compiling.
type DataListRootElement = HTMLElement;
export interface DataListRootProps extends ComponentPropsWithoutRef<'dl'> {
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
        <dl ref={ref as React.Ref<HTMLDListElement>} className={clsx(rootClass, className)} {...dataAttributes} {...props}>{children}</dl>
    </DataListContext.Provider>;
});

DataListRoot.displayName = 'DataListRoot';

export default DataListRoot;
