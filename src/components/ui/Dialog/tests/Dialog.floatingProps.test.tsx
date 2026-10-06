import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DialogPrimitive from '~/core/primitives/Dialog';

describe('Dialog floating props merge', () => {
    test('preserves consumer onKeyDown on content', async() => {
        const user = userEvent.setup();
        const onKeyDown = jest.fn();

        render(
            <DialogPrimitive.Root open>
                <DialogPrimitive.Trigger>Open</DialogPrimitive.Trigger>
                <DialogPrimitive.Content onKeyDown={onKeyDown} data-testid="content">
                    Dialog body
                </DialogPrimitive.Content>
            </DialogPrimitive.Root>
        );

        const content = screen.getByTestId('content');
        content.focus();
        await user.keyboard('{Escape}');
        expect(onKeyDown).toHaveBeenCalled();
    });
});
