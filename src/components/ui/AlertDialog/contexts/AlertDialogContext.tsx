'use client';
import { createContext } from 'react';

type AlertDialogContextType = {
  rootClass: string;
};

export const AlertDialogContext = createContext<AlertDialogContextType>({
    rootClass: ''
});
