import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DropdownMenu from '../DropdownMenu';

const menu = (rootProps: Record<string, unknown>) => (
    <DropdownMenu.Root open {...rootProps}>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
            <DropdownMenu.Content data-testid="content">
                <DropdownMenu.Item label="One">One</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    </DropdownMenu.Root>
);

describe('DropdownMenu side and align', () => {
    test('defaults to bottom, aligned to the start', async() => {
        render(menu({}));
        await waitFor(() => expect(screen.getByTestId('content')).toHaveAttribute('data-side', 'bottom'));
        expect(screen.getByTestId('content')).toHaveAttribute('data-align', 'start');
    });

    test('side and align override placement', async() => {
        render(menu({ placement: 'bottom-start', side: 'bottom', align: 'end', sideOffset: 8 }));
        await waitFor(() => expect(screen.getByTestId('content')).toHaveAttribute('data-align', 'end'));
        expect(screen.getByTestId('content')).toHaveAttribute('data-side', 'bottom');
    });

    test('placement still works on its own', async() => {
        render(menu({ placement: 'bottom' }));
        await waitFor(() => expect(screen.getByTestId('content')).toHaveAttribute('data-align', 'center'));
    });
});
