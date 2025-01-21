import { render } from '@testing-library/react';
import React from 'react';
import Code from '../Code';

describe('Code Component', () => {
    it('renders without crashing', () => {
        const { container } = render(<Code>console.log('Hello world!');</Code>);

        const codeElement = container.querySelector('code');
        expect(codeElement).toBeInTheDocument();
        expect(codeElement).toHaveTextContent("console.log('Hello world!');");
    });

    it('renders without crashing', () => {
        const { container } = render(<Code color='blue'>console.log('Hello world!');</Code>);

        const codeElement = container.querySelector('code');
        expect(codeElement).toBeInTheDocument();
        expect(codeElement).toHaveAttribute('data-accent-color', 'blue');
    });
})
