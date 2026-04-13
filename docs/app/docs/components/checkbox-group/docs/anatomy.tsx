import CheckboxGroup from "@radui/ui/CheckboxGroup"

export default () => {
    return (
        <CheckboxGroup.Root>
            <CheckboxGroup.Label>
                <CheckboxGroup.Trigger value="option">
                    <CheckboxGroup.Indicator />
                </CheckboxGroup.Trigger>
                Label
            </CheckboxGroup.Label>
        </CheckboxGroup.Root>
    )
}
