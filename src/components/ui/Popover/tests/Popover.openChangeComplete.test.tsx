import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '../Popover';

test('Popover onOpenChangeComplete fires after opening and after closing', async() => {
    const user = userEvent.setup();
    const onOpenChangeComplete = jest.fn();
    render(
        <Popover.Root onOpenChangeComplete={onOpenChangeComplete}>
            <Popover.Trigger>Open</Popover.Trigger>
            <Popover.Content>
                <Popover.Close>Close</Popover.Close>
            </Popover.Content>
        </Popover.Root>
    );
    await user.click(screen.getByText('Open'));
    await waitFor(() => expect(onOpenChangeComplete).toHaveBeenLastCalledWith(true));
    await user.click(screen.getByText('Close'));
    await waitFor(() => expect(onOpenChangeComplete).toHaveBeenLastCalledWith(false));
    expect(onOpenChangeComplete).toHaveBeenCalledTimes(2);
});
