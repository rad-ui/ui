import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';

describe('Select controlled/uncontrolled mode switching', () => {
    test('switches from uncontrolled to controlled', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();

        const { rerender } = render(
            <Select.Root defaultValue="apple">
                <Select.Trigger />
                <Select.Portal>
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="apple">Apple</Select.Item>
                            <Select.Item value="banana">Banana</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );

        const trigger = screen.getByRole('combobox');
        expect(trigger).toHaveTextContent('apple');

        rerender(
            <Select.Root value="apple" onValueChange={onValueChange}>
                <Select.Trigger />
                <Select.Portal>
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="apple">Apple</Select.Item>
                            <Select.Item value="banana">Banana</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );

        await user.click(trigger);
        await user.click(screen.getByText('Banana'));
        expect(onValueChange).toHaveBeenCalledWith('banana');
    });

    test('switches from controlled to uncontrolled', async() => {
        const user = userEvent.setup();

        const { unmount } = render(
            <Select.Root value="banana" onValueChange={() => {}}>
                <Select.Trigger />
                <Select.Portal>
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="apple">Apple</Select.Item>
                            <Select.Item value="banana">Banana</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );

        expect(screen.getByRole('combobox')).toHaveTextContent('banana');
        unmount();

        render(
            <Select.Root defaultValue="apple">
                <Select.Trigger />
                <Select.Portal>
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="apple">Apple</Select.Item>
                            <Select.Item value="banana">Banana</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );

        const trigger = screen.getByRole('combobox');
        expect(trigger).toHaveTextContent('apple');
        await user.click(trigger);
        await user.click(screen.getByText('Banana'));
        expect(trigger).toHaveTextContent('Banana');
    });
});
