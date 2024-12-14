import React from 'react';
import { clsx } from 'clsx';

export type AccordionHeaderProps = {
    children: React.ReactNode;
    className?: string;
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({ children, className = '' }) => {
    return (
        <div className={clsx(className)}>
            {children}
        </div>
    );
};

export default AccordionHeader;
