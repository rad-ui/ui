import { createContext } from 'react';
import { FloatingContext } from '@floating-ui/react';

type AlertDialogContextType = {
  isOpen: boolean;
  handleOpenChange: (open: boolean) => void;
  floaterContext: FloatingContext;
  rootClass: string;
  handleOverlayClick: () => void;
};

export const AlertDialogContext = createContext<AlertDialogContextType>({
  isOpen: false,
  handleOpenChange: () => {},
  floaterContext: {} as FloatingContext,
  rootClass: '',
  handleOverlayClick: () => {},
});
