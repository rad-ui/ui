import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';

import Button from '../Button';

describe('Button', () => {
    test('renders button', () => {
        render(<Button>button</Button>);
        expect(screen.getByText('button')).toBeInTheDocument();
    });

    test('renders button with the given type', () => {
        render(<Button type='submit'>button</Button>);
        const button = screen.getByText('button');
        expect(button).toHaveAttribute('type', 'submit');
    });

    test('renders button with the given color', () => {
        render(<Button color='white'>button</Button>);
        const button = screen.getByText('button');
        expect(button).toHaveAttribute('data-rad-ui-accent-color', 'white');
    });

    test('renders button with the given variant', () => {
        render(<Button variant='outline'>button</Button>);
        const button = screen.getByText('button');
        expect(button).toHaveClass('rad-ui-button');
    });

    test('renders button with the given size', () => {
        render(<Button size='small'>button</Button>);
        const button = screen.getByText('button');
        expect(button).toHaveAttribute('data-button-size', 'small');
    });

    test('calls the onClick handler when the button is clicked', async() => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}>button</Button>);
        const button = screen.getByText('button');
        // click the button
        await userEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('forwards ref to the underlying button element', () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(<Button ref={ref}>button</Button>);
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('passes accessibility attributes to the button', () => {
        render(<Button label='Label' description='Description'>button</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Label');
        expect(button).toHaveAttribute('aria-description', 'Description');
    });

    test('renders without warnings', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(<Button>button</Button>);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(warnSpy).not.toHaveBeenCalled();
        errorSpy.mockRestore();
        warnSpy.mockRestore();
    });

    test('disabled suppresses clicks and sets data-disabled', async() => {
        const onClick = jest.fn();
        render(<Button disabled onClick={onClick}>disabled</Button>);
        const btn = screen.getByRole('button');
        await userEvent.click(btn);
        expect(onClick).not.toHaveBeenCalled();
        expect(btn).toHaveAttribute('data-disabled', '');
    });

    test('form submit and reset work when type is set', async() => {
        const user = userEvent.setup();
        const handleSubmit = jest.fn((e) => e.preventDefault());
        render(
            <>
                <form onSubmit={handleSubmit} data-testid="form">
                    <input name="field" defaultValue="initial" />
                    <Button type="submit">Submit</Button>
                    <Button type="reset">Reset</Button>
                </form>
            </>
        );
        const input = screen.getByDisplayValue('initial');
        await user.type(input, '123');
        expect(input).toHaveValue('initial123');
        await user.click(screen.getByText('Submit'));
        expect(handleSubmit).toHaveBeenCalled();
        await user.click(screen.getByText('Reset'));
        expect(input).toHaveValue('initial');
    });

    test('axe: no violations', async() => {
        const { container } = render(<Button>axe</Button>);
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('works in RTL layouts', async() => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        render(
            <div dir="rtl">
                <Button onClick={onClick}>rtl</Button>
            </div>
        );
        await user.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalled();
    });

    test('defaults type to button when undefined', () => {
        render(<Button type={undefined as unknown as any}>default</Button>);
        expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });
});
