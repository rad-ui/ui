import { createContext } from 'react';

type AlertDialogContextType = {
  isOpen: boolean;
  handleOpenChange: (open: boolean) => void;
  rootClass: string;
  handleOverlayClick: () => void;
};

export const AlertDialogContext = createContext<AlertDialogContextType>({
    isOpen: false,
    handleOpenChange: () => {},
    rootClass: '',
    handleOverlayClick: () => {}
});
