import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';

import Button from '../Button';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';

const Custom = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>((props, ref) => (
    <span ref={ref} {...props} />
));
Custom.displayName = 'Custom';

describe('Button asChild', () => {
    test('asChild anchor forwards role, className, and ref', async () => {
        const ref = React.createRef<HTMLAnchorElement>() as unknown as React.RefObject<HTMLButtonElement>;
        render(
            <Button asChild className="parent" ref={ref}>
                <a className="child">Link</a>
            </Button>
        );
        const anchor = screen.getByRole('button');
        expect(anchor.tagName).toBe('A');
        expect(anchor).toHaveClass('rad-ui-button');
        expect(anchor).toHaveClass('parent');
        expect(anchor).toHaveClass('child');
        expect(ref.current).toBe(anchor);
    });

    test('asChild span forwards role and className', () => {
        render(
            <Button asChild className="parent">
                <span>Text</span>
            </Button>
        );
        const span = screen.getByRole('button');
        expect(span.tagName).toBe('SPAN');
        expect(span).toHaveClass('rad-ui-button');
        expect(span).toHaveClass('parent');
    });

    test('supports custom elements with asChild', () => {
        const ref = React.createRef<HTMLSpanElement>();
        render(
            <Button asChild ref={ref as any}>
                <Custom data-testid="custom" data-test="yes" />
            </Button>
        );
        const custom = screen.getByTestId('custom');
        expect(custom).toHaveAttribute('role', 'button');
        expect(custom).toHaveAttribute('data-test', 'yes');
        expect(ref.current).toBe(custom);
    });

    test('asChild with button avoids nested buttons', () => {
        render(
            <Button asChild>
                <button>Child</button>
            </Button>
        );
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(1);
    });

    test('disabled suppresses clicks and sets data-disabled', async () => {
        const onClick = jest.fn();
        render(
            <Button asChild disabled onClick={onClick}>
                <a>Link</a>
            </Button>
        );
        const anchor = screen.getByRole('button');
        await userEvent.click(anchor);
        expect(onClick).not.toHaveBeenCalled();
        expect(anchor).toHaveAttribute('data-disabled', '');
    });

    test('form submit and reset types work', async () => {
        const handleSubmit = jest.fn((e) => e.preventDefault());
        render(
            <form onSubmit={handleSubmit} data-testid="form">
                <input name="field" defaultValue="value" />
                <Button type="submit">Submit</Button>
                <Button type="reset">Reset</Button>
            </form>
        );
        const form = screen.getByTestId('form') as HTMLFormElement;
        await userEvent.click(screen.getByText('Submit'));
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        const input = form.elements.namedItem('field') as HTMLInputElement;
        input.value = 'changed';
        await userEvent.click(screen.getByText('Reset'));
        expect(input.value).toBe('value');
    });

    test('default type is button and does not submit form', async () => {
        const handleSubmit = jest.fn((e) => e.preventDefault());
        render(
            <form onSubmit={handleSubmit}>
                <Button>Click</Button>
            </form>
        );
        await userEvent.click(screen.getByText('Click'));
        expect(handleSubmit).not.toHaveBeenCalled();
    });

    test('has no axe violations', async () => {
        const { container } = render(
            <Button asChild>
                <a>Accessible</a>
            </Button>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('rtl direction does not affect rendering', () => {
        render(
            <div dir="rtl">
                <Button>RTL</Button>
            </div>
        );
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).not.toHaveAttribute('dir');
    });
});

