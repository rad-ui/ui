'use client';
import React, { forwardRef, useState, useEffect, ElementRef, ComponentPropsWithoutRef, useRef, useCallback } from 'react';
import ThemeContext from './ThemeContext';

type ThemeElement = ElementRef<'div'>;
export type ThemeProps = ComponentPropsWithoutRef<'div'> & {
    appearance?: 'light' | 'dark' | 'system';
    accentColor?: string;
    radius?: string;
    scaling?: string;
};

const assignRef = <T,>(ref: React.ForwardedRef<T>, value: T) => {
    if (typeof ref === 'function') {
        ref(value);
        return;
    }

    if (ref) {
        (ref as React.MutableRefObject<T>).current = value;
    }
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
    const containerRef = useRef<HTMLDivElement | null>(null);
    const portalRootRef = useRef<HTMLDivElement | null>(null);
    const [theme, setTheme] = useState(appearance);
    const [themeAccentColor, setThemeAccentColor] = useState(accentColor);
    const [themeRadius, setThemeRadius] = useState(radius);
    const [themeScaling, setThemeScaling] = useState(scaling);

    const setRefs = useCallback((node: HTMLDivElement | null) => {
        containerRef.current = node;
        assignRef(ref, node);
    }, [ref]);

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
        <ThemeContext.Provider value={{ containerRef, portalRootRef }}>
            <div
                ref={setRefs}
                id={id}
                data-rad-ui-theme={theme}
                data-rad-ui-accent-color={themeAccentColor}
                data-rad-ui-radius={themeRadius}
                data-rad-ui-scaling={themeScaling}
                {...props}
            >
                {children}
                <div
                    ref={portalRootRef}
                    data-rad-ui-portal-root=""
                />
            </div>
        </ThemeContext.Provider>
    );
});

Theme.displayName = 'Theme';

export default Theme;
