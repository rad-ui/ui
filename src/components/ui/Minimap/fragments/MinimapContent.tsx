'use client';
import React from 'react';
import clsx from 'clsx';
import MinimapContext from '../context/MinimapContext';

// Rendered as a <span>: Minimap parts live inside the Item <button>, which only allows phrasing content.
export type MinimapContentProps = React.HTMLAttributes<HTMLElement>;

const MinimapContent = React.forwardRef<HTMLElement, MinimapContentProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = React.useContext(MinimapContext);
    return <span ref={ref} className={clsx(rootClass && `${rootClass}-content`, className)} {...props}>{children}</span>;
});

MinimapContent.displayName = 'Minimap.Content';

export default MinimapContent;
