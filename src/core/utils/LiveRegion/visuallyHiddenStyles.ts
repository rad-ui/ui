import { CSSProperties } from 'react';

/**
 * Shared visually-hidden styles (same contract as VisuallyHidden).
 * Keeps live region content available to assistive tech without affecting layout.
 */
export const VISUALLY_HIDDEN_STYLES: CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1px',
    border: '0',
    padding: '0',
    whiteSpace: 'nowrap',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    overflow: 'hidden',
    pointerEvents: 'none',
    userSelect: 'none'
} as const;
