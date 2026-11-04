import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from '../Switch';
import Checkbox from '~/components/ui/Checkbox/Checkbox';
import RadioGroup from '~/components/ui/RadioGroup/RadioGroup';

describe('readOnly Switch and Checkbox', () => {
    test('a read-only Switch stays focusable but does not toggle', async() => {
        const user = userEvent.setup();
        const onCheckedChange = jest.fn();
        render(<Switch.Root aria-label="Wi-Fi" defaultChecked readOnly onCheckedChange={onCheckedChange}><Switch.Thumb /></Switch.Root>);
        const control = screen.getByRole('switch', { name: 'Wi-Fi' });
        expect(control).toHaveAttribute('aria-readonly', 'true');
        expect(control).not.toBeDisabled();
        await user.click(control);
        expect(control).toHaveAttribute('aria-checked', 'true');
        expect(onCheckedChange).not.toHaveBeenCalled();
    });

    test('a read-only Checkbox does not toggle by click or Space', async() => {
        const user = userEvent.setup();
        render(<Checkbox.Root aria-label="Agree" readOnly><Checkbox.Indicator /></Checkbox.Root>);
        const control = screen.getByRole('checkbox', { name: 'Agree' });
        expect(control).toHaveAttribute('aria-readonly', 'true');
        await user.click(control);
        control.focus();
        await user.keyboard(' ');
        expect(control).toHaveAttribute('aria-checked', 'false');
    });

    test('a read-only RadioGroup keeps its selection under clicks and arrow keys', async() => {
        const user = userEvent.setup();
        render(
            <RadioGroup.Root defaultValue="a" readOnly aria-label="Plan">
                <RadioGroup.Item value="a">A</RadioGroup.Item>
                <RadioGroup.Item value="b">B</RadioGroup.Item>
            </RadioGroup.Root>
        );
        const [a, b] = screen.getAllByRole('radio');
        await user.click(b);
        expect(a).toHaveAttribute('aria-checked', 'true');
        a.focus();
        await user.keyboard('{ArrowRight}');
        expect(b).toHaveFocus();
        expect(a).toHaveAttribute('aria-checked', 'true');
        expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-readonly', 'true');
    });
});
