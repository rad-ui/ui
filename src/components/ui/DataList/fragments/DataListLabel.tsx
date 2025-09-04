import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useContext } from 'react';
import DataListContext from '../contexts/DataListContex';
import { clsx } from 'clsx';

type DataListLabelElement = ElementRef<'dt'>;
type DataListLabelProps = ComponentPropsWithoutRef<'dt'>;

const DataListLabel = forwardRef<DataListLabelElement, DataListLabelProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(DataListContext);
    return <dt ref={ref} className={clsx(`${rootClass}-label`, className)} {...props}>{children}</dt>;
});

DataListLabel.displayName = 'DataListLabel';

export default DataListLabel;
