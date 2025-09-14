import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RadioPrimitive from '../index';

describe('RadioPrimitive', () => {
    const baseProps = {
        name: 'test-radio',
        value: 'option1',
        id: 'radio1'
    };

    it('renders with required props', () => {
        render(<RadioPrimitive {...baseProps} />);
        const radio = screen.getByRole('radio');
        expect(radio).toBeInTheDocument();
        expect(radio).toHaveAttribute('name', 'test-radio');
        expect(radio).toHaveAttribute('value', 'option1');
        expect(radio).toHaveAttribute('id', 'radio1');
    });

    it('applies checked, required, and disabled props', () => {
        render(
            <RadioPrimitive {...baseProps} checked required disabled />
        );
        const radio = screen.getByRole('radio');
        expect(radio).toBeChecked();
        expect(radio).toBeRequired();
        expect(radio).toBeDisabled();
        expect(radio).toHaveAttribute('aria-disabled', 'true');
        expect(radio).toHaveAttribute('aria-required', 'true');
    });

    it('calls onChange when clicked', () => {
        const handleChange = jest.fn();
        render(
            <RadioPrimitive {...baseProps} onChange={handleChange} />
        );
        const radio = screen.getByRole('radio');
        fireEvent.click(radio);
        expect(handleChange).toHaveBeenCalled();
    });

    it('supports asChild prop (renders without error)', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(<RadioPrimitive {...baseProps} asChild />);
        const radio = screen.getByRole('radio');
        expect(radio).toBeInTheDocument();
        expect(warnSpy).toHaveBeenCalledWith(
            'Primitive.input: asChild prop requires exactly one valid child element.'
        );
        warnSpy.mockRestore();
    });

    it('forwards refs', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<RadioPrimitive {...baseProps} ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});
