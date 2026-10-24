import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Field from '../Field';

const deferred = () => {
    let resolve: (value: string | null) => void = () => {};
    const promise = new Promise<string | null>((_resolve) => { resolve = _resolve; });
    return { promise, resolve };
};

describe('Field async validation', () => {
    test('marks the field validating, then shows the async result', async() => {
        const check = deferred();
        render(
            <Field.Root validationMode="onChange" validate={() => check.promise}>
                <Field.Label>Username</Field.Label>
                <Field.Control />
                <Field.Error />
            </Field.Root>
        );
        const input = screen.getByLabelText('Username');
        fireEvent.change(input, { target: { value: 'admin' } });
        expect(input.closest('[data-slot="field-root"]')).toHaveAttribute('data-validating');

        await act(async() => { check.resolve('That username is taken'); await check.promise; });
        expect(input.closest('[data-slot="field-root"]')).not.toHaveAttribute('data-validating');
        expect(screen.getByRole('alert')).toHaveTextContent('That username is taken');
        expect((input as HTMLInputElement).validationMessage).toBe('That username is taken');
    });

    test('a stale result never overwrites a newer one', async() => {
        const mount = deferred();
        const slow = deferred();
        const fast = deferred();
        const calls = [mount, slow, fast];
        render(
            <Field.Root validationMode="onChange" validate={() => calls.shift()!.promise}>
                <Field.Label>Name</Field.Label>
                <Field.Control />
                <Field.Error />
            </Field.Root>
        );
        const input = screen.getByLabelText('Name');
        fireEvent.change(input, { target: { value: 'a' } });
        fireEvent.change(input, { target: { value: 'ab' } });
        await act(async() => { fast.resolve(null); await fast.promise; });
        await act(async() => { slow.resolve('Old error'); await slow.promise; });
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    test('validationDebounceTime waits for typing to pause', () => {
        jest.useFakeTimers();
        try {
            const validate = jest.fn(() => null);
            render(
                <Field.Root validationMode="onChange" validationDebounceTime={300} validate={validate}>
                    <Field.Label>Search</Field.Label>
                    <Field.Control />
                </Field.Root>
            );
            validate.mockClear();
            const input = screen.getByLabelText('Search');
            fireEvent.change(input, { target: { value: 'a' } });
            fireEvent.change(input, { target: { value: 'ab' } });
            act(() => { jest.advanceTimersByTime(200); });
            expect(validate).not.toHaveBeenCalled();
            act(() => { jest.advanceTimersByTime(150); });
            expect(validate).toHaveBeenCalledTimes(1);
            expect(validate).toHaveBeenCalledWith('ab');
        } finally {
            jest.useRealTimers();
        }
    });
});
