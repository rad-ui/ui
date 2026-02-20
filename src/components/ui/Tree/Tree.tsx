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

export default Tree;
