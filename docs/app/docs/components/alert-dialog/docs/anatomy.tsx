import AlertDialog from "@radui/ui/AlertDialog";

export default () => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>Open alert</AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay/>
                <AlertDialog.Content>
                    <AlertDialog.Title>Alert dialog title</AlertDialog.Title>
                    <AlertDialog.Description>Alert dialog description</AlertDialog.Description>
                    <AlertDialog.Footer>
                        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                        <AlertDialog.Action>Confirm</AlertDialog.Action>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}
