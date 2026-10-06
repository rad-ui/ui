import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContextMenu from '../ContextMenu';

describe('ContextMenu lazy mount', () => {
    test('does not mount menu content until opened', () => {
        render(
            <ContextMenu.Root>
                <ContextMenu.Trigger>Target</ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content data-testid="context-menu-content">
                        <ContextMenu.Item>Item</ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
        );

        expect(screen.queryByTestId('context-menu-content')).not.toBeInTheDocument();
    });

    test('mounts content after right-click opens the menu', async() => {
        const user = userEvent.setup();

        render(
            <ContextMenu.Root>
                <ContextMenu.Trigger>Target</ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content>
                        <ContextMenu.Item>Item</ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
        );

        await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Target') });
        expect(screen.getByText('Item')).toBeInTheDocument();
    });
});
