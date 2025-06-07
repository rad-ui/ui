'use client';

import React from 'react';
import { SliderContext } from '../context/SliderContext';

const SliderTrack = ({ children }: { children: React.ReactNode }) => {
    const { rootClass, setValue } = React.useContext(SliderContext);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        // Get the bounding rectangle of the track element
        const rect = e.currentTarget.getBoundingClientRect();
        // Calculate the relative X position within the element
        const relativeX = e.clientX - rect.left;
        // Get percentage of the click (clamped between 0 and 100)
        const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));

        setValue(percentage);
    };

    return <div className={`${rootClass}-track`} onClick={handleClick}>{children}</div>;
};

export default SliderTrack;
