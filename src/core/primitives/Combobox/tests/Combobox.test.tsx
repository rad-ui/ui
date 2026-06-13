import React from 'react';
import { render } from '@testing-library/react';
import ComboboxPrimitive from '../ComboboxPrimitive';

describe('ComboboxPrimitive', () => {
    test('forwards ref through Trigger', () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <ComboboxPrimitive.Root>
                <ComboboxPrimitive.Trigger ref={ref}>Trigger</ComboboxPrimitive.Trigger>
            </ComboboxPrimitive.Root>
        );
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('renders hidden select for forms', () => {
        const { container } = render(
            <form>
                <ComboboxPrimitive.Root name="test" defaultValue="Apple">
                    <ComboboxPrimitive.Trigger>Apple</ComboboxPrimitive.Trigger>
                </ComboboxPrimitive.Root>
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
            <ComboboxPrimitive.Root>
                <ComboboxPrimitive.Trigger>Trigger</ComboboxPrimitive.Trigger>
            </ComboboxPrimitive.Root>
        );
        expect(warn).not.toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();
        warn.mockRestore();
        error.mockRestore();
    });
});
