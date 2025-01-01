import { render, getByText } from '@testing-library/react';
import React from 'react';
import Code from '../Code';

describe('Code Component', () => {
    it('renders without crashing', () => {
        render(<Code>console.log('Hello world!');</Code>);

        const container = document.querySelector('code');
        expect(container).toBeTruthy();
        getByText(container!, "console.log('Hello world!');")
    });
})
