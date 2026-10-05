import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Radio from '../Radio';

describe('Radio', () => {
    const baseProps = {
        name: 'test-radio',
        value: 'option1',
        id: 'radio1'
    };

    it('renders with required props', () => {
        render(<Radio {...baseProps} />);
        const radio = screen.getByRole('radio');
        expect(radio).toBeInTheDocument();
        expect(radio).toHaveAttribute('name', 'test-radio');
        expect(radio).toHaveAttribute('value', 'option1');
        expect(radio).toHaveAttribute('id', 'radio1');
    });

    it('applies checked, required, and disabled props', () => {
        render(
            <Radio {...baseProps} checked required disabled />
        );
        const radio = screen.getByRole('radio');
        expect(radio).toBeChecked();
        expect(radio).toBeRequired();
        expect(radio).toBeDisabled();
        expect(radio).toHaveAttribute('aria-disabled', 'true');
        expect(radio).toHaveAttribute('aria-required', 'true');
    });

    it('toggles checked state on click', () => {
        render(<Radio {...baseProps} />);
        const radio = screen.getByRole('radio');
        expect(radio).not.toBeChecked();
        fireEvent.click(radio);
        expect(radio).toBeChecked();
    });

    it('calls onChange when clicked', () => {
        const handleChange = jest.fn();
        render(
            <Radio {...baseProps} onChange={handleChange} />
        );
        const radio = screen.getByRole('radio');
        fireEvent.click(radio);
        expect(handleChange).toHaveBeenCalled();
    });

    it('syncs controlled checked prop changes', () => {
        const { rerender } = render(<Radio {...baseProps} checked={false} onChange={jest.fn()} />);
        const radio = screen.getByRole('radio');

        expect(radio).not.toBeChecked();
        expect(radio).toHaveAttribute('data-state', 'unchecked');

        rerender(<Radio {...baseProps} checked onChange={jest.fn()} />);

        expect(radio).toBeChecked();
        expect(radio).toHaveAttribute('data-state', 'checked');
    });

    it('applies custom class names', () => {
        render(
            <Radio {...baseProps} className="custom-class" customRootClass="root-class" />
        );
        const radio = screen.getByRole('radio');
        expect(radio.className).toMatch(/custom-class/);
        expect(radio.className).toMatch(/root-class/);
    });

    it('applies data attributes for variant, size, and color', () => {
        render(
            <Radio {...baseProps} variant="filled" size="lg" color="red" />
        );
        const radio = screen.getByRole('radio');
        expect(radio).toHaveAttribute('data-variant', 'filled');
        expect(radio).toHaveAttribute('data-size', 'lg');
        expect(radio).toHaveAttribute('data-color', 'red');
    });

    it('exposes stable state and anatomy data attributes', () => {
        render(<Radio {...baseProps} />);
        const radio = screen.getByRole('radio');

        expect(radio).toHaveAttribute('data-slot', 'radio-root');
        expect(radio).toHaveAttribute('data-state', 'unchecked');

        fireEvent.click(radio);

        expect(radio).toHaveAttribute('data-state', 'checked');
    });

    it('exposes disabled state as a data attribute', () => {
        const { rerender } = render(<Radio {...baseProps} />);
        const radio = screen.getByRole('radio');

        expect(radio).not.toHaveAttribute('data-disabled');

        rerender(<Radio {...baseProps} disabled />);

        expect(radio).toHaveAttribute('data-disabled');
    });

    it('preserves component-owned data attributes', () => {
        render(<Radio {...baseProps} data-slot="custom-radio" data-state="custom" data-disabled="custom" />);
        const radio = screen.getByRole('radio');

        expect(radio).toHaveAttribute('data-slot', 'radio-root');
        expect(radio).toHaveAttribute('data-state', 'unchecked');
        expect(radio).not.toHaveAttribute('data-disabled');
    });

    it('forwards refs', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Radio {...baseProps} ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
    it('honors defaultChecked without mixing controlled and uncontrolled input props', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(<Radio {...baseProps} defaultChecked />);
        const radio = screen.getByRole('radio');

        expect(radio).toBeChecked();
        expect(radio).toHaveAttribute('data-state', 'checked');
        expect(errorSpy).not.toHaveBeenCalledWith(
            expect.stringContaining('both checked and defaultChecked'),
            expect.anything(),
            expect.anything()
        );
        errorSpy.mockRestore();
    });

    it('stays checked when a checked radio is clicked again', () => {
        render(<Radio {...baseProps} defaultChecked />);
        const radio = screen.getByRole('radio');

        fireEvent.click(radio);

        expect(radio).toBeChecked();
        expect(radio).toHaveAttribute('data-state', 'checked');
    });

    it('unchecks uncontrolled siblings that share a name', () => {
        render(
            <>
                <Radio name="plan" value="free" id="plan-free" defaultChecked />
                <Radio name="plan" value="pro" id="plan-pro" />
            </>
        );
        const [free, pro] = screen.getAllByRole('radio');

        fireEvent.click(pro);

        expect(pro).toHaveAttribute('data-state', 'checked');
        expect(free).not.toBeChecked();
        expect(free).toHaveAttribute('data-state', 'unchecked');
    });

    it('is reachable with the keyboard', () => {
        render(<Radio {...baseProps} />);
        expect(screen.getByRole('radio')).not.toHaveAttribute('tabindex', '-1');
    });
});
