import { customClassSwitcher } from '~/core';

const customRootClass = 'myCustomRootClass';
const componentName = 'myComponent';

describe('customClassSwitcher', () => {
    it('returns customRootClass if passed', () => {
        expect(customClassSwitcher(customRootClass, componentName)).toBe(customRootClass);
    });

    it('returns empty string if neither customRootClass nor componentName were passed', () => {
        expect(customClassSwitcher('', '')).toBe('');
    });

    it('returns dashed class name if componentName was passed and customRootClass was not', () => {
        expect(customClassSwitcher('', componentName)).toBe('rad-ui-my-component');
    });
});
