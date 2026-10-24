import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Select from '../Select';
import Combobox from '~/components/ui/Combobox/Combobox';

describe('Select and Combobox group labels and separators', () => {
    test('a GroupLabel names its group and a Separator stays out of the accessibility tree', async() => {
        const user = userEvent.setup();
        render(
            <Select.Root>
                <Select.Trigger>Pick a food</Select.Trigger>
                <Select.Content>
                    <Select.Group>
                        <Select.GroupLabel>Fruit</Select.GroupLabel>
                        <Select.Item value="apple">Apple</Select.Item>
                    </Select.Group>
                    <Select.Separator />
                    <Select.Group>
                        <Select.GroupLabel>Vegetables</Select.GroupLabel>
                        <Select.Item value="kale">Kale</Select.Item>
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        );
        await user.click(screen.getByRole('combobox'));
        expect(screen.getByRole('group', { name: 'Fruit' })).toContainElement(screen.getByRole('option', { name: 'Apple' }));
        expect(screen.getByRole('group', { name: 'Vegetables' })).toBeInTheDocument();
        expect(document.querySelector('[data-slot="select-separator"]')).toHaveAttribute('aria-hidden', 'true');

        const results = await axe.run(document.body, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('Combobox groups get labels too', async() => {
        const user = userEvent.setup();
        render(
            <Combobox.Root>
                <Combobox.Trigger>Pick</Combobox.Trigger>
                <Combobox.Content>
                    <Combobox.Group>
                        <Combobox.GroupLabel>Languages</Combobox.GroupLabel>
                        <Combobox.Item value="go">Go</Combobox.Item>
                    </Combobox.Group>
                </Combobox.Content>
            </Combobox.Root>
        );
        await user.click(screen.getByRole('combobox'));
        expect(screen.getByRole('group', { name: 'Languages' })).toBeInTheDocument();
    });
});
