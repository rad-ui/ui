import React from 'react';

/**
 * Hook to check if the document is hidden
 * @returns {boolean} - True if the document is hidden, false otherwise
 *
 * Source: https://github.com/emilkowalski/sonner/blob/main/src/hooks.tsx
 */
export const useIsDocumentHidden = () => {
    const [isDocumentHidden, setIsDocumentHidden] = React.useState(document.hidden);

    React.useEffect(() => {
        const callback = () => {
            setIsDocumentHidden(document.hidden);
        };

        document.addEventListener('visibilitychange', callback);
        return () => document.removeEventListener('visibilitychange', callback);
    }, []);

    return isDocumentHidden;
};
