import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toolbar from '../Toolbar';

const Editor = () => (
    <Toolbar.Root aria-label="Editor">
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.Input aria-label="Font size" defaultValue="12" />
        <Toolbar.Button>Italic</Toolbar.Button>
    </Toolbar.Root>
);

describe('Toolbar.Input', () => {
    test('keeps its textbox role and type', () => {
        render(<Editor />);
        const input = screen.getByRole('textbox', { name: 'Font size' });
        expect(input).toHaveAttribute('type', 'text');
        expect(input).not.toHaveAttribute('role');
    });

    test('arrow keys move the caret, then leave the field at its edges', async() => {
        const user = userEvent.setup();
        render(<Editor />);
        screen.getByRole('button', { name: 'Bold' }).focus();
        await user.keyboard('{ArrowRight}');
        const input = screen.getByRole('textbox', { name: 'Font size' }) as HTMLInputElement;
        expect(input).toHaveFocus();

        input.setSelectionRange(1, 1);
        await user.keyboard('{ArrowRight}');
        expect(input).toHaveFocus();
        expect(input.selectionStart).toBe(2);

        await user.keyboard('{ArrowRight}');
        expect(screen.getByRole('button', { name: 'Italic' })).toHaveFocus();

        await user.keyboard('{ArrowLeft}');
        expect(input).toHaveFocus();
        input.setSelectionRange(0, 0);
        await user.keyboard('{ArrowLeft}');
        expect(screen.getByRole('button', { name: 'Bold' })).toHaveFocus();
    });

    test('typing works and Home/End stay in the field', async() => {
        const user = userEvent.setup();
        render(<Editor />);
        const input = screen.getByRole('textbox', { name: 'Font size' }) as HTMLInputElement;
        await user.click(input);
        await user.keyboard('{End}4');
        expect(input).toHaveValue('124');
        await user.keyboard('{Home}');
        expect(input).toHaveFocus();
    });
});
