import React, { useContext } from 'react';
import { clsx } from 'clsx';
import { AccordionContext } from '../contexts/AccordionContext';

export type AccordionHeaderProps = {
    children: React.ReactNode;
    className?: string;
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({ children, className = '' }) => {
    const { rootClass } = useContext(AccordionContext);
    return (
        <div className={clsx(`${rootClass}-header`, className)}>
            {children}
        </div>
    );
};

export default AccordionHeader;
