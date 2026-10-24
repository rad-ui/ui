import Combobox from "@radui/ui/Combobox"

export default () => {
    return (
        <Combobox.Root>
            <Combobox.Trigger />
            <Combobox.Clear />
            <Combobox.Content>
                <Combobox.Search />
                <Combobox.Group>
                    <Combobox.Item value="" />
                </Combobox.Group>
                <Combobox.Empty />
            </Combobox.Content>
        </Combobox.Root>
    )
}
