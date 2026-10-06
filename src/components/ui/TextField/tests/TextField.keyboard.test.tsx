import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from '../TextField';

describe('TextField keyboard', () => {
    test('tab focuses the input', async() => {
        const user = userEvent.setup();
        render(
            <div>
                <button>first</button>
                <TextField.Input aria-label="Email" />
            </div>
        );
        await user.tab();
        expect(screen.getByText('first')).toHaveFocus();
        await user.tab();
        expect(screen.getByLabelText('Email')).toHaveFocus();
    });

    test('type updates the value', async() => {
        const user = userEvent.setup();
        render(<TextField.Input aria-label="Search" />);
        await user.type(screen.getByLabelText('Search'), 'hello');
        expect(screen.getByLabelText('Search')).toHaveValue('hello');
    });

    test('backspace deletes characters', async() => {
        const user = userEvent.setup();
        render(<TextField.Input aria-label="Name" defaultValue="abc" />);
        const input = screen.getByLabelText('Name');
        await user.type(input, '{backspace}');
        expect(input).toHaveValue('ab');
    });

    test('enter submits the form', async() => {
        const user = userEvent.setup();
        const handleSubmit = jest.fn((e) => e.preventDefault());
        render(
            <form onSubmit={handleSubmit}>
                <TextField.Input aria-label="Search" />
            </form>
        );
        await user.type(screen.getByLabelText('Search'), 'query{enter}');
        expect(handleSubmit).toHaveBeenCalled();
    });
});
