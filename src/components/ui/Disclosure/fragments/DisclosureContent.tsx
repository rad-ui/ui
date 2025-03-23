import React, { useContext } from 'react';
import clsx from 'clsx';
import { DisclosureContext } from '../contexts/DisclosureContext';
import { DisclosureItemContext } from '../contexts/DisclosureItemContext';

export type DisclosureContentProps = {
      children: React.ReactNode;
      className?: string;

}

const DisclosureContent = ({ children, className = '' }:DisclosureContentProps) => {
    const { activeItem, rootClass } = useContext(DisclosureContext);
    const { itemValue } = useContext(DisclosureItemContext);
    return (
        <div
            className={clsx(`${rootClass}-content`, className)}
            hidden={activeItem !== itemValue}
            role="region"
            aria-hidden={activeItem !== itemValue}
        >
            {children}
        </div>
    );
};

export default DisclosureContent;
