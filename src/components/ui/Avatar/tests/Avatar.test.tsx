import React from 'react';
import { render, screen } from '@testing-library/react';
import Avatar from '../Avatar';

const Component = () => {
    return <Avatar.Root color='blue' size='small' variant='outline'>
        <Avatar.Image src='https://i.pravatar.cc/300' alt='avatar' />
        <Avatar.Fallback>RU</Avatar.Fallback>
    </Avatar.Root>;
};

const FallbackComponent = () => {
    return <Avatar.Root color='blue' size='small' variant='outline'>
        <Avatar.Fallback>RU</Avatar.Fallback>
    </Avatar.Root>;
};

describe('Avatar', () => {
    test('renders Avatar component', () => {
        render(<Component />);
        expect(screen.getByText('RU')).toBeInTheDocument();
    });

    test('renders img tag with valid src', () => {
        const url = 'https://i.pravatar.cc/300';
        render(<Component />);
        const image = screen.getByRole('img');
        // check if image has url as src
        expect(image).toHaveAttribute('src', url);
    });

    test('renders fallback when src is not provided', async() => {
        render(<Component />);
        expect(screen.getByText('RU')).toBeInTheDocument();
    });

    test('renders avatar with the given variant', () => {
        render(<FallbackComponent />);
        const fallback = screen.getByText('RU');
        expect(fallback.parentElement).toHaveAttribute('data-avatar-variant', 'outline');
    });

    test('renders avatar with the given size', () => {
        render(<FallbackComponent />);
        const fallback = screen.getByText('RU');
        expect(fallback.parentElement).toHaveAttribute('data-avatar-size', 'small');
    });

    test('renders avatar with the given color', () => {
        render(<FallbackComponent />);
        const fallback = screen.getByText('RU');
        expect(fallback.parentElement).toHaveAttribute('data-rad-ui-accent-color', 'blue');
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
