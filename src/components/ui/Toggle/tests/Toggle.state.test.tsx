import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';

import Toggle from '../Toggle';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';

// Verify Toggle button updates pressed state, aria-pressed attribute, and data-state, supporting asChild usage.

describe('Toggle state management', () => {
    test('click and space toggle pressed state and attributes', async() => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        const { getByRole } = render(<Toggle onPressedChange={handleChange}>Label</Toggle>);
        const button = getByRole('button');

        expect(button).toHaveAttribute('data-state', 'off');
        expect(button).toHaveAttribute('aria-pressed', 'false');

        await user.click(button);
        expect(handleChange).toHaveBeenLastCalledWith(true);
        expect(button).toHaveAttribute('data-state', 'on');
        expect(button).toHaveAttribute('aria-pressed', 'true');

        button.focus();
        await user.keyboard('[Space]');
        expect(handleChange).toHaveBeenLastCalledWith(false);
        expect(button).toHaveAttribute('data-state', 'off');
        expect(button).toHaveAttribute('aria-pressed', 'false');
    });

    test('controlled pressed prop syncs with onPressedChange', async() => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        const { getByRole, rerender } = render(
            <Toggle pressed={false} onPressedChange={handleChange}>Label</Toggle>
        );
        const button = getByRole('button');

        await user.click(button);
        expect(handleChange).toHaveBeenCalledWith(true);
        // state should remain false until prop changes
        expect(button).toHaveAttribute('aria-pressed', 'false');
        expect(button).toHaveAttribute('data-state', 'off');

        rerender(<Toggle pressed={true} onPressedChange={handleChange}>Label</Toggle>);
        expect(button).toHaveAttribute('aria-pressed', 'true');
        expect(button).toHaveAttribute('data-state', 'on');
    });

    test('disabled prevents interaction', async() => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        const { getByRole } = render(
            <Toggle disabled onPressedChange={handleChange}>Label</Toggle>
        );
        const button = getByRole('button');

        await user.click(button);
        expect(handleChange).not.toHaveBeenCalled();
        expect(button).toHaveAttribute('aria-pressed', 'false');
        expect(button).toHaveAttribute('data-state', 'off');
    });

    test('is accessible and has button role', async() => {
        const { getByRole, container } = render(<Toggle onPressedChange={() => {}}>A11y</Toggle>);
        const button = getByRole('button');
        expect(button).toHaveAttribute('role', 'button');

        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations.length).toBe(0);
        expect(results.incomplete.length).toBe(0);
    });

    test('asChild preserves semantics and forwards refs', async() => {
        const user = userEvent.setup();
        const ref = React.createRef<HTMLDivElement>();
        const { getByRole } = render(
            <Toggle asChild onPressedChange={() => {}}>
                <div ref={ref}>child</div>
            </Toggle>
        );
        const button = getByRole('button');
        expect(ref.current).toBe(button);
        await user.click(button);
        expect(button).toHaveAttribute('aria-pressed', 'true');
        expect(button).toHaveAttribute('data-state', 'on');
    });

    test('handles null pressed prop gracefully', () => {
        const { getByRole } = render(
            <Toggle pressed={null as unknown as boolean} onPressedChange={() => {}}>Null</Toggle>
        );
        const button = getByRole('button');
        expect(button).toHaveAttribute('aria-pressed', 'false');
        expect(button).toHaveAttribute('data-state', 'off');
    });

    test('does not submit form when used inside form', async() => {
        const user = userEvent.setup();
        const handleSubmit = jest.fn((e) => e.preventDefault());
        const { getByRole } = render(
            <form onSubmit={handleSubmit}>
                <Toggle onPressedChange={() => {}}>Submit</Toggle>
            </form>
        );
        await user.click(getByRole('button'));
        expect(handleSubmit).not.toHaveBeenCalled();
    });

    test('works in RTL layouts', async() => {
        const user = userEvent.setup();
        const { getByRole } = render(
            <div dir="rtl">
                <Toggle onPressedChange={() => {}}>RTL</Toggle>
            </div>
        );
        const button = getByRole('button');
        await user.click(button);
        expect(button).toHaveAttribute('aria-pressed', 'true');
        expect(button).toHaveAttribute('data-state', 'on');
    });
});
