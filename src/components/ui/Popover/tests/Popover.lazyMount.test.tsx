import React from 'react';
import { render, screen } from '@testing-library/react';
import Popover from '../Popover';

describe('Popover lazy mount behavior', () => {
    test('does not mount content while closed by default', () => {
        render(
            <Popover.Root>
                <Popover.Trigger>Open</Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content>Hidden popover</Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        );

        expect(screen.getByText('Open')).toBeInTheDocument();
        expect(screen.queryByText('Hidden popover')).not.toBeInTheDocument();
    });

    test('forceMount keeps content mounted while closed', () => {
        render(
            <Popover.Root open={false}>
                <Popover.Trigger>Open</Popover.Trigger>
                <Popover.Portal forceMount>
                    <Popover.Content data-testid="popover-content">Mounted popover</Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        );

        expect(screen.getByTestId('popover-content')).toBeInTheDocument();
        expect(screen.getByTestId('popover-content')).toHaveAttribute('data-state', 'closed');
    });
});
