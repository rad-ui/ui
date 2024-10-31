// MyComponent.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Avatar from '../Avatar';

describe('Avatar', () => {
    test('renders Avatar component', () => {
        render(<Avatar fallback="RU" />);
        expect(screen.getByText('RU')).toBeInTheDocument();
    });

    test('renders img tag with valid src', () => {
        const url = 'https://i.pravatar.cc/300';
        render(<Avatar src={url} fallback="RU" />);
        const image = screen.getByRole('img');
        // check if image has url as src
        expect(image).toHaveAttribute('src', url);
    });

    test('renders fallback when src is not provided', async() => {
        render(<Avatar fallback="RU" />);
        expect(screen.getByText('RU')).toBeInTheDocument();
    });
});
