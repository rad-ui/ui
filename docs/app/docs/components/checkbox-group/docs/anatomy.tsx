import CheckboxGroup from "@radui/ui/CheckboxGroup"

export default () => {
    return (
        <CheckboxGroup.Root>
            <CheckboxGroup.Trigger value="">
                <CheckboxGroup.Indicator />
                <CheckboxGroup.Label />
            </CheckboxGroup.Trigger>
        </CheckboxGroup.Root>
    )
}
