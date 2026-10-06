import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from '../Heading';

describe('Heading', () => {
    test('renders children correctly', () => {
        render(<Heading>Test Content</Heading>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('Heading applies className correctly', () => {
        render(<Heading className="test-class">Test Content</Heading>);
        const element = screen.getByText('Test Content');
        expect(element).toHaveClass('test-class');
    });

    test('Heading renders the correct tag based on the as prop', () => {
        render(<Heading as="h2">Test Content</Heading>);
        const element = screen.getByText('Test Content');
        expect(element.tagName.toLowerCase()).toBe('h2');
    });

    test('Heading renders default h1 tag when as prop is not provided', () => {
        render(<Heading>Test Content</Heading>);
        const element = screen.getByText('Test Content');
        expect(element.tagName.toLowerCase()).toBe('h1');
    });

    test('Heading renders default h1 tag when as prop is not valid', () => {
        render(<Heading as={'h10' as 'h1'}>Test Content</Heading>);
        const element = screen.getByText('Test Content');
        expect(element.tagName.toLowerCase()).toBe('h1');
    });

    test('invalid as prop falls back to the h1 class as well as the h1 tag', () => {
        render(<Heading customRootClass="rad-ui" as={'h10' as 'h1'}>Fallback</Heading>);
        const element = screen.getByText('Fallback');
        expect(element).toHaveClass('rad-ui-h1');
        expect(element).not.toHaveClass('rad-ui-h10');
    });

    test('Heading spreads additional props correctly', () => {
        render(<Heading data-testid="heading-element">Test Content</Heading>);
        const element = screen.getByTestId('heading-element');
        expect(element).toBeInTheDocument();
    });

    test('forwards ref to the DOM element', () => {
        const ref = React.createRef<HTMLHeadingElement>();
        render(<Heading ref={ref}>Test Content</Heading>);
        expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });

    test('visually hidden headings remain accessible to screen readers', () => {
        render(<Heading className="sr-only">Hidden Heading</Heading>);
        const element = screen.getByRole('heading', { name: 'Hidden Heading' });
        expect(element).toBeInTheDocument();
    });

    test('renders without console warnings', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(<Heading>Test Content</Heading>);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(warnSpy).not.toHaveBeenCalled();
        errorSpy.mockRestore();
        warnSpy.mockRestore();
    });

    test('Clarity styles use typography tokens where a matching token exists', () => {
        const fs = require('node:fs');
        const path = require('node:path');
        const rules: string = fs.readFileSync(path.resolve(__dirname, '../heading.clarity.scss'), 'utf8').replace(/\/\/.*$/gm, '');
        // h1-h3 have no matching font-size token yet; h4-h6 sizes/line-heights do.
        for (const level of ['h4', 'h5', 'h6']) {
            const block = rules.slice(rules.indexOf(`.rad-ui-${level}`)).split('}')[0];
            expect(block).not.toMatch(/line-height:\s*\d+px/);
        }
        expect(rules).toContain('var(--rad-ui-font-size-5)');
        expect(rules).toContain('var(--rad-ui-font-size-4)');
    });
});
