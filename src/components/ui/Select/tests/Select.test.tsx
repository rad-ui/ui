import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';

describe('Select', () => {
    test('forwards ref through Trigger', () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <Select.Root>
                <Select.Trigger ref={ref}>Trigger</Select.Trigger>
            </Select.Root>
        );
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('renders hidden select for forms', () => {
        const { container } = render(
            <form>
                <Select.Root name="fruit" defaultValue="Apple">
                    <Select.Trigger>Apple</Select.Trigger>
                </Select.Root>
            </form>
        );
        const hiddenSelect = container.querySelector('select');
        expect(hiddenSelect).toHaveAttribute('aria-hidden', 'true');
        expect(hiddenSelect).toHaveValue('Apple');
    });

    test('exposes stable anatomy data slots', async() => {
        const { getByRole } = render(
            <Select.Root defaultValue="Apple">
                <Select.Trigger>Apple</Select.Trigger>
                <Select.Portal>
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="Apple">
                                Apple
                                <Select.Indicator />
                            </Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );

        const trigger = getByRole('combobox');
        expect(trigger).toHaveAttribute('data-slot', 'select-trigger');
        await userEvent.click(trigger);

        expect(document.querySelector('[data-slot="select-root"]')).toBeInTheDocument();
        expect(document.querySelector('[data-slot="select-content"]')).toBeInTheDocument();
        expect(document.querySelector('[data-slot="select-group"]')).toBeInTheDocument();
        expect(document.querySelector('[data-slot="select-item"]')).toBeInTheDocument();
        expect(document.querySelector('[data-slot="select-item-text"]')).toBeInTheDocument();
        expect(document.querySelector('[data-slot="select-item-indicator"]')).toBeInTheDocument();
    });

    test('renders without warnings', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(
            <Select.Root>
                <Select.Trigger>Trigger</Select.Trigger>
            </Select.Root>
        );
        expect(warn).not.toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();
        warn.mockRestore();
        error.mockRestore();
    });
});
