'use client';

import React, { forwardRef } from 'react';
import DialogRoot from './fragments/DialogRoot';
import DialogTrigger from './fragments/DialogTrigger';
import DialogPortal from './fragments/DialogPortal';
import DialogOverlay from './fragments/DialogOverlay';
import DialogContent from './fragments/DialogContent';
import DialogTitle from './fragments/DialogTitle';
import DialogDescription from './fragments/DialogDescription';
import DialogClose from './fragments/DialogClose';

type DialogElement = React.ElementRef<'div'>;
type DialogProps = React.ComponentPropsWithoutRef<'div'>;

const DialogBase = forwardRef<DialogElement, DialogProps>((_props, _ref) => {
    console.warn('Direct usage of Dialog is not supported. Please use Dialog.Root, Dialog.Content, etc. instead.');
    return null;
});

DialogBase.displayName = 'Dialog';

interface DialogComponent extends React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<DialogElement>> {
    Root: typeof DialogRoot;
    Trigger: typeof DialogTrigger;
    Portal: typeof DialogPortal;
    Overlay: typeof DialogOverlay;
    Content: typeof DialogContent;
    Title: typeof DialogTitle;
    Description: typeof DialogDescription;
    Close: typeof DialogClose;
}

const Dialog = DialogBase as DialogComponent;

Dialog.Root = DialogRoot;
Dialog.Trigger = DialogTrigger;
Dialog.Portal = DialogPortal;
Dialog.Overlay = DialogOverlay;
Dialog.Content = DialogContent;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Close = DialogClose;

export type { DialogRootProps } from './fragments/DialogRoot';
export type { DialogTriggerProps } from './fragments/DialogTrigger';
export type { DialogPortalProps } from './fragments/DialogPortal';
export type { DialogOverlayProps } from './fragments/DialogOverlay';
export type { DialogContentProps } from './fragments/DialogContent';
export type { DialogTitleProps } from './fragments/DialogTitle';
export type { DialogDescriptionProps } from './fragments/DialogDescription';
export type { DialogCloseProps } from './fragments/DialogClose';
export default Dialog;
