'use client';
import React from 'react';
import { clsx } from 'clsx';
import MinimapItemContext from '../context/MinimapItemContext';
import MinimapContext from '../context/MinimapContext';
import MinimapProviderContext from '../context/MinimapProviderContext';

type MinimapItemProps = React.HTMLAttributes<HTMLDivElement> & {
    value: string;
};

const MinimapItem = ({ children, className = '', value, ...props }: MinimapItemProps) => {
    const { rootClass } = React.useContext(MinimapContext) || { rootClass: '' };
    const { visibleItems } = React.useContext(MinimapProviderContext) || { visibleItems: [] };
    const isVisible = visibleItems.includes(value);

    const contextValue = React.useMemo(() => ({
        value,
        isVisible
    }), [value, isVisible]);

    return <MinimapItemContext.Provider value={contextValue}>
        <div
            className={clsx(`${rootClass}-item`, className)}
            data-in-view={isVisible ? 'true' : 'false'}
            {...props}>{children}</div>
    </MinimapItemContext.Provider>;
};

export default MinimapItem;
