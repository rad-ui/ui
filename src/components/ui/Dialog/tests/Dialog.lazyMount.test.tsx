import React from 'react';
import { render, screen } from '@testing-library/react';
import Dialog from '../Dialog';
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

describe('Dialog lazy mount behavior', () => {
    beforeEach(() => mockMatchMedia());

    test('does not mount content while closed by default', () => {
        render(
            <Theme>
                <Dialog.Root open={false}>
                    <Dialog.Trigger>Open</Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Content>Hidden dialog</Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </Theme>
        );

        expect(screen.getByText('Open')).toBeInTheDocument();
        expect(screen.queryByText('Hidden dialog')).not.toBeInTheDocument();
    });

    test('forceMount keeps content mounted while closed', () => {
        render(
            <Theme>
                <Dialog.Root open={false}>
                    <Dialog.Trigger>Open</Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Content forceMount>Mounted dialog</Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </Theme>
        );

        expect(screen.getByText('Mounted dialog')).toBeInTheDocument();
        expect(screen.getByText('Mounted dialog')).toHaveAttribute('data-state', 'closed');
    });
});
