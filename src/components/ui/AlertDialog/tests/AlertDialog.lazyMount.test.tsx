import React from 'react';
import { render, screen } from '@testing-library/react';
import Theme from '~/components/ui/Theme/Theme';
import AlertDialog from '../AlertDialog';

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

describe('AlertDialog lazy mount', () => {
    beforeEach(() => mockMatchMedia());

    test('does not mount dialog content until opened', () => {
        render(
            <Theme>
                <AlertDialog.Root>
                    <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Content data-testid="alert-content">
                            <AlertDialog.Title>Title</AlertDialog.Title>
                            <AlertDialog.Description>Description</AlertDialog.Description>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            </Theme>
        );

        expect(screen.queryByTestId('alert-content')).not.toBeInTheDocument();
    });

    test('mounts content when open', () => {
        render(
            <Theme>
                <AlertDialog.Root open>
                    <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Title>Title</AlertDialog.Title>
                            <AlertDialog.Description>Description</AlertDialog.Description>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            </Theme>
        );

        expect(screen.getByText('Description')).toBeInTheDocument();
    });
});
