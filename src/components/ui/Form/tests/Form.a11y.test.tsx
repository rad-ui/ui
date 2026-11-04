import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Form from '../Form';
import Field from '~/components/ui/Field/Field';

describe('Form accessibility', () => {
    test('has no axe violations with a server error showing', async() => {
        const { container } = render(
            <Form aria-label="Account" errors={{ email: 'Already registered' }}>
                <Field.Root name="email">
                    <Field.Label>Email</Field.Label>
                    <Field.Control type="email" />
                    <Field.Error />
                </Field.Root>
                <button type="submit">Save</button>
            </Form>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
