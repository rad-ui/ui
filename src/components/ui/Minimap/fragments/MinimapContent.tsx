'use client';
import React from 'react';
import clsx from 'clsx';
import MinimapContext from '../context/MinimapContext';

type MinimapContentProps = React.HTMLAttributes<HTMLDivElement>;

const MinimapContent = ({ children, className = '', ...props }: MinimapContentProps) => {
    const { rootClass } = React.useContext(MinimapContext);
    return <div className={clsx(`${rootClass}-content`, className)} {...props}>{children}</div>;
};

export default MinimapContent;
