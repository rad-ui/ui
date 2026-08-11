import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContextMenu from '../ContextMenu';

describe('ContextMenu controlled switch', () => {
    const menu = (rootProps: Partial<React.ComponentProps<typeof ContextMenu.Root>>) => (
        <ContextMenu.Root {...rootProps}>
            <ContextMenu.Trigger>Area</ContextMenu.Trigger>
            <ContextMenu.Portal>
                <ContextMenu.Content>
                    <ContextMenu.Item label="Copy">Copy</ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    );

    test('switches from uncontrolled defaultOpen to controlled open', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        const { rerender } = render(menu({ defaultOpen: true }));

        expect(screen.getByText('Copy')).toBeInTheDocument();

        rerender(menu({ open: false, onOpenChange }));

        expect(screen.queryByText('Copy')).not.toBeInTheDocument();

        await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Area') });
        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    test('switches from controlled open to uncontrolled defaultOpen', () => {
        const { rerender } = render(menu({ defaultOpen: true }));

        expect(screen.getByText('Copy')).toBeInTheDocument();

        rerender(menu({ open: false }));
        expect(screen.queryByText('Copy')).not.toBeInTheDocument();

        rerender(menu({ defaultOpen: true }));
        expect(screen.getByText('Copy')).toBeInTheDocument();
    });
});
