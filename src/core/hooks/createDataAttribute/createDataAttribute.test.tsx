import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '.';

describe('create data attribute utilities', () => {
    test('creates and merges data attributes with accent color and boolean handling', () => {
        const dataAttributes = createDataAttributes('button', {
            variant: 'primary',
            active: true,
            disabled: false,
            id: '123',
            camelCaseKey: 'value',
            missing: undefined
        });
        const accentAttributes = createDataAccentColorAttribute('red');

        expect(composeAttributes(dataAttributes, accentAttributes)).toEqual({
            'data-button-variant': 'primary',
            'data-button-active': '',
            'data-button-id': '123',
            'data-button-camelCaseKey': 'value',
            'data-rad-ui-accent-color': 'red'
        });
    });

    test('omits accent color attribute when undefined and handles null attributes', () => {
        expect(createDataAccentColorAttribute(undefined as any)).toEqual({});

        expect(createDataAttributes('button', null)).toEqual({});
    });
});
