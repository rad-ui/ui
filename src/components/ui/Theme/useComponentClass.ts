'use client';

import React from 'react';
import ThemeContext from './ThemeContext';

const lowerOrNumberBeforeUppercase = /([a-z0-9])([A-Z])/g;

const toComponentClassName = (componentName: string = ''): string => {
    // Insert a dash between camelCase/PascalCase word boundaries.
    // `$1-$2` keeps both captured characters and places `-` between them.
    return componentName.replace(lowerOrNumberBeforeUppercase, '$1-$2').toLowerCase();
};

export const useComponentClass = (customRootClass: string = '', componentName: string = '', part: string = '') => {
    const themeContext = React.useContext(ThemeContext);
    const classNamespace = customRootClass || themeContext?.classNamespace || '';

    if (!classNamespace || !componentName) {
        return '';
    }

    const componentClass = `${classNamespace}-${toComponentClassName(componentName)}`;
    return part ? `${componentClass}-${toComponentClassName(part)}` : componentClass;
};
