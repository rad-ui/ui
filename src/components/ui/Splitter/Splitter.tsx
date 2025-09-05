'use client';
import React from 'react';

import SplitterRoot from './fragments/SplitterRoot';
import SplitterPanel from './fragments/SplitterPanel';
import SplitterHandle from './fragments/SplitterHandle';

/**
 * Splitter Component
 *
 * A headless splitter component for creating resizable panel layouts.
 * Supports both horizontal and vertical orientations with drag and keyboard controls.
 *
 * @example
 * ```tsx
 * <Splitter.Root orientation="horizontal" defaultSizes={[30, 70]}>
 *   <Splitter.Panel index={0}>
 *     <div>Left Panel</div>
 *   </Splitter.Panel>
 *   <Splitter.Handle index={0} />
 *   <Splitter.Panel index={1}>
 *     <div>Right Panel</div>
 *   </Splitter.Panel>
 * </Splitter.Root>
 * ```
 */

export type SplitterProps = React.ComponentPropsWithoutRef<'div'>;

const SplitterBase = React.forwardRef<HTMLDivElement, SplitterProps>((_props, _ref) => {
    console.warn('Direct usage of Splitter is not supported. Please use Splitter.Root, Splitter.Panel, etc. instead.');
    return null;
});

const Splitter = Object.assign(SplitterBase, {
    Root: SplitterRoot,
    Panel: SplitterPanel,
    Handle: SplitterHandle
});

export default Splitter;
