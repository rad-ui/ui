import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Disclosure from '../Disclosure';

const items = [
    { title: 'Item 1', content: 'Content 1' },
    { title: 'Item 2', content: 'Content 2' }
];

describe('Disclosure', () => {
    test('renders Disclosure component', () => {
        render(<Disclosure items={[]} />);
        expect(screen.getByTestId('disclosure-root')).toBeInTheDocument();
    });

    test('renders all item titles', () => {
        render(<Disclosure items={items} />);
        items.forEach(item => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
        });
    });


    test('shows content when an item is clicked', () => {
        render(<Disclosure items={items} />);
        fireEvent.click(screen.getByText('Item 1'));
        expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    test('hides content when the same item is clicked again', () => {
        render(<Disclosure items={items} />);
        const button = screen.getByText('Item 1');
        fireEvent.click(button);
        expect(screen.getByText('Content 1')).not.toHaveAttribute('');
    });

  
});
