import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '../Popover';

describe('Popover controlled/uncontrolled mode switching', () => {
    test('switches from uncontrolled to controlled', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        const { rerender } = render(
            <Popover.Root>
                <Popover.Trigger>Open</Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content>Popover content</Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        );

        await user.click(screen.getByText('Open'));
        expect(screen.getByText('Popover content')).toBeInTheDocument();

        rerender(
            <Popover.Root open={false} onOpenChange={onOpenChange}>
                <Popover.Trigger>Open</Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content>Popover content</Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        );

        expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
        await user.click(screen.getByText('Open'));
        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    test('switches from controlled to uncontrolled', async() => {
        const user = userEvent.setup();

        const { rerender } = render(
            <Popover.Root open onOpenChange={() => {}}>
                <Popover.Trigger>Open</Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content>Popover content</Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        );

        expect(screen.getByText('Popover content')).toBeInTheDocument();

        rerender(
            <Popover.Root defaultOpen={false}>
                <Popover.Trigger>Open</Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content>Popover content</Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        );

        expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
        await user.click(screen.getByText('Open'));
        expect(screen.getByText('Popover content')).toBeInTheDocument();
    });
});
