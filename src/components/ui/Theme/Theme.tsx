'use client';
import React, { useState, useEffect } from 'react';

type ThemeProps = {
    appearance?: 'light' | 'dark' | 'system';
    accentColor?: string;
    radius?: string;
    scaling?: string;
    children: React.ReactNode;
}

const Theme = ({ appearance = 'light', accentColor = '', radius = '', scaling = '', children, ...props }: ThemeProps) => {
    const [theme, setTheme] = useState(appearance);
    const [themeAccentColor, setThemeAccentColor] = useState(accentColor);
    const [themeRadius, setThemeRadius] = useState(radius);
    const [themeScaling, setThemeScaling] = useState(scaling);

    useEffect(() => {
        if (appearance === 'system') {
            setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        } else {
            setTheme(appearance);
        }
    }, [appearance]);

    useEffect(() => {
        if (accentColor) {
            setThemeAccentColor(accentColor);
        }
    }, [accentColor]);

    useEffect(() => {
        if (radius) {
            setThemeRadius(radius);
        }
    }, [radius]);

    useEffect(() => {
        if (scaling) {
            setThemeScaling(scaling);
        }
    }, [scaling]);

    return <div
        data-rad-ui-theme={theme}
        data-rad-ui-accent-color={themeAccentColor}
        data-rad-ui-radius={themeRadius}
        data-rad-ui-scaling={themeScaling}
        {...props}
    >
        {children}
    </div>;
};

export default Theme;
