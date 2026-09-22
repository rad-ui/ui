import React from 'react';
import { render, screen } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Theme from '~/components/ui/Theme/Theme';
import Fieldset from '../Fieldset';

describe('Fieldset', () => {
    const originalMatchMedia = window.matchMedia;

    beforeEach(() => {
        window.matchMedia = jest.fn().mockReturnValue({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
        } as unknown as MediaQueryList);
    });

    afterEach(() => {
        window.matchMedia = originalMatchMedia;
    });

    test('renders native fieldset and legend semantics', () => {
        render(
            <Fieldset.Root>
                <Fieldset.Legend>Shipping method</Fieldset.Legend>
                <label>
                    <input type="radio" name="shipping" value="standard" />
                    Standard
                </label>
            </Fieldset.Root>
        );

        const group = screen.getByRole('group', { name: 'Shipping method' });
        expect(group.tagName).toBe('FIELDSET');
        expect(screen.getByText('Shipping method').tagName).toBe('LEGEND');
    });

    test('propagates disabled state to contained form controls', () => {
        render(
            <Fieldset disabled>
                <Fieldset.Legend>Notification channels</Fieldset.Legend>
                <input aria-label="Email" />
            </Fieldset>
        );

        expect(screen.getByRole('group')).toBeDisabled();
        expect(screen.getByLabelText('Email')).toBeDisabled();
        expect(screen.getByRole('group')).toHaveAttribute('data-disabled');
    });

    test('exposes invalid state without overriding native form props', () => {
        render(
            <form id="settings-form">
                <Fieldset.Root name="contact" form="settings-form" invalid data-testid="fieldset">
                    <Fieldset.Legend>Contact preferences</Fieldset.Legend>
                    <Fieldset.Message invalid>Choose at least one option.</Fieldset.Message>
                </Fieldset.Root>
            </form>
        );

        const fieldset = screen.getByTestId('fieldset');
        expect(fieldset).toHaveAttribute('name', 'contact');
        expect(fieldset).toHaveAttribute('form', 'settings-form');
        expect(fieldset).toHaveAttribute('aria-invalid', 'true');
        expect(fieldset).toHaveAttribute('data-invalid');
        expect(screen.getByRole('alert')).toHaveTextContent('Choose at least one option.');
    });

    test('forwards refs and styling hooks', () => {
        const ref = React.createRef<HTMLFieldSetElement>();

        render(
            <Theme classNamespace="acme">
                <Fieldset.Root ref={ref} color="blue" size="2" variant="soft">
                    <Fieldset.Legend>Billing</Fieldset.Legend>
                    <Fieldset.Description>Used for invoices.</Fieldset.Description>
                </Fieldset.Root>
            </Theme>
        );

        const fieldset = screen.getByRole('group', { name: 'Billing' });
        expect(ref.current).toBe(fieldset);
        expect(fieldset).toHaveClass('acme-fieldset');
        expect(fieldset).toHaveAttribute('data-color', 'blue');
        expect(fieldset).toHaveAttribute('data-size', '2');
        expect(fieldset).toHaveAttribute('data-variant', 'soft');
        expect(screen.getByText('Used for invoices.')).toHaveAttribute('data-slot', 'fieldset-description');
    });

    test('axe: no violations for grouped controls', async() => {
        const { container } = render(
            <Fieldset.Root>
                <Fieldset.Legend>Delivery window</Fieldset.Legend>
                <label>
                    <input type="radio" name="delivery" value="morning" />
                    Morning
                </label>
                <label>
                    <input type="radio" name="delivery" value="afternoon" />
                    Afternoon
                </label>
            </Fieldset.Root>
        );

        const results = await axe.run(container, {
            runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS }
        });
        expect(results.violations).toHaveLength(0);
    });
});
