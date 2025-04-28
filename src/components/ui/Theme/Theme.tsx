'use client';
import React, { useState, useEffect } from 'react';

type ThemeProps = {
    appearance?: 'light' | 'dark' | 'system';
    accentColor?: string;
    children: React.ReactNode;
}

const Theme = ({ appearance = 'light', accentColor = '', children, ...props }: ThemeProps) => {
    const [theme, setTheme] = useState(appearance);
    const [themeAccentColor, setThemeAccentColor] = useState(accentColor);

    useEffect(() => {
        if (appearance === 'system') {
            setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        } else {
            setTheme(appearance);
        }
    }, [appearance]);

    return <div data-rad-ui-theme={theme} data-rad-ui-accent-color={themeAccentColor} {...props}>{children}</div>;
};

export default Theme;
