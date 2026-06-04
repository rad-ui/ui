import { TextEncoder, TextDecoder } from 'util';

;(global as any).TextEncoder = TextEncoder;
;(global as any).TextDecoder = TextDecoder;

export const { renderToString } = require('react-dom/server');
export const { hydrateRoot } = require('react-dom/client');

export const flush = () => new Promise(resolve => setTimeout(resolve, 0));

export const expectNoUnexpectedHydrationWarnings = (
    warn: jest.SpyInstance,
    error: jest.SpyInstance
) => {
    const filteredWarns = warn.mock.calls.filter(([message]) => !String(message).includes('useLayoutEffect does nothing on the server'));
    const filteredErrors = error.mock.calls.filter(([message]) => {
        const text = String(message);
        return !text.includes('useLayoutEffect does nothing on the server') &&
            !text.includes('ReactDOMTestUtils.act') &&
            !text.includes('not wrapped in act');
    });

    expect(filteredWarns).toHaveLength(0);
    expect(filteredErrors).toHaveLength(0);
};
