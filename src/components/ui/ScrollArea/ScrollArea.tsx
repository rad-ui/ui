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

export default ScrollArea;
