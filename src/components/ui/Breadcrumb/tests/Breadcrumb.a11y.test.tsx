import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Breadcrumb from '../Breadcrumb';

describe('Breadcrumb accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = render(
            <Breadcrumb.Root>
                <Breadcrumb.List>
                    <Breadcrumb.Item>
                        <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                        <Breadcrumb.Separator />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
                        <Breadcrumb.Separator />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
                    </Breadcrumb.Item>
                </Breadcrumb.List>
            </Breadcrumb.Root>
        );

        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
