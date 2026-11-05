import React from 'react';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxCards from '../CheckboxCards/CheckboxCards';
import RadioCards from '../RadioCards/RadioCards';
import TextArea from '../TextArea/TextArea';
import Field from '../Field/Field';

// Quality checklist: keyboard (APG), forms (FormData + reset), RTL and Field labelling for
// the choice groups and TextArea, which had no tests for these.

const Plans = (props: Record<string, unknown>) => (
    <RadioCards.Root name="plan" aria-label="Plan" defaultValue="basic" {...props}>
        <RadioCards.Item value="basic">Basic</RadioCards.Item>
        <RadioCards.Item value="pro">Pro</RadioCards.Item>
        <RadioCards.Item value="team">Team</RadioCards.Item>
    </RadioCards.Root>
);

const Fruits = (props: Record<string, unknown>) => (
    <CheckboxCards.Root name="fruits" aria-label="Fruits" defaultValue={['apple']} {...props}>
        <CheckboxCards.Item value="apple">Apple<CheckboxCards.Content><CheckboxCards.Indicator /></CheckboxCards.Content></CheckboxCards.Item>
        <CheckboxCards.Item value="pear">Pear<CheckboxCards.Content><CheckboxCards.Indicator /></CheckboxCards.Content></CheckboxCards.Item>
    </CheckboxCards.Root>
);

const radio = (name: string) => screen.getByRole('radio', { name });

describe('RadioCards checklist', () => {
    test('arrow keys move and select; Tab enters on the checked card', async() => {
        const user = userEvent.setup();
        render(<><button>before</button><Plans /></>);
        screen.getByText('before').focus();
        await user.tab();
        expect(radio('Basic')).toHaveFocus();
        await user.keyboard('{ArrowDown}');
        expect(radio('Pro')).toHaveFocus();
        expect(radio('Pro')).toBeChecked();
        await user.keyboard('{ArrowRight}');
        expect(radio('Team')).toBeChecked();
    });

    test('RTL flips left and right', async() => {
        const user = userEvent.setup();
        render(<Plans dir="rtl" />);
        act(() => radio('Basic').focus());
        await user.keyboard('{ArrowLeft}');
        expect(radio('Pro')).toHaveFocus();
    });

    test('submits and resets with its form', async() => {
        const user = userEvent.setup();
        render(<form data-testid="f"><Plans /></form>);
        const form = screen.getByTestId('f') as HTMLFormElement;
        await user.click(radio('Team'));
        expect(new FormData(form).get('plan')).toBe('team');
        act(() => form.reset());
        await waitFor(() => expect(radio('Basic')).toBeChecked());
        expect(new FormData(form).get('plan')).toBe('basic');
    });
});

describe('CheckboxCards checklist', () => {
    test('Space toggles, arrow keys move focus without toggling', async() => {
        const user = userEvent.setup();
        render(<Fruits />);
        const apple = screen.getByRole('checkbox', { name: /Apple/ });
        const pear = screen.getByRole('checkbox', { name: /Pear/ });
        act(() => apple.focus());
        await user.keyboard('{ArrowDown}');
        expect(pear).toHaveFocus();
        expect(pear).not.toBeChecked();
        await user.keyboard(' ');
        expect(pear).toBeChecked();
        await user.keyboard('{Enter}');
        expect(pear).toBeChecked();
    });

    test('submits every checked value and resets', async() => {
        const user = userEvent.setup();
        render(<form data-testid="f"><Fruits /></form>);
        const form = screen.getByTestId('f') as HTMLFormElement;
        await user.click(screen.getByRole('checkbox', { name: /Pear/ }));
        expect(new FormData(form).getAll('fruits').sort()).toEqual(['apple', 'pear']);
        act(() => form.reset());
        expect(new FormData(form).getAll('fruits')).toEqual(['apple']);
    });
});

describe('TextArea checklist', () => {
    test('controlled and uncontrolled', () => {
        const onValueChange = jest.fn();
        const { rerender } = render(<TextArea aria-label="Bio" defaultValue="hi" onValueChange={onValueChange} />);
        const area = screen.getByLabelText('Bio');
        fireEvent.change(area, { target: { value: 'hello' } });
        expect(onValueChange).toHaveBeenCalledWith('hello', expect.anything());
        rerender(<TextArea aria-label="Bio" value="fixed" onChange={() => {}} />);
        expect(screen.getByLabelText('Bio')).toHaveValue('fixed');
    });

    test('submits and resets with its form', () => {
        render(<form data-testid="f"><TextArea aria-label="Bio" name="bio" defaultValue="hi" /></form>);
        const form = screen.getByTestId('f') as HTMLFormElement;
        fireEvent.change(screen.getByLabelText('Bio'), { target: { value: 'changed' } });
        expect(new FormData(form).get('bio')).toBe('changed');
        act(() => form.reset());
        expect(new FormData(form).get('bio')).toBe('hi');
    });

    test('a Field labels it and shows its error', () => {
        render(
            <Field.Root name="bio" required invalid>
                <Field.Label>Bio</Field.Label>
                <Field.Control asChild><TextArea /></Field.Control>
                <Field.Error>Required</Field.Error>
            </Field.Root>
        );
        const area = screen.getByRole('textbox', { name: 'Bio' });
        expect(area).toHaveAttribute('aria-invalid', 'true');
        expect(area).toHaveAccessibleDescription(/Required/);
    });
});
