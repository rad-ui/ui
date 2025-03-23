import { useCallback } from 'react';

/**
 * Custom hook to generate `data-*` attributes dynamically.
 *
 * @param {string} prefix - The prefix to be used for the data attributes (e.g., "button" for "data-button-*").
 * @param {Record<string, any> | null} attributes - An object containing key-value pairs of attributes.
 * @returns {Function} - A memoized function that returns an object containing formatted `data-*` attributes.
 */
export const useCreateDataAttribute = (
    prefix: string,
    attributes: Record<string, any> | null
) => {
    return useCallback(() => {
    // If attributes is null, return an empty object
        if (!attributes) return {};

        // Transform the attributes object into `data-*` attributes
        return Object.fromEntries(
            Object.entries(attributes)
                .filter(([_, value]) => value !== undefined && value !== '') // Remove undefined or empty values
                .map(([key, value]) => [`data-${prefix}-${key}`, value]) // Convert keys to `data-prefix-key`
        );
    }, [prefix, attributes]); // Dependencies: recompute only if prefix or attributes change
};

/**
 * Custom hook to merge multiple attribute objects into a single object.
 *
 * @param {...(Record<string, any> | null)[]} attributeObjects - Multiple attribute objects to be combined.
 * @returns {Function} - A memoized function that returns a merged attributes object.
 */
export const useComposeAttributes = (
    ...attributeObjects: (Record<string, any> | null)[]
) => {
    return useCallback(() => {
    // Merge all attribute objects, ignoring null values
        return Object.assign({}, ...attributeObjects.filter((obj) => obj !== null));
    }, [attributeObjects]); // Dependencies: recompute only if attributeObjects change
};
