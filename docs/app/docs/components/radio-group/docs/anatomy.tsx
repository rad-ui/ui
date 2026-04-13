import RadioGroup from "@radui/ui/RadioGroup"

export default () => {
    return (
        <RadioGroup.Root name="group">
            <RadioGroup.Item value="">
                <RadioGroup.Indicator />
                <RadioGroup.Label />
            </RadioGroup.Item>
        </RadioGroup.Root>
    )
}
