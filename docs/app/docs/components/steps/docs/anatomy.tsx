import Steps from "@radui/ui/Steps"

export default () => {
    return (
        <Steps.Root>
            <Steps.Item>
                <Steps.Track>
                    <Steps.Bubble />
                    <Steps.Line />
                </Steps.Track>
                <Steps.Content>
                    <Steps.Title />
                    <Steps.Description />
                </Steps.Content>
            </Steps.Item>
        </Steps.Root>
    )
}
