'use client';
import React from 'react';
import { clsx } from 'clsx';
export type CodeProps= {
    children: React.ReactNode;
}

const Code = ({ children }: CodeProps) => {
    return <code className={clsx('rui-code-root')}>
        {children}
    </code>;
};

export default Code;
