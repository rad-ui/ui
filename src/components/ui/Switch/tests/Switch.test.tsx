import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Switch from '../Switch';

describe('Switch Component', () => {
    test('renders correctly with composable API', () => {
        const { container } = render(
            <Switch.Root>
                <Switch.Thumb />
            </Switch.Root>
        );
        expect(container.firstChild).toBeInTheDocument();
        const switchElement = container.querySelector('[role="switch"]');
        expect(switchElement).toBeInTheDocument();
    });

    test('warns when using Switch directly', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(<Switch />);

        expect(consoleSpy).toHaveBeenCalledWith(
            'Direct usage of Switch is not supported. Please use Switch.Root, Switch.Thumb, etc. instead.'
        );

        consoleSpy.mockRestore();
    });

    test('toggles state correctly', () => {
        const { container } = render(
            <Switch.Root>
                <Switch.Thumb />
            </Switch.Root>
        );
        const switchButton = container.querySelector('button');
        expect(switchButton).toHaveAttribute('data-state', 'unchecked');

        fireEvent.click(switchButton!);
        expect(switchButton).toHaveAttribute('data-state', 'checked');

        fireEvent.click(switchButton!);
        expect(switchButton).toHaveAttribute('data-state', 'unchecked');
    });

    test('thumb indicator reflects switch state', () => {
        const { container } = render(
            <Switch.Root>
                <Switch.Thumb />
            </Switch.Root>
        );
        const indicator = container.querySelector('.rad-ui-switch-indicator');
        expect(indicator).toHaveAttribute('data-state', 'unchecked');

        const switchButton = container.querySelector('button');
        fireEvent.click(switchButton!);
        expect(indicator).toHaveAttribute('data-state', 'checked');
    });

    // TODO: Add tests for the following features once implemented:
    // - Controlled mode with value prop
    // - Disabled state
    // - Custom styling/variants
    // - Keyboard interaction
    // - Accessibility attributes

    // The following tests are no longer applicable with the new composable API
    /*
    test('renders in controlled mode correctly', () => {
        const handleChange = jest.fn();
        render(<Switch checked={true} onChange={handleChange} />);
        const switchElement = screen.getByRole('switch');

        fireEvent.click(switchElement);
        expect(handleChange).toHaveBeenCalledWith(false);

        fireEvent.click(switchElement);
        expect(handleChange).toHaveBeenCalledWith(true);
    });

    test('renders in uncontrolled mode correctly with defaultChecked', () => {
        render(<Switch defaultChecked={true} onChange={() => {}}/>);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    test('toggles state independently', () => {
        render(<Switch defaultChecked={false} onChange={() => {}} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();

        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();

        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });
    */
});
