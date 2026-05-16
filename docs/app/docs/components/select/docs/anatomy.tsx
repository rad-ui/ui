import Select from "@radui/ui/Select"

export default () => {
    return (
        <Select.Root>
            <Select.Trigger>
                <Select.Indicator />
            </Select.Trigger>
            <Select.Portal>
                <Select.Content>
                    <Select.Group>
                        <Select.Item value="" />
                    </Select.Group>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}
