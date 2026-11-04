import React from 'react';
import { render } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import TextField from '~/components/ui/TextField/TextField';
import Field from '../Field';

const runAxe = async(container: HTMLElement) =>
    (await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } })).violations;

describe('Field accessibility', () => {
    test('axe: no violations for a valid field with help text', async() => {
        const { container } = render(
            <Field.Root>
                <Field.Label>Email</Field.Label>
                <Field.Control type="email" />
                <Field.Description>We never share it.</Field.Description>
            </Field.Root>
        );
        expect(await runAxe(container)).toHaveLength(0);
    });

    test('axe: no violations for an invalid TextField with an error', async() => {
        const { container } = render(
            <Field.Root invalid required>
                <Field.Label>Password</Field.Label>
                <Field.Control asChild>
                    <TextField type="password" />
                </Field.Control>
                <Field.Error>Password is too short.</Field.Error>
            </Field.Root>
        );
        expect(await runAxe(container)).toHaveLength(0);
    });
});
