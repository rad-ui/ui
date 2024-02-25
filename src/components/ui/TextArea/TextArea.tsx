'use client';
import React from 'react';

import {customClassSwitcher} from '~/core';

export type TextAreaProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
}

const COMPONENT_NAME = 'TextArea';


const TextArea = ({customRootClass='', className='', children}: TextAreaProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <textarea className={`${rootClass} ${className}`}>
        {children}
    </textarea>;
};

export default TextArea;
