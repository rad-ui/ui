import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toggle from '../Toggle';

describe('Toggle controlled/uncontrolled mode switching', () => {
    test('switches from uncontrolled to controlled', async() => {
        const user = userEvent.setup();
        const onPressedChange = jest.fn();

        const { container, rerender } = render(
            <Toggle defaultPressed={false} onPressedChange={() => {}}>Toggle</Toggle>
        );

        const button = container.firstChild as HTMLElement;
        await user.click(button);
        expect(button).toHaveAttribute('aria-pressed', 'true');

        rerender(
            <Toggle pressed={false} onPressedChange={onPressedChange}>
                Toggle
            </Toggle>
        );

        expect(button).toHaveAttribute('aria-pressed', 'false');
        await user.click(button);
        expect(onPressedChange).toHaveBeenCalledWith(true);
    });

    test('switches from controlled to uncontrolled', async() => {
        const user = userEvent.setup();

        const { container, rerender } = render(
            <Toggle pressed onPressedChange={() => {}}>Toggle</Toggle>
        );

        const button = container.firstChild as HTMLElement;
        expect(button).toHaveAttribute('aria-pressed', 'true');

        rerender(
            <Toggle defaultPressed={false} onPressedChange={() => {}}>
                Toggle
            </Toggle>
        );

        expect(button).toHaveAttribute('aria-pressed', 'false');
        await user.click(button);
        expect(button).toHaveAttribute('aria-pressed', 'true');
    });
});
