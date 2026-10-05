'use client';
import React from 'react';
import clsx from 'clsx';
import MinimapContext from '../context/MinimapContext';
import MinimapItemContext from '../context/MinimapItemContext';

// Rendered as a <span>: Minimap parts live inside the Item <button>, which only allows phrasing content.
export type MinimapBubbleProps = React.HTMLAttributes<HTMLElement>;

const MinimapBubble = React.forwardRef<HTMLElement, MinimapBubbleProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = React.useContext(MinimapContext) || { rootClass: '' };
    const { isVisible } = React.useContext(MinimapItemContext) || { isVisible: false };
    return <span
        ref={ref}
        className={clsx(rootClass && `${rootClass}-bubble`, className)}
        data-in-view={isVisible ? 'true' : 'false'}
        {...props}>{children}</span>;
});

MinimapBubble.displayName = 'Minimap.Bubble';

export default MinimapBubble;
