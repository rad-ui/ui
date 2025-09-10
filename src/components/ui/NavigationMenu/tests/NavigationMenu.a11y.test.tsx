import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import NavigationMenu from '../NavigationMenu';

describe('NavigationMenu accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(<NavigationMenu>Test</NavigationMenu>);
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
