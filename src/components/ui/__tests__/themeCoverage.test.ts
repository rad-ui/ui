interface ThemeCoverageModule {
    collectCoverage: () => Array<{ name: string }>;
    themeMismatches: (c: unknown) => Array<{ name: string }>;
    unaccounted: (c: unknown) => Array<{ name: string }>;
    STYLESS_BY_DESIGN: Record<string, string>;
}

const themeMod = require('../../../../scripts/theme-coverage.cjs') as ThemeCoverageModule;

describe('theme SCSS coverage', () => {
    const coverage = themeMod.collectCoverage();

    test('every component directory is accounted for', () => {
        // A component with no theme SCSS and no allow-list entry means nobody
        // decided whether it should be themed.
        expect(themeMod.unaccounted(coverage).map((c) => c.name)).toEqual([]);
    });

    test('no component ships a recipe for one theme but not the other', () => {
        // Clarity-only means the baremetal theme loads and silently does
        // nothing for that component.
        expect(themeMod.themeMismatches(coverage).map((c) => c.name)).toEqual([]);
    });

    test('the styleless allow-list only names components that exist', () => {
        const names = new Set(coverage.map((c) => c.name));
        Object.keys(themeMod.STYLESS_BY_DESIGN).forEach((name) => {
            expect(names).toContain(name);
        });
    });

    test('the styleless allow-list does not grow silently', () => {
        // Guard against "just add it to the list" as a way to make this pass.
        expect(Object.keys(themeMod.STYLESS_BY_DESIGN).sort()).toEqual([
            'AspectRatio',
            'LiveRegion',
            'Theme',
            'VisuallyHidden'
        ]);
    });
});
