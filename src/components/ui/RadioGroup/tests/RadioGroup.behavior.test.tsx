import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import RadioGroup from '../RadioGroup';

const ACCESSIBILITY_TEST_TAGS = ['wcag2a', 'wcag2aa'];

describe('RadioGroup behavior', () => {
    test('arrow keys move focus/selection and Home/End jump to first/last', async() => {
        render(
            <RadioGroup.Root>
                <RadioGroup.Item value="one" data-testid="one">one</RadioGroup.Item>
                <RadioGroup.Item value="two" data-testid="two">two</RadioGroup.Item>
                <RadioGroup.Item value="three" data-testid="three">three</RadioGroup.Item>
            </RadioGroup.Root>
        );
        const user = userEvent.setup();
        const one = screen.getByTestId('one');
        const two = screen.getByTestId('two');
        const three = screen.getByTestId('three');

        await user.tab();
        expect(one).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(two).toHaveFocus();
        expect(two).toHaveAttribute('aria-checked', 'true');

        await user.keyboard('{End}');
        expect(three).toHaveFocus();
        expect(three).toHaveAttribute('aria-checked', 'true');

        await user.keyboard('{Home}');
        expect(one).toHaveFocus();
        expect(one).toHaveAttribute('aria-checked', 'true');
    });

    test('controlled value syncs with onValueChange', async() => {
        const onValueChange = jest.fn();

        const Controlled = () => {
            const [value, setValue] = React.useState('one');
            return (
                <RadioGroup.Root
                    value={value}
                    onValueChange={(nextValue) => {
                        onValueChange(nextValue);
                        setValue(nextValue);
                    }}
                >
                    <RadioGroup.Item value="one" data-testid="c-one">one</RadioGroup.Item>
                    <RadioGroup.Item value="two" data-testid="c-two">two</RadioGroup.Item>
                    <RadioGroup.Item value="three" data-testid="c-three">three</RadioGroup.Item>
                </RadioGroup.Root>
            );
        };

        render(<Controlled />);
        const user = userEvent.setup();

        await user.tab();
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{ArrowRight}');

        expect(onValueChange).toHaveBeenCalledWith('two');
        expect(onValueChange).toHaveBeenCalledWith('three');
        expect(screen.getByTestId('c-three')).toHaveAttribute('aria-checked', 'true');
    });

    test('defaultValue is selected when provided', () => {
        render(
            <RadioGroup.Root defaultValue="two">
                <RadioGroup.Item value="one" data-testid="u-one">one</RadioGroup.Item>
                <RadioGroup.Item value="two" data-testid="u-two">two</RadioGroup.Item>
            </RadioGroup.Root>
        );

        expect(screen.getByTestId('u-one')).toHaveAttribute('aria-checked', 'false');
        expect(screen.getByTestId('u-two')).toHaveAttribute('aria-checked', 'true');
    });

    test('with no default selection, initial radios are unchecked and form submit starts empty', async() => {
        let submitted: FormData | undefined;
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            submitted = new FormData(e.target as HTMLFormElement);
        };

        render(
            <form onSubmit={handleSubmit}>
                <RadioGroup.Root name="empty-rg">
                    <RadioGroup.Item value="one" data-testid="nd-one">one</RadioGroup.Item>
                    <RadioGroup.Item value="two" data-testid="nd-two">two</RadioGroup.Item>
                </RadioGroup.Root>
                <button type="submit">submit empty</button>
            </form>
        );

        expect(screen.getByTestId('nd-one')).toHaveAttribute('aria-checked', 'false');
        expect(screen.getByTestId('nd-two')).toHaveAttribute('aria-checked', 'false');

        const user = userEvent.setup();
        await user.click(screen.getByText('submit empty'));

        expect(submitted?.get('empty-rg')).toBe('');
    });

    test('form submission includes selected value and disabled radios skip focus', async() => {
        let submitted: FormData | undefined;
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            submitted = new FormData(e.target as HTMLFormElement);
        };
        render(
            <form onSubmit={handleSubmit}>
                <RadioGroup.Root name="rg">
                    <RadioGroup.Item value="one" data-testid="f-one">one</RadioGroup.Item>
                    <RadioGroup.Item value="two" disabled data-testid="f-two">two</RadioGroup.Item>
                    <RadioGroup.Item value="three" data-testid="f-three">three</RadioGroup.Item>
                </RadioGroup.Root>
                <button type="submit">submit</button>
            </form>
        );
        const user = userEvent.setup();

        await user.tab();
        await user.keyboard('{ArrowRight}');

        const disabled = screen.getByTestId('f-two');
        const three = screen.getByTestId('f-three');
        expect(disabled).toHaveAttribute('aria-disabled', 'true');
        expect(three).toHaveFocus();

        await user.click(screen.getByText('submit'));
        expect(submitted?.get('rg')).toBe('three');
    });

    test('nested groups keep keyboard focus navigation scoped to the active group', async() => {
        render(
            <div>
                <RadioGroup.Root data-testid="outer-group" defaultValue="outer-1">
                    <RadioGroup.Item value="outer-1" data-testid="outer-1">outer 1</RadioGroup.Item>
                    <RadioGroup.Item value="outer-2" data-testid="outer-2">outer 2</RadioGroup.Item>
                </RadioGroup.Root>

                <RadioGroup.Root data-testid="inner-group" defaultValue="inner-1">
                    <RadioGroup.Item value="inner-1" data-testid="inner-1">inner 1</RadioGroup.Item>
                    <RadioGroup.Item value="inner-2" data-testid="inner-2">inner 2</RadioGroup.Item>
                </RadioGroup.Root>
            </div>
        );

        const user = userEvent.setup();

        await user.tab();
        expect(screen.getByTestId('outer-1')).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(screen.getByTestId('outer-2')).toHaveFocus();
        expect(screen.getByTestId('inner-1')).toHaveAttribute('aria-checked', 'true');
        expect(screen.getByTestId('inner-2')).toHaveAttribute('aria-checked', 'false');

        await user.tab();
        expect(screen.getByTestId('inner-1')).toHaveFocus();

        await user.keyboard('{ArrowRight}');
        expect(screen.getByTestId('inner-2')).toHaveFocus();
        expect(screen.getByTestId('outer-2')).toHaveAttribute('aria-checked', 'true');
    });

    test('data-state and data-disabled attributes reflect state', () => {
        render(
            <RadioGroup.Root defaultValue="one" disabled data-testid="group">
                <RadioGroup.Item value="one" data-testid="s-one">one</RadioGroup.Item>
                <RadioGroup.Item value="two" disabled data-testid="s-two">two</RadioGroup.Item>
            </RadioGroup.Root>
        );
        const group = screen.getByTestId('group');
        expect(group).toHaveAttribute('data-disabled');
        expect(screen.getByTestId('s-one')).toHaveAttribute('data-state', 'checked');
        const second = screen.getByTestId('s-two');
        expect(second).toHaveAttribute('data-state', 'unchecked');
        expect(second).toHaveAttribute('data-disabled');
    });

    test('axe: no violations and correct roles', async() => {
        const { container } = render(
            <RadioGroup.Root defaultValue="one">
                <RadioGroup.Item value="one">one</RadioGroup.Item>
                <RadioGroup.Item value="two">two</RadioGroup.Item>
            </RadioGroup.Root>
        );
        expect(screen.getByRole('radiogroup')).toBeInTheDocument();
        expect(screen.getAllByRole('radio')).toHaveLength(2);
        const results = await axe.run(container, {
            runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS },
            rules: { 'color-contrast': { enabled: false } }
        });
        expect(results.violations).toHaveLength(0);
    });

    test('asChild radios preserve semantics and refs', () => {
        const Custom = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
            (props, ref) => <div ref={ref} {...props} data-testid="custom" />
        );
        Custom.displayName = 'Custom';
        const ref = React.createRef<HTMLDivElement>();
        render(
            <RadioGroup.Root defaultValue="custom">
                <RadioGroup.Item value="custom" asChild>
                    <Custom ref={ref} />
                </RadioGroup.Item>
            </RadioGroup.Root>
        );
        const radio = screen.getByRole('radio');
        expect(ref.current).toBe(radio);
    });

    test('rtl navigation reverses horizontal keys', async() => {
        render(
            <RadioGroup.Root dir="rtl">
                <RadioGroup.Item value="one" data-testid="r-one">one</RadioGroup.Item>
                <RadioGroup.Item value="two" data-testid="r-two">two</RadioGroup.Item>
                <RadioGroup.Item value="three" data-testid="r-three">three</RadioGroup.Item>
            </RadioGroup.Root>
        );
        const user = userEvent.setup();
        await user.tab();
        await user.keyboard('{ArrowLeft}');
        expect(screen.getByTestId('r-two')).toHaveFocus();
        await user.keyboard('{ArrowLeft}');
        expect(screen.getByTestId('r-three')).toHaveFocus();
    });
});
