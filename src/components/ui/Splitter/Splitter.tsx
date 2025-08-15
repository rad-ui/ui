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

// Empty props type - only supporting fragment exports
export type SplitterProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

// Empty implementation - we don't support direct usage
const Splitter = () => {
    console.warn('Direct usage of Splitter is not supported. Please use Splitter.Root, Splitter.Panel, etc. instead.');
    return null;
};

Splitter.Root = SplitterRoot;
Splitter.Panel = SplitterPanel;
Splitter.Handle = SplitterHandle;

export default Splitter;
