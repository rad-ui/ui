import React from 'react';
import { render, screen } from '@testing-library/react';
import VisuallyHidden from '../VisuallyHidden';

describe('VisuallyHidden Component', () => {
    test('renders children content', () => {
        render(<VisuallyHidden>Hidden content</VisuallyHidden>);
        expect(screen.getByText('Hidden content')).toBeInTheDocument();
    });

    test('forwards ref to underlying element', () => {
        const ref = React.createRef();
        render(<VisuallyHidden ref={ref}>Hidden content</VisuallyHidden>);
        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(ref.current.tagName).toBe('DIV');
    });

    test('applies visually hidden styles', () => {
        render(<VisuallyHidden>Hidden content</VisuallyHidden>);
        const element = screen.getByText('Hidden content');

        expect(element).toHaveStyle({
            position: 'absolute',
            width: '1px',
            height: '1px',
            margin: '-1px',
            border: '0',
            padding: '0',
            whiteSpace: 'nowrap',
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            overflow: 'hidden',
            pointerEvents: 'none',
            userSelect: 'none'
        });
    });

    test('merges custom className with default styles', () => {
        render(<VisuallyHidden className="custom-class">Hidden content</VisuallyHidden>);
        const element = screen.getByText('Hidden content');

        expect(element).toHaveClass('custom-class');
        expect(element).toHaveStyle({
            position: 'absolute',
            width: '1px'
        });
    });

    test('merges custom style with default styles', () => {
        render(
            <VisuallyHidden style={{ color: 'red', fontSize: '16px' }}>
                Hidden content
            </VisuallyHidden>
        );
        const element = screen.getByText('Hidden content');

        expect(element).toHaveStyle({
            position: 'absolute',
            width: '1px',
            color: 'red',
            fontSize: '16px'
        });
    });

    test('renders as div by default', () => {
        render(<VisuallyHidden>Hidden content</VisuallyHidden>);
        const element = screen.getByText('Hidden content');
        expect(element.tagName).toBe('DIV');
    });

    test('works with asChild prop to render as span', () => {
        render(
            <VisuallyHidden asChild>
                <span>Hidden content</span>
            </VisuallyHidden>
        );
        const element = screen.getByText('Hidden content');
        expect(element.tagName).toBe('SPAN');
        expect(element).toHaveStyle({
            position: 'absolute',
            width: '1px'
        });
    });

    test('works with asChild prop to render as button', () => {
        render(
            <VisuallyHidden asChild>
                <button>Hidden button</button>
            </VisuallyHidden>
        );
        const element = screen.getByText('Hidden button');
        expect(element.tagName).toBe('BUTTON');
        expect(element).toHaveStyle({
            position: 'absolute',
            width: '1px'
        });
    });

    test('forwards additional props to the element', () => {
        render(
            <VisuallyHidden
                data-testid="hidden-element"
                aria-label="Hidden label"
                onClick={() => {}}
            >
                Hidden content
            </VisuallyHidden>
        );

        const element = screen.getByTestId('hidden-element');
        expect(element).toHaveAttribute('aria-label', 'Hidden label');
        expect(element).toBeInTheDocument();
    });

    test('maintains accessibility for screen readers', () => {
        render(
            <VisuallyHidden>
                This text should be accessible to screen readers
            </VisuallyHidden>
        );

        const element = screen.getByText('This text should be accessible to screen readers');
        expect(element).toBeInTheDocument();
        // The element should be in the DOM but visually hidden
        expect(element).toHaveStyle({
            position: 'absolute',
            width: '1px',
            height: '1px'
        });
    });

    test('handles empty children gracefully', () => {
        const { container } = render(<VisuallyHidden />);
        // Should render a div element even without children
        const element = container.firstChild;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('DIV');
        expect(element).toHaveStyle({
            position: 'absolute',
            width: '1px',
            height: '1px'
        });
    });

    test('works with complex nested content', () => {
        render(
            <VisuallyHidden>
                <span>Nested</span> content with <strong>formatting</strong>
            </VisuallyHidden>
        );

        expect(screen.getByText('Nested')).toBeInTheDocument();
        expect(screen.getByText('content with')).toBeInTheDocument();
        expect(screen.getByText('formatting')).toBeInTheDocument();
    });
});
