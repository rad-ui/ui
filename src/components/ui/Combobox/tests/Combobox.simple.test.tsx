import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Combobox from '../Combobox';

describe('Combobox Simple Test', () => {
    it('renders root', () => {
        render(<Combobox.Root>Root</Combobox.Root>);
        expect(screen.getByText('Root')).toBeInTheDocument();
    });
});
