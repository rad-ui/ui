import React from 'react';
import { act } from '@testing-library/react';
import Select from '../Select';
import { expectNoUnexpectedHydrationWarnings, flush, hydrateRoot, renderToString } from '../../tests/ssrHydration';

// A Select rendered on the server, with a default value, hydrates without warnings and shows the label.
describe('Select SSR', () => {
    const ui = (
        <Select.Root defaultValue="banana" name="fruit">
            <Select.Trigger aria-label="Fruit">choose</Select.Trigger>
            <Select.Portal>
                <Select.Content>
                    <Select.Item value="apple">Apple</Select.Item>
                    <Select.Item value="banana">Banana</Select.Item>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );

    test('server HTML hydrates without warnings', async() => {
        const container = document.createElement('div');
        container.innerHTML = renderToString(ui);
        document.body.appendChild(container);
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});
        await act(async() => {
            hydrateRoot(container, ui);
            await flush();
        });
        expectNoUnexpectedHydrationWarnings(warn, error);
        warn.mockRestore();
        error.mockRestore();
        expect(container.querySelector('[aria-label="Fruit"]')).toBeInTheDocument();
        container.remove();
    });
});
