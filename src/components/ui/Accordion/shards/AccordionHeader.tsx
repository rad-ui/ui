import React from 'react';

export type AccordionHeaderProps = {
    children: React.ReactNode;
    className?: string;
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({ children, className = '' }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default AccordionHeader;
