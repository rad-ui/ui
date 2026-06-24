import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Collapsible from '../Collapsible';

describe('Collapsible controlled switch', () => {
    const collapsible = (rootProps: Partial<React.ComponentProps<typeof Collapsible.Root>>) => (
        <Collapsible.Root {...rootProps}>
            <Collapsible.Trigger>Toggle</Collapsible.Trigger>
            <Collapsible.Content>Panel</Collapsible.Content>
        </Collapsible.Root>
    );

    test('switches from uncontrolled defaultOpen to controlled open', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        const { rerender } = render(collapsible({ defaultOpen: true }));

        expect(screen.getByText('Panel')).toBeVisible();

        rerender(collapsible({ open: false, onOpenChange }));

        expect(screen.queryByText('Panel')).not.toBeInTheDocument();

        await user.click(screen.getByText('Toggle'));
        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    test('switches from controlled open to uncontrolled defaultOpen', () => {
        const { rerender } = render(collapsible({ defaultOpen: true }));

        expect(screen.getByText('Panel')).toBeVisible();

        rerender(collapsible({ open: false }));
        expect(screen.queryByText('Panel')).not.toBeInTheDocument();

        rerender(collapsible({ defaultOpen: true }));
        expect(screen.getByText('Panel')).toBeVisible();
    });
});
