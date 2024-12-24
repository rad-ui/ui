import React from 'react';

/**
 * Check that the given value is a valid React Node in a component before rendering it to avoid
 * rendering invalid values and crashing the app
 *
 * @param value value to validate
 * @param name user-friendly name of the value
 * @returns value if it's a valid React Node and false otherwise
 */
export const validateReactNode = (value: any, name?: string): React.ReactNode => {
    if (isReactNode(value)) {
        return value;
    }

    console.error(`${name || value} is not a valid React node`);
    return false;
};

/**
 * Check if the given value is a valid React Node
 */
const isReactNode = (value: any): value is React.ReactNode => {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value === null ||
        value === undefined ||
        React.isValidElement(value) ||
        (Array.isArray(value) && value.every(isReactNode))
    );
};
