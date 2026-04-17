import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import composeEventHandlers from './index';

describe('composeEventHandlers', () => {
    test('calls handlers in order and stops when default is prevented', () => {
        const callOrder: string[] = [];
        const first = jest.fn((event: React.SyntheticEvent) => {
            callOrder.push('first');
            event.preventDefault();
        });
        const second = jest.fn(() => callOrder.push('second'));
        const third = jest.fn(() => callOrder.push('third'));

        const composed = composeEventHandlers(
            first,
            composeEventHandlers(second, third)
        );

        const { getByText } = render(<button onClick={composed}>Click</button>);
        fireEvent.click(getByText('Click'));

        expect(callOrder).toEqual(['first']);
        expect(first).toHaveBeenCalledTimes(1);
        expect(second).not.toHaveBeenCalled();
        expect(third).not.toHaveBeenCalled();
    });

    test('passes the same event object to each handler', () => {
        const first = jest.fn();
        const second = jest.fn();
        const composed = composeEventHandlers(first, second);

        const { getByText } = render(<button onClick={composed}>Click</button>);
        fireEvent.click(getByText('Click'));

        expect(first).toHaveBeenCalledTimes(1);
        expect(second).toHaveBeenCalledTimes(1);

        const firstEvent = first.mock.calls[0][0];
        const secondEvent = second.mock.calls[0][0];
        expect(firstEvent).toBe(secondEvent);
        expect(secondEvent.defaultPrevented).toBe(false);
    });

    test('respects checkForDefaultPrevented option', () => {
        const first = jest.fn((event: React.SyntheticEvent) => event.preventDefault());
        const second = jest.fn();
        const composed = composeEventHandlers(first, second, {
            checkForDefaultPrevented: false
        });

        const { getByText } = render(<button onClick={composed}>Click</button>);
        fireEvent.click(getByText('Click'));

        expect(first).toHaveBeenCalledTimes(1);
        expect(second).toHaveBeenCalledTimes(1);
    });

    test('handles undefined and null handlers with native events', () => {
        const first = jest.fn();
        const second = jest.fn();

        const composed1 = composeEventHandlers(undefined, first);
        const composed2 = composeEventHandlers(second, null as unknown as any);

        const event = new Event('click');
        composed1(event as unknown as React.SyntheticEvent);
        composed2(event as unknown as React.SyntheticEvent);

        expect(first).toHaveBeenCalledTimes(1);
        expect(second).toHaveBeenCalledTimes(1);
    });
});
