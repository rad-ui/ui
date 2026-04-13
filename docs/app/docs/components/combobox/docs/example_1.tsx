"use client"

import Combobox from "@radui/ui/Combobox"

const ComboboxExample = () => {
    return (
        <Combobox.Root>
            <Combobox.Trigger>
                Select an option
            </Combobox.Trigger>
            <Combobox.Portal>
                <Combobox.Content>
                    <Combobox.Search />
                    <Combobox.Group>
                        <Combobox.Item value="apple">Apple</Combobox.Item>
                        <Combobox.Item value="banana">Banana</Combobox.Item>
                        <Combobox.Item value="cherry">Cherry</Combobox.Item>
                        <Combobox.Item value="grape">Grape</Combobox.Item>
                        <Combobox.Item value="mango">Mango</Combobox.Item>
                    </Combobox.Group>
                </Combobox.Content>
            </Combobox.Portal>
        </Combobox.Root>
    )
}

export default ComboboxExample
