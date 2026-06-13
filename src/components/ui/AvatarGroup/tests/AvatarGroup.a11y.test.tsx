import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import AvatarGroup from '../AvatarGroup';

describe('AvatarGroup accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(
            <AvatarGroup.Root>
                <AvatarGroup.Item>
                    <AvatarGroup.Avatar src="https://i.pravatar.cc/40" alt="A" />
                    <AvatarGroup.Fallback>A</AvatarGroup.Fallback>
                </AvatarGroup.Item>
            </AvatarGroup.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
