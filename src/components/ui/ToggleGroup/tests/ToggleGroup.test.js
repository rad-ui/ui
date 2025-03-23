import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ToggleGroup from '../ToggleGroup';

const items = [
    { value: 'item1', label: 'Item 1' },
    { value: 'item2', label: 'Item 2' },
    { value: 'item3', label: 'Item 3' }
];

describe('ToggleGroup component', () => {
    test('renders correctly', () => {
        const { container, getAllByText } = render(<ToggleGroup items={items}/>);
        expect(container.firstChild).toBeInTheDocument();

        // Verify all items are rendered
        const itemElements = getAllByText(/Item/);
        expect(itemElements.length).toBe(items.length);
    });

    test('renders the correct number of ToggleItem components', () => {
        const { getAllByText } = render(<ToggleGroup items={items} />);
        expect(getAllByText(/Item/).length).toBe(items.length);
    });

    test('ToggleGroup handles multiple selection', () => {
        const { getByText } = render(<ToggleGroup type="multiple" items={items}/>);

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

    test('ToggleGroup handles multiple selection with variation in toggles', () => {
        const { getByText } = render(<ToggleGroup type="multiple" items={items}/>);

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

    test('ToggleGroup handles single selection', () => {
        const { getByText } = render(<ToggleGroup type="single" items={items}/>);

        // Click the first item
        fireEvent.click(getByText('Item 1'));

        // Check if it's pressed/active
        expect(getByText('Item 1').closest('button')).toHaveAttribute('aria-pressed', 'true');
        expect(getByText('Item 1').closest('button')).toHaveAttribute('data-active', 'true');

        // Others should not be pressed
        expect(getByText('Item 2').closest('button')).toHaveAttribute('aria-pressed', 'false');
        expect(getByText('Item 3').closest('button')).toHaveAttribute('aria-pressed', 'false');
    });

    test('ToggleGroup handles single selection with variation in toggles', () => {
        const { getByText } = render(<ToggleGroup type="single" items={items}/>);

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

    test('ToggleGroup color correctly', () => {
        const { container } = render(<ToggleGroup type="single" items={items} color='blue'/>);
        const toggleGroupRoot = container.querySelector('.rad-ui-toggle-group');

        expect(toggleGroupRoot).toHaveAttribute('data-accent-color', 'blue');
    });
});
