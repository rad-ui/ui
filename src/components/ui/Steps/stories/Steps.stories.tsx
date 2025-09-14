import Steps from '../Steps';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';
import Text from '~/components/ui/Text/Text';

const steps = [
    {
        title: 'Account Setup',
        description: 'Create your account and verify your email address'
    },
    {
        title: 'Profile Configuration',
        description: 'Add your personal information and preferences'
    },
    {
        title: 'Payment Method',
        description: 'Set up your billing information and payment details'
    },
    {
        title: 'Confirmation',
        description: 'Review your setup and complete the registration'
    }
];

const onboardingSteps = [
    {
        title: 'Welcome',
        description: 'Get started with our platform'
    },
    {
        title: 'Choose Plan',
        description: 'Select the plan that fits your needs'
    },
    {
        title: 'Complete Setup',
        description: 'Finish your account configuration'
    }
];

const checkoutSteps = [
    {
        title: 'Cart Review',
        description: 'Review your selected items'
    },
    {
        title: 'Shipping',
        description: 'Enter your shipping address'
    },
    {
        title: 'Payment',
        description: 'Provide payment information'
    },
    {
        title: 'Confirmation',
        description: 'Order placed successfully'
    }
];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'WIP/Steps',
    component: Steps,
    render: () => <SandboxEditor>
        <div className='mt-5'>
            <Steps.Root>
                {steps.map((step, index) => (
                    <Steps.Item key={index} value={index}>
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
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {};

export const Onboarding = () => (
    <SandboxEditor>
        <div className='mt-5'>
            <Steps.Root>
                {onboardingSteps.map((step, index) => (
                    <Steps.Item key={index} value={index}>
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
        </div>
    </SandboxEditor>
);

export const Checkout = () => (
    <SandboxEditor>
        <div className='mt-5'>
            <Steps.Root>
                {checkoutSteps.map((step, index) => (
                    <Steps.Item key={index} value={index}>
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
        </div>
    </SandboxEditor>
);

export const SimpleSteps = () => (
    <SandboxEditor>
        <div className='mt-5'>
            <Steps.Root>
                {['Sign Up', 'Verify Email', 'Complete Profile'].map((title, index) => (
                    <Steps.Item key={index} value={index}>
                        <Steps.Track>
                            <Steps.Bubble>{index + 1}</Steps.Bubble>
                            <Steps.Line />
                        </Steps.Track>
                        <Steps.Content>
                            <Steps.Title>{title}</Steps.Title>
                        </Steps.Content>
                    </Steps.Item>
                ))}
            </Steps.Root>
        </div>
    </SandboxEditor>
);
