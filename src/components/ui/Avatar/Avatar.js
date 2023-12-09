'use client';
import React from 'react';
import {customClassSwitcher} from '@/core';

const COMPONENT_NAME = 'Avatar';

const TextRenderer = ({rootClass, fallback}) => {
    return (
        <div className={`${rootClass} ${rootClass}-fallback`} >
            {fallback}
        </div>
    );
};

const Avatar = ({children, customRootClass = '', fallback='', className = '', src, alt, ...rest}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    if (!src) {
        return <TextRenderer fallback={fallback} rootClass={rootClass} />;
    }
    return (
        <>
            <img
                src={src}
                alt={alt}
                className={`${rootClass} ${className}`}
                {...rest}
            />
        </>
    );
};

Avatar.displayName = COMPONENT_NAME;

export default Avatar;
