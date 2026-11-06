import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../Dialog';
import AlertDialog from '~/components/ui/AlertDialog/AlertDialog';
import Popover from '~/components/ui/Popover/Popover';
import Tooltip from '~/components/ui/Tooltip/Tooltip';

// State-only Roots render no element, so they don't change the layout of a flex row, a gap or a
// space-y stack around them. Given a ref, className, style or other attribute, they render a wrapper
// <div> as before.

type RootCase = {
    name: string;
    renderRoot: (rootProps: Record<string, unknown>) => React.ReactElement;
};

const cases: RootCase[] = [
    {
        name: 'Dialog',
        renderRoot: (rootProps) => (
            <Dialog.Root {...rootProps}>
                <Dialog.Trigger>Open</Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay />
                    <Dialog.Content>
                        <Dialog.Title>Title</Dialog.Title>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        )
    },
    {
        name: 'AlertDialog',
        renderRoot: (rootProps) => (
            <AlertDialog.Root {...rootProps}>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay />
                    <AlertDialog.Content>
                        <AlertDialog.Title>Title</AlertDialog.Title>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        )
    },
    {
        name: 'Popover',
        renderRoot: (rootProps) => (
            <Popover.Root {...rootProps}>
                <Popover.Trigger>Open</Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content>Body</Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        )
    },
    {
        name: 'Tooltip',
        renderRoot: (rootProps) => (
            <Tooltip.Root {...rootProps}>
                <Tooltip.Trigger>Open</Tooltip.Trigger>
                <Tooltip.Content>Tip</Tooltip.Content>
            </Tooltip.Root>
        )
    }
];

describe.each(cases)('$name.Root host element', ({ renderRoot }) => {
    test('renders no element of its own, so the trigger is a direct child of the parent', () => {
        render(<div data-testid="row" style={{ display: 'flex', gap: 8 }}>{renderRoot({})}</div>);
        const row = screen.getByTestId('row');
        const trigger = screen.getByRole('button', { name: 'Open' });
        expect(trigger.parentElement).toBe(row);
        expect(row.children).toHaveLength(1);
    });

    test('renders a wrapper div when given a className, keeping it and the trigger inside', () => {
        render(<div data-testid="row">{renderRoot({ className: 'my-root' })}</div>);
        const wrapper = screen.getByTestId('row').firstElementChild as HTMLElement;
        expect(wrapper.tagName).toBe('DIV');
        expect(wrapper).toHaveClass('my-root');
        expect(wrapper).toContainElement(screen.getByRole('button', { name: 'Open' }));
    });

    test('renders a wrapper div when given a ref or another attribute', () => {
        const ref = React.createRef<HTMLDivElement>();
        const { unmount } = render(<div>{renderRoot({ ref })}</div>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        unmount();

        render(<div data-testid="row">{renderRoot({ id: 'root-id' })}</div>);
        expect(screen.getByTestId('row').firstElementChild).toHaveAttribute('id', 'root-id');
    });
});

test('a Dialog without a wrapper still opens and closes', async() => {
    const user = userEvent.setup();
    render(
        <Dialog.Root>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                    <Dialog.Title>Title</Dialog.Title>
                    <Dialog.Close>Close</Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
