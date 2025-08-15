'use client';
import React, { useState, useEffect } from 'react';

type ThemeProps = {
    appearance?: 'light' | 'dark' | 'system';
    accentColor?: string;
    radius?: string;
    scaling?: string;
    children: React.ReactNode;
    id?: string;
}

const Theme = ({ appearance = 'system', id = 'rad-ui-theme-container', accentColor = '', radius = '', scaling = '', children, ...props }: ThemeProps) => {
    const [theme, setTheme] = useState(appearance);
    const [themeAccentColor, setThemeAccentColor] = useState(accentColor);
    const [themeRadius, setThemeRadius] = useState(radius);
    const [themeScaling, setThemeScaling] = useState(scaling);

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (event: MediaQueryListEvent) => {
            if (appearance === 'system') {
                setTheme(event.matches ? 'dark' : 'light');
            }
        };

        if (appearance === 'system') {
            setTheme(media.matches ? 'dark' : 'light');
            media.addEventListener('change', handler);
        } else {
            setTheme(appearance);
        }

        return () => media.removeEventListener('change', handler);
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
        id={id}
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
