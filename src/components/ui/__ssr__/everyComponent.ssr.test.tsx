/**
 * @jest-environment node
 */
import { renderToString } from 'react-dom/server';
import { componentTrees } from '../tests/componentTrees';

// A real server environment: no window or document. Rendering must not touch them.
describe('every component renders on the server', () => {
    test.each(componentTrees)('%s', (_name, make) => {
        expect(typeof window).toBe('undefined');
        expect(() => renderToString(make())).not.toThrow();
    });
});
