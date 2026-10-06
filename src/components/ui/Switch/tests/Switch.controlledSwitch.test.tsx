import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from '../Switch';

describe('Switch controlled/uncontrolled mode switching', () => {
    test('switches from uncontrolled to controlled', async() => {
        const user = userEvent.setup();
        const onCheckedChange = jest.fn();

        const { container, rerender } = render(
            <Switch.Root defaultChecked={false}>
                <Switch.Thumb />
            </Switch.Root>
        );

        const button = container.querySelector('button')!;
        await user.click(button);
        expect(button).toHaveAttribute('data-state', 'checked');

        rerender(
            <Switch.Root checked={false} onCheckedChange={onCheckedChange}>
                <Switch.Thumb />
            </Switch.Root>
        );

        expect(button).toHaveAttribute('data-state', 'unchecked');
        await user.click(button);
        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    test('switches from controlled to uncontrolled', async() => {
        const user = userEvent.setup();

        const { container, rerender } = render(
            <Switch.Root checked onCheckedChange={() => {}}>
                <Switch.Thumb />
            </Switch.Root>
        );

        const button = container.querySelector('button')!;
        expect(button).toHaveAttribute('data-state', 'checked');

        rerender(
            <Switch.Root defaultChecked={false}>
                <Switch.Thumb />
            </Switch.Root>
        );

        expect(button).toHaveAttribute('data-state', 'unchecked');
        await user.click(button);
        expect(button).toHaveAttribute('data-state', 'checked');
    });
});
