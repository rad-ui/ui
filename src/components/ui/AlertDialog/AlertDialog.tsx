import React, { useState } from 'react';
import AlertDialogRoot from './fragments/AlertDialogRoot';
import AlertDialogContent from './fragments/AlertDialogContent';
import AlertDialogTrigger from './fragments/AlertDialogTrigger';
import AlertDialogPortal from './fragments/AlertDialogPortal';
import AlertDialogOverlay from './fragments/AlertDialogOverlay';
import AlertDialogCancel from './fragments/AlertDialogCancel';
import AlertDialogAction from './fragments/AlertDialogAction';

export type AlertDialogProps = {
    children: React.ReactNode;
    content: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const AlertDialog = ({ children, open = false, onOpenChange = () => {}, content } : AlertDialogProps) => {
    console.warn('Direct usage of AlertDialog is not supported. Please use AlertDialog.Root, AlertDialog.Content, etc. instead.');
    return null;
};

AlertDialog.Root = AlertDialogRoot;
AlertDialog.Content = AlertDialogContent;
AlertDialog.Trigger = AlertDialogTrigger;
AlertDialog.Portal = AlertDialogPortal;
AlertDialog.Overlay = AlertDialogOverlay;
AlertDialog.Cancel = AlertDialogCancel;
AlertDialog.Action = AlertDialogAction;

export default AlertDialog;
