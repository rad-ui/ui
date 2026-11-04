'use client';

import React from 'react';
import { DirectionContext, Direction } from '~/core/hooks/useDirection';

export type DirectionProviderProps = {
    /** Reading direction for every Rad UI component inside. */
    dir: Direction;
    children: React.ReactNode;
};

/**
 * Sets the reading direction for keyboard navigation and positioning in every
 * Rad UI component inside, so RTL apps don't pass `dir` to each one. A
 * component's own `dir` prop still wins. It doesn't render an element: set
 * `dir` on <html> as well so text and CSS follow.
 */
const DirectionProvider = ({ dir, children }: DirectionProviderProps) => (
    <DirectionContext.Provider value={dir}>{children}</DirectionContext.Provider>
);

DirectionProvider.displayName = 'DirectionProvider';

export { useDirection } from '~/core/hooks/useDirection';
export type { Direction } from '~/core/hooks/useDirection';
export default DirectionProvider;
