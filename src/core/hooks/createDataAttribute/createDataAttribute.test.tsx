import { renderHook } from '@testing-library/react';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '.';

describe('create data attribute hooks', () => {
    test('creates and merges data attributes with accent color and boolean handling', () => {
        const { result: dataAttributes } = renderHook(() =>
            useCreateDataAttribute('button', {
                variant: 'primary',
                active: true,
                disabled: false,
                id: '123',
                camelCaseKey: 'value',
                missing: undefined,
            })
        );

        const { result: accentAttributes } = renderHook(() =>
            useCreateDataAccentColorAttribute('red')
        );

        const { result: composedAttributes } = renderHook(() =>
            useComposeAttributes(dataAttributes.current(), accentAttributes.current())
        );

        expect(composedAttributes.current()).toEqual({
            'data-button-variant': 'primary',
            'data-button-active': '',
            'data-button-id': '123',
            'data-button-camelCaseKey': 'value',
            'data-rad-ui-accent-color': 'red',
        });
    });

    test('omits accent color attribute when undefined and handles null attributes', () => {
        const { result: emptyAccent } = renderHook(() =>
            useCreateDataAccentColorAttribute(undefined as any)
        );
        expect(emptyAccent.current()).toEqual({});

        const { result: noAttributes } = renderHook(() =>
            useCreateDataAttribute('button', null)
        );
        expect(noAttributes.current()).toEqual({});
    });
});
