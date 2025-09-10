import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import RadioGroup from '../RadioGroup';

const ACCESSIBILITY_TEST_TAGS = ['wcag2a', 'wcag2aa'];

describe('RadioGroup behavior', () => {
    test('arrow keys move focus/selection and Home/End jump to first/last', async () => {
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

    test('controlled value syncs with onValueChange and defaultValue works', async () => {
        const Controlled = () => {
            const [value, setValue] = React.useState('one');
            return (
                <RadioGroup.Root value={value} onValueChange={setValue}>
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
        expect(screen.getByTestId('c-two')).toHaveAttribute('aria-checked', 'true');
        await user.keyboard('{ArrowRight}');
        expect(screen.getByTestId('c-three')).toHaveAttribute('aria-checked', 'true');

        render(
            <RadioGroup.Root defaultValue="two">
                <RadioGroup.Item value="one" data-testid="u-one">one</RadioGroup.Item>
                <RadioGroup.Item value="two" data-testid="u-two">two</RadioGroup.Item>
            </RadioGroup.Root>
        );
        expect(screen.getByTestId('u-two')).toHaveAttribute('aria-checked', 'true');
    });

    test('form submission includes selected value and disabled radios skip focus', async () => {
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
        const three = screen.getByTestId('f-three');
        expect(three).toHaveFocus();
        await user.click(screen.getByText('submit'));
        expect(submitted?.get('rg')).toBe('three');
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

    test('axe: no violations and correct roles', async () => {
        const { container } = render(
            <RadioGroup.Root defaultValue="one">
                <RadioGroup.Item value="one">one</RadioGroup.Item>
                <RadioGroup.Item value="two">two</RadioGroup.Item>
            </RadioGroup.Root>
        );
        expect(screen.getByRole('radiogroup')).toBeInTheDocument();
        expect(screen.getAllByRole('radio')).toHaveLength(2);
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
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

    test('rtl navigation reverses horizontal keys', async () => {
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
