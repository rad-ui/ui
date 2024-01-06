'use client';
import React from 'react';

interface TextAreaProps {
    children: React.ReactNode;
}

const TextArea = ({children}: TextAreaProps) => {
    return <textarea>
        {children}
    </textarea>;
};

export default TextArea;
