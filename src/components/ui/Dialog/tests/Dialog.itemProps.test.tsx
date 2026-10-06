import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DialogPrimitive from '~/core/primitives/Dialog';

describe('Dialog item props merge', () => {
    // The action part is nested inside Content on purpose. If it sits outside,
    // clicking it also registers as an outside press and the dialog closes via
    // the dismiss layer, which would mask whether the internal close handler ran.
    const dialog = (part: React.ReactNode) => (
        <DialogPrimitive.Root>
            <DialogPrimitive.Trigger>Open</DialogPrimitive.Trigger>
            <DialogPrimitive.Content>
                Dialog body
                {part}
            </DialogPrimitive.Content>
        </DialogPrimitive.Root>
    );

    test('Action runs the consumer onClick and still closes the dialog', async() => {
        const user = userEvent.setup();
        const onClick = jest.fn();

        render(dialog(
            <DialogPrimitive.Action {...({ onClick } as object)}>Confirm</DialogPrimitive.Action>
        ));

        await user.click(screen.getByText('Open'));
        expect(screen.getByText('Dialog body')).toBeInTheDocument();

        await user.click(screen.getByText('Confirm'));

        expect(onClick).toHaveBeenCalled();
        expect(screen.queryByText('Dialog body')).not.toBeInTheDocument();
    });

    test('Cancel runs the consumer onClick and still closes the dialog', async() => {
        const user = userEvent.setup();
        const onClick = jest.fn();

        render(dialog(
            <DialogPrimitive.Cancel {...({ onClick } as object)}>Dismiss</DialogPrimitive.Cancel>
        ));

        await user.click(screen.getByText('Open'));
        expect(screen.getByText('Dialog body')).toBeInTheDocument();

        await user.click(screen.getByText('Dismiss'));

        expect(onClick).toHaveBeenCalled();
        expect(screen.queryByText('Dialog body')).not.toBeInTheDocument();
    });

    test('Action forwards non-handler consumer props', async() => {
        const user = userEvent.setup();

        render(dialog(
            <DialogPrimitive.Action {...({ 'data-testid': 'action' } as object)}>Confirm</DialogPrimitive.Action>
        ));

        await user.click(screen.getByText('Open'));

        const action = screen.getByTestId('action');
        expect(action).toBeInTheDocument();

        await user.click(action);
        expect(screen.queryByText('Dialog body')).not.toBeInTheDocument();
    });

    test('Action closes the dialog when no consumer onClick is supplied', async() => {
        const user = userEvent.setup();

        render(dialog(<DialogPrimitive.Action>Confirm</DialogPrimitive.Action>));

        await user.click(screen.getByText('Open'));
        expect(screen.getByText('Dialog body')).toBeInTheDocument();

        await user.click(screen.getByText('Confirm'));
        expect(screen.queryByText('Dialog body')).not.toBeInTheDocument();
    });
});
