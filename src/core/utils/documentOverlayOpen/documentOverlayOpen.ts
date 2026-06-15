export const DOCUMENT_OVERLAY_OPEN_ATTRIBUTE = 'data-rad-ui-overlay-open';

let overlayOpenCount = 0;
const listeners = new Set<() => void>();

function notifyListeners() {
    listeners.forEach((listener) => listener());
}

function syncDocumentOverlayAttribute() {
    if (typeof document === 'undefined') {
        return;
    }

    const root = document.documentElement;

    if (overlayOpenCount > 0) {
        root.setAttribute(DOCUMENT_OVERLAY_OPEN_ATTRIBUTE, '');
    } else {
        root.removeAttribute(DOCUMENT_OVERLAY_OPEN_ATTRIBUTE);
    }
}

export function isDocumentBodyScrollLocked() {
    if (typeof document === 'undefined') {
        return false;
    }

    return document.body.style.overflow === 'hidden';
}

export function isDocumentOverlayOpen() {
    if (typeof document === 'undefined') {
        return false;
    }

    return (
        overlayOpenCount > 0
        || document.documentElement.hasAttribute(DOCUMENT_OVERLAY_OPEN_ATTRIBUTE)
        || isDocumentBodyScrollLocked()
    );
}

export function registerDocumentOverlayOpen() {
    overlayOpenCount += 1;
    syncDocumentOverlayAttribute();
    notifyListeners();

    let disposed = false;

    return () => {
        if (disposed) {
            return;
        }

        disposed = true;
        overlayOpenCount = Math.max(0, overlayOpenCount - 1);
        syncDocumentOverlayAttribute();
        notifyListeners();
    };
}

export function subscribeDocumentOverlayOpen(listener: () => void) {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
}
