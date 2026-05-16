const lowerOrNumberBeforeUppercase = /([a-z0-9])([A-Z])/g;

const toComponentClassName = (componentName: string = ''): string => {
    return componentName.replace(lowerOrNumberBeforeUppercase, '$1-$2').toLowerCase();
};

// Compatibility export for consumers still importing from `~/core`.
export const customClassSwitcher = (customRootClass: string = '', componentName: string = ''): string => {
    if (!customRootClass || !componentName) {
        return '';
    }

    return `${customRootClass}-${toComponentClassName(componentName)}`;
};
