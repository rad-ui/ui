/** Why a popup is opening or closing, passed to `onOpenChange` as its second argument. */
export type OpenChangeReason =
    | 'trigger-press'
    | 'trigger-hover'
    | 'trigger-focus'
    | 'outside-press'
    | 'escape-key'
    | 'focus-out'
    | 'close-press'
    | 'list-navigation'
    | 'none';

export type OpenChangeDetails = {
    reason: OpenChangeReason;
    /** The DOM event behind the change, when there is one. */
    event?: Event;
    /** Keep the current open state: the change is ignored. */
    cancel: () => void;
    readonly isCanceled: boolean;
};

export const createOpenChangeDetails = (reason: OpenChangeReason, event?: Event): OpenChangeDetails => {
    let canceled = false;
    return {
        reason,
        event,
        cancel: () => { canceled = true; },
        get isCanceled() { return canceled; }
    };
};

/** Maps Floating UI's open-change reasons onto the public ones. */
export const fromFloatingReason = (reason?: string): OpenChangeReason => {
    switch (reason) {
    case 'click':
    case 'reference-press':
        return 'trigger-press';
    case 'hover':
    case 'safe-polygon':
        return 'trigger-hover';
    case 'focus':
        return 'trigger-focus';
    case 'outside-press':
        return 'outside-press';
    case 'escape-key':
        return 'escape-key';
    case 'focus-out':
        return 'focus-out';
    case 'list-navigation':
        return 'list-navigation';
    default:
        return 'none';
    }
};

/**
 * Calls a consumer's onOpenChange. Handlers that take one argument get just
 * the open state, as before, so existing code and exact-argument test
 * assertions keep working; two-argument handlers also get the details.
 */
export const callOpenChange = (
    handler: ((open: boolean, details: OpenChangeDetails) => void) | undefined,
    open: boolean,
    details: OpenChangeDetails
) => {
    if (!handler) return;
    if (handler.length <= 1) (handler as (open: boolean) => void)(open);
    else handler(open, details);
};
