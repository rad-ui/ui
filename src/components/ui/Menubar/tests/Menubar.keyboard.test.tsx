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

    test('does not react to arrow keys while menus are closed', async() => {
        const user = userEvent.setup();

        render(
            <Theme>
                <button>Before menubar</button>
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

        const before = screen.getByText('Before menubar');
        const edit = screen.getByText('Edit');

        before.focus();
        await user.keyboard('{ArrowRight}');

        expect(before).toHaveFocus();
        expect(edit).not.toHaveFocus();
    });

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

    test('returns focus to the trigger after selecting an item', async() => {
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

        const trigger = screen.getByText('File');
        await user.click(trigger);
        await user.click(screen.getByText('New'));

        await waitFor(() => expect(trigger).toHaveFocus());
        expect(screen.queryByText('New')).not.toBeInTheDocument();
    });
});
