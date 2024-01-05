'use client';
import React from 'react';

interface CodeProps {
    children: React.ReactNode;
}

const Code = ({children}: CodeProps) => {
    return <code className='rui-code-root'>
        {children}
    </code>;
};

export default Code;
