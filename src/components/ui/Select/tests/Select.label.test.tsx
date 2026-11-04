import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Select from '../Select';

const Fruit = () => (
    <Select.Root defaultValue="apple">
        <Select.Label>Fruit</Select.Label>
        <Select.Trigger><Select.Value /></Select.Trigger>
        <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="pear">Pear</Select.Item>
        </Select.Content>
    </Select.Root>
);

describe('Select.Label', () => {
    test('names the trigger', () => {
        render(<Fruit />);
        expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeInTheDocument();
    });

    test('clicking it focuses the trigger without opening the list', async() => {
        const user = userEvent.setup();
        render(<Fruit />);
        await user.click(screen.getByText('Fruit'));
        expect(screen.getByRole('combobox')).toHaveFocus();
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    test('has no axe violations', async() => {
        const { container } = render(<Fruit />);
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toEqual([]);
    });
});
