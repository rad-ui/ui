import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioGroup from '../RadioGroup';

const Group = (props: Omit<React.ComponentProps<typeof RadioGroup.Root>, 'children'>) => (
    <RadioGroup.Root {...props}>
        <RadioGroup.Item value="a">A</RadioGroup.Item>
        <RadioGroup.Item value="b">B</RadioGroup.Item>
        <RadioGroup.Item value="c">C</RadioGroup.Item>
    </RadioGroup.Root>
);

describe('RadioGroup focus management', () => {
    test('tabbing into the group focuses the checked radio without changing the value', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<><button>before</button><Group defaultValue="b" onValueChange={onValueChange} /></>);

        await user.tab();
        await user.tab();

        expect(screen.getByRole('radio', { name: 'B' })).toHaveFocus();
        expect(onValueChange).not.toHaveBeenCalled();
        expect(screen.getByRole('radio', { name: 'A' })).toHaveAttribute('tabindex', '-1');
    });

    test('tabbing into a group without a value focuses the first radio but does not check it', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Group onValueChange={onValueChange} />);

        await user.tab();

        expect(screen.getByRole('radio', { name: 'A' })).toHaveFocus();
        expect(screen.getByRole('radio', { name: 'A' })).toHaveAttribute('aria-checked', 'false');
        expect(onValueChange).not.toHaveBeenCalled();
    });

    test('arrow keys move focus and selection together', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Group defaultValue="a" onValueChange={onValueChange} />);

        await user.tab();
        await user.keyboard('{ArrowRight}');

        expect(screen.getByRole('radio', { name: 'B' })).toHaveFocus();
        expect(screen.getByRole('radio', { name: 'B' })).toHaveAttribute('aria-checked', 'true');
        expect(onValueChange).toHaveBeenLastCalledWith('b');
    });

    test('the tab stop follows controlled value changes', () => {
        const { rerender } = render(<Group value="a" onValueChange={() => {}} />);
        expect(screen.getByRole('radio', { name: 'A' })).toHaveAttribute('tabindex', '0');

        rerender(<Group value="c" onValueChange={() => {}} />);
        expect(screen.getByRole('radio', { name: 'C' })).toHaveAttribute('tabindex', '0');
        expect(screen.getByRole('radio', { name: 'A' })).toHaveAttribute('tabindex', '-1');
    });

    test('consumer onClick does not replace selection handling', async() => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        render(
            <RadioGroup.Root>
                <RadioGroup.Item value="a" onClick={onClick}>A</RadioGroup.Item>
            </RadioGroup.Root>
        );

        await user.click(screen.getByRole('radio', { name: 'A' }));
        expect(onClick).toHaveBeenCalled();
        expect(screen.getByRole('radio', { name: 'A' })).toHaveAttribute('aria-checked', 'true');
    });
});

describe('RadioGroup form participation', () => {
    test('required blocks submission until a value is chosen', async() => {
        const user = userEvent.setup();
        render(
            <form data-testid="form">
                <Group name="plan" required />
            </form>
        );
        const form = screen.getByTestId('form') as HTMLFormElement;
        expect(form.checkValidity()).toBe(false);

        await user.click(screen.getByRole('radio', { name: 'B' }));
        expect(form.checkValidity()).toBe(true);
    });

    test('required group submits a single entry for its name', () => {
        render(
            <form data-testid="form">
                <Group name="plan" required defaultValue="c" />
            </form>
        );
        const data = new FormData(screen.getByTestId('form') as HTMLFormElement);
        expect(data.getAll('plan')).toEqual(['c']);
    });

    test('form reset restores the default value', async() => {
        const user = userEvent.setup();
        render(
            <form data-testid="form">
                <Group name="plan" defaultValue="a" />
            </form>
        );
        await user.click(screen.getByRole('radio', { name: 'C' }));
        expect(screen.getByRole('radio', { name: 'C' })).toHaveAttribute('aria-checked', 'true');

        act(() => {
            fireEvent.reset(screen.getByTestId('form'));
        });
        expect(screen.getByRole('radio', { name: 'A' })).toHaveAttribute('aria-checked', 'true');
        expect(new FormData(screen.getByTestId('form') as HTMLFormElement).get('plan')).toBe('a');
    });
});
