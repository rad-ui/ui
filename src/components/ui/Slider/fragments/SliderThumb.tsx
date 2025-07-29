'use client';

import React from 'react';
import { SliderContext } from '../context/SliderContext';

const SliderThumb = ({ children }: { children: React.ReactNode }) => {
    const { rootClass, value } = React.useContext(SliderContext);
    const sliderInputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        sliderInputRef.current?.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };

    return <div className={`${rootClass}-thumb`} onClick={handleClick} style={{ left: `calc(${value}% - 16px)` }}>
        <span className={`${rootClass}-thumb-value`}></span>
        <input onChange={handleChange} value={value} style={{ display: 'none' }} ref={sliderInputRef} />
    </div>;
};

export default SliderThumb;
