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

/**
 * Horizontal scroll range of a viewport. Browsers report `scrollLeft` from 0
 * at the inline start: in RTL it runs from 0 (start, right edge) down to
 * -(scrollWidth - clientWidth). Uses the computed direction, so `dir="rtl"` on
 * the ScrollArea, any ancestor, or the document all work.
 */
export function getHorizontalScrollRange(viewport: HTMLElement): { min: number; max: number; rtl: boolean } {
    const extent = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const rtl = typeof window !== 'undefined' && window.getComputedStyle(viewport).direction === 'rtl';
    return rtl ? { min: -extent, max: 0, rtl } : { min: 0, max: extent, rtl };
}

export function clampScrollLeft(viewport: HTMLElement, value: number): number {
    const { min, max } = getHorizontalScrollRange(viewport);
    return Math.min(max, Math.max(min, value));
}
