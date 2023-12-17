// MyComponent.test.js
import React from 'react';
import {render, screen} from '@testing-library/react';
import Avatar from '../Avatar';

test('renders MyComponent with message', () => {
    render(<Avatar fallback="RU" />);
    expect(screen.getByText('RU')).toBeInTheDocument();
});
