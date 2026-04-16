'use client';

import React from 'react';
import ThemeContext from './ThemeContext';

const toComponentClassName = (componentName: string = ''): string => {
    return componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

export const useComponentClass = (customRootClass: string = '', componentName: string = '') => {
    const themeContext = React.useContext(ThemeContext);
    const classNamespace = customRootClass || themeContext?.classNamespace || '';

    if (!classNamespace || !componentName) {
        return '';
    }

    return `${classNamespace}-${toComponentClassName(componentName)}`;
};
