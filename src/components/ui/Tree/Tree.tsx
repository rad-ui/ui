import React from 'react';

import TreeRoot from './shards/TreeRoot';
import TreeItem from './shards/TreeItem';

const COMPONENT_NAME = 'Tree';

type TreeProps = {
    children: React.ReactNode;
    [key: string]: any;
};

const Tree = ({ children, items = [], ...props }: TreeProps) => {
    return <TreeRoot {...props}>
        {items.map((item: any) => {
            const level = 0;
            return <>
                <TreeItem key={item.label} expanded={item.expanded} item={item} level={level}>
                    {item.label}
                </TreeItem>

            </>;
        })}
    </TreeRoot>;
};

Tree.displayName = COMPONENT_NAME;

export default Tree;
