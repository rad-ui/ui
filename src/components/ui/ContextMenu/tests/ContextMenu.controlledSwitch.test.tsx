import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContextMenu from '../ContextMenu';

describe('ContextMenu controlled/uncontrolled mode switching', () => {
    test('switches from uncontrolled to controlled', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        const menu = (
            <ContextMenu.Root>
                <ContextMenu.Trigger>Area</ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content>
                        <ContextMenu.Item label="Copy">Copy</ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
        );

        const { rerender } = render(menu);

        await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Area') });
        expect(screen.getByText('Copy')).toBeInTheDocument();

        rerender(
            <ContextMenu.Root open={false} onOpenChange={onOpenChange}>
                <ContextMenu.Trigger>Area</ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content>
                        <ContextMenu.Item label="Copy">Copy</ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
        );

        expect(screen.queryByText('Copy')).not.toBeInTheDocument();
        await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Area') });
        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    test('switches from controlled to uncontrolled', async() => {
        const user = userEvent.setup();

        const { rerender } = render(
            <ContextMenu.Root open onOpenChange={() => {}}>
                <ContextMenu.Trigger>Area</ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content>
                        <ContextMenu.Item label="Copy">Copy</ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
        );

        expect(screen.getByText('Copy')).toBeInTheDocument();

        rerender(
            <ContextMenu.Root defaultOpen={false}>
                <ContextMenu.Trigger>Area</ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content>
                        <ContextMenu.Item label="Copy">Copy</ContextMenu.Item>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
        );

        expect(screen.queryByText('Copy')).not.toBeInTheDocument();
        await user.pointer({ keys: '[MouseRight>]', target: screen.getByText('Area') });
        expect(screen.getByText('Copy')).toBeInTheDocument();
    });
});
