import React from 'react';
import { render, screen } from '@testing-library/react';
import CheckboxGroup from '../CheckboxGroup';
import RadioGroup from '../../RadioGroup/RadioGroup';

// With one item wrapped in its Label, the group's role and id used to merge onto
// that <label>, and the control lost its accessible name.
describe('groups with a single labelled item', () => {
    test('CheckboxGroup: the label still names its checkbox', () => {
        render(
            <CheckboxGroup.Root name="fruits">
                <CheckboxGroup.Label>
                    <CheckboxGroup.Trigger value="apple"><CheckboxGroup.Indicator /></CheckboxGroup.Trigger>
                    Apple
                </CheckboxGroup.Label>
            </CheckboxGroup.Root>
        );
        expect(screen.getByRole('checkbox', { name: 'Apple' })).toBeInTheDocument();
        expect(screen.getByText('Apple').closest('label')).not.toHaveAttribute('role');
    });

    test('RadioGroup: the label still names its radio', () => {
        render(
            <RadioGroup.Root aria-label="Size" name="size">
                <RadioGroup.Label>
                    <RadioGroup.Item value="s"><RadioGroup.Indicator /></RadioGroup.Item>
                    Small
                </RadioGroup.Label>
            </RadioGroup.Root>
        );
        expect(screen.getByRole('radio', { name: 'Small' })).toBeInTheDocument();
        expect(screen.getByText('Small').closest('label')).not.toHaveAttribute('role');
    });
});
