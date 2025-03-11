export const useCreateDataAttribute = (prefix: string, attributes: Record<string, any> | null) => {
     // Return an empty object if attributes is null or undefined
    if (!attributes) return {};
    return Object.fromEntries(
      Object.entries(attributes)
        .filter(([_, value]) => value !== undefined && value !== "")
        .map(([key, value]) => [`data-${prefix}-${key}`, value])
    );
};

export const useComposeAttributes = (...attributeObjects: (Record<string, any> | null)[]) => {
    return Object.assign({}, ...attributeObjects.filter(obj => obj !== null));
};
