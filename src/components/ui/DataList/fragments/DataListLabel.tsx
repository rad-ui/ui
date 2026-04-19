import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useContext } from 'react';
import DataListContext from '../contexts/DataListContext';
import { createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';
import clsx from 'clsx';

type DataListLabelElement = ElementRef<'dt'>;
export type DataListLabelProps = ComponentPropsWithoutRef<'dt'> & {
    color?: string;
};

const DataListLabel = forwardRef<DataListLabelElement, DataListLabelProps>(({ children, className = '', color = '', ...props }, ref) => {
    const { rootClass } = useContext(DataListContext);
    const accentAttributes = createDataAccentColorAttribute(color);
    return <dt ref={ref} className={clsx(rootClass && `${rootClass}-label`, className)} {...accentAttributes} {...props}>{children}</dt>;
});

DataListLabel.displayName = 'DataListLabel';

export default DataListLabel;
