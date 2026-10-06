'use client';

import React from 'react';
import ScrollAreaRoot from './fragments/ScrollAreaRoot';
import ScrollAreaViewport from './fragments/ScrollAreaViewport';
import ScrollAreaScrollbar from './fragments/ScrollAreaScrollbar';
import ScrollAreaThumb from './fragments/ScrollAreaThumb';
import ScrollAreaCorner from './fragments/ScrollAreaCorner';

type ScrollAreaElement = React.ElementRef<'div'>;
type ScrollAreaProps = React.ComponentPropsWithoutRef<'div'>;

// Empty implementation - we don't support direct usage
const ScrollArea = React.forwardRef<ScrollAreaElement, ScrollAreaProps>((_props, _ref) => {
    console.warn('Direct usage of ScrollArea is not supported. Please use ScrollArea.Root and ScrollArea.Viewport instead.');
    return null;
}) as React.ForwardRefExoticComponent<ScrollAreaProps> & {
    Root: typeof ScrollAreaRoot;
    Viewport: typeof ScrollAreaViewport;
    Scrollbar: typeof ScrollAreaScrollbar;
    Thumb: typeof ScrollAreaThumb;
    Corner: typeof ScrollAreaCorner;
};

// Export fragments via direct assignment pattern
ScrollArea.Root = ScrollAreaRoot;
ScrollArea.Viewport = ScrollAreaViewport;
ScrollArea.Scrollbar = ScrollAreaScrollbar;
ScrollArea.Thumb = ScrollAreaThumb;
ScrollArea.Corner = ScrollAreaCorner;

ScrollArea.displayName = 'ScrollArea';

export type { ScrollAreaRootProps } from './fragments/ScrollAreaRoot';
export type { ScrollAreaScrollbarType } from './context/ScrollAreaContext';
export type { ScrollAreaViewportProps } from './fragments/ScrollAreaViewport';
export type { ScrollAreaScrollbarProps } from './fragments/ScrollAreaScrollbar';
export type { ScrollAreaThumbProps } from './fragments/ScrollAreaThumb';
export type { ScrollAreaCornerProps } from './fragments/ScrollAreaCorner';
// Named part exports let React Server Components use `import * as ScrollArea from '@radui/ui/ScrollArea'`;
// property access on the default export is undefined across the client boundary.
export {
    ScrollAreaRoot as Root,
    ScrollAreaViewport as Viewport,
    ScrollAreaScrollbar as Scrollbar,
    ScrollAreaThumb as Thumb,
    ScrollAreaCorner as Corner
};

export default ScrollArea;
