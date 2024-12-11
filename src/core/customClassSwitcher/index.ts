const RAD_UI_CLASS_PREFIX = 'rad-ui';

/**
 * Applies a custom root class the user provides, else applies the default rad-ui classes to the component
 * Rad UI's classes are based on this logic
 * */
export const customClassSwitcher = (customRootClass: string = '', componentName: string = ''): string => {
    if (customRootClass) {
        return customRootClass;
    }

    if (!componentName) {
        return '';
    }

    // add dashes between capitalized words
    const componentClassName = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

    return `${RAD_UI_CLASS_PREFIX}-${componentClassName}`;
};
