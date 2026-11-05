/**
 * What an `asChild` part actually rendered: a native button, a link, or something else (span, div,
 * custom element). Read from the mounted element rather than from `children.type`, which can differ
 * between the server render and hydration (children crossing a server/client boundary), and which
 * can't see through components like `next/link` that render an <a>.
 */
export type ChildKind = 'button' | 'link' | 'other';

export function kindOf(node: Element): ChildKind {
    if (node.tagName === 'BUTTON') return 'button';
    if ((node.tagName === 'A' || node.tagName === 'AREA') && node.hasAttribute('href')) return 'link';
    return 'other';
}
