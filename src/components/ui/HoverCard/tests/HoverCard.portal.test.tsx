import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HoverCard from '../HoverCard';
import ThemeContext from '../../Theme/ThemeContext';

describe('HoverCard portal', () => {
    test('portals content into Theme portalRootRef when provided', async() => {
        const portalRoot = document.createElement('div');
        document.body.appendChild(portalRoot);

        render(
            <ThemeContext.Provider
                value={{
                    containerRef: { current: null },
                    portalRootRef: { current: portalRoot }
                }}>
                <HoverCard.Root open>
                    <HoverCard.Trigger>Hover me</HoverCard.Trigger>
                    <HoverCard.Portal>
                        <HoverCard.Content>Hover label</HoverCard.Content>
                    </HoverCard.Portal>
                </HoverCard.Root>
            </ThemeContext.Provider>
        );

        await waitFor(() => {
            expect(portalRoot).toContainElement(screen.getByText('Hover label'));
        });

        portalRoot.remove();
    });
});
