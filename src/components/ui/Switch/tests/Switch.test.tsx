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
})