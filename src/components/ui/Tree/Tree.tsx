import React from 'react';

import TreeRoot from './fragments/TreeRoot';
import TreeItem from './fragments/TreeItem';

const COMPONENT_NAME = 'Tree';

// Empty props type - only supporting fragment exports
export type TreeProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

// Empty implementation - we don't support direct usage
const Tree = () => {
    console.warn('Direct usage of Tree is not supported. Please use Tree.Root and Tree.Item instead.');
    return null;
};

Tree.displayName = COMPONENT_NAME;

// Export fragments via direct assignment pattern
Tree.Root = TreeRoot;
Tree.Item = TreeItem;

export default Tree;
