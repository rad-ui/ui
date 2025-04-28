'use client';
import React, { useState, useEffect } from 'react';

type ThemeProps = {
    appearance?: 'light' | 'dark' | 'system';
    children: React.ReactNode;
}

const Theme = ({ appearance = 'light', children, ...props }: ThemeProps) => {
    const [theme, setTheme] = useState(appearance);
    useEffect(() => {
        if (appearance === 'system') {
            setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
    }, [appearance]);
    return <div data-rad-ui-theme={theme} {...props}>{children}</div>;
};

export default Theme;
