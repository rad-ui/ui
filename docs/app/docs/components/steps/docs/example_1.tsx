"use client"

import Steps from "@radui/ui/Steps"

const steps = [
    { title: 'Account Setup', description: 'Create your account and verify your email' },
    { title: 'Profile', description: 'Add your personal information' },
    { title: 'Payment', description: 'Set up your billing details' },
    { title: 'Confirmation', description: 'Review and complete registration' }
]

const StepsExample = () => {
    return (
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
    )
}

export default StepsExample
