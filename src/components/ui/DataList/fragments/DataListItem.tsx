import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useContext } from 'react';
import DataListContext from '../contexts/DataListContex';
import { clsx } from 'clsx';

type DataListItemElement = ElementRef<'div'>;
export type DataListItemProps = ComponentPropsWithoutRef<'div'>;

const DataListItem = forwardRef<DataListItemElement, DataListItemProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(DataListContext);
    return <div ref={ref} className={clsx(`${rootClass}-item`, className)} {...props}>{children}</div>;
});

DataListItem.displayName = 'DataListItem';

export default DataListItem;
