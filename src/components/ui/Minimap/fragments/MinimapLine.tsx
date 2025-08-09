'use client';
import React from 'react';
import { clsx } from 'clsx';
import MinimapContext from '../context/MinimapContext';
import MinimapItemContext from '../context/MinimapItemContext';

type MinimapLineProps = React.HTMLAttributes<HTMLDivElement>;

const MinimapLine = ({ children, className = '', ...props }: MinimapLineProps) => {
    const { rootClass } = React.useContext(MinimapContext) || { rootClass: '' };
    const { isVisible } = React.useContext(MinimapItemContext) || { isVisible: false };
    return <div
        className={clsx(`${rootClass}-line`, className)}
        data-in-view={isVisible ? 'true' : 'false'} {...props}>{children}</div>;
};

export default MinimapLine;
