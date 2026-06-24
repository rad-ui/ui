import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AlertDialog from '../AlertDialog';

describe('AlertDialog controlled switch', () => {
    const alertDialog = (rootProps: Partial<React.ComponentProps<typeof AlertDialog.Root>>) => (
        <AlertDialog.Root {...rootProps}>
            <AlertDialog.Trigger>Open</AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Title</AlertDialog.Title>
                <AlertDialog.Description>Description</AlertDialog.Description>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );

    test('switches from uncontrolled defaultOpen to controlled open', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        const { rerender } = render(alertDialog({ defaultOpen: true }));

        expect(screen.getByText('Description')).toBeInTheDocument();

        rerender(alertDialog({ open: false, onOpenChange }));

        expect(screen.queryByText('Description')).not.toBeInTheDocument();

        await user.click(screen.getByText('Open'));
        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    test('switches from controlled open to uncontrolled defaultOpen', () => {
        const { rerender } = render(alertDialog({ defaultOpen: true }));

        expect(screen.getByText('Description')).toBeInTheDocument();

        rerender(alertDialog({ open: false }));
        expect(screen.queryByText('Description')).not.toBeInTheDocument();

        rerender(alertDialog({ defaultOpen: true }));
        expect(screen.getByText('Description')).toBeInTheDocument();
    });
});
