import type { PopupHandle } from '~/core/utils/popupHandle';

export type HoverCardHandleControls = {
    /** Open after the Root's openDelay, anchored to `trigger`, with `payload` for its children. */
    openWithDelay: (target: { trigger: HTMLElement; payload: unknown }) => void;
    closeWithDelay: () => void;
};

/** The Root's delayed open/close for each handle, so detached triggers share its timing. */
export const hoverCardHandleControls = new WeakMap<PopupHandle<any>, HoverCardHandleControls>();
