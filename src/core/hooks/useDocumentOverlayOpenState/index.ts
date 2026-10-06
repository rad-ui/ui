'use client';

import React from 'react';
import {
    DOCUMENT_OVERLAY_OPEN_ATTRIBUTE,
    isDocumentOverlayOpen,
    subscribeDocumentOverlayOpen
} from '~/core/utils/documentOverlayOpen';

export function useDocumentOverlayOpenState() {
    const [overlayOpen, setOverlayOpen] = React.useState(() => isDocumentOverlayOpen());

    React.useEffect(() => {
        const update = () => {
            setOverlayOpen(isDocumentOverlayOpen());
        };

        const unsubscribe = subscribeDocumentOverlayOpen(update);

        const mutationObserver = new MutationObserver(update);
        mutationObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [DOCUMENT_OVERLAY_OPEN_ATTRIBUTE]
        });
        mutationObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['style']
        });

        return () => {
            unsubscribe();
            mutationObserver.disconnect();
        };
    }, []);

    return overlayOpen;
}
