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
        expect(getByText('Item 1').closest('button')).toHaveAttribute('data-active', 'true');

        expect(getByText('Item 2').closest('button')).toHaveAttribute('aria-pressed', 'true');
        expect(getByText('Item 2').closest('button')).toHaveAttribute('data-active', 'true');

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
        expect(getByText('Item 1').closest('button')).toHaveAttribute('data-active', 'true');

        expect(getByText('Item 2').closest('button')).toHaveAttribute('aria-pressed', 'false');

        expect(getByText('Item 3').closest('button')).toHaveAttribute('aria-pressed', 'true');
        expect(getByText('Item 3').closest('button')).toHaveAttribute('data-active', 'true');
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
        expect(getByText('Item 1').closest('button')).toHaveAttribute('data-active', 'true');

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
        expect(getByText('Item 2').closest('button')).toHaveAttribute('data-active', 'true');

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
});
