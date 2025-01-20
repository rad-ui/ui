import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import Switch from "../Switch";

describe('Switch Component', () => {
    
    test('renders correctly', () => {
       render(<Switch checked={true} onChange={() => {}} color='' />)
       const inputElement = screen.getByRole('checkbox')
       expect(inputElement).toBeInTheDocument();
    })

    test('renders in controlled mode correctly', () => {
        const handleChange = jest.fn();
        render(<Switch checked={true} onChange={handleChange} color=''/>)
        const switchElement = screen.getByRole('switch')
        
        fireEvent.click(switchElement)
        expect(handleChange).toHaveBeenCalledWith(false)

        fireEvent.click(switchElement)
        expect(handleChange).toHaveBeenCalledWith(true)
    })

    test('renders in uncontrolled mode correctly', () => {
        render(<Switch checked={true} color='' defaultChecked={true} onChange={() => {}} />)
        const checkbox = screen.getByRole('checkbox')

        expect(checkbox).toBeChecked()

        fireEvent.click(checkbox)
        expect(checkbox).toBeChecked()      
    })
    
    test('toggles state internally when clicked', () => {
        render(<Switch checked={false} color='' defaultChecked={false} onChange={() => {}}  />)
        const checkbox = screen.getByRole('checkbox')

        fireEvent.click(checkbox)
        expect(checkbox).not.toBeChecked()      
    })

})