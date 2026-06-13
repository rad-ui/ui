import Dialog from "@radui/ui/Dialog";

export default () => {
    return (
        <Dialog.Root>
            <Dialog.Trigger>Open dialog</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay/>
                <Dialog.Content>
                    <Dialog.Title>Dialog title</Dialog.Title>
                    <Dialog.Description>Dialog description</Dialog.Description>
                    <Dialog.Footer>
                        <Dialog.Close>Close</Dialog.Close>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
