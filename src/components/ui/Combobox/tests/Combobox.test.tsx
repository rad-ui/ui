import React from 'react';
import { render } from '@testing-library/react';
import Combobox from '../Combobox';

describe('Combobox', () => {
    test('forwards ref through Trigger', () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <Combobox.Root>
                <Combobox.Trigger ref={ref}>Trigger</Combobox.Trigger>
            </Combobox.Root>
        );
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('renders hidden select for forms', () => {
        const { container } = render(
            <form>
                <Combobox.Root name="fruit" defaultValue="Apple">
                    <Combobox.Trigger>Apple</Combobox.Trigger>
                </Combobox.Root>
            </form>
        );
        const hiddenSelect = container.querySelector('select');
        expect(hiddenSelect).toHaveAttribute('aria-hidden', 'true');
        expect(hiddenSelect).toHaveValue('Apple');
    });

    test('renders without warnings', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(
            <Combobox.Root>
                <Combobox.Trigger>Trigger</Combobox.Trigger>
            </Combobox.Root>
        );
        expect(warn).not.toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();
        warn.mockRestore();
        error.mockRestore();
    });
});
