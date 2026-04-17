export const createDataAttributes = (
    prefix: string,
    attributes: Record<string, any> | null
) => {
    if (!attributes) return {};

    return Object.fromEntries(
        Object.entries(attributes)
            .filter(([_, value]) => value !== undefined && value !== '' && value !== false)
            .map(([key, value]) => [`data-${prefix}-${key}`, value === true ? '' : value])
    );
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

    return { 'data-rad-ui-accent-color': color };
};
