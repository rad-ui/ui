import { render, screen } from '@testing-library/react';
import React from 'react';
import Code from '../Code';

describe('Code Component', () => {
    it('renders content accessible to screen readers', () => {
        render(<Code>console.log('Hello world!');</Code>);

        const codeElement = screen.getByText("console.log('Hello world!');");
        expect(codeElement).toBeInTheDocument();
        expect(codeElement.tagName).toBe('CODE');
        expect(codeElement).not.toHaveAttribute('aria-hidden');
    });

    it('forwards ref to the code element', () => {
        const ref = React.createRef<HTMLElement>();
        render(<Code ref={ref}>ref test</Code>);
        expect(ref.current).toBeInstanceOf(HTMLElement);
        expect(ref.current?.tagName).toBe('CODE');
    });

    it('renders Code component with correct color', () => {
        const { container } = render(<Code color='blue'>console.log('Hello world!');</Code>);

        const codeElement = container.querySelector('code');
        expect(codeElement).toBeInTheDocument();
        expect(codeElement).toHaveAttribute('data-rad-ui-accent-color', 'blue');
    });

    it('renders without console warnings', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(<Code>console.log('Hello world!');</Code>);

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        warnSpy.mockRestore();
        errorSpy.mockRestore();
    });
});
