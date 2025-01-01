import clsx from 'clsx';
import React, { useContext } from 'react';
import { CollapsibleContext } from '../contexts/CollapsibleContext';

type CollapsibleHeaderProps = {
    children?: React.ReactNode
    className?: string,
    title?: string
}

const CollapsibleHeader = ({ children, className = '', title = '' }: CollapsibleHeaderProps) => {
    const { rootClass } = useContext(CollapsibleContext);
    return (
        <div className={clsx(`${rootClass}-header`, className)}>{title && <p>{title}</p>}{children}</div>
    );
};

export default CollapsibleHeader;
