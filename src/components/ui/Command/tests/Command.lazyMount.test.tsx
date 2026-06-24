import React from 'react';
import { render, screen } from '@testing-library/react';
import Command from '../Command';
import Theme from '~/components/ui/Theme/Theme';

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

describe('Command.Dialog lazy mount', () => {
    beforeEach(() => mockMatchMedia());

    test('does not mount dialog content until opened', () => {
        render(
            <Theme>
                <Command.Dialog open={false}>
                    <Command.Input placeholder="Search" data-testid="command-input" />
                    <Command.List>
                        <Command.Item value="copy">Copy</Command.Item>
                    </Command.List>
                </Command.Dialog>
            </Theme>
        );

        expect(screen.queryByTestId('command-input')).not.toBeInTheDocument();
    });

    test('mounts dialog content when open', () => {
        render(
            <Theme>
                <Command.Dialog open>
                    <Command.Input placeholder="Search" data-testid="command-input" />
                    <Command.List>
                        <Command.Item value="copy">Copy</Command.Item>
                    </Command.List>
                </Command.Dialog>
            </Theme>
        );

        expect(screen.getByTestId('command-input')).toBeInTheDocument();
    });
});
