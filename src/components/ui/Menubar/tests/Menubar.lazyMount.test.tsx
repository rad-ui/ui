import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menubar from '../Menubar';

describe('Menubar lazy mount', () => {
    test('does not mount menu content until opened', () => {
        render(
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
        );

        expect(screen.queryByTestId('menubar-content')).not.toBeInTheDocument();
        expect(screen.queryByText('New')).not.toBeInTheDocument();
    });

    test('mounts content after trigger opens the menu', async() => {
        const user = userEvent.setup();

        render(
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
        );

        await user.click(screen.getByText('File'));
        expect(screen.getByText('New')).toBeInTheDocument();
    });
});
