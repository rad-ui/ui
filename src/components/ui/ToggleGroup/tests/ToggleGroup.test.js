import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ToggleGroup from '../ToggleGroup';

describe('ToggleGroup component', () => {
    test('renders correctly with composable API', () => {
        const { container, getAllByRole } = render(
            <ToggleGroup.Root>
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
                <ToggleGroup.Item value="item2">Item 2</ToggleGroup.Item>
                <ToggleGroup.Item value="item3">Item 3</ToggleGroup.Item>
            </ToggleGroup.Root>
        );
        expect(container.firstChild).toBeInTheDocument();

        // Verify all items are rendered
        const buttons = getAllByRole('button');
        expect(buttons.length).toBe(3);
    });

    test('handles multiple selection', () => {
        const { getByText } = render(
            <ToggleGroup.Root type="multiple">
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
                <ToggleGroup.Item value="item2">Item 2</ToggleGroup.Item>
                <ToggleGroup.Item value="item3">Item 3</ToggleGroup.Item>
            </ToggleGroup.Root>
        );

        // Click on first two items
        fireEvent.click(getByText('Item 1'));
        fireEvent.click(getByText('Item 2'));

        // Check if they are pressed/active
        expect(getByText('Item 1').closest('button')).toHaveAttribute('aria-pressed', 'true');
        expect(getByText('Item 1').closest('button')).toHaveAttribute('data-state', 'on');

        expect(getByText('Item 2').closest('button')).toHaveAttribute('aria-pressed', 'true');
        expect(getByText('Item 2').closest('button')).toHaveAttribute('data-state', 'on');

        // Third item should not be pressed
        expect(getByText('Item 3').closest('button')).toHaveAttribute('aria-pressed', 'false');
    });

    test('handles multiple selection with variation in toggles', () => {
        const { getByText } = render(
            <ToggleGroup.Root type="multiple">
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
                <ToggleGroup.Item value="item2">Item 2</ToggleGroup.Item>
                <ToggleGroup.Item value="item3">Item 3</ToggleGroup.Item>
            </ToggleGroup.Root>
        );

        // Perform a series of clicks
        fireEvent.click(getByText('Item 1'));
        fireEvent.click(getByText('Item 2'));
        fireEvent.click(getByText('Item 3'));
        fireEvent.click(getByText('Item 2')); // Un-toggle the second item

        // Check the final state
        expect(getByText('Item 1').closest('button')).toHaveAttribute('aria-pressed', 'true');
        expect(getByText('Item 1').closest('button')).toHaveAttribute('data-state', 'on');

        expect(getByText('Item 2').closest('button')).toHaveAttribute('aria-pressed', 'false');

        expect(getByText('Item 3').closest('button')).toHaveAttribute('aria-pressed', 'true');
        expect(getByText('Item 3').closest('button')).toHaveAttribute('data-state', 'on');
    });

    test('handles single selection', () => {
        const { getByText } = render(
            <ToggleGroup.Root type="single">
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
                <ToggleGroup.Item value="item2">Item 2</ToggleGroup.Item>
                <ToggleGroup.Item value="item3">Item 3</ToggleGroup.Item>
            </ToggleGroup.Root>
        );

        // Click the first item
        fireEvent.click(getByText('Item 1'));

        // Check if it's pressed/active
        expect(getByText('Item 1').closest('button')).toHaveAttribute('aria-pressed', 'true');
        expect(getByText('Item 1').closest('button')).toHaveAttribute('data-state', 'on');

        // Others should not be pressed
        expect(getByText('Item 2').closest('button')).toHaveAttribute('aria-pressed', 'false');
        expect(getByText('Item 3').closest('button')).toHaveAttribute('aria-pressed', 'false');
    });

    test('handles single selection with variation in toggles', () => {
        const { getByText } = render(
            <ToggleGroup.Root type="single">
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
                <ToggleGroup.Item value="item2">Item 2</ToggleGroup.Item>
                <ToggleGroup.Item value="item3">Item 3</ToggleGroup.Item>
            </ToggleGroup.Root>
        );

        // Perform a series of clicks
        fireEvent.click(getByText('Item 1'));
        fireEvent.click(getByText('Item 2'));
        fireEvent.click(getByText('Item 3'));
        fireEvent.click(getByText('Item 2')); // Select the second item again

        // Check final state
        expect(getByText('Item 1').closest('button')).toHaveAttribute('aria-pressed', 'false');

        expect(getByText('Item 2').closest('button')).toHaveAttribute('aria-pressed', 'true');
        expect(getByText('Item 2').closest('button')).toHaveAttribute('data-state', 'on');

        expect(getByText('Item 3').closest('button')).toHaveAttribute('aria-pressed', 'false');
    });

    test('applies color correctly', () => {
        const { container } = render(
            <ToggleGroup.Root color="blue">
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
                <ToggleGroup.Item value="item2">Item 2</ToggleGroup.Item>
            </ToggleGroup.Root>
        );
        const toggleGroupRoot = container.querySelector('.rad-ui-toggle-group');

        expect(toggleGroupRoot).toHaveAttribute('data-rad-ui-accent-color', 'blue');
    });

    test('warns when using ToggleGroup directly', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(<ToggleGroup />);

        expect(consoleSpy).toHaveBeenCalledWith(
            'Direct usage of ToggleGroup is not supported. Please use ToggleGroup.Root, ToggleGroup.Item, etc. instead.'
        );

        consoleSpy.mockRestore();
    });

    test('handles controlled mode correctly', () => {
        const handleValueChange = jest.fn();
        const { getByText, rerender } = render(
            <ToggleGroup.Root value={['item1']} onValueChange={handleValueChange}>
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
                <ToggleGroup.Item value="item2">Item 2</ToggleGroup.Item>
            </ToggleGroup.Root>
        );

        // Initial state
        expect(getByText('Item 1').closest('button')).toHaveAttribute('data-state', 'on');
        expect(getByText('Item 2').closest('button')).toHaveAttribute('data-state', 'off');

        // Click item 2
        fireEvent.click(getByText('Item 2'));
        expect(handleValueChange).toHaveBeenCalledWith(['item1', 'item2']);

        // Update props to reflect new state
        rerender(
            <ToggleGroup.Root value={['item1', 'item2']} onValueChange={handleValueChange}>
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
                <ToggleGroup.Item value="item2">Item 2</ToggleGroup.Item>
            </ToggleGroup.Root>
        );

        expect(getByText('Item 1').closest('button')).toHaveAttribute('data-state', 'on');
        expect(getByText('Item 2').closest('button')).toHaveAttribute('data-state', 'on');
    });

    test('handles uncontrolled mode with defaultValue', () => {
        const handleValueChange = jest.fn();
        const { getByText } = render(
            <ToggleGroup.Root defaultValue={['item1']} onValueChange={handleValueChange}>
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
                <ToggleGroup.Item value="item2">Item 2</ToggleGroup.Item>
            </ToggleGroup.Root>
        );

        // Initial state should be set by defaultValue
        expect(getByText('Item 1').closest('button')).toHaveAttribute('data-state', 'on');
        expect(getByText('Item 2').closest('button')).toHaveAttribute('data-state', 'off');

        // Click item 2
        fireEvent.click(getByText('Item 2'));
        expect(handleValueChange).toHaveBeenCalledWith(['item1', 'item2']);
    });

    test('handles disabled group state', () => {
        const { getByText } = render(
            <ToggleGroup.Root disabled={true}>
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
                <ToggleGroup.Item value="item2">Item 2</ToggleGroup.Item>
            </ToggleGroup.Root>
        );

        // All items should be disabled
        expect(getByText('Item 1').closest('button')).toBeDisabled();
        expect(getByText('Item 2').closest('button')).toBeDisabled();
        expect(getByText('Item 1').closest('button')).toHaveAttribute('data-disabled', '');
        expect(getByText('Item 2').closest('button')).toHaveAttribute('data-disabled', '');
    });

    test('handles disabled individual items', () => {
        const { getByText } = render(
            <ToggleGroup.Root>
                <ToggleGroup.Item value="item1" disabled={true}>Item 1</ToggleGroup.Item>
                <ToggleGroup.Item value="item2">Item 2</ToggleGroup.Item>
            </ToggleGroup.Root>
        );

        // Only item 1 should be disabled
        expect(getByText('Item 1').closest('button')).toBeDisabled();
        expect(getByText('Item 2').closest('button')).not.toBeDisabled();
        expect(getByText('Item 1').closest('button')).toHaveAttribute('data-disabled', '');
        expect(getByText('Item 2').closest('button')).not.toHaveAttribute('data-disabled');
    });

    test('sets data-orientation attribute', () => {
        const { container } = render(
            <ToggleGroup.Root orientation="vertical">
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
                <ToggleGroup.Item value="item2">Item 2</ToggleGroup.Item>
            </ToggleGroup.Root>
        );

        const toggleGroupRoot = container.querySelector('.rad-ui-toggle-group');
        expect(toggleGroupRoot).toHaveAttribute('data-orientation', 'vertical');
    });

    test('renders with asChild prop on items', () => {
        const { container } = render(
            <ToggleGroup.Root>
                <ToggleGroup.Item asChild value="item1">
                    <div data-testid="custom-item">Custom Item</div>
                </ToggleGroup.Item>
            </ToggleGroup.Root>
        );

        const customItem = container.querySelector('[data-testid="custom-item"]');
        expect(customItem).toBeInTheDocument();
        expect(customItem).toHaveAttribute('data-state', 'off');
    });

    test('disables roving focus when rovingFocus is false', () => {
        const { container } = render(
            <ToggleGroup.Root rovingFocus={false}>
                <ToggleGroup.Item value="item1">Item 1</ToggleGroup.Item>
                <ToggleGroup.Item value="item2">Item 2</ToggleGroup.Item>
            </ToggleGroup.Root>
        );

        // Should render a simple div instead of RovingFocusGroup
        const toggleGroupRoot = container.querySelector('.rad-ui-toggle-group');
        expect(toggleGroupRoot).toBeInTheDocument();
        expect(toggleGroupRoot.tagName).toBe('DIV');
    });
});
