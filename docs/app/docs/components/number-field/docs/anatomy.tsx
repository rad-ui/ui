import NumberField from "@radui/ui/NumberField"

export default () => {
    return (
        <NumberField.Root>
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
        </NumberField.Root>
    )
}
