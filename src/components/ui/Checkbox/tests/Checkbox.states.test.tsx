import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';

import Checkbox from '../Checkbox';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';

describe('Checkbox states', () => {
    test('click toggles checked state and data-state attribute', async () => {
        const user = userEvent.setup();
        const { container } = render(
            <Checkbox.Root>
                <Checkbox.Indicator />
            </Checkbox.Root>
        );
        const button = container.querySelector('button')!;
        expect(button).toHaveAttribute('data-state', 'unchecked');
        await user.click(button);
        expect(button).toHaveAttribute('data-state', 'checked');
        await user.click(button);
        expect(button).toHaveAttribute('data-state', 'unchecked');
    });

    test('supports indeterminate state and updates to checked on click', async () => {
        const user = userEvent.setup();
        const { container } = render(
            <Checkbox.Root defaultChecked={'indeterminate' as any}>
                <Checkbox.Indicator />
            </Checkbox.Root>
        );
        const button = container.querySelector('button')!;
        expect(button).toHaveAttribute('data-state', 'indeterminate');
        expect(button).toHaveAttribute('aria-checked', 'mixed');
        await user.click(button);
        expect(button).toHaveAttribute('data-state', 'checked');
    });

    test('controlled checked prop syncs with onCheckedChange and defaultChecked works', async () => {
        const user = userEvent.setup();
        const Controlled = () => {
            const [checked, setChecked] = React.useState<boolean | 'indeterminate' | null>(false);
            return (
                <Checkbox.Root checked={checked} onCheckedChange={setChecked}>
                    <Checkbox.Indicator />
                </Checkbox.Root>
            );
        };
        const { container, rerender } = render(<Controlled />);
        let button = container.querySelector('button')!;
        expect(button).toHaveAttribute('data-state', 'unchecked');
        await user.click(button);
        expect(button).toHaveAttribute('data-state', 'checked');

        rerender(
            <Checkbox.Root defaultChecked>
                <Checkbox.Indicator />
            </Checkbox.Root>
        );
        button = container.querySelector('button')!;
        expect(button).toHaveAttribute('data-state', 'checked');
        await user.click(button);
        expect(button).toHaveAttribute('data-state', 'unchecked');
    });

    test('form submission reflects value and disabled prevents submit/change events', async () => {
        const user = userEvent.setup();
        let submitted: Record<string, FormDataEntryValue> | undefined;
        const handleSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            submitted = Object.fromEntries(Array.from((formData as any).entries()));
        });
        const handleChange = jest.fn();
        const { rerender } = render(
            <form onSubmit={handleSubmit}>
                <Checkbox.Root name="agree" value="yes" onCheckedChange={handleChange}>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                <button type="submit">Submit</button>
            </form>
        );
        const checkbox = screen.getAllByRole('checkbox')[0];
        await user.click(checkbox);
        await user.click(screen.getByText('Submit'));
        expect(handleChange).toHaveBeenCalledWith(true);
        expect(submitted).toEqual({ agree: 'yes' });

        handleChange.mockClear();
        handleSubmit.mockClear();
        submitted = undefined;
        rerender(
            <form onSubmit={handleSubmit}>
                <Checkbox.Root name="agree" value="yes" disabled onCheckedChange={handleChange}>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                <button type="submit">Submit</button>
            </form>
        );
        const disabledCheckbox = screen.getAllByRole('checkbox')[0];
        await user.click(disabledCheckbox);
        await user.click(screen.getByText('Submit'));
        expect(handleChange).not.toHaveBeenCalled();
        expect(submitted).toEqual({});
    });

    test('axe has no violations and checkbox has appropriate aria attributes', async () => {
        const { container } = render(
            <Checkbox.Root>
                <Checkbox.Indicator />
            </Checkbox.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations.length).toBe(0);
        const checkbox = screen.getAllByRole('checkbox')[0];
        expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    test('asChild label preserves semantics and refs', async () => {
        const user = userEvent.setup();
        const ref = React.createRef<HTMLLabelElement>();
        render(
            <Checkbox.Root asChild ref={ref as any}>
                <label data-testid="label">
                    <Checkbox.Indicator />
                    Label
                </label>
            </Checkbox.Root>
        );
        const label = screen.getByTestId('label');
        expect(label).toHaveAttribute('role', 'checkbox');
        expect(ref.current).toBe(label);
        await user.click(label);
        expect(label).toHaveAttribute('data-state', 'checked');
    });

    test('rtl dir works correctly', async () => {
        const user = userEvent.setup();
        const { container } = render(
            <div dir="rtl">
                <Checkbox.Root>
                    <Checkbox.Indicator />
                </Checkbox.Root>
            </div>
        );
        const button = container.querySelector('button')!;
        expect(button.closest('[dir="rtl"]')).not.toBeNull();
        await user.click(button);
        expect(button).toHaveAttribute('data-state', 'checked');
    });

    test('null checked prop results in indeterminate state', () => {
        const { container } = render(
            <Checkbox.Root checked={null as any}>
                <Checkbox.Indicator />
            </Checkbox.Root>
        );
        const button = container.querySelector('button')!;
        expect(button).toHaveAttribute('data-state', 'indeterminate');
        expect(button).toHaveAttribute('aria-checked', 'mixed');
    });
});
