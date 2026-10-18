import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Label from '../Label';

describe('Label accessibility', () => {
    test('axe: no violations when labelling a control', async() => {
        const { container } = render(
            <div>
                <Label htmlFor="email">Email</Label>
                <input id="email" type="email" />
            </div>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
