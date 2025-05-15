import AlertDialogRoot from './fragments/AlertDialogRoot';
import AlertDialogContent from './fragments/AlertDialogContent';
import AlertDialogTrigger from './fragments/AlertDialogTrigger';
import AlertDialogPortal from './fragments/AlertDialogPortal';
import AlertDialogOverlay from './fragments/AlertDialogOverlay';
import AlertDialogCancel from './fragments/AlertDialogCancel';
import AlertDialogAction from './fragments/AlertDialogAction';
import AlertDialogTitle from './fragments/AlertDialogTitle';
import AlertDialogDescription from './fragments/AlertDialogDescription';

const AlertDialog = () => {
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
AlertDialog.Title = AlertDialogTitle;
AlertDialog.Description = AlertDialogDescription;

export default AlertDialog;
