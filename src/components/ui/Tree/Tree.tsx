import React, { forwardRef } from 'react';

import TreeRoot from './fragments/TreeRoot';
import TreeItem from './fragments/TreeItem';

const COMPONENT_NAME = 'Tree';

export type TreeElement = HTMLDivElement;
export type TreeProps = React.ComponentPropsWithoutRef<'div'> & {
    children?: React.ReactNode;
};

type TreeComponent = React.ForwardRefExoticComponent<TreeProps & React.RefAttributes<TreeElement>> & {
    Root: typeof TreeRoot;
    Item: typeof TreeItem;
};

const Tree = forwardRef<TreeElement, TreeProps>(({ children, ...props }, ref) => {
    console.warn('Direct usage of Tree is not supported. Please use Tree.Root and Tree.Item instead.');
    return (
        <div ref={ref} {...props}>
            {children}
        </div>
    );
}) as TreeComponent;

Tree.displayName = COMPONENT_NAME;

Tree.Root = TreeRoot;
Tree.Item = TreeItem;

export type { TreeRootProps } from './fragments/TreeRoot';
export type { TreeItemProps } from './fragments/TreeItem';
// Named part exports let React Server Components use `import * as Tree from '@radui/ui/Tree'`;
// property access on the default export is undefined across the client boundary.
export {
    TreeRoot as Root,
    TreeItem as Item
};

export default Tree;
