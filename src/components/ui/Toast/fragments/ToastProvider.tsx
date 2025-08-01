'use client'
import React from 'react';

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default ToastProvider;