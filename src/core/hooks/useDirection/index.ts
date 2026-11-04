'use client';

import React from 'react';

export type Direction = 'ltr' | 'rtl';

export const DirectionContext = React.createContext<Direction | undefined>(undefined);

/**
 * The reading direction for a component: its own `dir` prop wins, then the
 * nearest DirectionProvider. Undefined when neither is set, so callers pick
 * their own default.
 */
export const useDirection = (dir?: Direction | string): Direction | undefined => {
    const contextDir = React.useContext(DirectionContext);
    if (dir === 'rtl' || dir === 'ltr') return dir;
    return contextDir;
};

export default useDirection;
