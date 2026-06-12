import React from 'react';
import { render, screen } from '@testing-library/react';
import AspectRatio from '../AspectRatio';

describe('AspectRatio', () => {
    test('renders AspectRatio component', () => {
        render(<AspectRatio>Content</AspectRatio>);
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    test('applies custom classes correctly', () => {
        render(<AspectRatio className="additional-class">Content</AspectRatio>);
        const divElement = screen.getByText('Content');
        expect(divElement).toHaveClass('additional-class');
    });

    test('applies correct aspect ratio', () => {
        render(<AspectRatio ratio="16/9">Content</AspectRatio>);
        expect(screen.getByText('Content').style.aspectRatio).toBe('16/9');
    });

    test('applies correct aspect ratio when ratio is not provided', () => {
        render(<AspectRatio >Content</AspectRatio>);
        expect(screen.getByText('Content').style.aspectRatio).toBe('1');
    });

    test('applies correct aspect ratio when ratio is invalid', () => {
        render(<AspectRatio ratio="invalid">Content</AspectRatio>);
        expect(screen.getByText('Content').style.aspectRatio).toBe('1');
    });

    test('applies correct aspect ratio when ratio contains a character', () => {
        render(<AspectRatio ratio="16/o">Content</AspectRatio>);
        expect(screen.getByText('Content').style.aspectRatio).toBe('1');
    });

    test('applies correct aspect ratio when ratio is negative', () => {
        render(<AspectRatio ratio="-5">Content</AspectRatio>);
        expect(screen.getByText('Content').style.aspectRatio).toBe('1');
    });

    test('forwards ref to underlying div', () => {
        const ref = React.createRef();
        render(<AspectRatio ref={ref}>Content</AspectRatio>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    test('renders without console errors or warnings', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(<AspectRatio>Content</AspectRatio>);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(warnSpy).not.toHaveBeenCalled();
        errorSpy.mockRestore();
        warnSpy.mockRestore();
    });
});
