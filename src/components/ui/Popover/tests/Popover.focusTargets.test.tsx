import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '../Popover';

type Props = Partial<React.ComponentProps<typeof Popover.Content>> & { modal?: boolean };

const Example = ({ modal, ...contentProps }: Props) => {
    const nameRef = React.useRef<HTMLInputElement>(null);
    const afterRef = React.useRef<HTMLButtonElement>(null);
    const resolve = (value: unknown) => (value === 'name' ? nameRef : value === 'after' ? afterRef : value);
    return (
        <>
            <Popover.Root modal={modal}>
                <Popover.Trigger>Edit</Popover.Trigger>
                <Popover.Content
                    {...contentProps}
                    initialFocus={resolve(contentProps.initialFocus) as any}
                    finalFocus={resolve(contentProps.finalFocus) as any}
                >
                    <button>First</button>
                    <input ref={nameRef} aria-label="Name" />
                    <Popover.Close>Done</Popover.Close>
                </Popover.Content>
            </Popover.Root>
            <button ref={afterRef}>After</button>
        </>
    );
};

describe('Popover initialFocus / finalFocus', () => {
    test('initialFocus ref moves focus to that element on open', async() => {
        const user = userEvent.setup();
        render(<Example initialFocus={'name' as any} />);
        await user.click(screen.getByText('Edit'));
        await waitFor(() => expect(screen.getByLabelText('Name')).toHaveFocus());
    });

    test('initialFocus true moves focus into the popover even when not modal', async() => {
        // jsdom has no layout, so the focus manager can't see tabbable children and focuses
        // the popover itself; in a browser this lands on the first button.
        const user = userEvent.setup();
        render(<Example initialFocus />);
        await user.click(screen.getByText('Edit'));
        await waitFor(() => expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true));
    });

    test('initialFocus false keeps focus on the trigger even when modal', async() => {
        const user = userEvent.setup();
        render(<Example modal initialFocus={false} />);
        await user.click(screen.getByText('Edit'));
        await screen.findByText('First');
        expect(screen.getByText('Edit')).toHaveFocus();
    });

    test('finalFocus ref receives focus on close', async() => {
        const user = userEvent.setup();
        render(<Example initialFocus finalFocus={'after' as any} />);
        await user.click(screen.getByText('Edit'));
        await user.click(await screen.findByText('Done'));
        await waitFor(() => expect(screen.getByText('After')).toHaveFocus());
    });

    test('finalFocus function is resolved on close', async() => {
        const user = userEvent.setup();
        const target = jest.fn(() => screen.getByText('After'));
        render(<Example initialFocus finalFocus={target} />);
        await user.click(screen.getByText('Edit'));
        await user.click(await screen.findByText('Done'));
        await waitFor(() => expect(screen.getByText('After')).toHaveFocus());
        expect(target).toHaveBeenCalled();
    });
});
