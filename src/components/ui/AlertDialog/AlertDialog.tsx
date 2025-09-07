'use client';

import AlertDialogRoot from './fragments/AlertDialogRoot';
import AlertDialogContent from './fragments/AlertDialogContent';
import AlertDialogTrigger from './fragments/AlertDialogTrigger';
import AlertDialogPortal from './fragments/AlertDialogPortal';
import AlertDialogOverlay from './fragments/AlertDialogOverlay';
import AlertDialogCancel from './fragments/AlertDialogCancel';
import AlertDialogAction from './fragments/AlertDialogAction';
import AlertDialogTitle from './fragments/AlertDialogTitle';
import AlertDialogDescription from './fragments/AlertDialogDescription';
// Explicit extension to satisfy ESM linting/resolution
export type {
    AlertDialogRootProps as __fix_types_1
} from './types.ts';

const AlertDialog = () => {
    console.warn('Direct usage of AlertDialog is not supported. Please use AlertDialog.Root, AlertDialog.Content, etc. instead.');
    return null;
};

AlertDialog.Root = AlertDialogRoot;
AlertDialog.Trigger = AlertDialogTrigger;

AlertDialog.Overlay = AlertDialogOverlay;
AlertDialog.Portal = AlertDialogPortal;
AlertDialog.Content = AlertDialogContent;
AlertDialog.Title = AlertDialogTitle;
AlertDialog.Description = AlertDialogDescription;
AlertDialog.Cancel = AlertDialogCancel;
AlertDialog.Action = AlertDialogAction;

export default AlertDialog;
