'use client';

import React from 'react';
import { SliderContext } from '../context/SliderContext';

const SliderTrack = ({ children }: { children: React.ReactNode }) => {
    const { rootClass, setValue } = React.useContext(SliderContext);

    return <div className={`${rootClass}-track`}>{children}</div>;
};

export default SliderTrack;
