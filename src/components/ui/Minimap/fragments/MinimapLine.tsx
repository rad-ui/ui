'use client';
import React from 'react';
import { clsx } from 'clsx';
import MinimapContext from '../context/MinimapContext';
import MinimapItemContext from '../context/MinimapItemContext';
import MinimapProviderContext from '../context/MinimapProviderContext';

type MinimapLineProps = React.HTMLAttributes<HTMLDivElement>;

const MinimapLine = ({ children, className = '', ...props }: MinimapLineProps) => {
    const { rootClass } = React.useContext(MinimapContext) || { rootClass: '' };
    const { value, isVisible } = React.useContext(MinimapItemContext) || { value: '', isVisible: false };
    const { visibleItems } = React.useContext(MinimapProviderContext) || { visibleItems: [] };

    // Line should be visible if current item is visible AND there's a next item that's also visible
    const currentIndex = visibleItems.indexOf(value);
    const isCurrentVisible = currentIndex !== -1;
    const hasVisibleItemAfter = currentIndex !== -1 && currentIndex < visibleItems.length - 1;
    const shouldShowLine = isCurrentVisible && hasVisibleItemAfter;

    return <div
        className={clsx(`${rootClass}-line`, className)}
        data-in-view={shouldShowLine ? 'true' : 'false'} {...props}>{children}</div>;
};

export default MinimapLine;
