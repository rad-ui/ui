'use client';
import React, { forwardRef, useState, useEffect, ElementRef, ComponentPropsWithoutRef } from 'react';

type ThemeElement = ElementRef<'div'>;
export type ThemeProps = ComponentPropsWithoutRef<'div'> & {
    appearance?: 'light' | 'dark' | 'system';
    accentColor?: string;
    radius?: string;
    scaling?: string;
};

const Theme = forwardRef<ThemeElement, ThemeProps>(function Theme({
    appearance = 'system',
    id = 'rad-ui-theme-container',
    accentColor = '',
    radius = '',
    scaling = '',
    children,
    ...props
}, ref) {
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

    return (
        <div
            ref={ref}
            id={id}
            data-rad-ui-theme={theme}
            data-rad-ui-accent-color={themeAccentColor}
            data-rad-ui-radius={themeRadius}
            data-rad-ui-scaling={themeScaling}
            {...props}
        >
            {children}
        </div>
    );
});

Theme.displayName = 'Theme';

export default Theme;
