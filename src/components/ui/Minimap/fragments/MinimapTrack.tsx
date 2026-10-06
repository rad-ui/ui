'use client';
import React from 'react';
import clsx from 'clsx';
import MinimapContext from '../context/MinimapContext';

// Rendered as a <span>: Minimap parts live inside the Item <button>, which only allows phrasing content.
export type MinimapTrackProps = React.HTMLAttributes<HTMLElement>;

const MinimapTrack = React.forwardRef<HTMLElement, MinimapTrackProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = React.useContext(MinimapContext);
    return <span ref={ref} className={clsx(rootClass && `${rootClass}-track`, className)} {...props}>{children}</span>;
});

MinimapTrack.displayName = 'Minimap.Track';

export default MinimapTrack;
