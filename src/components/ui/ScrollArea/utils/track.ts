/**
 * Returns the usable length of a scrollbar track along its axis: the scrollbar's content box
 * (client size minus padding). Falls back to `fallback` when the track is not laid out yet
 * (e.g. hidden, or in non-layout environments) so thumb math stays consistent.
 */
export function getTrackLength(
    scrollbar: HTMLElement | null | undefined,
    orientation: 'vertical' | 'horizontal',
    fallback: number
): number {
    if (!scrollbar) return fallback;
    const size = orientation === 'vertical' ? scrollbar.clientHeight : scrollbar.clientWidth;
    if (size <= 0) return fallback;

    let paddingStart = 0;
    let paddingEnd = 0;
    if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
        const styles = window.getComputedStyle(scrollbar);
        paddingStart = parseFloat(orientation === 'vertical' ? styles.paddingTop : styles.paddingLeft) || 0;
        paddingEnd = parseFloat(orientation === 'vertical' ? styles.paddingBottom : styles.paddingRight) || 0;
    }

    return Math.max(0, size - paddingStart - paddingEnd);
}

const FOCUSABLE_TAGS = new Set(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'IFRAME', 'AUDIO', 'VIDEO', 'SUMMARY']);

function isFocusableElement(element: Element): boolean {
    if (!(element instanceof HTMLElement)) return false;
    const tabIndexAttr = element.getAttribute('tabindex');
    if (tabIndexAttr !== null) return Number(tabIndexAttr) >= 0;
    if (element.isContentEditable) return true;
    if (!FOCUSABLE_TAGS.has(element.tagName)) return false;
    if (element.tagName === 'A') return element.hasAttribute('href');
    if (element.tagName === 'AUDIO' || element.tagName === 'VIDEO') return element.hasAttribute('controls');
    if (element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'hidden') return false;
    return !(element as HTMLButtonElement).disabled;
}

/**
 * Whether `container` (a ref'd element) contains anything reachable with Tab. Walks only the
 * given instance's subtree, so it stays instance-safe.
 */
export function hasFocusableDescendant(container: HTMLElement): boolean {
    if (typeof document === 'undefined') return false;
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node) => {
            const element = node as HTMLElement;
            if (element.hidden || element.getAttribute('aria-hidden') === 'true' || element.hasAttribute('inert')) {
                return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    });
    let node = walker.nextNode();
    while (node) {
        if (isFocusableElement(node as Element)) return true;
        node = walker.nextNode();
    }
    return false;
}
