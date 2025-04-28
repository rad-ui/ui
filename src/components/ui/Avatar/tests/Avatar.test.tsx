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

    test('renders avatar with the given variant', () => {
        render(<Avatar fallback="RU" variant='outline'/>);
        const fallback = screen.getByText('RU');
        expect(fallback.parentElement).toHaveAttribute('data-avatar-variant', 'outline');
    });

    test('renders avatar with the given size', () => {
        render(<Avatar fallback="RU"size='small'/>);
        const fallback = screen.getByText('RU');
        expect(fallback.parentElement).toHaveAttribute('data-avatar-size', 'small');
    });

    test('renders color for fallback when src is not provided', async() => {
        render(<Avatar fallback="RU" color='blue'/>);
        expect(screen.getByText('RU')).toHaveAttribute('data-rad-ui-accent-color', 'blue');
    });

    test('renders avatar with the given asChild', () => {
        render(<Avatar.Root>WithoutAschild</Avatar.Root>);
        const WithoutAschild = screen.getByText('WithoutAschild');
        expect(WithoutAschild.tagName).toBe('SPAN');

        render(<Avatar.Root asChild><div>WithAschild</div></Avatar.Root>);
        const div = screen.getByText('WithAschild');
        expect(div.tagName).toBe('DIV');
    });
});
