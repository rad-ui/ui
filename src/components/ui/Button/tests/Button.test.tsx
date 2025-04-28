import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../Button';

describe('Button', () => {
    test('renders button', () => {
        render(<Button>button</Button>);
        expect(screen.getByText('button')).toBeInTheDocument();
    });

    test('renders button with the given type', () => {
        render(<Button type='submit'>button</Button>);
        const button = screen.getByText('button');
        expect(button).toHaveAttribute('type', 'submit');
    });

    test('renders button with the given color', () => {
        render(<Button color='white'>button</Button>);
        const button = screen.getByText('button');
        expect(button).toHaveAttribute('data-rad-ui-accent-color', 'white');
    });

    test('renders button with the given variant', () => {
        render(<Button variant='outline'>button</Button>);
        const button = screen.getByText('button');
        expect(button).toHaveClass('rad-ui-button');
    });

    test('renders button with the given size', () => {
        render(<Button size='small'>button</Button>);
        const button = screen.getByText('button');
        expect(button).toHaveAttribute('data-button-size', 'small');
    });

    test('calls the onClick handler when the button is clicked', async() => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}>button</Button>);
        const button = screen.getByText('button');
        // click the button
        await userEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
