import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menubar from '../Menubar';
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

describe('Menubar keyboard paths', () => {
    beforeEach(() => mockMatchMedia());

    test('arrow keys move between triggers and open menus', async() => {
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
                    <Menubar.Menu>
                        <Menubar.Trigger>Edit</Menubar.Trigger>
                        <Menubar.Portal>
                            <Menubar.Content>
                                <Menubar.Item>Cut</Menubar.Item>
                            </Menubar.Content>
                        </Menubar.Portal>
                    </Menubar.Menu>
                </Menubar.Root>
            </Theme>
        );

        const file = screen.getByText('File');
        const edit = screen.getByText('Edit');

        file.focus();
        await user.keyboard('{ArrowRight}');
        expect(edit).toHaveFocus();

        await user.keyboard('{ArrowDown}');
        await waitFor(() => expect(screen.getByText('Cut')).toBeInTheDocument());

        await user.keyboard('{ArrowLeft}');
        expect(file).toHaveFocus();
    });
});
