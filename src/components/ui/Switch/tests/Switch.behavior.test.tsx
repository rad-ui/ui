import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';

import Switch from '../Switch';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';

describe('Switch behaviour', () => {
    test('space and enter keys toggle the switch and update data-state', async() => {
        const user = userEvent.setup();
        const { container } = render(
            <Switch.Root>
                <Switch.Thumb />
            </Switch.Root>
        );
        const button = container.querySelector('button')!;
        expect(button).toHaveAttribute('data-state', 'unchecked');

        button.focus();
        await user.keyboard(' ');
        expect(button).toHaveAttribute('data-state', 'checked');

        await user.keyboard('{Enter}');
        expect(button).toHaveAttribute('data-state', 'unchecked');
    });

    test('controlled and uncontrolled checked states stay in sync', async() => {
        const user = userEvent.setup();

        const Controlled = () => {
            const [checked, setChecked] = React.useState(true);
            return (
                <Switch.Root checked={checked} onCheckedChange={setChecked}>
                    <Switch.Thumb />
                </Switch.Root>
            );
        };

        const { rerender, container } = render(<Controlled />);
        let switchEl = container.querySelector('button')!;
        expect(switchEl).toHaveAttribute('data-state', 'checked');
        await user.click(switchEl);
        expect(switchEl).toHaveAttribute('data-state', 'unchecked');

        rerender(
            <Switch.Root defaultChecked>
                <Switch.Thumb />
            </Switch.Root>
        );
        switchEl = container.querySelector('button')!;
        expect(switchEl).toHaveAttribute('data-state', 'checked');
        await user.click(switchEl);
        expect(switchEl).toHaveAttribute('data-state', 'unchecked');
    });

    test('applies form name and value attributes for form participation', () => {
        const { container } = render(
            <Switch.Root name="notify" value="yes" defaultChecked>
                <Switch.Thumb />
            </Switch.Root>
        );
        const button = container.querySelector('button')!;
        expect(button).toHaveAttribute('name', 'notify');
        expect(button).toHaveAttribute('value', 'yes');
        expect(button).toHaveAttribute('data-state', 'checked');
    });

    test('asChild renders custom button preserving semantics and refs', async() => {
        const user = userEvent.setup();
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <Switch.Root asChild ref={ref}>
                <button data-testid="custom-button">
                    <Switch.Thumb />
                </button>
            </Switch.Root>
        );

        const custom = screen.getByTestId('custom-button');
        expect(custom).toHaveAttribute('role', 'switch');
        expect(ref.current).toBe(custom);

        await user.click(custom);
        expect(custom).toHaveAttribute('data-state', 'checked');
    });

    test('no axe violations and proper aria attributes', async() => {
        const { container } = render(
            <Switch.Root>
                <Switch.Thumb />
            </Switch.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations.length).toBe(0);
        const switchEl = screen.getAllByRole('switch')[0] as HTMLButtonElement;
        expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });

    test('rtl direction maintains correct behaviour', async() => {
        const user = userEvent.setup();
        const { container } = render(
            <div dir="rtl">
                <Switch.Root>
                    <Switch.Thumb />
                </Switch.Root>
            </div>
        );
        const button = container.querySelector('button')!;
        expect(button.closest('[dir="rtl"]')).not.toBeNull();
        await user.click(button);
        expect(button).toHaveAttribute('data-state', 'checked');
    });

    test('disabled switch cannot be toggled via mouse or keyboard', async() => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        const { container } = render(
            <Switch.Root disabled onCheckedChange={handleChange}>
                <Switch.Thumb />
            </Switch.Root>
        );
        const button = container.querySelector('button')!;
        await user.click(button);
        expect(button).toHaveAttribute('data-state', 'unchecked');
        button.focus();
        await user.keyboard(' ');
        expect(handleChange).not.toHaveBeenCalled();
    });

    test('rapid toggling updates state correctly', async() => {
        const user = userEvent.setup();
        const { container } = render(
            <Switch.Root>
                <Switch.Thumb />
            </Switch.Root>
        );
        const button = container.querySelector('button')!;
        await user.click(button);
        await user.click(button);
        await user.click(button);
        expect(button).toHaveAttribute('data-state', 'checked');
    });
});
