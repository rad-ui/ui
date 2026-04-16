'use client';

import React from 'react';
import { customClassSwitcher } from '~/core/customClassSwitcher';
import ThemeContext from './ThemeContext';

export const useComponentClass = (customRootClass: string = '', componentName: string = '') => {
    const themeContext = React.useContext(ThemeContext);
    const classNamespace = customRootClass || themeContext?.classNamespace || '';

    return classNamespace ? customClassSwitcher(classNamespace, componentName) : '';
};
