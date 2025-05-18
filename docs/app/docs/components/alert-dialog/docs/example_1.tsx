"use client"
import AlertDialog from "@radui/ui/AlertDialog";

const AlertDialogExample = () => {
  return (
    <div className="w-64 md:w-96 flex justify-center items-center">
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          Open Dialog
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>
              Are you sure you want to delete this file?
            </AlertDialog.Title>
            <AlertDialog.Description>
              This action cannot be undone.
            </AlertDialog.Description>
            <AlertDialog.Action>
              Delete
            </AlertDialog.Action>
            <AlertDialog.Cancel>
              Cancel
            </AlertDialog.Cancel>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>)
}

export default AlertDialogExample;