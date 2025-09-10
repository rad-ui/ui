import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import NumberField from '../NumberField';

describe('NumberField accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(<NumberField>Test</NumberField>);
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
