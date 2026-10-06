import TextField from "@radui/ui/TextField";

export default () => {
    return (
        <TextField.Root>
            <TextField.Slot side="start">
                @
            </TextField.Slot>
            <TextField.Input placeholder="Email" />
            <TextField.Reset>Clear</TextField.Reset>
        </TextField.Root>
    )
}
