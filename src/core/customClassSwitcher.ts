const RAD_UI_CLASS_PREFIX = 'rad-ui';

export const customClassSwitcher = (customRootClass: string = '', componentName: string = ''): string => {
    // applies a custom root class the user provides, else applies the default rad-ui classes to the component
    // rad ui's classes are based on this logic

    // add dashes between capitalized words
    const componentClassName = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    if (customRootClass) return customRootClass;
    if (componentName) return `${RAD_UI_CLASS_PREFIX}-${componentClassName}`;

    return '';
};
