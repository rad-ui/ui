'use client'

import React from 'react';

import Primitive from '~/core/primitives/Primitive';

const ToastRoot = ({ children, className, asChild }: { children: React.ReactNode, className: string, asChild: boolean }) => {
    return <Primitive.div className={className}>{children}</Primitive.div>;
};

export default ToastRoot;