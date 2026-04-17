"use client"

import Dialog from "@radui/ui/Dialog";
import { X } from "lucide-react";

const DialogExample = () => {
  return (
    <div className="w-64 md:w-96 flex justify-center items-center">
      <Dialog.Root>
        <Dialog.Trigger>
          Open Dialog
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>
              This message will self destruct in 10 seconds
            </Dialog.Title>
            <Dialog.Description>
              Just kidding, it will not self destruct.
            </Dialog.Description>
            <Dialog.Close>
              <CloseIcon />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>)
}

const CloseIcon = ()=> <X size={15} strokeWidth={2} />

export default DialogExample;
