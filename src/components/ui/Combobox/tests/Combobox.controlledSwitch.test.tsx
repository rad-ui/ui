import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Combobox from '../Combobox';

describe('Combobox controlled/uncontrolled mode switching', () => {
    test('switches from uncontrolled to controlled', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();

        const { rerender } = render(
            <Combobox.Root defaultValue="apple">
                <Combobox.Trigger />
                <Combobox.Portal>
                    <Combobox.Content>
                        <Combobox.Item value="apple">Apple</Combobox.Item>
                        <Combobox.Item value="banana">Banana</Combobox.Item>
                    </Combobox.Content>
                </Combobox.Portal>
            </Combobox.Root>
        );

        const trigger = screen.getByRole('combobox');
        expect(trigger).toHaveTextContent('apple');

        rerender(
            <Combobox.Root value="apple" onValueChange={onValueChange}>
                <Combobox.Trigger />
                <Combobox.Portal>
                    <Combobox.Content>
                        <Combobox.Item value="apple">Apple</Combobox.Item>
                        <Combobox.Item value="banana">Banana</Combobox.Item>
                    </Combobox.Content>
                </Combobox.Portal>
            </Combobox.Root>
        );

        await user.click(trigger);
        await user.click(screen.getByText('Banana'));
        expect(onValueChange).toHaveBeenCalledWith('banana');
    });

    test('switches from controlled to uncontrolled', async() => {
        const user = userEvent.setup();

        const comboboxTree = (rootProps: Partial<React.ComponentProps<typeof Combobox.Root>>) => (
            <Combobox.Root {...rootProps}>
                <Combobox.Trigger />
                <Combobox.Portal>
                    <Combobox.Content>
                        <Combobox.Item value="apple">Apple</Combobox.Item>
                        <Combobox.Item value="banana">Banana</Combobox.Item>
                    </Combobox.Content>
                </Combobox.Portal>
            </Combobox.Root>
        );

        const { rerender } = render(comboboxTree({ defaultValue: 'apple' }));

        rerender(comboboxTree({ value: 'banana', onValueChange: () => {} }));
        expect(screen.getByRole('combobox')).toHaveTextContent('banana');

        rerender(comboboxTree({ defaultValue: 'apple' }));

        const trigger = screen.getByRole('combobox');
        expect(trigger).toHaveTextContent('apple');
        await user.click(trigger);
        await user.click(screen.getByText('Banana'));
        expect(trigger).toHaveTextContent('banana');
    });
});
