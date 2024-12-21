import React from 'react';
import { render, screen } from '@testing-library/react';
import VisuallyHidden from '../VisuallyHidden';


describe('VisuallyHidden Component', () => {
    test('renders VisuallyHidden component', () => {
        render(<VisuallyHidden>Visually Hidden</VisuallyHidden>);
        expect(screen.getByText('Visually Hidden')).toBeInTheDocument();
    });

    test('renders VisuallyHidden component with className', () => {
        render(<VisuallyHidden className='extra-classname' >Visually Hidden</VisuallyHidden>);
        expect(screen.getByText('Visually Hidden')).toHaveClass('extra-classname');
    });

    test('renders VisuallyHidden component without asChild prop', () => {
        render(<VisuallyHidden >Visually Hidden</VisuallyHidden>);
        expect(screen.getByText('Visually Hidden')).tagName === 'DIV';
    });

    test('renders VisuallyHidden component with asChild prop as span', () => {
        render(<VisuallyHidden asChild><span>Visually Hidden</span></VisuallyHidden>);
        expect(screen.getByText('Visually Hidden')).tagName === 'SPAN';
    });
})