import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import Switch from "../Switch";

describe('Switch Component', () => {
    
    test('renders correctly', () => {
       render(<Switch checked={true} onChange={() => {}}/>)
       const inputElement = screen.getByRole('checkbox')
       expect(inputElement).toBeInTheDocument();
    })

    test('renders with checked state', () => {
        render(<Switch checked={true} onChange={() => {}}/>)
        const inputElement = screen.getByRole('checkbox')
        expect(inputElement).toHaveAttribute('aria-checked', 'true')
    })

    test('toggles state on click', () => {
        const handleChange = jest.fn();
        render(<Switch checked={true} onChange={handleChange}/>)
        const switchElement = screen.getByRole('switch')
        
        fireEvent.click(switchElement)
        expect(handleChange).toHaveBeenCalledWith(false)

        fireEvent.click(switchElement)
        expect(handleChange).toHaveBeenCalledWith(true)
    })

    test('toggle state on when clicked', () => {
        render(<Switch checked={true} onChange={() => {}} defaultChecked={true} />)
        const checkbox = screen.getByRole('checkbox')

        expect(checkbox).toBeChecked()

        fireEvent.click(checkbox)
        expect(checkbox).toBeChecked()      
    })
    
    test('toggle state off when clicked again', () => {
        render(<Switch checked={false} onChange={() => {}} defaultChecked={false} />)
        const checkbox = screen.getByRole('checkbox')

        fireEvent.click(checkbox)
        expect(checkbox).not.toBeChecked()      
    })

})