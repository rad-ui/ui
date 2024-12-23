import React from 'react';

export const isReactNode = (value: any): value is React.ReactNode => {
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
