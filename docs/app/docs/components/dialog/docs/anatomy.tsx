import Dialog from "@radui/ui/Dialog";

export default () => {
    return (
        <Dialog.Root>
            <Dialog.Trigger/>
            <Dialog.Portal>
                <Dialog.Overlay/>
                <Dialog.Content>
                    <Dialog.Title/>
                    <Dialog.Description/>
                    <Dialog.Close/>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}