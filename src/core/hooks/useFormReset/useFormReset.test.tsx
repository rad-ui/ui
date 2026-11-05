import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useFormReset } from './index';

const Control = ({ onReset, dep = 0 }: { onReset: () => void; dep?: number }) => {
    const ref = React.useRef<HTMLInputElement>(null);
    useFormReset(() => ref.current?.form, onReset, [dep]);
    return <input ref={ref} name="x" data-dep={dep} />;
};

const settle = () => new Promise((resolve) => setTimeout(resolve, 10));

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
        await settle();
        expect(onReset).not.toHaveBeenCalled();
    });

    test('a cancelled reset does not drop the restore of a reset before it', async() => {
        const onReset = jest.fn();
        let cancelNext = false;
        render(
            <form data-testid="form" onReset={(event) => { if (cancelNext) event.preventDefault(); }}>
                <Control onReset={onReset} />
            </form>
        );
        const form = screen.getByTestId('form');
        fireEvent.reset(form);
        cancelNext = true;
        fireEvent.reset(form);
        await settle();
        expect(onReset).toHaveBeenCalledTimes(1);
    });

    test('a pending restore survives a dependency change', async() => {
        const onReset = jest.fn();
        const { rerender } = render(
            <form data-testid="form">
                <Control onReset={onReset} dep={0} />
            </form>
        );
        fireEvent.reset(screen.getByTestId('form'));
        rerender(
            <form data-testid="form">
                <Control onReset={onReset} dep={1} />
            </form>
        );
        await waitFor(() => expect(onReset).toHaveBeenCalledTimes(1));
    });

    test('unmounting cancels a pending restore', async() => {
        const onReset = jest.fn();
        const { unmount } = render(
            <form data-testid="form">
                <Control onReset={onReset} />
            </form>
        );
        fireEvent.reset(screen.getByTestId('form'));
        unmount();
        await settle();
        expect(onReset).not.toHaveBeenCalled();
    });

    test('does nothing outside a form', async() => {
        const onReset = jest.fn();
        render(<Control onReset={onReset} />);
        fireEvent.reset(document.body);
        await settle();
        expect(onReset).not.toHaveBeenCalled();
    });
});
