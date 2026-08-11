import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Theme from '~/components/ui/Theme/Theme';
import Menubar from '../Menubar';

const mockMatchMedia = () => {
    if ('matchMedia' in window && typeof window.matchMedia === 'function') return;
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
        }))
    });
};

describe('Menubar lazy mount', () => {
    beforeEach(() => mockMatchMedia());

    test('does not mount menu content until opened', () => {
        render(
            <Theme>
                <Menubar.Root>
                    <Menubar.Menu>
                        <Menubar.Trigger>File</Menubar.Trigger>
                        <Menubar.Portal>
                            <Menubar.Content data-testid="menubar-content">
                                <Menubar.Item>New</Menubar.Item>
                            </Menubar.Content>
                        </Menubar.Portal>
                    </Menubar.Menu>
                </Menubar.Root>
            </Theme>
        );

        expect(screen.queryByTestId('menubar-content')).not.toBeInTheDocument();
        expect(screen.queryByText('New')).not.toBeInTheDocument();
    });

    test('mounts content after trigger opens the menu', async() => {
        const user = userEvent.setup();

        render(
            <Theme>
                <Menubar.Root>
                    <Menubar.Menu>
                        <Menubar.Trigger>File</Menubar.Trigger>
                        <Menubar.Portal>
                            <Menubar.Content>
                                <Menubar.Item>New</Menubar.Item>
                            </Menubar.Content>
                        </Menubar.Portal>
                    </Menubar.Menu>
                </Menubar.Root>
            </Theme>
        );

        await user.click(screen.getByText('File'));
        expect(screen.getByText('New')).toBeInTheDocument();
    });
});
