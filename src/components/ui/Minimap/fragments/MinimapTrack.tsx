'use client';
import React from 'react';
import clsx from 'clsx';
import MinimapContext from '../context/MinimapContext';

type MinimapTrackProps = React.HTMLAttributes<HTMLDivElement>;

const MinimapTrack = ({ children, className = '', ...props }: MinimapTrackProps) => {
    const { rootClass } = React.useContext(MinimapContext);
    return <div className={clsx(`${rootClass}-track`, className)} {...props}>{children}</div>;
};

export default MinimapTrack;
