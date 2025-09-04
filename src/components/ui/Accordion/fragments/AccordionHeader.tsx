'use client';
import React, { useContext } from 'react';
import { clsx } from 'clsx';
import { AccordionContext } from '../contexts/AccordionContext';

export type AccordionHeaderProps = React.ComponentPropsWithoutRef<'div'>;

const AccordionHeader = React.forwardRef<React.ElementRef<'div'>, AccordionHeaderProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(AccordionContext);
    return (
        <div ref={ref} className={clsx(`${rootClass}-header`, className)} {...props}>
            {children}
        </div>
    );
});

AccordionHeader.displayName = 'AccordionHeader';

export default AccordionHeader;

