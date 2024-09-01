'use client';
import React from 'react';

const COMPONENT_NAME = 'Skeleton';
import {customClassSwitcher} from '~/core';


const Skeleton = ({loading=true, className='', customRootClass='', children, ...props}:any) => {
    if (!loading) return children;


    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <span className={`${rootClass} ${className}`} {...props} >
        {children}
    </span>;
};


Skeleton.displayName = COMPONENT_NAME;
export default Skeleton;
