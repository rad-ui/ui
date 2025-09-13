'use client';

import ToastProvider from './fragments/ToastProvider';
import { Toaster } from './fragments/ToastToaster';
import { toast } from './toastAPI';

const Toast = () => {
    console.warn('Direct usage of Toast is not supported. Please use Toast.Root etc. instead.');
    return null;
};

Toast.Provider = ToastProvider;
Toast.Toaster = Toaster;

export { toast };

export default Toast;
