import AlertDialog from "@radui/ui/AlertDialog";

export default () => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger/>
            <AlertDialog.Portal>
                <AlertDialog.Overlay/>
                <AlertDialog.Content>
                    <AlertDialog.Title/>
                    <AlertDialog.Description/>
                    <AlertDialog.Cancel/>
                    <AlertDialog.Action/>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}