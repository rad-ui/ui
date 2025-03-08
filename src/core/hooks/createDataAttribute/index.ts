export const createDataAttribute = (prefix: string, attributes: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(attributes)
            .filter(([_, value]) => value !== undefined && value !== '')
            .map(([key, value]) => [`data-${prefix}-${key}`, value])
    );
};

export const composeAttributes = (...attributeObjects: Record<string, any>[]) => {
    return Object.assign({}, ...attributeObjects);
};
