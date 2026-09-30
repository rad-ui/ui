import React from 'react';

import { getElementRef } from '../mergeProps';

describe('getElementRef', () => {
    let warnSpy: jest.SpyInstance;
    let errorSpy: jest.SpyInstance;

    beforeEach(() => {
        warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        warnSpy.mockRestore();
        errorSpy.mockRestore();
    });

    const expectNoWarnings = () => {
        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
    };

    it('reads a ref that was passed to an element', () => {
        const ref = React.createRef<HTMLButtonElement>();
        const element = <button type="button" ref={ref}>Click</button>;

        expect(getElementRef(element)).toBe(ref);
        expectNoWarnings();
    });

    it('reads a callback ref that was passed to an element', () => {
        const ref = jest.fn();
        const element = <button type="button" ref={ref}>Click</button>;

        expect(getElementRef(element)).toBe(ref);
        expectNoWarnings();
    });

    it('returns undefined when the element has no ref', () => {
        expect(getElementRef(<button type="button">Click</button>)).toBeUndefined();
        expectNoWarnings();
    });

    it('returns undefined for values that are not elements', () => {
        expect(getElementRef('a string child')).toBeUndefined();
        expect(getElementRef(42)).toBeUndefined();
        expect(getElementRef(undefined)).toBeUndefined();
        expect(getElementRef(null)).toBeUndefined();
        expect(getElementRef([<button type="button" key="a">A</button>])).toBeUndefined();
        expectNoWarnings();
    });

    it('reads props.ref on React 19 and never touches the legacy element.ref field', () => {
        jest.resetModules();

        const actualReact = jest.requireActual('react');
        const react19 = { ...actualReact, version: '19.0.0' };
        react19.default = { ...actualReact, version: '19.0.0' };
        jest.doMock('react', () => ({ ...react19, __esModule: true, default: react19.default }));

        let getElementRefOnReact19: typeof getElementRef = () => undefined;
        jest.isolateModules(() => {
            getElementRefOnReact19 = require('../mergeProps').getElementRef;
        });

        const ref = React.createRef<HTMLButtonElement>();
        // A React 19 element keeps the ref in props and leaves element.ref as a getter
        // that logs on access, so reading it here must be impossible.
        const element = { ...React.createElement('button'), props: { ref } };
        Object.defineProperty(element, 'ref', {
            configurable: true,
            get() {
                throw new Error('element.ref was read on React 19');
            }
        });

        try {
            expect(getElementRefOnReact19(element)).toBe(ref);
        } finally {
            jest.dontMock('react');
            jest.resetModules();
        }
    });
});
