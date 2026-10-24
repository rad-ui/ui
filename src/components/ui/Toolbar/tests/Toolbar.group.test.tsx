import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toolbar from '../Toolbar';
import { axe, keyboard } from 'test-utils';

const Editor = ({ disabled = false, onLink }: { disabled?: boolean; onLink?: () => void }) => (
    <Toolbar.Root aria-label="Editor toolbar">
        <Toolbar.Group aria-label="Text style">
            <Toolbar.Button>Bold</Toolbar.Button>
            <Toolbar.Button>Italic</Toolbar.Button>
        </Toolbar.Group>
        <Toolbar.Separator />
        <Toolbar.Group aria-label="Insert" disabled={disabled}>
            <Toolbar.Button>Image</Toolbar.Button>
            <Toolbar.Link href="#help" onClick={onLink}>Help</Toolbar.Link>
            <Toolbar.ToggleGroup type="single" aria-label="Align">
                <Toolbar.ToggleItem value="left" aria-label="Left">L</Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
        </Toolbar.Group>
    </Toolbar.Root>
);

describe('Toolbar.Group', () => {
    test('renders a named group and arrow keys move across groups', async() => {
        render(<Editor />);
        expect(screen.getByRole('group', { name: 'Text style' })).toHaveAttribute('data-slot', 'toolbar-group');
        const user = keyboard();
        await user.tab();
        expect(screen.getByRole('button', { name: 'Bold' })).toHaveFocus();
        await user.keyboard('{ArrowRight}{ArrowRight}');
        expect(screen.getByRole('button', { name: 'Image' })).toHaveFocus();
    });

    test('disabled disables every item inside, and only inside', () => {
        const onLink = jest.fn();
        render(<Editor disabled onLink={onLink} />);
        expect(screen.getByRole('group', { name: 'Insert' })).toHaveAttribute('data-disabled', '');
        expect(screen.getByRole('button', { name: 'Image' })).toBeDisabled();
        expect(screen.getByRole('radio', { name: 'Left' })).toBeDisabled();
        const link = screen.getByRole('link', { name: 'Help' });
        expect(link).toHaveAttribute('aria-disabled', 'true');
        fireEvent.click(link);
        expect(onLink).not.toHaveBeenCalled();
        expect(screen.getByRole('button', { name: 'Bold' })).toBeEnabled();
    });

    test('an item can still opt out with its own disabled prop', () => {
        render(
            <Toolbar.Root aria-label="Editor toolbar">
                <Toolbar.Group disabled>
                    <Toolbar.Button disabled={false}>Undo</Toolbar.Button>
                </Toolbar.Group>
            </Toolbar.Root>
        );
        expect(screen.getByRole('button', { name: 'Undo' })).toBeEnabled();
    });

    test('has no axe violations', async() => {
        const { container } = render(<Editor disabled />);
        expect((await axe(container)).violations).toHaveLength(0);
    });
});
