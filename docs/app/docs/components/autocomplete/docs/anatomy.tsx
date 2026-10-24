import Autocomplete from "@radui/ui/Autocomplete"

export default () => {
    return (
        <Autocomplete.Root>
            <Autocomplete.Input />
            <Autocomplete.Portal>
                <Autocomplete.Content>
                    <Autocomplete.Group>
                        <Autocomplete.Item />
                    </Autocomplete.Group>
                </Autocomplete.Content>
            </Autocomplete.Portal>
        </Autocomplete.Root>
    )
}
