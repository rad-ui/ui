import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Command from '../Command';

describe('Command', () => {
    it('filters items, hides empty groups, and renders empty state', () => {
        render(
            <Command>
                <Command.Input placeholder="Search..." />
                <Command.List>
                    <Command.Empty>No results.</Command.Empty>
                    <Command.Group heading="Fruits" data-testid="fruits-group">
                        <Command.Item value="apple">Apple</Command.Item>
                        <Command.Item value="banana">Banana</Command.Item>
                    </Command.Group>
                    <Command.Group heading="Vegetables" data-testid="vegetables-group">
                        <Command.Item value="carrot">Carrot</Command.Item>
                    </Command.Group>
                </Command.List>
            </Command>
        );

        const input = screen.getByRole('combobox');
        fireEvent.change(input, { target: { value: 'app' } });

        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.queryByText('Banana')).not.toBeInTheDocument();
        expect(screen.queryByText('Carrot')).not.toBeInTheDocument();
        expect(screen.getByTestId('fruits-group')).toBeInTheDocument();
        expect(screen.getByTestId('vegetables-group')).not.toBeVisible();

        fireEvent.change(input, { target: { value: 'zzz' } });

        expect(screen.getByText('No results.', { selector: '[data-slot="command-empty"]' })).toBeInTheDocument();
    });

    it('supports keyboard navigation and selection', () => {
        const onSelect = jest.fn();

        render(
            <Command loop>
                <Command.Input placeholder="Search..." />
                <Command.List>
                    <Command.Item value="apple" onSelect={onSelect}>Apple</Command.Item>
                    <Command.Item value="banana" onSelect={onSelect}>Banana</Command.Item>
                    <Command.Item value="carrot" disabled onSelect={onSelect}>Carrot</Command.Item>
                </Command.List>
            </Command>
        );

        const input = screen.getByRole('combobox');
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(onSelect).toHaveBeenCalledWith('banana');
    });

    it('renders inside the dialog primitive wrapper', () => {
        render(
            <Command.Dialog open>
                <Command.Input placeholder="Search..." />
                <Command.List>
                    <Command.Item value="apple">Apple</Command.Item>
                </Command.List>
            </Command.Dialog>
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByText('Apple')).toBeInTheDocument();
    });
    test('does not scroll the page or any ancestor when highlighting items', () => {
        const scrollIntoView = jest.fn();
        const original = Element.prototype.scrollIntoView;
        Element.prototype.scrollIntoView = scrollIntoView;
        try {
            render(
                <Command>
                    <Command.Input aria-label="Command" />
                    <Command.List>
                        <Command.Item value="one">One</Command.Item>
                        <Command.Item value="two">Two</Command.Item>
                    </Command.List>
                </Command>
            );

            fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
            expect(scrollIntoView).not.toHaveBeenCalled();
        } finally {
            Element.prototype.scrollIntoView = original;
        }
    });
});
