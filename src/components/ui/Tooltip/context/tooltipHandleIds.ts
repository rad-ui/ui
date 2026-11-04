import type { PopupHandle } from '~/core/utils/popupHandle';

/** The tooltip content id for each handle, so detached triggers can point aria-describedby at it. */
export const tooltipHandleIds = new WeakMap<PopupHandle<any>, string>();
