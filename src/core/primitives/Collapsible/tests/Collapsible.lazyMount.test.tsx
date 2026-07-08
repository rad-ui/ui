import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

describe('Collapsible lazy mount behavior', () => {
    test('does not mount content while closed by default', () => {
        render(
            <CollapsiblePrimitive.Root open={false}>
                <CollapsiblePrimitive.Trigger>Toggle</CollapsiblePrimitive.Trigger>
                <CollapsiblePrimitive.Content>Hidden panel</CollapsiblePrimitive.Content>
            </CollapsiblePrimitive.Root>
        );

        expect(screen.getByText('Toggle')).toBeInTheDocument();
        expect(screen.queryByText('Hidden panel')).not.toBeInTheDocument();
    });

    test('mounts content after opening and unmounts after closing', async() => {
        const user = userEvent.setup();

        render(
            <CollapsiblePrimitive.Root defaultOpen={false} transitionDuration={0}>
                <CollapsiblePrimitive.Trigger>Toggle</CollapsiblePrimitive.Trigger>
                <CollapsiblePrimitive.Content>Panel</CollapsiblePrimitive.Content>
            </CollapsiblePrimitive.Root>
        );

        expect(screen.queryByText('Panel')).not.toBeInTheDocument();
        await user.click(screen.getByText('Toggle'));
        expect(screen.getByText('Panel')).toBeInTheDocument();
        await user.click(screen.getByText('Toggle'));
        expect(screen.queryByText('Panel')).not.toBeInTheDocument();
    });

    test('forceMount keeps content mounted while closed', () => {
        render(
            <CollapsiblePrimitive.Root open={false}>
                <CollapsiblePrimitive.Trigger>Toggle</CollapsiblePrimitive.Trigger>
                <CollapsiblePrimitive.Content forceMount>Mounted panel</CollapsiblePrimitive.Content>
            </CollapsiblePrimitive.Root>
        );

        expect(screen.getByText('Mounted panel')).toBeInTheDocument();
        expect(screen.getByText('Mounted panel')).toHaveAttribute('data-state', 'closed');
    });
});
