import React from 'react';
import { render, screen } from '@testing-library/react';
import Em from '../Em';

describe('Em', () => {
    test('renders Em component', () => {
            render(<>Welcome to <Em>RadUI</Em></>);
            expect(screen.getByText('RadUI')).toBeInTheDocument();
        });

    test('renders Em tag with valid text', () => {
            render(<>Welcome to <Em>RadUI</Em></>);
            expect(screen.getByText('RadUI').tagName.toLowerCase()).toBe('em');
        });
    
    test('renders custom classes correctly', () => {
            render(<>Welcome to <Em className="custom-class">RadUI</Em></>);
            expect(screen.getByText('RadUI')).toHaveClass('custom-class');
        });
    
    test('renders custom styles correctly', () => {
            render(<>Welcome to <Em style={{ color: 'red' }}>RadUI</Em></>);
            expect(screen.getByText('RadUI')).toHaveStyle('color: red');
        });
    
    test('renders custom id correctly', () => {
            render(<>Welcome to <Em id="em-id">RadUI</Em></>);
            expect(screen.getByText('RadUI')).toHaveAttribute('id', 'em-id');
        });
    
    test('renders custom data attribute correctly', () => {
            render(<>Welcome to <Em data-testid="em-data">RadUI</Em></>);
            expect(screen.getByText('RadUI')).toHaveAttribute('data-testid', 'em-data');
        });
});