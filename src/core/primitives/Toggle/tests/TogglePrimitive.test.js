import React from 'react';
import { render, screen } from '@testing-library/react';
import TogglePrimitive from '../index';

describe('TogglePrimitive', () => {
    it('renders children correctly', () => {
        render(<TogglePrimitive>Test Content</TogglePrimitive>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
});
