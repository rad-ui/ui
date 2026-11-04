import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../Checkbox';

describe('Checkbox keyboard', () => {
    test('Space toggles and Enter does not (WAI-ARIA checkbox pattern)', async() => {
        const user = userEvent.setup();
        const onCheckedChange = jest.fn();
        render(<Checkbox.Root aria-label="Agree" onCheckedChange={onCheckedChange}><Checkbox.Indicator /></Checkbox.Root>);
        const box = screen.getByRole('checkbox', { name: 'Agree' });

        await user.tab();
        expect(box).toHaveFocus();

        await user.keyboard('{Enter}');
        expect(box).toHaveAttribute('aria-checked', 'false');
        expect(onCheckedChange).not.toHaveBeenCalled();

        await user.keyboard(' ');
        expect(box).toHaveAttribute('aria-checked', 'true');
        expect(onCheckedChange).toHaveBeenCalledTimes(1);
    });

    test('a consumer onKeyDown still runs', async() => {
        const user = userEvent.setup();
        const onKeyDown = jest.fn();
        render(<Checkbox.Root aria-label="Agree" onKeyDown={onKeyDown}><Checkbox.Indicator /></Checkbox.Root>);
        await user.tab();
        await user.keyboard('{Enter}');
        expect(onKeyDown).toHaveBeenCalledTimes(1);
    });
});
