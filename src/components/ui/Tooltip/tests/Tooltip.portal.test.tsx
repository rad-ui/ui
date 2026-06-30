import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '../Tooltip';
import ThemeContext from '../../Theme/ThemeContext';

describe('Tooltip portal', () => {
    test('portals content into Theme portalRootRef when provided', async() => {
        const portalRoot = document.createElement('div');
        document.body.appendChild(portalRoot);

        render(
            <ThemeContext.Provider
                value={{
                    containerRef: { current: null },
                    portalRootRef: { current: portalRoot }
                }}>
                <Tooltip.Root>
                    <Tooltip.Trigger>Hover me</Tooltip.Trigger>
                    <Tooltip.Content>Tooltip label</Tooltip.Content>
                </Tooltip.Root>
            </ThemeContext.Provider>
        );

        await userEvent.hover(screen.getByText('Hover me'));
        expect(screen.getByText('Tooltip label')).toBeInTheDocument();
        expect(portalRoot).toContainElement(screen.getByText('Tooltip label'));

        portalRoot.remove();
    });

    test('falls back to Theme containerRef when portalRootRef is unset', async() => {
        const themeContainer = document.createElement('div');
        document.body.appendChild(themeContainer);

        render(
            <ThemeContext.Provider
                value={{
                    containerRef: { current: themeContainer },
                    portalRootRef: { current: null }
                }}>
                <Tooltip.Root>
                    <Tooltip.Trigger>Hover me</Tooltip.Trigger>
                    <Tooltip.Content>Theme container tooltip</Tooltip.Content>
                </Tooltip.Root>
            </ThemeContext.Provider>
        );

        await userEvent.hover(screen.getByText('Hover me'));
        expect(themeContainer).toContainElement(screen.getByText('Theme container tooltip'));

        themeContainer.remove();
    });

    test('uses explicit container prop over Theme context', async() => {
        const explicitContainer = document.createElement('div');
        const portalRoot = document.createElement('div');
        document.body.appendChild(explicitContainer);
        document.body.appendChild(portalRoot);

        render(
            <ThemeContext.Provider
                value={{
                    containerRef: { current: null },
                    portalRootRef: { current: portalRoot }
                }}>
                <Tooltip.Root>
                    <Tooltip.Trigger>Hover me</Tooltip.Trigger>
                    <Tooltip.Content container={explicitContainer}>Custom container</Tooltip.Content>
                </Tooltip.Root>
            </ThemeContext.Provider>
        );

        await userEvent.hover(screen.getByText('Hover me'));
        expect(explicitContainer).toContainElement(screen.getByText('Custom container'));
        expect(portalRoot).not.toContainElement(screen.getByText('Custom container'));

        explicitContainer.remove();
        portalRoot.remove();
    });
});
