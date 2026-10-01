import React from 'react';
import { render, screen } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Steps from '../Steps';

const steps = [
    { title: 'Account Setup', description: 'Create your account' },
    { title: 'Profile', description: 'Add your details' },
    { title: 'Confirm', description: 'Review and finish' }
];

const renderSteps = () => render(
    <Steps.Root>
        {steps.map((step, index) => (
            <Steps.Item key={index} value={index.toString()}>
                <Steps.Track>
                    <Steps.Bubble>{index + 1}</Steps.Bubble>
                    <Steps.Line />
                </Steps.Track>
                <Steps.Content>
                    <Steps.Title>{step.title}</Steps.Title>
                    <Steps.Description>{step.description}</Steps.Description>
                </Steps.Content>
            </Steps.Item>
        ))}
    </Steps.Root>
);

describe('Steps accessibility', () => {
    test('axe: no violations', async() => {
        const { container } = renderSteps();
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('axe: no violations when an item is active', async() => {
        const { container } = render(
            <Steps.Root defaultValue={1}>
                {steps.map((step, index) => (
                    <Steps.Item key={index} value={index.toString()}>
                        <Steps.Track>
                            <Steps.Bubble>{index + 1}</Steps.Bubble>
                            <Steps.Line />
                        </Steps.Track>
                        <Steps.Content>
                            <Steps.Title>{step.title}</Steps.Title>
                            <Steps.Description>{step.description}</Steps.Description>
                        </Steps.Content>
                    </Steps.Item>
                ))}
            </Steps.Root>
        );
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('renders every step title and description', () => {
        renderSteps();
        expect(screen.getByText('Account Setup')).toBeInTheDocument();
        expect(screen.getByText('Review and finish')).toBeInTheDocument();
    });
});
