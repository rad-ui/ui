import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ToggleGroup from '../ToggleGroup';

const items = [
    { value: 'item1', label: 'Item 1' },
    { value: 'item2', label: 'Item 2' },
    { value: 'item3', label: 'Item 3' },
];

describe('ToggleGroup component', () => {
    it('renders correctly', () => {
        const { container } = render(<ToggleGroup />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('renders the correct number of ToggleItem components', () => {
        const { getAllByText } = render(<ToggleGroup items={items} />);
        expect(getAllByText(/Item/).length).toBe(items.length);
    });

    // it('passes the correct props to ToggleGroupRoot', () => {
    //     render(<ToggleGroup type="multiple" items={items}/>);
    //     const toggleGroupRoot = document.querySelector('.rad-ui-toggle-group');
    //     console.log(toggleGroupRoot.children)
        
    // });
});