'use client';
import React from 'react';
import { clsx } from 'clsx';
import MinimapContext from '../context/MinimapContext';
import MinimapItemContext from '../context/MinimapItemContext';

type MinimapBubbleProps = React.HTMLAttributes<HTMLDivElement>;

const MinimapBubble = ({ children, className = '', ...props }: MinimapBubbleProps) => {
    const { rootClass } = React.useContext(MinimapContext) || { rootClass: '' };
    const { isVisible } = React.useContext(MinimapItemContext) || { isVisible: false };
    return <div
        className={clsx(`${rootClass}-bubble`, className)}
        data-in-view={isVisible ? 'true' : 'false'}
        {...props}>{children}</div>;
};

export default MinimapBubble;
