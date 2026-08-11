import React from 'react';
import { render, screen } from '@testing-library/react';
import Primitive from '..';

describe('Primitive', () => {
    it('renders children correctly', () => {
        render(<Primitive.div>Test Content</Primitive.div>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    // check for div
    it('applies custom className when provided', () => {
        render(<Primitive.div className="custom-class">Content</Primitive.div>);
        const element = screen.getByText('Content');
        expect(element).toHaveClass('custom-class');
    });

    // check for span
    it('renders as span when provided', () => {
        render(<Primitive.span>Content</Primitive.span>);
        const element = screen.getByText('Content');
        expect(element.tagName).toBe('SPAN');
    });

    // check for button
    it('renders as button when provided', () => {
        render(<Primitive.button>Content</Primitive.button>);
        const element = screen.getByText('Content');
        expect(element.tagName).toBe('BUTTON');
    });

    it('renders as anchor with href', () => {
        render(
            <Primitive.a href="https://example.com" target="_blank" rel="noreferrer">
                Link
            </Primitive.a>
        );
        const element = screen.getByRole('link', { name: 'Link' });
        expect(element).toHaveAttribute('href', 'https://example.com');
        expect(element).toHaveAttribute('target', '_blank');
        expect(element.tagName).toBe('A');
    });
});
