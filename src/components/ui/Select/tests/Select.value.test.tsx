import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';

const Picker = (props: Partial<React.ComponentProps<typeof Select.Root>>) => (
    <Select.Root {...props}>
        <Select.Trigger aria-label="Move">
            <span data-testid="prefix">⚑</span>
            <Select.Value placeholder="Pick a move" />
            <Select.Icon />
        </Select.Trigger>
        <Select.Content>
            <Select.Item value="auto">Auto (whip-l)</Select.Item>
            <Select.Item value="kick">Kick</Select.Item>
        </Select.Content>
    </Select.Root>
);

describe('Select.Value and Select.Icon', () => {
    test('shows the placeholder, then the label, and keeps the trigger children', async() => {
        const user = userEvent.setup();
        render(<Picker />);
        const trigger = screen.getByRole('combobox', { name: 'Move' });
        expect(trigger).toHaveTextContent('Pick a move');
        expect(screen.getByText('Pick a move')).toHaveAttribute('data-placeholder');

        await user.click(trigger);
        await user.click(screen.getByRole('option', { name: 'Kick' }));
        expect(trigger).toHaveTextContent('Kick');
        expect(screen.getByTestId('prefix')).toBeInTheDocument();
        expect(trigger.querySelector('[data-slot="select-icon"]')).toHaveAttribute('aria-hidden', 'true');
    });

    test('a render function customizes the label', () => {
        render(
            <Select.Root defaultValue="auto">
                <Select.Trigger aria-label="Move">
                    <Select.Value>{(_value, label) => label.replace(/.*\((.*)\)/, '$1')}</Select.Value>
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="auto">Auto (whip-l)</Select.Item>
                </Select.Content>
            </Select.Root>
        );
        expect(screen.getByRole('combobox', { name: 'Move' })).toHaveTextContent('whip-l');
    });

    test('without a Value part the trigger behaves as before', () => {
        render(
            <Select.Root defaultValue="kick">
                <Select.Trigger>Pick</Select.Trigger>
                <Select.Content>
                    <Select.Item value="kick">Kick</Select.Item>
                </Select.Content>
            </Select.Root>
        );
        expect(screen.getByRole('combobox')).toHaveTextContent('Kick');
        expect(screen.getByRole('combobox')).not.toHaveTextContent('Pick');
    });
});
