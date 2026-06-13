import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Splitter from '../Splitter';

describe('Splitter accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(<Splitter>Test</Splitter>);
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
