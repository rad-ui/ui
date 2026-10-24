import Autocomplete from "@radui/ui/Autocomplete"

export default () => {
    return (
        <Autocomplete.Root>
            <Autocomplete.Input />
            <Autocomplete.Clear />
            <Autocomplete.Portal>
                <Autocomplete.Content>
                    <Autocomplete.Group>
                        <Autocomplete.Item />
                    </Autocomplete.Group>
                    <Autocomplete.Empty />
                </Autocomplete.Content>
            </Autocomplete.Portal>
        </Autocomplete.Root>
    )
}
