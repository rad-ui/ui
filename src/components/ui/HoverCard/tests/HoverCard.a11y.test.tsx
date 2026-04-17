import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import HoverCard from '../HoverCard';

describe('HoverCard accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(<HoverCard>Test</HoverCard>);
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
