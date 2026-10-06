import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Command from '../Command';

describe('Command keyboard paths', () => {
    test('does not mark disabled items as selected when jumping to list ends', () => {
        render(
            <Command loop>
                <Command.Input placeholder="Search..." />
                <Command.List>
                    <Command.Item value="apple">Apple</Command.Item>
                    <Command.Item value="banana">Banana</Command.Item>
                    <Command.Item value="carrot" disabled>Carrot</Command.Item>
                    <Command.Item value="date">Date</Command.Item>
                </Command.List>
            </Command>
        );

        const input = screen.getByRole('combobox');

        fireEvent.keyDown(input, { key: 'End' });
        expect(screen.getByText('Date')).toHaveAttribute('data-selected', '');
        expect(screen.getByText('Carrot')).not.toHaveAttribute('data-selected');
    });

    test('home and end jump to first and last enabled items', () => {
        render(
            <Command loop>
                <Command.Input placeholder="Search..." />
                <Command.List>
                    <Command.Item value="apple">Apple</Command.Item>
                    <Command.Item value="banana">Banana</Command.Item>
                    <Command.Item value="carrot" disabled>Carrot</Command.Item>
                </Command.List>
            </Command>
        );

        const input = screen.getByRole('combobox');

        fireEvent.keyDown(input, { key: 'End' });
        expect(screen.getByText('Banana')).toHaveAttribute('data-selected', '');

        fireEvent.keyDown(input, { key: 'Home' });
        expect(screen.getByText('Apple')).toHaveAttribute('data-selected', '');
    });
});
