export const createDataAttributes = (
    _prefix: string,
    attributes: Record<string, any> | null
) => {
    if (!attributes) return {};

    return Object.fromEntries(
        Object.entries(attributes)
            .filter(([_, value]) => value !== undefined && value !== '' && value !== false)
            .map(([key, value]) => [`data-${toKebabCase(key)}`, value === true ? '' : value])
    );
};

const toKebabCase = (value: string) => {
    return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

export const composeAttributes = (
    ...attributeObjects: (Record<string, any> | null | undefined)[]
) => {
    return Object.assign({}, ...attributeObjects.filter(Boolean));
};

export const createDataAccentColorAttribute = (
    color: string
) => {
    if (!color) return {};

    return { 'data-color': color };
};
