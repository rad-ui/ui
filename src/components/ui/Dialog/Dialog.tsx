'use client';

import DialogRoot from './fragments/DialogRoot';
import DialogTrigger from './fragments/DialogTrigger';
import DialogPortal from './fragments/DialogPortal';
import DialogOverlay from './fragments/DialogOverlay';
import DialogContent from './fragments/DialogContent';
import DialogTitle from './fragments/DialogTitle';
import DialogDescription from './fragments/DialogDescription';
import DialogClose from './fragments/DialogClose';

const Dialog = () => {
    console.warn('Direct usage of Dialog is not supported. Please use Dialog.Root, Dialog.Content, etc. instead.');
    return null;
};

Dialog.Root = DialogRoot;
Dialog.Trigger = DialogTrigger;
Dialog.Portal = DialogPortal;
Dialog.Overlay = DialogOverlay;
Dialog.Content = DialogContent;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Close = DialogClose;

export default Dialog;
