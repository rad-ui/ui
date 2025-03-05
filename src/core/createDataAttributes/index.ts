export const createDataAttributes = (prefix: string, attributes: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(attributes)
            .filter(([_, value]) => value !== undefined && value !== '')
            .map(([key, value]) => [`data-${prefix}-${key}`, value])
    );
};

export const mergeAttributes = (...attributeObjects: Record<string, any>[]) => {
    return Object.assign({}, ...attributeObjects);
};
