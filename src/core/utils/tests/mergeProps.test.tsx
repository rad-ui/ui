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

describe('composeRefs', () => {
    // Set by each nested describe before attach() loads the module under that React major.
    let currentVersion = '18.3.1';

    /**
     * Loads composeRefs as if it were running on the given React major. The version
     * gate is resolved once at module load, so the module has to be re-imported.
     */
    const loadForReact = (version: string) => {
        jest.resetModules();

        const actualReact = jest.requireActual('react');
        const mocked = { ...actualReact, version };
        mocked.default = { ...actualReact, version };
        jest.doMock('react', () => ({ ...mocked, __esModule: true, default: mocked.default }));

        const mod: typeof import('../mergeProps') = require('../mergeProps');
        const result = mod.composeRefs;
        jest.dontMock('react');
        jest.resetModules();
        return result;
    };

    const node = { tag: 'button' } as unknown as HTMLButtonElement;

    /** composeRefs returns undefined when handed no refs; every other test passes at least one. */
    const attach = (...args: Array<React.Ref<HTMLButtonElement> | undefined>) => {
        const composed = loadForReact(currentVersion)(...args);
        if (!composed) throw new Error('composeRefs returned no ref');
        return composed;
    };

    /**
     * React 18 types a ref callback as returning void, so the teardown that only
     * exists on React 19 needs an explicit cast to be called in tests.
     */
    type TeardownRef = (instance: HTMLButtonElement | null) => (() => void) | undefined;
    const withTeardown = (attached: React.RefCallback<HTMLButtonElement>) =>
        attached as unknown as TeardownRef;

    describe('on React 18', () => {
        beforeEach(() => {
            currentVersion = '18.3.1';
        });

        it('fans the node out to callback and object refs', () => {
            const objectRef = React.createRef<HTMLButtonElement>();
            const callbackRef = jest.fn();

            attach(callbackRef, objectRef)(node);

            expect(callbackRef).toHaveBeenCalledWith(node);
            expect(objectRef.current).toBe(node);
        });

        it('returns no teardown, because React 18 has no way to run one', () => {
            expect(attach(jest.fn())(node)).toBeUndefined();
        });

        it('still detaches by passing null to callback refs', () => {
            const objectRef = React.createRef<HTMLButtonElement>();
            const callbackRef = jest.fn();
            const attached = attach(callbackRef, objectRef);

            attached(node);
            attached(null);

            expect(callbackRef).toHaveBeenLastCalledWith(null);
            expect(objectRef.current).toBeNull();
        });
    });

    describe('on React 19', () => {
        beforeEach(() => {
            currentVersion = '19.0.0';
        });

        it('replays a teardown that an inner callback ref returned', () => {
            const teardown = jest.fn();
            const callbackRef = jest.fn(() => teardown);
            const attached = withTeardown(attach(callbackRef));

            const detach = attached(node);
            expect(callbackRef).toHaveBeenCalledWith(node);
            expect(teardown).not.toHaveBeenCalled();

            // React 19 calls the returned function *instead of* passing null,
            // so the inner cleanup must run exactly once.
            expect(detach).toBeDefined();
            detach?.();
            expect(teardown).toHaveBeenCalledTimes(1);
            expect(callbackRef).not.toHaveBeenCalledWith(null);
        });

        it('detaches refs that returned no teardown the way React would', () => {
            const objectRef = React.createRef<HTMLButtonElement>();
            const callbackRef = jest.fn();
            const attached = withTeardown(attach(callbackRef, objectRef));

            const detach = attached(node);
            expect(detach).toBeDefined();
            detach?.();

            // No inner cleanup to run, so fall back to React 18's null contract.
            expect(callbackRef).toHaveBeenLastCalledWith(null);
            expect(objectRef.current).toBeNull();
        });

        it('keeps each teardown paired with the ref that registered it', () => {
            const first = jest.fn();
            const second = jest.fn();
            const attached = withTeardown(attach(
                jest.fn(() => first),
                jest.fn(() => second)
            ));

            const detach = attached(node);
            detach?.();

            expect(first).toHaveBeenCalledTimes(1);
            expect(second).toHaveBeenCalledTimes(1);
        });

        it('returns undefined when no ref was provided at all', () => {
            expect(loadForReact('19.0.0')(undefined, undefined)).toBeUndefined();
        });
    });
});
