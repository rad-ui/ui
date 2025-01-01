import clsx from 'clsx';
import React, { useContext } from 'react';
import { CollapsibleContext } from '../contexts/CollapsibleContext';

type CollapsibleContentProps = {
    children: React.ReactNode;
    className?: string;

}

const CollapsibleContent = ({ children, className = '' }:CollapsibleContentProps) => {
    const { rootClass, open } = useContext(CollapsibleContext);

    return (
        <div
            className={clsx(`${rootClass}-content`, className)}
            aria-hidden={!open}
            data-state={open ? 'expanded' : 'collapsed'}
        >
            {open && children}
        </div>
    );
};

export default CollapsibleContent;
