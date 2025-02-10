import React from 'react';
import useLayoutEffect from './index';
import { render } from '@testing-library/react';

const TestComponent = () => {
    // invoke useLayoutEffect and check if the component still mounts as expected
    useLayoutEffect(() => {
        // mounts
    }, []);
    return <div>Hello</div>;
};

describe('useLayoutEffect', () => {
    it('should mount without errors in SSR environment', () => {
        render(<TestComponent />);
    });

    it('should execute effect in browser environment', () => {
        const mockFn = jest.fn();
        const TestComponent = () => {
            useLayoutEffect(() => {
                mockFn();
            }, []);
            return <div>Hello</div>;
        };

        // Mock document existence
        const originalDocument = global.document;
        global.document = {} as typeof document;

        render(<TestComponent />);
        expect(mockFn).toHaveBeenCalledTimes(1);

        // Cleanup
        global.document = originalDocument;
    });
});
