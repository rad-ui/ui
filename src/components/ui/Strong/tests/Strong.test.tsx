import React from 'react';
import { render, screen } from '@testing-library/react';
import Strong from '../Strong';

describe('Strong Component', () => {
    it('renders content accessible to screen readers', () => {
        render(<Strong>I am Strong!</Strong>);

        const strongElement = screen.getByText('I am Strong!');
        expect(strongElement).toBeInTheDocument();
        expect(strongElement.tagName).toBe('STRONG');
        expect(strongElement).not.toHaveAttribute('aria-hidden');
    });

    it('forwards ref to the strong element', () => {
        const ref = React.createRef<HTMLElement>();
        render(<Strong ref={ref}>ref test</Strong>);
        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(ref.current?.tagName).toBe('STRONG');
    });

    it('renders Strong component with className', () => {
        render(<Strong className='font-bold'>I am Strong!</Strong>);
        expect(screen.getByText('I am Strong!')).toHaveClass('font-bold');
    });

    it('renders Strong component with custom className', () => {
        render(<Strong className="text-gray-1000">I am Strong!</Strong>);
        expect(screen.getByText('I am Strong!')).toHaveClass('text-gray-1000');
    });

    it('renders Strong component with custom style', () => {
        render(<Strong style={{ color: 'red' }}>I am Strong!</Strong>);
        expect(screen.getByText('I am Strong!')).toHaveStyle('color: red');
    });

    it('renders Strong component with custom id', () => {
        render(<Strong id="strong-id">I am Strong!</Strong>);
        expect(screen.getByText('I am Strong!')).toHaveAttribute('id', 'strong-id');
    });

    it('renders Strong component with custom data attribute', () => {
        render(<Strong data-testid="strong-data">I am Strong!</Strong>);
        expect(screen.getByText('I am Strong!')).toHaveAttribute('data-testid', 'strong-data');
    });

    it('renders without console warnings', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(<Strong>I am Strong!</Strong>);

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();

        warnSpy.mockRestore();
        errorSpy.mockRestore();
    });
});
