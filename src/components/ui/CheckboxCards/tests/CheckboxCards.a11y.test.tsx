import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import CheckboxCards from '../CheckboxCards';

describe('CheckboxCards accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(<CheckboxCards>Test</CheckboxCards>);
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
