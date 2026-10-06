'use client';
import React from 'react';
import clsx from 'clsx';
import MinimapContext from '../context/MinimapContext';
import MinimapItemContext from '../context/MinimapItemContext';
import MinimapProviderContext from '../context/MinimapProviderContext';

// Rendered as a <span>: Minimap parts live inside the Item <button>, which only allows phrasing content.
export type MinimapLineProps = React.HTMLAttributes<HTMLElement>;

const MinimapLine = React.forwardRef<HTMLElement, MinimapLineProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = React.useContext(MinimapContext) || { rootClass: '' };
    const { value } = React.useContext(MinimapItemContext) || { value: '' };
    const { visibleItems } = React.useContext(MinimapProviderContext);

    // Line should be visible if current item is visible AND there's a next item that's also visible
    const currentIndex = visibleItems.indexOf(value);
    const isCurrentVisible = currentIndex !== -1;
    const hasVisibleItemAfter = currentIndex !== -1 && currentIndex < visibleItems.length - 1;
    const shouldShowLine = isCurrentVisible && hasVisibleItemAfter;

    return <span
        ref={ref}
        className={clsx(rootClass && `${rootClass}-line`, className)}
        data-in-view={shouldShowLine ? 'true' : 'false'} {...props}>{children}</span>;
});

MinimapLine.displayName = 'Minimap.Line';

export default MinimapLine;
