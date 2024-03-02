'use client';
import React from 'react';


import TextAreaRoot from './shards/TextAreaRoot';
import TextAreaInput from './shards/TextAreaInput';


export type TextAreaProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
}


const TextArea = ({customRootClass='', className='', children, ...props}: TextAreaProps) => {
    return <TextAreaRoot customRootClass={customRootClass} className={`${className}`}>
        <TextAreaInput placeholder="enter text">
            {children}
        </TextAreaInput>
        {children}
    </TextAreaRoot>;
};

TextArea.Input = TextAreaInput;
TextArea.Root = TextAreaRoot;

export default TextArea;
