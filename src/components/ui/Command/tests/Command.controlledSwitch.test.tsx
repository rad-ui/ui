import React from 'react';
import { render, screen } from '@testing-library/react';
import Command from '../Command';

describe('Command controlled switch', () => {
    const command = (rootProps: Partial<React.ComponentProps<typeof Command.Root>>) => (
        <Command.Root {...rootProps}>
            <Command.Input placeholder="Search" />
            <Command.List>
                <Command.Item value="copy">Copy</Command.Item>
                <Command.Item value="paste">Paste</Command.Item>
            </Command.List>
        </Command.Root>
    );

    const commandRoot = () => screen.getByRole('combobox').parentElement as HTMLElement;

    test('switches from uncontrolled defaultValue to controlled value', () => {
        const onValueChange = jest.fn();

        const { rerender } = render(command({ defaultValue: 'copy' }));

        expect(commandRoot()).toHaveAttribute('data-value', 'copy');

        rerender(command({ value: 'paste', onValueChange }));

        expect(commandRoot()).toHaveAttribute('data-value', 'paste');
        expect(onValueChange).not.toHaveBeenCalled();
    });

    test('switches from controlled value to uncontrolled defaultValue', () => {
        const { rerender } = render(command({ defaultValue: 'copy' }));

        rerender(command({ value: 'paste' }));
        expect(commandRoot()).toHaveAttribute('data-value', 'paste');

        rerender(command({ defaultValue: 'copy' }));
        expect(commandRoot()).toHaveAttribute('data-value', 'copy');
    });
});
