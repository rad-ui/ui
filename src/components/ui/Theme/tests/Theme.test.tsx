import React from 'react';
import { render, act } from '@testing-library/react';

import Theme from '../Theme';

describe('Theme', () => {
    const originalMatchMedia = window.matchMedia;

    afterEach(() => {
        window.matchMedia = originalMatchMedia;
    });

    test('updates theme on system preference change and cleans up listeners', () => {
        const listeners: Array<(e: MediaQueryListEvent) => void> = [];
        const mediaQueryList = {
            matches: false,
            addEventListener: jest.fn((_event, listener) => {
                listeners.push(listener);
            }),
            removeEventListener: jest.fn((_event, listener) => {
                const index = listeners.indexOf(listener);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            })
        } as unknown as MediaQueryList;

        window.matchMedia = jest.fn().mockReturnValue(mediaQueryList);

        const { container, unmount } = render(<Theme appearance="system">content</Theme>);
        const themeDiv = container.firstChild as HTMLElement;

        expect(themeDiv).toHaveAttribute('data-rad-ui-theme', 'light');

        const addedListener = listeners[0];
        expect(mediaQueryList.addEventListener).toHaveBeenCalledWith('change', addedListener);

        act(() => {
            addedListener({ matches: true } as MediaQueryListEvent);
        });

        expect(themeDiv).toHaveAttribute('data-rad-ui-theme', 'dark');

        unmount();

        expect(mediaQueryList.removeEventListener).toHaveBeenCalledWith('change', addedListener);
    });
});
