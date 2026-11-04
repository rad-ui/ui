import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Autocomplete from '../Autocomplete';

describe('Autocomplete accessibility', () => {
    test('has no axe violations while open', async() => {
        const user = userEvent.setup();
        render(
            <Autocomplete.Root>
                <Autocomplete.Input aria-label="Fruit" />
                <Autocomplete.Content>
                    <Autocomplete.Item value="Apple">Apple</Autocomplete.Item>
                    <Autocomplete.Item value="Apricot">Apricot</Autocomplete.Item>
                </Autocomplete.Content>
            </Autocomplete.Root>
        );
        await user.type(screen.getByRole('combobox'), 'ap');
        const results = await axe.run(document.body, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
