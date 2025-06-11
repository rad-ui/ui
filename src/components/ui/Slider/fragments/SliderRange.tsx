'use client';

import React from 'react';
import { SliderContext } from '../context/SliderContext';

const SliderRange = ({ children }: { children: React.ReactNode }) => {
    const { rootClass, value } = React.useContext(SliderContext);

    return <div className={`${rootClass}-range`} style={{ left: `calc(${value}% - 16px)`, width: `calc(${value}%)` }}>{children}</div>;
};

export default SliderRange;
