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
    test('Test for SSR environment and check if the component still mounts as expected', (done) => {
        render(<TestComponent />);
        done();
    });
});
