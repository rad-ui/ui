import React from 'react';
import { render } from '@testing-library/react';
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
