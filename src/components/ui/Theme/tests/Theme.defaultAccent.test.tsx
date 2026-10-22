import fs from 'node:fs';
import path from 'node:path';

describe('Theme default accent scale', () => {
    const tokens = fs.readFileSync(path.resolve(__dirname, '../../../../../styles/cssTokens/base.tokens.css'), 'utf8');

    test('a Theme without accentColor still resolves the accent scale (to gray)', () => {
        const defaultBlock = tokens.indexOf(':where([data-rad-ui-theme]){');
        expect(defaultBlock).toBeGreaterThan(-1);
        const block = tokens.slice(defaultBlock, tokens.indexOf('}', defaultBlock));
        expect(block).toContain('--rad-ui-color-accent-50: var(--rad-ui-color-gray-50)');
        expect(block).toContain('--rad-ui-color-accent-1000: var(--rad-ui-color-gray-1000)');
    });

    test('named accent colours are declared after the default so they win on the same element', () => {
        const defaultBlock = tokens.indexOf(':where([data-rad-ui-theme]){');
        const namedBlue = tokens.indexOf(':where([data-rad-ui-accent-color=blue], [data-color=blue]){');
        expect(namedBlue).toBeGreaterThan(defaultBlock);
    });
});
