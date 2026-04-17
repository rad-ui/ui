import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useContext } from 'react';
import DataListContext from '../contexts/DataListContext';
import clsx from 'clsx';

type DataListLabelElement = ElementRef<'dt'>;
export type DataListLabelProps = ComponentPropsWithoutRef<'dt'>;

const DataListLabel = forwardRef<DataListLabelElement, DataListLabelProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(DataListContext);
    return <dt ref={ref} className={clsx(rootClass && `${rootClass}-label`, className)} {...props}>{children}</dt>;
});

DataListLabel.displayName = 'DataListLabel';

export default DataListLabel;
