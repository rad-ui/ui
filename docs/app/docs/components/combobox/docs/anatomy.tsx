import Combobox from "@radui/ui/Combobox"

export default () => {
    return (
        <Combobox.Root>
            <Combobox.Trigger>
                <Combobox.Indicator />
            </Combobox.Trigger>
            <Combobox.Portal>
                <Combobox.Content>
                    <Combobox.Search />
                    <Combobox.Group>
                        <Combobox.Item value="" />
                    </Combobox.Group>
                </Combobox.Content>
            </Combobox.Portal>
        </Combobox.Root>
    )
}
