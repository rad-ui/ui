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
    it('gives every part its theme class so Clarity part styles apply', () => {
        render(
            <Theme classNamespace="acme">
                <Fieldset.Root>
                    <Fieldset.Legend>Profile</Fieldset.Legend>
                    <Fieldset.Description>Details</Fieldset.Description>
                    <Fieldset.Message>Message</Fieldset.Message>
                </Fieldset.Root>
            </Theme>
        );

        expect(screen.getByText('Profile')).toHaveClass('acme-fieldset-legend');
        expect(screen.getByText('Details')).toHaveClass('acme-fieldset-description');
        expect(screen.getByText('Message')).toHaveClass('acme-fieldset-message');
    });

    it('marks the message invalid when the fieldset is invalid', () => {
        render(
            <Fieldset.Root invalid>
                <Fieldset.Legend>Profile</Fieldset.Legend>
                <Fieldset.Message>Name is required</Fieldset.Message>
            </Fieldset.Root>
        );

        const message = screen.getByText('Name is required');
        expect(message).toHaveAttribute('data-invalid');
        expect(message).toHaveAttribute('role', 'alert');
    });

    test('description and message describe the fieldset group', () => {
        render(
            <Fieldset.Root aria-describedby="external" invalid>
                <Fieldset.Legend>Contact</Fieldset.Legend>
                <Fieldset.Description>How to reach you</Fieldset.Description>
                <Fieldset.Message id="msg">Required</Fieldset.Message>
            </Fieldset.Root>
        );
        const group = screen.getByRole('group', { name: 'Contact' });
        const description = screen.getByText('How to reach you');
        const ids = group.getAttribute('aria-describedby')!.split(' ');
        expect(ids).toEqual(['external', description.id, 'msg']);
        expect(description.id).toBeTruthy();
    });

    test('unmounted messages are removed from aria-describedby', () => {
        const { rerender } = render(
            <Fieldset.Root>
                <Fieldset.Legend>Contact</Fieldset.Legend>
                <Fieldset.Message id="msg">Required</Fieldset.Message>
            </Fieldset.Root>
        );
        expect(screen.getByRole('group')).toHaveAttribute('aria-describedby', 'msg');
        rerender(
            <Fieldset.Root>
                <Fieldset.Legend>Contact</Fieldset.Legend>
            </Fieldset.Root>
        );
        expect(screen.getByRole('group')).not.toHaveAttribute('aria-describedby');
    });
});
