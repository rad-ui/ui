import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DialogPrimitive from '~/core/primitives/Dialog';

describe('Dialog reference props merge', () => {
    test('preserves consumer onClick when opening', async() => {
        const user = userEvent.setup();
        const onClick = jest.fn();

        render(
            <DialogPrimitive.Root>
                <DialogPrimitive.Trigger {...({ onClick } as object)}>Open</DialogPrimitive.Trigger>
                <DialogPrimitive.Content>Dialog body</DialogPrimitive.Content>
            </DialogPrimitive.Root>
        );

        await user.click(screen.getByText('Open'));
        expect(onClick).toHaveBeenCalled();
        expect(screen.getByText('Dialog body')).toBeInTheDocument();
    });
});
