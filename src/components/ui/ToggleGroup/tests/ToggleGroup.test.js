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
        const { container } = render(<ToggleGroup items={items}/>);
        expect(container.firstChild).toBeInTheDocument();
        const toggleGroupRoot = document.querySelector('.rad-ui-toggle-group');

        for (let i = 0; i < items.length; i++) {
            expect(toggleGroupRoot.children[i]).toBeInTheDocument();
        }
    });

    test('renders the correct number of ToggleItem components', () => {
        const { getAllByText } = render(<ToggleGroup items={items} />);
        expect(getAllByText(/Item/).length).toBe(items.length);
    });

    test('ToggleGroup handles multiple selection', () => {
        render(<ToggleGroup type="multiple" items={items}/>);
        const toggleGroupRoot = document.querySelector('.rad-ui-toggle-group');
        fireEvent.click(toggleGroupRoot.children[0]);
        fireEvent.click(toggleGroupRoot.children[1]);

        expect(toggleGroupRoot.children[0]).toHaveAttribute('aria-pressed', 'true');
        expect(toggleGroupRoot.children[0]).toHaveAttribute('data-active', 'true');

        expect(toggleGroupRoot.children[1]).toHaveAttribute('aria-pressed', 'true');
        expect(toggleGroupRoot.children[1]).toHaveAttribute('data-active', 'true');

        expect(toggleGroupRoot.children[2]).toHaveAttribute('aria-pressed', 'false');
    });

    test('ToggleGroup handles multiple selection with variation in toggles', () => {
        render(<ToggleGroup type="multiple" items={items}/>);
        const toggleGroupRoot = document.querySelector('.rad-ui-toggle-group');
        fireEvent.click(toggleGroupRoot.children[0]);
        fireEvent.click(toggleGroupRoot.children[1]);
        fireEvent.click(toggleGroupRoot.children[2]);
        fireEvent.click(toggleGroupRoot.children[1]);

        expect(toggleGroupRoot.children[0]).toHaveAttribute('aria-pressed', 'true');
        expect(toggleGroupRoot.children[0]).toHaveAttribute('data-active', 'true');

        expect(toggleGroupRoot.children[1]).toHaveAttribute('aria-pressed', 'false');

        expect(toggleGroupRoot.children[2]).toHaveAttribute('aria-pressed', 'true');
        expect(toggleGroupRoot.children[2]).toHaveAttribute('data-active', 'true');
    });

    test('ToggleGroup handles single selection', () => {
        render(<ToggleGroup type="single" items={items}/>);
        const toggleGroupRoot = document.querySelector('.rad-ui-toggle-group');
        fireEvent.click(toggleGroupRoot.children[0]);

        expect(toggleGroupRoot.children[0]).toHaveAttribute('aria-pressed', 'true');
        expect(toggleGroupRoot.children[0]).toHaveAttribute('data-active', 'true');

        expect(toggleGroupRoot.children[1]).toHaveAttribute('aria-pressed', 'false');
        expect(toggleGroupRoot.children[2]).toHaveAttribute('aria-pressed', 'false');
    });

    test('ToggleGroup handles single selection with variation in toggles', () => {
        render(<ToggleGroup type="single" items={items}/>);
        const toggleGroupRoot = document.querySelector('.rad-ui-toggle-group');

        fireEvent.click(toggleGroupRoot.children[0]);
        fireEvent.click(toggleGroupRoot.children[1]);
        fireEvent.click(toggleGroupRoot.children[2]);
        fireEvent.click(toggleGroupRoot.children[1]);

        expect(toggleGroupRoot.children[0]).toHaveAttribute('aria-pressed', 'false');

        expect(toggleGroupRoot.children[1]).toHaveAttribute('aria-pressed', 'true');
        expect(toggleGroupRoot.children[1]).toHaveAttribute('data-active', 'true');

        expect(toggleGroupRoot.children[2]).toHaveAttribute('aria-pressed', 'false');
    });

    test('ToggleGroup color correctly', () => {
        render(<ToggleGroup type="single" items={items} color='blue'/>);
        const toggleGroupRoot = document.querySelector('.rad-ui-toggle-group');

        expect(toggleGroupRoot).toHaveAttribute('data-accent-color', 'blue');
    });

});
