import RadioGroup from "@radui/ui/RadioGroup"

export default () => {
    return (
        <RadioGroup.Root aria-label="Group">
            <RadioGroup.Label>
                <RadioGroup.Item value="option">
                    <RadioGroup.Indicator />
                </RadioGroup.Item>
                Label
            </RadioGroup.Label>
        </RadioGroup.Root>
    )
}
