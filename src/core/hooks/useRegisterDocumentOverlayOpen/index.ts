'use client';

import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { registerDocumentOverlayOpen } from '~/core/utils/documentOverlayOpen';

export function useRegisterDocumentOverlayOpen(open: boolean) {
    useLayoutEffect(() => {
        if (!open) {
            return;
        }

        return registerDocumentOverlayOpen();
    }, [open]);
}
