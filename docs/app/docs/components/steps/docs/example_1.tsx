"use client"

import Steps from "@radui/ui/Steps"

const StepsExample = () => {
    return (
        <Steps.Root currentStep={1}>
            <Steps.Item>
                <Steps.Track>
                    <Steps.Bubble>1</Steps.Bubble>
                    <Steps.Line />
                </Steps.Track>
                <Steps.Content>
                    <Steps.Title>Account</Steps.Title>
                    <Steps.Description>Create your account</Steps.Description>
                </Steps.Content>
            </Steps.Item>
            <Steps.Item>
                <Steps.Track>
                    <Steps.Bubble>2</Steps.Bubble>
                    <Steps.Line />
                </Steps.Track>
                <Steps.Content>
                    <Steps.Title>Profile</Steps.Title>
                    <Steps.Description>Set up your profile</Steps.Description>
                </Steps.Content>
            </Steps.Item>
            <Steps.Item>
                <Steps.Track>
                    <Steps.Bubble>3</Steps.Bubble>
                </Steps.Track>
                <Steps.Content>
                    <Steps.Title>Done</Steps.Title>
                    <Steps.Description>You're all set!</Steps.Description>
                </Steps.Content>
            </Steps.Item>
        </Steps.Root>
    )
}

export default StepsExample
