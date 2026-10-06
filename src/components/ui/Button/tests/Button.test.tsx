import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
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
        expect(button).toHaveAttribute('data-color', 'white');
    });

    test('renders button with the given variant', () => {
        render(<Button customRootClass="rad-ui" variant='outline'>button</Button>);
        const button = screen.getByText('button');
        expect(button).toHaveClass('rad-ui-button-root');
        expect(button).toHaveAttribute('data-variant', 'outline');
    });

    test('focus-visible styles are declared after variants so focus shadow wins', () => {
        const stylesheet = fs.readFileSync(path.resolve(__dirname, '../button.clarity.scss'), 'utf8');
        expect(stylesheet.lastIndexOf('&:focus-visible')).toBeGreaterThan(stylesheet.lastIndexOf('&[data-variant="ghost"]'));
        expect(stylesheet.lastIndexOf('&:focus-visible')).toBeGreaterThan(stylesheet.lastIndexOf('&[data-variant="outline"]'));
        expect(stylesheet).toContain('box-shadow: var(--rad-ui-focus-ring-shadow-offset-panel), var(--rad-ui-control-shadow-hover);');
    });

    test('renders button with the given size', () => {
        render(<Button size='small'>button</Button>);
        const button = screen.getByText('button');
        expect(button).toHaveAttribute('data-size', 'small');
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

    test('solid variants draw the focus ring outside the fill so it stays visible', () => {
        const stylesheet = fs.readFileSync(path.resolve(__dirname, '../button.clarity.scss'), 'utf8');
        const solidFocus = stylesheet.slice(stylesheet.indexOf('&:not([data-variant]):focus-visible'));
        expect(solidFocus).toContain('&[data-variant="solid"]:focus-visible');
        expect(solidFocus).toContain('&[data-variant="destructive"]:focus-visible');
        expect(solidFocus).toContain('box-shadow: var(--rad-ui-focus-ring-shadow-outset)');
        // Declared after the generic focus rule so it wins at equal or higher specificity.
        expect(stylesheet.lastIndexOf('focus-ring-shadow-outset')).toBeGreaterThan(stylesheet.lastIndexOf('focus-ring-shadow-offset-panel'));
    });

    test('disabled button is not given a redundant aria-description', () => {
        render(<Button disabled>Save</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute('aria-disabled', 'true');
        expect(button).not.toHaveAttribute('aria-description');
    });

    test('an explicit description is still applied when disabled', () => {
        render(<Button disabled description="Saving is unavailable offline">Save</Button>);
        expect(screen.getByRole('button')).toHaveAttribute('aria-description', 'Saving is unavailable offline');
    });

    test('disabled native button does not call onClick or onClickCapture', async() => {
        const onClick = jest.fn();
        const onClickCapture = jest.fn();
        render(<Button disabled onClick={onClick} onClickCapture={onClickCapture}>Save</Button>);
        screen.getByRole('button').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        expect(onClick).not.toHaveBeenCalled();
        expect(onClickCapture).not.toHaveBeenCalled();
    });

    test('enabled button forwards onClickCapture', async() => {
        const onClickCapture = jest.fn();
        render(<Button onClickCapture={onClickCapture}>Save</Button>);
        await userEvent.click(screen.getByRole('button'));
        expect(onClickCapture).toHaveBeenCalledTimes(1);
    });
});
