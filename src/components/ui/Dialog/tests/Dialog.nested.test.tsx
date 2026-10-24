import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../Dialog';

const Nested = () => (
    <Dialog.Root>
        <Dialog.Trigger>Settings</Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content data-testid="parent">
                <Dialog.Title>Settings</Dialog.Title>
                <Dialog.Root>
                    <Dialog.Trigger>Delete account</Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Content data-testid="child">
                            <Dialog.Title>Are you sure?</Dialog.Title>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
);

describe('Nested dialogs', () => {
    test('marks the parent while a nested dialog is open, and the child as nested', async() => {
        const user = userEvent.setup();
        render(<Nested />);
        await user.click(screen.getByText('Settings'));
        const parent = screen.getByTestId('parent');
        expect(parent).not.toHaveAttribute('data-nested');
        expect(parent).not.toHaveAttribute('data-nested-dialog-open');

        await user.click(screen.getByText('Delete account'));
        const child = screen.getByTestId('child');
        expect(child).toHaveAttribute('data-nested');
        expect(parent).toHaveAttribute('data-nested-dialog-open');
        expect(parent.style.getPropertyValue('--nested-dialogs')).toBe('1');

        await user.keyboard('{Escape}');
        expect(screen.queryByTestId('child')).not.toBeInTheDocument();
        expect(parent).not.toHaveAttribute('data-nested-dialog-open');
        expect(parent.style.getPropertyValue('--nested-dialogs')).toBe('0');
    });
});
