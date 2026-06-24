import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Combobox from '~/components/ui/Combobox/Combobox';

describe('Combobox floating props merge', () => {
    test('preserves consumer data-testid on content', async() => {
        const user = userEvent.setup();

        render(
            <Combobox.Root>
                <Combobox.Trigger>Choose</Combobox.Trigger>
                <Combobox.Portal>
                    <Combobox.Content data-testid="combobox-content">
                        <Combobox.Group>
                            <Combobox.Item value="apple">Apple</Combobox.Item>
                        </Combobox.Group>
                    </Combobox.Content>
                </Combobox.Portal>
            </Combobox.Root>
        );

        await user.click(screen.getByText('Choose'));
        expect(screen.getByTestId('combobox-content')).toBeInTheDocument();
    });
});
