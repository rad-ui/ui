import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import OTPField from '../OTPField';

describe('OTPField accessibility', () => {
    test('has no axe violations', async() => {
        const { container } = render(
            <OTPField.Root length={4} aria-label="Verification code" defaultValue="12">
                <OTPField.Input />
                <OTPField.Input />
                <OTPField.Input />
                <OTPField.Input />
            </OTPField.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });
});
