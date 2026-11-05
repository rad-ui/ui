import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioGroup from '../RadioGroup';

// The radios are direct children of the radiogroup: no wrapper element to break the root's grid or
// flex layout, and no `group` nested inside the `radiogroup` (rad-ui/ui#2336).
describe('RadioGroup structure', () => {
    const renderGroup = () => render(
        <RadioGroup.Root defaultValue="a" aria-label="Size" className="grid" id="size-group">
            <RadioGroup.Item value="a" aria-label="Small"><RadioGroup.Indicator /></RadioGroup.Item>
            <RadioGroup.Item value="b" aria-label="Large"><RadioGroup.Indicator /></RadioGroup.Item>
        </RadioGroup.Root>
    );

    test('items render directly inside the radiogroup', () => {
        renderGroup();
        const group = screen.getByRole('radiogroup', { name: 'Size' });
        expect(screen.queryByRole('group')).toBeNull();
        for (const radio of screen.getAllByRole('radio')) {
            expect(radio.parentElement).toBe(group);
        }
        expect(group).toHaveClass('grid');
        expect(group).toHaveAttribute('id', 'size-group');
    });

    test('arrow keys still move and select', async() => {
        renderGroup();
        const [small, large] = screen.getAllByRole('radio');
        small.focus();
        await userEvent.keyboard('{ArrowDown}');
        expect(large).toHaveFocus();
        expect(large).toHaveAttribute('aria-checked', 'true');
        await userEvent.keyboard('{ArrowDown}');
        expect(small).toHaveFocus();
    });
});
