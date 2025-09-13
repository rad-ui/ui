import React from 'react';
import { render } from '@testing-library/react';
import SelectPrimitive from '../Select';

describe('SelectPrimitive', () => {
    test('forwards ref through Trigger', () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <SelectPrimitive.Root>
                <SelectPrimitive.Trigger ref={ref}>Trigger</SelectPrimitive.Trigger>
            </SelectPrimitive.Root>
        );
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('renders hidden select for forms', () => {
        const { container } = render(
            <form>
                <SelectPrimitive.Root name="test" defaultValue="Apple">
                    <SelectPrimitive.Trigger>Apple</SelectPrimitive.Trigger>
                </SelectPrimitive.Root>
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
            <SelectPrimitive.Root>
                <SelectPrimitive.Trigger>Trigger</SelectPrimitive.Trigger>
            </SelectPrimitive.Root>
        );
        expect(warn).not.toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();
        warn.mockRestore();
        error.mockRestore();
    });
});
