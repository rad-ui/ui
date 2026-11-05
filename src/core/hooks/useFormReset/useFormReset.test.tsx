import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useFormReset } from './index';

const Control = ({ onReset }: { onReset: () => void }) => {
    const ref = React.useRef<HTMLInputElement>(null);
    useFormReset(() => ref.current?.form, onReset, []);
    return <input ref={ref} name="x" />;
};

describe('useFormReset', () => {
    test('runs after the owning form resets', async() => {
        const onReset = jest.fn();
        render(
            <form data-testid="form">
                <Control onReset={onReset} />
            </form>
        );
        fireEvent.reset(screen.getByTestId('form'));
        expect(onReset).not.toHaveBeenCalled();
        await waitFor(() => expect(onReset).toHaveBeenCalledTimes(1));
    });

    test('does nothing when the reset event is cancelled', async() => {
        const onReset = jest.fn();
        const seen = jest.fn();
        render(
            <form data-testid="form" onReset={(event) => { seen(); event.preventDefault(); }}>
                <Control onReset={onReset} />
            </form>
        );
        fireEvent.reset(screen.getByTestId('form'));
        await waitFor(() => expect(seen).toHaveBeenCalled());
        await new Promise((resolve) => setTimeout(resolve, 10));
        expect(onReset).not.toHaveBeenCalled();
    });

    test('does nothing outside a form', async() => {
        const onReset = jest.fn();
        render(<Control onReset={onReset} />);
        fireEvent.reset(document.body);
        await new Promise((resolve) => setTimeout(resolve, 10));
        expect(onReset).not.toHaveBeenCalled();
    });
});
