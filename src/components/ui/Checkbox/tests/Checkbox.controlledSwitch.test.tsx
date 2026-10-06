import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from '../Checkbox';

describe('Checkbox controlled/uncontrolled mode switching', () => {
    test('switches from uncontrolled to controlled', () => {
        const onCheckedChange = jest.fn();
        const { container, rerender } = render(
            <Checkbox.Root defaultChecked={false}>
                <Checkbox.Indicator />
            </Checkbox.Root>
        );

        const button = container.querySelector('button')!;
        fireEvent.click(button!);
        expect(button).toHaveAttribute('aria-checked', 'true');

        rerender(
            <Checkbox.Root checked={false} onCheckedChange={onCheckedChange}>
                <Checkbox.Indicator />
            </Checkbox.Root>
        );

        expect(button).toHaveAttribute('aria-checked', 'false');
        fireEvent.click(button);
        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    test('switches from controlled to uncontrolled', () => {
        const { container, rerender } = render(
            <Checkbox.Root checked onCheckedChange={() => {}}>
                <Checkbox.Indicator />
            </Checkbox.Root>
        );

        const button = container.querySelector('button')!;
        expect(button).toHaveAttribute('aria-checked', 'true');

        rerender(
            <Checkbox.Root defaultChecked={false}>
                <Checkbox.Indicator />
            </Checkbox.Root>
        );

        expect(button).toHaveAttribute('aria-checked', 'false');
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-checked', 'true');
    });
});
