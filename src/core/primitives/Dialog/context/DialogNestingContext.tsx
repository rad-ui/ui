'use client';
import { createContext } from 'react';

/** Lets a dialog tell the dialog it's nested in when it opens or closes. */
export const DialogNestingContext = createContext<{ onChildOpenChange: (open: boolean) => void } | null>(null);
