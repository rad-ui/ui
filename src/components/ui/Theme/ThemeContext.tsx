'use client';

import React from 'react';

export type ThemeContextValue = {
    containerRef: React.MutableRefObject<HTMLDivElement | null>;
    portalRootRef: React.MutableRefObject<HTMLDivElement | null>;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export default ThemeContext;
