import * as React from 'react';

/** Imperative controls for a popup, through its `actionsRef` prop. */
export type PopupActions = {
    /** Closes the popup, with reason `'imperative-action'`. Exit animations still play. */
    close: () => void;
};

/** Fills `actionsRef` with `close()`. `close` is read when called, so it is never stale. */
export const usePopupActions = (
    actionsRef: React.Ref<PopupActions> | undefined,
    close: () => void
) => {
    const closeRef = React.useRef(close);
    closeRef.current = close;
    React.useImperativeHandle(actionsRef, () => ({ close: () => closeRef.current() }), []);
};
