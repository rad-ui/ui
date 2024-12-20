import React from 'react';
import { render, screen } from '@testing-library/react';
import AspectRatio from '../AspectRatio';

describe('AspectRatio', () => {
    test('renders AspectRatio component', () => {
        render(<AspectRatio>Content</AspectRatio>);
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    test('applies custom classes correctly', () => {
        render(<AspectRatio  className="additional-class">Content</AspectRatio>);
        const divElement = screen.getByText('Content');
        expect(divElement).toHaveClass('additional-class');
    });

    test('applies correct aspect ratio', () => {
        render(<AspectRatio ratio="16/9">Content</AspectRatio>);
        expect(screen.getByText('Content')).toHaveStyle( "aspect-ratio: 16/9");
    });
    
});