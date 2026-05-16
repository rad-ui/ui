const CSS_PREFIXES = {
    radius: 'radius',
    spacing: 'spacing',
    fontFamily: 'font',
    fontSize: 'font-size',
    lineHeight: 'line-height',
    fontWeight: 'font-weight',
    letterSpacing: 'letter-spacing',
    shadows: 'shadow',
    zIndex: 'z-index',
    duration: 'motion-duration',
    easing: 'motion-easing',
    borderWidth: 'border-width',
    opacity: 'opacity',
    size: 'size',
    breakpoints: 'breakpoint',
    blur: 'blur',
    outlineOffset: 'outline-offset',
    strokeWidth: 'stroke-width',
    aspectRatio: 'aspect-ratio',
    elevation: 'elevation',
    focus: {
        ringWidth: 'focus-ring-width',
        ringOffset: 'focus-ring-offset',
        ringStyle: 'focus-ring-style'
    },
    grid: {
        columns: 'grid-columns',
        gutter: 'grid-gutter',
        container: 'grid-container'
    },
    transition: 'transition'
};

const toCssSegment = (segment) => String(segment).replace(/\./g, '-');

const toCssVariableName = (family, pathParts) => {
    const prefix = CSS_PREFIXES[family];
    const cssPathParts = pathParts.map(toCssSegment);

    if (typeof prefix === 'string') {
        return `--rad-ui-${prefix}-${cssPathParts.join('-')}`;
    }

    const [group, ...rest] = cssPathParts;
    const nestedPrefix = prefix[group];

    if (!nestedPrefix) {
        throw new Error(`Missing CSS prefix mapping for ${family}.${group}`);
    }

    return `--rad-ui-${nestedPrefix}-${rest.join('-')}`;
};

const walkTokenTree = (value, pathParts, visitLeaf) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        for (const [key, child] of Object.entries(value)) {
            walkTokenTree(child, [...pathParts, key], visitLeaf);
        }

        return;
    }

    visitLeaf(pathParts, value);
};

const isThemeMap = (value) => (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    'light' in value &&
    'dark' in value
);

function generateAtomicTokens(tokens) {
    const cssVariables = [];
    const darkCssVariables = [];
    const jsVariables = {};

    for (const [family, familyTokens] of Object.entries(tokens)) {
        jsVariables[family] = {};

        if (isThemeMap(familyTokens)) {
            walkTokenTree(familyTokens.light, [], (pathParts, tokenValue) => {
                const cssVariableName = toCssVariableName(family, pathParts);
                cssVariables.push(`${cssVariableName}: ${tokenValue};`);

                let current = jsVariables[family];

                pathParts.forEach((part, index) => {
                    if (index === pathParts.length - 1) {
                        current[part] = `var(${cssVariableName})`;
                        return;
                    }

                    current[part] = current[part] || {};
                    current = current[part];
                });
            });

            walkTokenTree(familyTokens.dark, [], (pathParts, tokenValue) => {
                const cssVariableName = toCssVariableName(family, pathParts);
                darkCssVariables.push(`${cssVariableName}: ${tokenValue};`);
            });

            continue;
        }

        walkTokenTree(familyTokens, [], (pathParts, tokenValue) => {
            const cssVariableName = toCssVariableName(family, pathParts);
            cssVariables.push(`${cssVariableName}: ${tokenValue};`);

            let current = jsVariables[family];

            pathParts.forEach((part, index) => {
                if (index === pathParts.length - 1) {
                    current[part] = `var(${cssVariableName})`;
                    return;
                }

                current[part] = current[part] || {};
                current = current[part];
            });
        });
    }

    return {
        cssVariables: cssVariables.join('\n'),
        darkCssVariables: darkCssVariables.join('\n'),
        jsVariables
    };
}

export default generateAtomicTokens;
