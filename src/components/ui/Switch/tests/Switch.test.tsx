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

    // New tests for the GitHub issue #1270 features
    describe('New Props and Features', () => {
        test('controlled mode works with checked and onCheckedChange', () => {
            const handleCheckedChange = jest.fn();
            const { container } = render(
                <Switch.Root checked={true} onCheckedChange={handleCheckedChange}>
                    <Switch.Thumb />
                </Switch.Root>
            );

            const switchButton = container.querySelector('button');
            expect(switchButton).toHaveAttribute('data-state', 'checked');

            fireEvent.click(switchButton!);
            expect(handleCheckedChange).toHaveBeenCalledWith(false);
        });

        test('uncontrolled mode works with defaultChecked', () => {
            const { container } = render(
                <Switch.Root defaultChecked={true}>
                    <Switch.Thumb />
                </Switch.Root>
            );

            const switchButton = container.querySelector('button');
            expect(switchButton).toHaveAttribute('data-state', 'checked');
        });

        test('disabled state prevents interaction', () => {
            const handleCheckedChange = jest.fn();
            const { container } = render(
                <Switch.Root disabled onCheckedChange={handleCheckedChange}>
                    <Switch.Thumb />
                </Switch.Root>
            );

            const switchButton = container.querySelector('button');
            expect(switchButton).toHaveAttribute('disabled');
            expect(switchButton).toHaveAttribute('data-disabled', '');

            fireEvent.click(switchButton!);
            expect(handleCheckedChange).not.toHaveBeenCalled();
        });

        test('form props are applied correctly', () => {
            const { container } = render(
                <Switch.Root name="test-switch" value="test-value" required>
                    <Switch.Thumb />
                </Switch.Root>
            );

            const switchButton = container.querySelector('button');
            expect(switchButton).toHaveAttribute('name', 'test-switch');
            expect(switchButton).toHaveAttribute('value', 'test-value');
            expect(switchButton).toHaveAttribute('aria-required', 'true');
        });

        test('asChild prop works on Switch.Root', () => {
            const { container } = render(
                <Switch.Root asChild>
                    <div data-testid="custom-switch">
                        <Switch.Thumb />
                    </div>
                </Switch.Root>
            );

            expect(screen.getByTestId('custom-switch')).toBeInTheDocument();
        });

        test('asChild prop works on Switch.Thumb', () => {
            const { container } = render(
                <Switch.Root>
                    <Switch.Thumb asChild>
                        <span data-testid="custom-thumb" />
                    </Switch.Thumb>
                </Switch.Root>
            );

            expect(screen.getByTestId('custom-thumb')).toBeInTheDocument();
        });

        test('thumb reflects disabled state', () => {
            const { container } = render(
                <Switch.Root disabled>
                    <Switch.Thumb />
                </Switch.Root>
            );

            const thumb = container.querySelector('.rad-ui-switch-indicator');
            expect(thumb).toHaveAttribute('data-disabled', '');
        });

        test('thumb data-state changes with switch state', () => {
            const { container } = render(
                <Switch.Root defaultChecked={true}>
                    <Switch.Thumb />
                </Switch.Root>
            );

            const thumb = container.querySelector('.rad-ui-switch-indicator');
            expect(thumb).toHaveAttribute('data-state', 'checked');

            const switchButton = container.querySelector('button');
            fireEvent.click(switchButton!);
            expect(thumb).toHaveAttribute('data-state', 'unchecked');
        });

        test('accessibility attributes are set correctly', () => {
            const { container } = render(
                <Switch.Root defaultChecked={true} required>
                    <Switch.Thumb />
                </Switch.Root>
            );

            const switchButton = container.querySelector('button');
            expect(switchButton).toHaveAttribute('role', 'switch');
            expect(switchButton).toHaveAttribute('aria-checked', 'true');
            expect(switchButton).toHaveAttribute('aria-required', 'true');
        });
    });

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
