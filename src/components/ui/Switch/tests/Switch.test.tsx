import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Switch from '../Switch';

describe('Switch Component', () => {
    it('renders without breaking', () => {
        const { container } = render(<Switch checked={false} color='red' onChange={() => {}}/>);
        const inputElements = container.querySelectorAll('input');
        const buttonElements = container.querySelectorAll('button');

        expect(inputElements.length).toEqual(1);
        expect(buttonElements.length).toEqual(1);
        
        const targetInput = inputElements[0];
        const targetButton = buttonElements[0];
        
        expect(targetInput).toHaveAttribute('type', 'checkbox');
        expect(targetButton).toHaveRole('switch');
    });

    it('renders with default value', () => {
        const { container } = render(<Switch checked={false} defaultChecked={true} color='red' onChange={() => {}}/>);
        const targetInput = container.querySelector('input');
        
        expect(targetInput).toBeTruthy();
        expect(targetInput!.checked).toEqual(true);
    });

    it('renders with user defined custom class', () => {
        const { container } = render(<Switch checked={false} customRootClass='root-class' color='red' onChange={() => {}}/>);
        const targetInput = container.querySelector('input');
        
        expect(targetInput).toBeTruthy();
        expect(targetInput!).toHaveClass('root-class');
    });

    it('performs action on change state', () => {
        let value = 1;
        const mockOnChange = () => {
            value += 1;
        };

        const { container } = render(<Switch checked={false} customRootClass='root-class' className='custom-class' color='red' onChange={mockOnChange}/>);
        const targetButton = container.querySelector('button'); 

        fireEvent.click(targetButton!);
        expect(value).toEqual(2);

        fireEvent.click(targetButton!);
        expect(value).toEqual(3); 
    });
});