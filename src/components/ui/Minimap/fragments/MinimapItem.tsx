'use client';
import React from 'react';
import { clsx } from 'clsx';
import MinimapItemContext from '../context/MinimapItemContext';
import MinimapContext from '../context/MinimapContext';
import MinimapProviderContext from '../context/MinimapProviderContext';

import Primitive from '~/core/primitives/Primitive';

type MinimapItemProps = React.HTMLAttributes<HTMLDivElement> & {
    value: string;
};

const MinimapItem = ({ children, className = '', value, ...props }: MinimapItemProps) => {
    const { rootClass } = React.useContext(MinimapContext) || { rootClass: '' };
    const { visibleItems, scrollToItem } = React.useContext(MinimapProviderContext) || { visibleItems: [], scrollToItem: () => { } };
    const isVisible = visibleItems.includes(value);

    const contextValue = React.useMemo(() => ({
        value,
        isVisible
    }), [value, isVisible]);

    const handleClick = React.useCallback(() => {
        scrollToItem(value);
    }, [value, scrollToItem]);

    return <MinimapItemContext.Provider value={contextValue}>
        <Primitive.button
            onClick={handleClick}
            className={clsx(`${rootClass}-item`, className)}
            data-in-view={isVisible ? 'true' : 'false'}
            {...props}>{children}</Primitive.button>
    </MinimapItemContext.Provider>;
};

export default MinimapItem;
