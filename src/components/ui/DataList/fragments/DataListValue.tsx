import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useContext } from 'react';
import DataListContext from '../contexts/DataListContex';
import { clsx } from 'clsx';

type DataListValueElement = ElementRef<'dd'>;
type DataListValueProps = ComponentPropsWithoutRef<'dd'>;

const DataListValue = forwardRef<DataListValueElement, DataListValueProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(DataListContext);
    return <dd ref={ref} className={clsx(`${rootClass}-value`, className)} {...props}>{children}</dd>;
});

DataListValue.displayName = 'DataListValue';

export default DataListValue;
