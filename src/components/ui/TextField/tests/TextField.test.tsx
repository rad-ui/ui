import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TextField from '../TextField';

describe('TextField', () => {
    test('renders input and supports controlled values', () => {
        render(<TextField aria-label="Name" value="Ada" onChange={() => {}} />);
        expect(screen.getByLabelText('Name')).toHaveValue('Ada');
    });

    test('renders optional start and end slots', () => {
        render(
            <TextField
                aria-label="Search"
                startSlot={<span>Search icon</span>}
                endSlot={<button type="button">Clear</button>}
            />
        );

        expect(screen.getByText('Search icon')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
    });

    test('forwards refs to the underlying input', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<TextField ref={ref} aria-label="Email" />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    test('applies root className and inputClassName separately', () => {
        render(
            <TextField
                aria-label="Username"
                className="field-root"
                inputClassName="field-input"
            />
        );

        const input = screen.getByLabelText('Username');
        expect(input.parentElement).toHaveClass('field-root');
        expect(input).toHaveClass('field-input');
    });

    test('renders compound fragments with scoped classes', () => {
        render(
            <TextField.Root data-testid="root" customRootClass="rad-ui">
                <TextField.Slot data-testid="start-slot" side="start">Start</TextField.Slot>
                <TextField.Input aria-label="Compound field" defaultValue="value" />
                <TextField.Reset data-testid="reset" aria-label="Clear">X</TextField.Reset>
                <TextField.Slot data-testid="end-slot" side="end">End</TextField.Slot>
            </TextField.Root>
        );

        expect(screen.getByTestId('root')).toHaveClass('rad-ui-text-field');
        expect(screen.getByLabelText('Compound field')).toHaveClass('rad-ui-text-field-input');
        expect(screen.getByTestId('start-slot')).toHaveClass('rad-ui-text-field-slot');
        expect(screen.getByTestId('start-slot')).toHaveAttribute('data-text-field-slot', 'start');
        expect(screen.getByTestId('reset')).toHaveClass('rad-ui-text-field-reset');
        expect(screen.getByTestId('end-slot')).toHaveClass('rad-ui-text-field-slot');
        expect(screen.getByTestId('end-slot')).toHaveAttribute('data-text-field-slot', 'end');
    });

    test('clears uncontrolled input when reset is clicked', () => {
        render(
            <TextField.Root>
                <TextField.Input aria-label="Search" defaultValue="query" />
                <TextField.Reset aria-label="Clear search">X</TextField.Reset>
            </TextField.Root>
        );

        const input = screen.getByLabelText('Search');
        fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));

        expect(input).toHaveValue('');
        expect(input).toHaveFocus();
    });

    test('clears controlled input through onChange when reset is clicked', () => {
        const Controlled = () => {
            const [value, setValue] = React.useState('query');

            return (
                <TextField.Root>
                    <TextField.Input aria-label="Controlled search" value={value} onChange={(event) => setValue(event.target.value)} />
                    <TextField.Reset aria-label="Clear controlled search">X</TextField.Reset>
                </TextField.Root>
            );
        };

        render(<Controlled />);

        const input = screen.getByLabelText('Controlled search');
        fireEvent.click(screen.getByRole('button', { name: 'Clear controlled search' }));

        expect(input).toHaveValue('');
        expect(screen.queryByRole('button', { name: 'Clear controlled search' })).not.toBeInTheDocument();
    });

    test('does not render reset when input is empty', () => {
        render(
            <TextField.Root>
                <TextField.Input aria-label="Empty search" placeholder="Search" />
                <TextField.Reset aria-label="Clear empty search">X</TextField.Reset>
            </TextField.Root>
        );

        expect(screen.queryByRole('button', { name: 'Clear empty search' })).not.toBeInTheDocument();
    });

    test('shows reset only when input has content', () => {
        render(
            <TextField.Root>
                <TextField.Input aria-label="Dynamic search" />
                <TextField.Reset aria-label="Clear dynamic search">X</TextField.Reset>
            </TextField.Root>
        );

        const input = screen.getByLabelText('Dynamic search');
        expect(screen.queryByRole('button', { name: 'Clear dynamic search' })).not.toBeInTheDocument();

        fireEvent.input(input, { target: { value: 'abc' } });
        expect(screen.getByRole('button', { name: 'Clear dynamic search' })).toBeInTheDocument();
    });

    test('hides reset again after clearing input', () => {
        render(
            <TextField.Root>
                <TextField.Input aria-label="Resettable search" defaultValue="abc" />
                <TextField.Reset aria-label="Clear resettable search">X</TextField.Reset>
            </TextField.Root>
        );

        fireEvent.click(screen.getByRole('button', { name: 'Clear resettable search' }));

        expect(screen.queryByRole('button', { name: 'Clear resettable search' })).not.toBeInTheDocument();
    });

    test('does not clear disabled input', () => {
        render(
            <TextField.Root>
                <TextField.Input aria-label="Disabled search" defaultValue="abc" disabled />
                <TextField.Reset aria-label="Clear disabled search">X</TextField.Reset>
            </TextField.Root>
        );

        const input = screen.getByLabelText('Disabled search');
        fireEvent.click(screen.getByRole('button', { name: 'Clear disabled search' }));

        expect(input).toHaveValue('abc');
    });

    test('does not clear read-only input', () => {
        render(
            <TextField.Root>
                <TextField.Input aria-label="Readonly search" defaultValue="abc" readOnly />
                <TextField.Reset aria-label="Clear readonly search">X</TextField.Reset>
            </TextField.Root>
        );

        const input = screen.getByLabelText('Readonly search');
        fireEvent.click(screen.getByRole('button', { name: 'Clear readonly search' }));

        expect(input).toHaveValue('abc');
    });

    test('focuses input when a slot is clicked', () => {
        render(
            <TextField.Root>
                <TextField.Slot side="start">S</TextField.Slot>
                <TextField.Input aria-label="Focusable search" />
                <TextField.Slot side="end">E</TextField.Slot>
            </TextField.Root>
        );

        const input = screen.getByLabelText('Focusable search');
        fireEvent.mouseDown(screen.getByText('S'));
        expect(input).toHaveFocus();

        input.blur();
        fireEvent.mouseDown(screen.getByText('E'));
        expect(input).toHaveFocus();
    });
});
